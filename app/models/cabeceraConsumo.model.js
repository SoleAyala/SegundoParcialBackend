module.exports = (sequelize, Sequelize) => {
    const CabeceraConsumo = sequelize.define("CabeceraConsumo", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        estado: {
            type: Sequelize.STRING,
            allowNull: false
        },
        total: {
            type: Sequelize.BIGINT,
            defaultValue:0,
            allowNull: false
        },
        fechaCreacion: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        fechaCierre: {
            type: Sequelize.DATEONLY,
        },
        horaCreacion: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        horaCierre: {
            type: Sequelize.BIGINT
        }
    });
    return CabeceraConsumo;
};

