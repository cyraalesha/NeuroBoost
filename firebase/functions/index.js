const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const card_list = require('./data').data;

const port = 9000;

app.get('/test', (req, res) => {
  res.send('Testing successful');
});

app.get('/game/:difficulty', (req, res) => {
  console.log('here');
  let {difficulty} = req.params;
  shuffle(card_list);
  let data = card_list.slice(0, difficulty);
  data = [...data, ...data];
  shuffle(data);
  res.json({cards: data});
});

//util functions
const shuffle = (arr_list) => {
  for (let i = arr_list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i + 1);
    [arr_list[i], arr_list[j]] = [arr_list[j], arr_list[i]];
  }
};

exports.app = functions.https.onRequest(app);
