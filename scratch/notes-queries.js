'use strict';
const knex = require('../knex');

knex.select(1).then(res => console.log(res));

// const express = require('express');

// const router = express.Router();

// knex.select('id', 'title', 'content')
//   .from('notes')
//   .where ('title', 'like', '%cats%')
//   .then(results => {
//     console.log(results);
//   });

//   knex('notes')
// .where({'id': 1001})
//   .del()
//   .then(results => console.log(results));

// knex('notes')
//   .where({id: '1004'})
//   .del()
//   .then(results => console.log(results))
//   .catch(err => console.log(err));

// knex.select('id', 'name')
//   .from('folders')
//   .then(folders => console.log(folders));

// knex.select('id', 'name')
//   .from('folders')
//   .where('id', 101)
//   .then(item => console.log(item))
//   .catch(err => console.error(err));

// knex('folders')
//   .update({name : 'new Name'})
//   .where({id: '100'})
//   .returning(['id', 'name'])
//   .then(([item]) => {
//     if (item) {
//       console.log(item);
//     } else {
//       console.log('next');
//     }
//   });

// knex
//   .insert({name: 'new Folder'})
//   .into('folders')
//   .returning(['id', 'name'])
//   .then(item => console.log(item));

// knex('folders')
//   .where({id : '106'})
//   .del()
//   .then(item => console.log(item));

// knex.select('id', 'name')
//   .from('tags')
//   .where({'id': 3})
//   .then( result => {
//     if (result) {
//       console.log(result);
//     } else {
//       console.log('next');
//     }
//   });

// knex.insert({'name': 'new Insert'})
//   .into('tags')
//   .returning (['id', 'name'])
//   .then(([result]) => {
//     if (result) {
//       console.log(result);
//     } else {
//       console.log('next');
//     }
//   });

// knex.del()
//   .where('id', 5)
//   .from('tags')
//   .then( result => {
//     if (result) {
//       console.log(result);
//     } else {
//       console.log('next');
//     }
//   });