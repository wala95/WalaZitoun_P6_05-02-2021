
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log("=====+>body", req.body)
    const token = req.headers.authorization.split(' ')[1];//récuprer le token dans le header authaurization (inspect/network 2eme mot)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');// décoder le token (le mot clé le meme que celui déclaré au token)  
    const userId = decodedToken.userId; //recuperer le userid
    next();
  } catch {
    console.log('==========> tu es pas autorisé');
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};