module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Cliente", {

        id: {
            type: Sequelize.BIGINT,//tipo de dato numerico
            primaryKey: true,//es primaykey de esta tabla
            autoIncrement: true // el valor es autoincrementado
        },
        cedula: {
            type: Sequelize.STRING,// tipo string
            unique: true,// es unico
            allowNull: false// no se permite dejar vacio el campo
        },

        nombre: {
            type: Sequelize.STRING,// tipo string
            allowNull: false// no se permite dejar vacio el campo
        },

        apellido: {
            type: Sequelize.STRING,// tipo string
            allowNull: false// no se permite dejar vacio el campo
        }
    });
    return Cliente;
};