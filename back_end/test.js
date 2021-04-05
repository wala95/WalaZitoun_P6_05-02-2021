// const express = require('express');
// const http = require('http')
// const formidableMiddleware = require('express-formidable');

// const app = express();

// app.use((req, res, next) => { // intercepter la communicationentre le serveur et le navigateur pour ajouter des headers à toutes réponses pour n'importe qu'elle type de requettes (middlewear)
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next(); // poursuivre la réponse au navigateur
//    });

// app.use(formidableMiddleware());

// app.post('/api/sauces', (req, res, next) => {
//     console.log('======>', req.files, req.fields)
// });

// const server = http.createServer(app);

// app.listen(3000);


