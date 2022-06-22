const detalleConsumo = require("../controllers/detalleConsumodao.controller");
module.exports = app => {
    const detalleConsumo = require("../controllers/detalleConsumodao.controller");
    var router = require("express").Router();
    router.post("/", detalleConsumo.create);
    router.put("/:id", detalleConsumo.update);
    router.delete("/:id", detalleConsumo.delete);
    router.get("/", detalleConsumo.findAll);
    router.get("/:id", detalleConsumo.findOne);
    router.get("/getByCabeceraConsumoId/:id", detalleConsumo.getDetallesDeConsumoByIdCabecera);

    app.use('/api/detalleConsumo', router);
};