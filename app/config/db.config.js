module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "postgres", //cambiar
    DB: "bdpwb-p2", //crear db
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
