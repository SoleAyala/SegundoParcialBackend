const cabeceraConsumo = require("../controllers/cabeceraConsumodao.controller");
module.exports = app => {
    const cabeceraConsumo = require("../controllers/cabeceraConsumodao.controller");
    var router = require("express").Router();
    router.post("/", cabeceraConsumo.create);
    router.put("/:id", cabeceraConsumo.update);
    router.delete("/:id", cabeceraConsumo.delete);
    router.get("/", cabeceraConsumo.findAll);
    router.get("/:id", cabeceraConsumo.findOne);
    //router.get("/ActualizarTotal/:id", cabeceraConsumo.ActualizarTotal);
    router.post("/ActualizarTotal/:id", cabeceraConsumo.ActualizarTotal);

    //router.put("/cerrar/:id", cabeceraConsumo.cerrar);
    router.post("/cerrar/:id", cabeceraConsumo.cerrar);

    router.get("/getCabeceraConsumoByReservaId/:id", cabeceraConsumo.getCabeceraConsumoByReservaId);

    app.use('/api/cabeceraConsumo', router);
};