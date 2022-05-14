//id, id de restaurante, id de mesa, fecha, rango de hora, id de cliente, cantidad solicitada
module.exports = (sequelize, Sequelize) => {
    const Reservacion = sequelize.define("Reservacion", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull : false
        },
        horaInicio: {
            type: Sequelize.INTEGER,
            allowNull : false
        },
        horaFin: {
            type: Sequelize.INTEGER,
            allowNull : false
        }

    });
};