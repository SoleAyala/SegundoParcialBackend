module.exports = (sequelize, Sequelize) => {
    const CategoriaProducto = sequelize.define("CategoriaProducto", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    return CategoriaProducto;
};