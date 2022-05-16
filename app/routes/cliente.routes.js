module.exports = app => {
    const cliente = require("../controllers/clientedao.controller.js");
    var router = require("express").Router();
    router.post("/", cliente.create);
    router.put("/:id",cliente.update);
    router.delete("/:id",cliente.delete);
    router.get("/:id", cliente.findOne);
    router.get("/", cliente.findAll);
    //router.get("/cedula", cliente.findByCedula);
    //router.get("/consultaConNombre", cliente.findByNombre);
    app.use('/api/cliente', router);

};