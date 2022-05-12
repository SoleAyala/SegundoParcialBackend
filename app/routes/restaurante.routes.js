const mesa = require("../controllers/mesadao.controller");
module.exports = app => {
    const restaurante = require("../controllers/restaurantedao.controller");
    var router = require("express").Router();
    router.post("/", restaurante.create);
    router.get("/", restaurante.findAll);
    router.get("/:id", restaurante.findOne);
    router.get("/:id", restaurante.delete);
    router.get("/:id", restaurante.update);
    app.use('/api/restaurantes', router);
};