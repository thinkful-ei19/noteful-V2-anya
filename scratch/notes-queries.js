'use strict';
const knex = require('../knex');

knex.select(1).then(res => console.log(res));

// const express = require('express');

// const router = express.Router();

knex.select('id', 'title', 'content')
  .from('notes')
  .where ('title', 'like', '%cats%')
  .then(results => {
    console.log(results);
  });

//   knex('notes')
// .where({'id': 1001})
//   .del()
//   .then(results => console.log(results));

// knex('notes')
//   .where({id: '1004'})
//   .del()
//   .then(results => console.log(results))
//   .catch(err => console.log(err));