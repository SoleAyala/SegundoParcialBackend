module.exports = (sequelize, Sequelize) => {
    const Mesa = sequelize.define("Mesa", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        x: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        y: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        planta: {
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue : 1
        },
        capacidad: {
            type: Sequelize.BIGINT,
            allowNull: false
        }
    },{
        indexes: [
            {
                    unique: true,
                    fields: ['nombre', 'x', 'y', 'planta', 'RestauranteId']
            }
        ]
    });
    return Mesa;
};