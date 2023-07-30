'use strict';

const express = require('express');
const { movieCollection, gameCollection } = require('../models/index.js');

const router = express.Router();

router.get('/movies', getMovies);
router.get('/movies/:id', getOneMovies);
router.post('/movies', createMovies);
router.put('/movies/:id', updateMovies);
router.delete('/movies/:id', deleteMovies);

async function getMovies(req, res) {
  let allMovies = await movieCollection.read(null, {
    include: { model: gameCollection.model },
  });

  res.status(200).json(allMovies);
}

async function getOneMovies(req, res) {
  const id = parseInt(req.params.id);
  let retrievedMovies = await movieCollection.read(id, {
    include: { model: gameCollection.model },
  });
  const games = await retrievedMovies.getGames();
  console.log(games);
  res.status(200).json(retrievedMovies);
}

async function createMovies(req, res) {
  let newMovies = req.body;
  let savedMovies = await movieCollection.create(newMovies);
  res.status(200).json(savedMovies);
}
// since this is only changing one record at a time, it might make more sense to use singular instead of plural function/variable names
async function updateMovies(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let updateMovies = await movieCollection.update(id, obj);
  res.status(200).json(updateMovies);
}
// since this is only changing one record at a time, it might make more sense to use singular instead of plural function/variable names
async function deleteMovies(req, res) {
  const id = parseInt(req.params.id);
  let deleteMovies = await movieCollection.delete(id);
  res.status(204).json(deleteMovies);
}
// since this is only changing one record at a time, it might make more sense to use singular instead of plural function/variable names
module.exports = router;
