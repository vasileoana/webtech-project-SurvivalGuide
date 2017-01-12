var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Sequelize = require('sequelize');
var models = require("./models"); //ala e folderul
var sequelize = models.sequelize;

var app = new express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/app"));

var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));


//definim entitate

//metode rest 
var dangerRest = require(__dirname + "/routes/Dangers.js");
app.use(dangerRest);

var skillRest = require(__dirname + "/routes/Skills.js");
app.use(skillRest);

var sitRest = require(__dirname + "/routes/Situations.js");
app.use(sitRest);


app.get('/create', (req, res) => {
    sequelize
        .sync({
            force: true
        })
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.listen(8080);
