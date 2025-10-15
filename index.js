const express = require('express');
const axios = require('axios');
const { use } = require('react');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here

const customProperties = [
    "Name",
    "Book",
    "Game"
];

app.get('/', async (req, res) => {
    const home = 'https://api.hubapi.com/crm/v3/objects/p147025274_favorites?properties=' + customProperties.join('&properties=');
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(home, { headers });
        const data = resp.data.results;
        res.render('home', { title: 'Home | HubSpot APIs', data});      
    } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here
app.get('/update-cobj', async (req, res) => {

    const { name, book, game } = req.query;

    const newFavorite = {
    properties: {
      name,
      book,
      game
    }
  };

    const updates = `https://api.hubapi.com/crm/v3/objects/p147025274_favorites`;

    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    res.render('updates', { username: req.query.name, Book: req.query.book, Game: req.query.game, title: 'Update Favorites | HubSpot APIs' });

    try { 
        await axios.post(updates, newFavorite, { headers } );
        res.redirect('back'); //is deprecated 
    } catch(err) {
        console.error(err);
    }
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here
app.post('/update-cobj', async (req, res) => {

    const { name, book, game } = req.query;

    const newFavorite = {
    properties: {
      name,
      book,
      game
    }
  };

    const updates = `https://api.hubapi.com/crm/v3/objects/p147025274_favorites`;

    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.post(updates, newFavorite, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

    res.render('updates', { username: req.query.name, book: req.query.book, game: req.query.game, title: 'Update Favorites | HubSpot APIs' });
});



// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));