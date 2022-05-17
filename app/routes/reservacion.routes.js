const reservacion = require("../controllers/reservaciondao.controller");
const mesa = require("../controllers/mesadao.controller");
module.exports = app => {
    var router = require("express").Router();
    router.post("/", reservacion.create);
    router.put("/:id", reservacion.update);
    router.delete("/:id", reservacion.delete);
    router.get("/:id", reservacion.findOne);
    router.get("/", reservacion.findAll);
    router.post("/filter", reservacion.filter);
    app.use('/api/reservacion', router);
};