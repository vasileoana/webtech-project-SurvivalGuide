module.exports = function(sequelize, Sequelize) {

    var Skill = sequelize.define('Skills', {

        name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        instruction: {
            type: Sequelize.STRING,
            field: 'instruction'
        }

    }, {
        timestamps: false
    });
    return Skill;
}
