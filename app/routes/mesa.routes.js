const mesa = require("../controllers/mesadao.controller");
module.exports = app => {
    var router = require("express").Router();
    router.post("/", mesa.create);
    router.get("/", mesa.findAll);
    router.get("/:id", mesa.findOne);
    router.get("/:id", mesa.delete);
    app.use('/api/restaurantes', router);
};