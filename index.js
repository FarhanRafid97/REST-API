const { urlencoded } = require('express');
const express = require('express');
const app = express();
const dataGames = require('./dataGames.js');

const port = 8009;
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.get('/api/data-games', (req, res) => {
  try {
    res.status(200).json(dataGames);
  } catch (error) {
    console.log(error);
  }
});
app.get('/api/data-games/:id', (req, res) => {
  const { id } = req.params;
  const dataGame = dataGames.find((data) => data.id === Number(id));

  res.status(200).json(dataGame);
});
app.post('/api/data-games', (req, res) => {
  const { nameGame, genre, player, isOnline } = req.body;

  const lastId = dataGames[dataGames.length - 1].id;
  const id = lastId + 1;

  const dataBaru = { id, nameGame, genre, player, isOnline };
  dataGames.push(dataBaru);
  res.status(201).json(dataBaru);
});
app.put('/api/data-games/:id', (req, res) => {
  const { nameGame, genre, player, isOnline } = req.body;

  const indexOf = dataGames.findIndex((i) => i.id === Number(req.params.id));

  dataGames[indexOf] = {
    id: Number(req.params.id),
    nameGame,
    genre,
    player,
    isOnline,
  };
  res.status(200).json(dataGames[indexOf]);
});
app.delete('/api/data-games/:id', (req, res) => {
  const indexOf = dataGames.findIndex((i) => i.id === Number(req.params.id));
  dataGames.splice(indexOf, 1);
  res.status(200).json(`artikel Id ${req.params.id} telah di hapus`);
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
