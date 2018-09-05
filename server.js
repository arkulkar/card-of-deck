/**
 * Created by aksha on 05-09-2018.
 */
var express = require('express')
    , app = express()
    , controller = require('./deck');

app.listen(3000);
console.log("server running on port 3000");

controller.implementDeckofCards();
