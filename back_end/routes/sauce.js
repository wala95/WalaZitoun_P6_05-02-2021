const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// router.get('/', (req, res, next) => {
//     Thing.find()
//       .then(things => res.status(200).json(things))
//       .catch(error => res.status(400).json({ error }));
// });
router.get('/',auth, sauceCtrl.getAllSauce);

// router.get('/:id', (req, res, next) => {
//     Thing.findOne({ _id: req.params.id })
//       .then(thing => res.status(200).json(thing))
//       .catch(error => res.status(404).json({ error }));
//   });
router.get('/:id',auth, sauceCtrl.getOneSauce);

// //persiter (sauvergarder longterme sur disk, sur cloud) un nouveau thing dans mongo
// //si on tue le serveur et on le redemarre on peut retrouver toujours ces donnees
// router.post('/', (req, res, next) => {
//     // suuprimer l'id au cas ou été renseigné  par le navigateur 
//     delete req.body._id;
  
//       const thing = new Thing({
//         ...req.body // remplire les champs à condition que le client a bien renseigner les nom des champs :
//         // title: req.body.title,
//         // description: req.body.description,
//         // imageUrl: req.body.imageUrl,
//         // userId: req.body.userId,
//         // price: req.body.price,
//       }); 
//       thing.save() // sauvgarder dans mongoodb un nouveau document qu'on vient de remplir
//         .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//         .catch(error => res.status(400).json({ message: "Echec d'enregistrement d'objet !"}));
//     });
router.post('/',auth , multer, sauceCtrl.createSauce); //remplacer le code dessus par cette ligne
  
 
// router.put('/:id', (req, res, next) => {
//     Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//       .catch(error => res.status(400).json({ error }));
//   });
router.put('/:id',auth ,sauceCtrl.modifySauce);


// router.delete('/:id', (req, res, next) => {
//     Thing.deleteOne({_id: req.params.id})
//     .then(() => res.status(200).json({ message: 'Objet supprimé!'}))
//       .catch(error => res.status(400).json({ error }));
// });
router.delete('/:id',auth, sauceCtrl.deleteSauce);

module.exports = router;