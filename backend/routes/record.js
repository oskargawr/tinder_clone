const express = require("express");
const recordRoutes = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

recordRoutes.route('/test').get((req, res) => {
    res.send('hello');
});

module.exports = recordRoutes;