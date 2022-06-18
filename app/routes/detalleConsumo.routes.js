module.exports = app => {
    const detalleConsumo = require("../controllers/detalleConsumodao.controller");
    var router = require("express").Router();
    router.post("/", detalleConsumo.create);
    router.put("/:id", detalleConsumo.update);
    router.delete("/:id", detalleConsumo.delete);
    router.get("/", detalleConsumo.findAll);
    router.get("/:id", detalleConsumo.findOne);
    app.use('/api/detalleConsumo', router);
};