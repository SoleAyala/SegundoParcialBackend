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
        pocision: {
            type: Sequelize.STRING,
            allowNull: false
        },
        planta: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue : 1
        },
        capacidad: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Mesa;
};