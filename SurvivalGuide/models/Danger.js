module.exports = function(sequelize, Sequelize) {

var Danger = sequelize.define('Dangers', {
    name: {
        type: Sequelize.STRING,
        field: 'name'
        
    },
      description: {
        type: Sequelize.STRING,
        field: 'description',
        validate: {
            len: [5, 1000]
        }
    },
     url: {
        type: Sequelize.STRING,
        field: 'url'
    }
}, {
    timestamps: false,
    tableName: 'Dangers'
});

return Danger;
};