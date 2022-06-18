module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("Producto", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        precio: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
    },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['nombre', 'precio', 'CategoriaProductoId']
                }
            ]
        });
    return Producto;
};