'use strict'
var models = require("../models");
var express = require("express");
var router = express.Router();

var Danger = models.names[0];
var Situation = models.names[1];
var Skill = models.names[2];


Skill.hasMany(Situation, {
    foreignKey: 'skillId'
})

Situation.belongsTo(Skill, {
    foreignKey: 'skillId'
})


Danger.hasMany(Situation, {
    foreignKey: 'dangerId'
})
Situation.belongsTo(Danger, {
    foreignKey: 'dangerId'
})

router.post('/situations', function(request, response) {
    Situation.create(request.body).then(function(situation) {
        Situation.findById(situation.id).then(function(situation) {
            response.status(201).send(situation);
        });
    });

});

router.get('/situations', function(request, response) {
    Situation.findAll().then(function(situations) {
        response.status(200).send(situations);
    });

});

router.get('/situations/:id', function(request, response) {
    Situation.findById(request.params.id).then(function(situation) {
        if (situation) {
            response.status(200).send(situation);
        }
        else {
            response.status(404).send();
        }
    });

});


router.get('/Situations/:id/Skills', (req, res) => {
    Situation
        .findAll({
            where: {
                dangerId: req.params.id
            },
            include: [Danger, Skill]
        })
        .then((Skills) => {
            res.status(201).send(Skills);
        })
});

//adaugat
router.post('/Situations/:id/Skills', (req, res) => {
    Situation
        .find({
            where: {
                dangerId: req.params.id
            }
        })
        .then((situation) => {
            var skill = req.body
            Skill.find({
                    where: {
                        name: skill.name
                    }
                })
                .then(function(skillFound) {
                    var newsit = {}
                    newsit.dangerId = req.params.id;
                    if (skillFound) {
                        // skill exists
                        newsit.skillId = skillFound.id;
                        return Situation.create(newsit)
                    }
                    else {
                        //to avoid to insert the same id of the skill
                        var newSkill = {};
                        newSkill.name = skill.name;
                        newSkill.instruction = skill.instruction;
                        Skill.create(newSkill).then(function(skill) {
                            Skill.findById(skill.id).then(function(skill) {
                                newsit.skillId = skill.id;
                                return Situation.create(newsit)

                            });
                        });
                    }
                })
        })
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })

})

router.put('/situations/:id', function(request, response) {
    Situation
        .findById(request.params.id)
        .then(function(situation) {
            if (situation) {
                situation
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

router.put('/Situations/:id/Skills', (req, res) => {
    Situation
    //cautam pentru a fi siguri ca exista aceasta situatie cu dangerId specific si skillId
        .find({
            where: {
                dangerId: req.params.id,
                skillId: req.body.skillId
            }
        })
        .then((situation) => {
            //odata gasit modificam special acel skill
            Skill
            .find({
                where: {
                    id : situation.skillId
                }
            }).then((skill) => {
                skill.name = req.body.Skill.name;
                skill.instruction = req.body.Skill.instruction;
                return skill.save();
            })
        })
        .then(() => {
            res.status(201).send('modified')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })

});

router.delete('/situations/:id', function(request, response) {
    Situation
        .findById(request.params.id)
        .then(function(situation) {
            if (situation) {
                situation.destroy().then(function() {
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
