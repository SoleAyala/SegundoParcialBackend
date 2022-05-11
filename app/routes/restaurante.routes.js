module.exports = app => {
    const restaurante = require("../controllers/restaurantedao.controller");
    var router = require("express").Router();
    router.post("/", restaurante.create);
    router.get("/", restaurante.findAll);
    router.get("/:id", restaurante.findOne);
    app.use('/api/restaurantes', router);
};