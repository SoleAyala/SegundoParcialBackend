const mesa = require("../controllers/mesadao.controller");
const restaurante = require("../controllers/restaurantedao.controller");
const cliente = require("../controllers/clientedao.controller.js");
module.exports = app => {
    const restaurante = require("../controllers/restaurantedao.controller");
    var router = require("express").Router();
    router.post("/", restaurante.create);
    router.put("/:id", restaurante.update);
    router.delete("/:id", restaurante.delete);
    router.get("/", restaurante.findAll);
    router.get("/:id", restaurante.findOne);
    router.get("/consulta", restaurante.findByNombre);

    app.use('/api/restaurante', router);
};