module.exports = app => {

    const cliente = require("../controllers/clientedao.controller.js");
    var router = require("express").Router();
    router.post("/", cliente.create);
    router.get("/", cliente.findAll);
    router.get("/", cliente.findbycedula);
    router.get("/:id", cliente.findOne);
    app.use('/api/venta', router);

};