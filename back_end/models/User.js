const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  //userId: { type: String, required: false, unique: true },
  email: { type: String, required: true, unique: true }, //empecher de s'inscrire 2 fois avec la meme adresse mail 
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);// impossible de se connecter plusieurs fois avec la meme adresse mail

module.exports = mongoose.model('User', userSchema);