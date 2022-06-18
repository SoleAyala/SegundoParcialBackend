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
        fechaHoraCreacion: {
            type: Sequelize.DATE,
            allowNull: false
        },
        fechaHoraCierre: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    return CabeceraConsumo;
};

