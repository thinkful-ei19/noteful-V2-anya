'use strict';

const express = require('express');
const knex = require('../knex');
// Create an router instance (aka "mini-app")
const router = express.Router();

//GET all folders
router.get('/folders', (req, res, next) => {
    
  knex.select('id', 'name')
    .from('folders')
    .then(folders => res.json(folders))
    .catch(err => next(err));
      
});

// GET by id
router.get('/folders/:id', (req, res, next) => {
  const folderId = req.params.id;
  
  knex.select('id', 'name')
    .from('folders')
    .where('id', folderId)
    .then(folder => res.json(folder))
    .catch(err => next(err));
});

//UPDATE folders - doens't have an endpoint
router.put('/folders/:id', (req, res, next) => {
  const name = req.body.name;
  const folderId = req.params.id;
  /***** Never trust users. Validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  
  knex('folders')
    .update({name : name})
    .where({id: folderId})
    .returning(['id', 'name'])
    .then(([item]) => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

//CREATE folder
router.post('/folders', (req, res, next) => {

  const newItem = req.body.name;
  /***** Never trust users - validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex
    .insert(newItem)
    .into('folders')
    .returning(['id', 'name'])
    .then(item => {
      if (item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      } 
    })
    .catch(err => next(err));
});

//DELETE folder
router.delete('/notes/:id', (req, res, next) => {
  const folderId = req.params.id;
    
  knex('notes')
    .where('id', folderId)
    .del()
    .catch(err => next(err));
});

module.exports = router;