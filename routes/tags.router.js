'use strict';

const express = require('express');
const knex = require('../knex');
// Create an router instance (aka "mini-app")
const router = express.Router();

router.get('/tags', (req, res, next) => {
  knex.select('id', 'name')
    .from('tags')
    .then(results => {
      res.json(results);
    })
    .catch(next);
});

router.get('/tags/:id', (req, res, next) => {

  const tagId = req.params.id;

  knex.select('id', 'name')
    .from('tags')
    .where({'id': tagId})
    .then( result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(next);
});

router.post('/tags', (req, res, next) => {
  const name = req.body.name;

  /***** Never trust users. Validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex.insert({'name': name})
    .into('tags')
    .returning (['id', 'name'])
    .then(([result]) => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(next);
});

router.put('/tags/:id', (req, res, next) => {

  const name = req.body.name;
  const tagId = req.params.id;
  
  /***** Never trust users. Validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  
  knex('tags')
    .update({'name': name})
    .where({'id': tagId})
    .returning(['id', 'name'])
    .then(([result]) => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(next);
});

router.delete('/tags/:id', (req, res, next) => {
  knex.del()
    .where('id', req.params.id)
    .from('tags')
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        next();
      }
    })
    .catch(next);
});

module.exports = router;