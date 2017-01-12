module.exports = function(sequelize, Sequelize) {

    var Situation = sequelize.define('Situations', {
        
    }, {
        timestamps: false
    });
    
    return Situation;
}
