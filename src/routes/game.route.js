'use strict';

const express = require('express');
const { gameCollection } = require('../models/index.js');

const router = express.Router();

router.get('/games', getGames);
router.get('/games/:id', getOneGames);
router.post('/games', createGames);
router.put('/games/:id', updateGames);
router.delete('/games/:id', deleteGames);

async function getGames(req, res) {
  let allGames = await gameCollection.read();
  res.status(200).json(allGames);
}

async function getOneGames(req, res) {
  const id = parseInt(req.params.id);
  let retrievedGames = await gameCollection.read(id);
  res.status(200).json(retrievedGames);
}

async function createGames(req, res) {
  let newGames = req.body;
  let savedGames = await gameCollection.create(newGames);
  res.status(200).json(savedGames);
}
// since this is only creating one record at a time, it might make more sense to use singular instead of plural function/variable names

async function updateGames(req, res) {
  const id = parseInt(req.params.id);
  const updateGamesObj = req.body;
  let updatedGames = await gameCollection.update(id, updateGamesObj);
  res.status(200).json(updatedGames);
}
// since this is only updating one record at a time, it might make more sense to use singular instead of plural function/variable names

async function deleteGames(req, res) {
  const id = parseInt(req.params.id);
  let deleteGames = await gameCollection.delete(id);
  res.status(204).json(deleteGames);
}

// since this is only deleting one record at a time, it might make more sense to use singular instead of plural function/variable names

module.exports = router;
