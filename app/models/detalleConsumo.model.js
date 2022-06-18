module.exports = (sequelize, Sequelize) => {
    const DetalleConsumo = sequelize.define("DetalleConsumo", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        cantidad: {
            type: Sequelize.BIGINT,
            allowNull: false
        }
    });
    return DetalleConsumo;
};

