var models = require("../models");
var express = require("express");
var router = express.Router();


var Skill = models.names[2];


router.post('/skills', function(request, response) {
    Skill.create(request.body).then(function(skill) {
        Skill.findById(skill.id).then(function(skill) {
            response.status(201).send(skill);
        });
    });

});

router.get('/skills', function(request, response) {
    Skill.findAll().then(function(skills) {
        response.status(200).send(skills);
    });

});

router.get('/skills/:id', function(request, response) {
    Skill.findById(request.params.id).then(function(skill) {
        if (skill) {
            response.status(200).send(skill);
        }
        else {
            response.status(404).send();
        }
    });

});

router.put('/skills/:id', function(request, response) {
    Skill
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

router.delete('/skills/:id', function(request, response) {
    Skill
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
