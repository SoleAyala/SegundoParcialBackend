module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Cliente", {

        id: {
            type: Sequelize.BIGINT,//tipo de dato numerico
            primaryKey: true,//es primaykey de esta tabla
            autoIncrement: true // el valor es autoincrementado
        },
        cedula: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true //no permite cadenas vacias
            }
        },

        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        apellido: {
            type: Sequelize.STRING,// tipo string
            allowNull: false,// no se permite dejar vacio el campo
            validate: {
                notEmpty: true
            }
        }
    });
    return Cliente;
};