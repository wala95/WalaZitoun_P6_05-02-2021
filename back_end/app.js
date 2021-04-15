const express = require('express');
const mongoose = require('mongoose');// driver(api) qui permet de communiquer avec la base de données mongooDB
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
require('dotenv').config();
const helmet = require('helmet');
app.use(helmet());

// ouvrir une connection sur la bdd 
mongoose.connect(process.env.MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
// mettre le serveur a l'écoute de touts types de requettes qui vient du navigateur
app.use((req, res, next) => { // intercepter la communicationentre le serveur et le navigateur pour ajouter des headers à toutes réponses pour n'importe qu'elle type de requettes (middlewear)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next(); // poursuivre la réponse au navigateur
});

app.use(express.json()); // body json
app.use(express.urlencoded({ extended: true })) //raw data

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;