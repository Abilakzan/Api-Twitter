
/*

var Twit = require('twit')
 
var T = new Twit({
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})
 

//  search twitter for all tweets containing the word 'banana' since July 11, 2011

T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
  console.log(data)
})

/////////////////////////////////////////////////////////
*/

import express from "express";
import Twit from "twit";

// Configurez une nouvelle instance de Twit avec les clés d'API et les tokens d'accès
const T = new Twit({
  consumer_key: '...',
  consumer_secret: '...',
  access_token: '...',
  access_token_secret: '...',
});

// Configurez une nouvelle instance d'application Express
const app = express();
const port = 3000;

// Définissez une route pour effectuer une recherche sur Twitter en fonction d'un mot-clé
app.get("/search", async (req, res) => {
  try {
    // Récupérez le mot-clé à partir de la requête
    const keyword = req.query.q;
  
    // Effectuez une requête à l'API Twitter pour effectuer une recherche en fonction du mot-clé
    const tweets = await T.get('search/tweets', { q: keyword, count: 20 });
  
    // Renvoyez les tweets récupérés à l'utilisateur
    res.json(tweets.data);
  } catch (err) {
    // Gérez les erreurs potentielles
    res.status(500).json({ message: "Error searching for tweets" });
  }
});

// Définissez une route pour récupérer les informations sur un utilisateur Twitter
app.get("/users/:user_id", async (req, res) => {
  try {
    // Récupérez l'ID de l'utilisateur à partir de la requête
    const userId = req.params.user_id;
  
    // Effectuez une requête à l'API Twitter pour récupérer les informations sur l'utilisateur
    const user = await T.get("users/show", { user_id: userId });
  
    // Renvoyez les informations sur l'utilisateur à l'utilisateur
    res.json(user.data);
  } catch (err) {
    // Gérez les erreurs potentielles
    res.status(500).json({ message: "Error retrieving user information" });
  }
});

// Démarrez l'application en écoutant les requêtes sur le port spécifié
app.listen(port, () => {
  console.log(`Twitter API listening at http://localhost:${port}`);
});
