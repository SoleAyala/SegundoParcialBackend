const reservacion = require("../controllers/reservaciondao.controller");
module.exports = app => {
    var router = require("express").Router();
    router.post("/", reservacion.create);
    router.get("/:id", reservacion.findOne);
    router.get("/:id", reservacion.delete);
    app.use('/api/restaurantes', router);
};