const Sauce = require('../models/sauce');
const fs = require('fs');

exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);

    delete sauceObject._id; // suuprimer l'id au cas ou été renseigné  par le navigateur 
    const sauce = new Sauce({
        ...sauceObject, // remplire les champs à condition que le client a bien renseigner les nom des champs :
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// modifier l'url de l'image
          }); 
    console.log('la sauce que je vais insérer', sauce);
    sauce.save() // sauvgarder dans mongoodb un nouveau document qu'on vient de remplir
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ message: "Echec d'enregistrement d'objet !"}));
};

// exports.modifySauce = (req, res, next) => {
// let sauce = undefined;
//   if(req.file && req.file.filename != undefined){
//      sauce = new Sauce({
//       _id: req.params.id,
//       userId: req.body.userId,
//       name: req.body.title,
//       manufacturer:req.body.manufacturer,
//       description: req.body.description,
//       mainPepper:req.body.mainPepper,
//       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,  
//       heat: req.body.heat,         
//     });
//   } else {
//      sauce = new Sauce({
//       _id: req.params.id,
//       userId: req.body.userId,
//       name: req.body.title,
//       manufacturer:req.body.manufacturer,
//       description: req.body.description,
//       mainPepper:req.body.mainPepper,
//       imageUrl: req.body. imageUrl,
//       heat: req.body.heat, 
//     })
//   };
//     Sauce.updateOne({_id: req.params.id}, sauce).then(
//       () => {
//         res.status(201).json({
//           message: 'Objet modifié !'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
// };
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.likedSauce = (req, res, next) => {
  let sauceId = req.params.id
  let like = req.body.like;
  let userId = req.body.userId;

  Sauce.findById(sauceId).then(sauce => {
  let indexLike = sauce.usersLiked.indexOf(userId)
  let indexDislike = sauce.usersDisliked.indexOf(userId)
    if (like === 1 && indexLike < 0) { // user like la sauce et user n'a pas encore aimé la sauce
        sauce.usersLiked.push(userId)
        if (!isNaN(sauce.likes)) { // nombre des likes est un nombre
          sauce.likes = sauce.likes + 1
        } else { // nombre des likes n'est pas un nombre (NAN)
          sauce.likes =  1
        }
    } else if (like === 0) { 
        if (indexLike >= 0) {
          sauce.usersLiked.splice(indexLike,1)
          sauce.likes = sauce.likes - 1
        }
        if (indexDislike >= 0) {
          sauce.usersDisliked.splice(indexDislike,1)
          sauce.dislikes = sauce.dislikes - 1
        }
    } else if (like === -1 && indexDislike < 0) {
        sauce.usersDisliked.push(userId)
          if (!isNaN(sauce.dislikes)) {
            sauce.dislikes = sauce.dislikes + 1
          } else {
            sauce.dislikes =  1
          }
        }
    Sauce.updateOne({_id: sauceId}, sauce).then(
      () => {
        res.status(201).json({
          message: 'Objet modifié !'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
 });
};
