var models = require("../models");
var express = require("express");
var router = express.Router();


var Danger = models.names[0];


router.post('/dangers', function(request, response) {
    Danger.create(request.body).then(function(danger) {
        Danger.findById(danger.id).then(function(danger) {
            response.status(201).send(danger);
        });
    });

});

router.get('/dangers', function(request, response) {
    Danger.findAll().then(function(dangers) {
        response.status(200).send(dangers);
    });

});

router.get('/dangers/:id', function(request, response) {
    Danger.findById(request.params.id).then(function(danger) {
        if (danger) {
            response.status(200).send(danger);
        }
        else {
            response.status(404).send();
        }
    });

});

router.put('/dangers/:id', function(request, response) {
    Danger
        .findById(request.params.id)
        .then(function(danger) {
            if (danger) {
                danger
                    .updateAttributes(request.body)
                    .then(function() {
                        response.status(200).send('updated');
                    })
                    .catch(function(error) {
                        console.warn(error);
                        response.status(500).send('server error');
                    });

            }
            else {
                response.status(400).send();
            }
        });

});

router.delete('/dangers/:id', function(request, response) {
    Danger
        .findById(request.params.id)
        .then(function(danger) {
            if (danger) {
                danger.destroy().then(function() {
                        response.status(200).send('deleted');
                    })
                    .catch(function(error) {
                        console.warn(error);
                        response.status(500).send('server error');
                    });
            }
            else {
                response.status(404).send('nu exista');
            }
        });

})

module.exports = router;
