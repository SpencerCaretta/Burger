//Dependencies 
var express = require("express");
var burger = require("../models/burger.js");
var router = express.Router();

//Routes
//All Burgers
router.get("/", function(req, res) {
    burger.all(function(data) {
        var bObject = {
            burgers: data
        };
        console.log(bObject);
        res.render("index", bObject);

    });
});
//Post Route
router.post("/api/burgers", function(req, res) {
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

//Update Route (PUT)
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        res.status(200).end();
    });
});


module.exports = router;