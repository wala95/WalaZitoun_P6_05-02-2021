const bcrypt = require('bcrypt'); //crypter le mot de passe
const jwt = require('jsonwebtoken');//vérifier les tokens d'authentification
const User = require('../models/User');// enregistrer les users dans ce middleware

const emailRegEx = new RegExp("[^@]+@[^@]+\.[a-zA-Z]{2,}");
const passwordRegEx = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

exports.signup = (req, res, next) => {// création des nouveaux users
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body.email)
  if (!(emailRegEx.test(email) && passwordRegEx.test(password))) {
    return res.status(400).json({ message: "email or password not valid" });
  } else {
    bcrypt.hash(req.body.password, 10)//hacher(crypter) le mot de passe(fonction asynchrone)
      .then(hash => {//créer un nouveau yser avec le mot de passe crypté
        const user = new User({
          email: req.body.email,
          password: hash
        });
        console.log(user)
        user.save()// enregistrer le nouveau user dans la BDD
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => {
            return res.status(400).json({ error })
          });
      })
      .catch(error => res.status(500).json({ error }));
  };
};


exports.login = (req, res, next) => { // permettre au utilisateur de se connecter
  User.findOne({ email: req.body.email })// trouver l'utilisateur
    .then(user => { // vérifier si on a trouvé un user ou non
      if (!user) { // si user non trouvé
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // user trouvé : comparer le MDP avec ceux enregistré dans BD
        .then(valid => {
          if (!valid) {// si mauvais MDP
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({ //bon MDP et renvoyer un objet JSON
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },// identifiant utilisateur
              'RANDOM_TOKEN_SECRET',// clée secrete pour l'encoudage
              { expiresIn: '24h' }// duréé de token
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));// un problème de connexion lié à mongooDB
};