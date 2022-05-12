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
module.exports = db;
