// This script populates the ecommerce store database with sample data.

// Adapted from 'populatedb.js' from mdn web docs: 
// https://raw.githubusercontent.com/mdn/express-locallibrary-tutorial/main/populatedb.js


// READING LIST:

// Server side form validation: https://medium.com/swlh/mapping-and-displaying-server-side-errors-with-formik-in-react-bbe7ae696895
// Async await crash course: https://medium.com/technofunnel/javascript-async-await-c83b15950a71
// Image upload and retrival: https://medium.com/@sahni_hargun/creating-a-node-api-to-upload-and-retrieve-images-from-mongodb-ba5053c98420


// const path = process.argv.slice(2)[0];  // Get db path

import * as dotenv from 'dotenv';
dotenv.config();

// Use global connection instance
import dbConnect from '../ecommerce-project/lib/mongoose.js';

import async from 'async';
import { Item, User, Cat, Filter } from './Models/index.js';

import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

function handleError(err) {
  console.error(err);
}

async function main() {
  try {
    await dbConnect();
    console.log(`MainFunc (Readystate: ${mongoose.connection.readyState})`);
    console.log('Global in main functions:');
    console.log(global.mongoose);
  } catch (err) {
    handleError(`Caught error: ${err}`);
}};
main();

const items = [];
const users = [];
const cats = [];
const filters = [];



// cb:
// async docs specifies functions warpped inside async.series/parallel
// must be supplied with a callback(), and invoked promise is fulfilled

async function createUser(username, password, clearance, cb) {
  let userDetails = {
    userName: username,
    passWord: password,
    clearance: clearance
  }

  try {
    const newUser = await User.create(userDetails);
    
    users.push(newUser);
    cb(null, newUser);             //// !!!!
  } catch (err) {
    handleError(err);
  }
}

async function createItems(itemtype, price, images, description, stock) {
  let itemDetails = {
    itemType: itemtype,
    price: price,
    images: images,
    description: description,
    stock: stock
    }

  try {
    const newItem = await Item.create(itemDetails);

    console.log(`New item added: ${newItem}`);
    items.push(newItem);
  } catch (err) {
    handleError(err);
  }
}

async function createCats(category, cb) {
  let catDetails = {
    category: category
  }

  try {
    const newCat = await Cat.create(catDetails);

    cats.push(newCat);
    cb(null, newCat);
  } catch (err) {
    handleError(err);
  }
}

async function createFilters(filter, cb) {
  let filterDetails = {
    filter: filter
  }

  try {
    const newFilter = await Filter.create(filterDetails);

    filters.push(newFilter);
    cb(null, newFilter);
  } catch (err) {
    handleError(err);
  }
}

// add an admin user
async function populateUsers(cb) {
  try {
    let populatedResults = await async.parallel([
      // supplying a callback to functions inside .parallel([])
      function (cb) {
        createUser('admin', 'admin', 2, cb);
      }
    ])
    cb(null, populatedResults);
    console.log(`Finished creating users: ${populatedResults}`);
  } catch (err) {
    handleError(err);
  }
}

// add sample items 
async function populateItems(cb) {
  try {
    let populatedResults = await async.parallel([
      function (cb) {
        throw error;  // PLACEHOLDER WHILE ITEM SCHEMA IS BEING WORKED ON
      },
    ])
    cb(null, populatedResults);
    console.log(`Finished creating filters: ${populatedResults}`);
  } catch (err) {
    console.log('populateItems caught error!');
    cb(err, null);
  }
}

// add three filtering methods
async function populateFilters(cb) {
  try {
    let populatedResults = await async.parallel([
      function (cb) {
        createFilters('人氣', cb);
      },
      function (cb) {
        createFilters('價格 (由低至高)', cb);
      },
      function (cb) {
        createFilters('價格 (由高至低)', cb);
      }
    ])
    cb(null, populatedResults);
    console.log(`Finished creating filters: ${populatedResults}`);
  } catch (err) {
    handleError(err);
  }
}

// add item categories
async function populateCats(cb) {
  try {
    let populatedResults = await async.parallel([
      function (cb) {
        createCats('Shoes', cb);
      },
      function (cb) {
        createCats('Accessories', cb);
      },
      function (cb) {
        createCats('Hats', cb);
      },
      function (cb) {
        createCats('Jeans', cb);
      },
      function (cb) {
        createCats('Shirts', cb);
      },
    ])
    console.log(`Finished creating categories: ${populatedResults}`);
    cb(null, populatedResults);
  } catch (err) {
    handleError(err);
  }
}

async function populate() {
  try {
    let results = await async.series([
      function(cb) {
        populateUsers(cb);
      },
      function(cb) {
        populateCats(cb);
      },
      function(cb) {
        populateItems(cb);
      },
      function(cb) {
        populateFilters(cb);
      }
    ]);
    console.log(`populate function result: ${results}`);
    mongoose.connection.close();
  } catch (err) {
    console.log(`populate caught error!`);
    mongoose.connection.close();
  }
  return;
}

populate();