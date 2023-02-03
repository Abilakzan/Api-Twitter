"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const twit_1 = __importDefault(require("twit"));
// Configurez une nouvelle instance de Twit avec les clés d'API et les tokens d'accès
const T = new twit_1.default({
    consumer_key: 'qMPGzCy5C7seQKYReGxl30IQs',
    consumer_secret: 'wCNCuzXbNqISkmlNlS8dPrX0YKYTso1AAaxiDyU4q6VO7dgeiA',
    access_token: '1275000187-x0C0EiWow65zr2EbgeFyVzk0G6hlx7c7bGzRjpO',
    access_token_secret: 'MvHvIkYU4iCtD2kL4QgXYK6C0k4Y3PxGLHWc96X3DdwHo',
});
// Configurez une nouvelle instance d'application Express
const app = (0, express_1.default)();
const port = 3000;
// Définissez une route pour effectuer une recherche sur Twitter en fonction d'un mot-clé
app.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Récupérez le mot-clé à partir de la requête
        const keyword = req.query.q;
        // Effectuez une requête à l'API Twitter pour effectuer une recherche en fonction du mot-clé
        const tweets = yield T.get('search/tweets', { q: keyword, count: 20 });
        // Renvoyez les tweets récupérés à l'utilisateur
        res.json(tweets.data);
    }
    catch (err) {
        // Gérez les erreurs potentielles
        res.status(500).json({ message: "Error searching for tweets" });
    }
}));
// Définissez une route pour récupérer les informations sur un utilisateur Twitter
app.get("/users/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Récupérez l'ID de l'utilisateur à partir de la requête
        const userId = req.params.user_id;
        // Effectuez une requête à l'API Twitter pour récupérer les informations sur l'utilisateur
        const user = yield T.get("users/show", { user_id: userId });
        // Renvoyez les informations sur l'utilisateur à l'utilisateur
        res.json(user.data);
    }
    catch (err) {
        // Gérez les erreurs potentielles
        res.status(500).json({ message: "Error retrieving user information" });
    }
}));
// Démarrez l'application en écoutant les requêtes sur le port spécifié
app.listen(port, () => {
    console.log(`Twitter API listening at http://localhost:${port}`);
});
