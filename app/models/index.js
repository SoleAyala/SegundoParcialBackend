//relaciones
//https://sequelize.org/api/v6/class/src/associations/base.js~association

//clave foranea no nula
//https://github.com/sequelize/sequelize/issues/2837


const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Cliente = require("./cliente.model.js")(sequelize, Sequelize);
db.Restaurante = require("./restaurante.model.js")(sequelize, Sequelize);
db.Mesa = require("./mesa.model.js")(sequelize, Sequelize);
db.Reservacion = require("./reservacion.model")(sequelize, Sequelize);
db.Producto = require("./producto.model")(sequelize, Sequelize);
db.CategoriaProducto = require("./categoriaProducto.model")(sequelize, Sequelize);
db.CabeceraConsumo = require("./cabeceraConsumo.model")(sequelize, Sequelize);
db.DetalleConsumo = require("./detalleConsumo.model")(sequelize, Sequelize);

// CABECERA CONSUMO, MESA Y CLIENTE

db.Mesa.hasMany(db.CabeceraConsumo, {
    foreignKey: {
        name:'MesaId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.CabeceraConsumo.belongsTo(db.Mesa);


db.Cliente.hasMany(db.CabeceraConsumo, {
    foreignKey: {
        name:'ClienteId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.CabeceraConsumo.belongsTo(db.Cliente);


// DETALLE CONSUMO Y PRODUCTO

db.Producto.hasMany(db.DetalleConsumo, {
    foreignKey: {
        name:'ProductoId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.Producto.belongsTo(db.Producto);


// CABECERA CONSUMO Y DETALLE CONSUMO

db.CabeceraConsumo.hasMany(db.DetalleConsumo, {
    foreignKey: {
        name:'CabeceraConsumoId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.DetalleConsumo.belongsTo(db.CabeceraConsumo);


// CATEGORIA PRODUCTO Y PRODUCTO

db.CategoriaProducto.hasMany(db.Producto, {
    foreignKey: {
        name:'CategoriaProductoId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.Producto.belongsTo(db.CategoriaProducto);


// DEFINIDOS EN LA SEGUNDA PARCIAL LO RESTANTE:

db.Restaurante.hasMany(db.Mesa, {
    foreignKey: {
        name:'RestauranteId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.Mesa.belongsTo(db.Restaurante);


db.Restaurante.hasMany(db.Reservacion,{
    foreignKey: {
        name:'RestauranteId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.Reservacion.belongsTo(db.Restaurante);


db.Mesa.hasMany(db.Reservacion, {
    foreignKey: {
        name:'MesaId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.Reservacion.belongsTo(db.Mesa);


db.Cliente.hasMany(db.Reservacion, {
    foreignKey: {
        name:'ClienteId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.Reservacion.belongsTo(db.Cliente);




module.exports = db;
