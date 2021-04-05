const Sauce = require('../models/sauce');

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
  // const sauceObject = JSON.parse(req.body.sauce);
  console.log('=========>', req.file);
  console.log('=========>', req.body);
  const sauceObject = JSON.parse(req.body.sauce);
     // suuprimer l'id au cas ou été renseigné  par le navigateur 
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject, // remplire les champs à condition que le client a bien renseigner les nom des champs :
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// modifier l'url de l'image
          }); 

    console.log('la sauce que je vais insérer', sauce);
    sauce.save() // sauvgarder dans mongoodb un nouveau document qu'on vient de remplir
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ message: "Echec d'enregistrement d'objet !"}));
};

exports.modifySauce = (req, res, next) => {
    const sauce = new Sauce({
      _id: req.params.id,
      userId: req.body.userId,
      name: req.body.title,
      manufacturer:req.body.manufacturer,
      description: req.body.description,
      mainPepper:req.body.mainPepper,
      imageUrl: req.body.imageUrl,
      heat: req.body.heat,
    });
    Sauce.updateOne({_id: req.params.id}, sauce).then(
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
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Objet supprimé!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };