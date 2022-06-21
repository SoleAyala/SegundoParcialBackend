const reservacion = require("../controllers/reservaciondao.controller");
const mesa = require("../controllers/mesadao.controller");
module.exports = app => {
    var router = require("express").Router();
    router.post("/", reservacion.create);
    router.put("/:id", reservacion.update);
    router.delete("/:id", reservacion.delete);
    router.post("/filter", reservacion.filterReservaciones);
    router.post("/libres", reservacion.mesasLibres);
    router.post("/ocupadas", reservacion.mesasOcupadas);
    router.get("/:id", reservacion.findOne);
    //router.get("/", reservacion.findAll);
    router.post("/lista", reservacion.listaReservaciones);
    router.post("/libreOno/:id", reservacion.mesaLIBRE);
    app.use('/api/reservacion', router);
};