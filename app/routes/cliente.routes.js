const cliente = require("../controllers/clientedao.controller.js");
module.exports = app => {

    const cliente = require("../controllers/clientedao.controller.js");
    var router = require("express").Router();
    router.post("/", cliente.create);
    router.put("/",cliente.update);
    router.delete("/:id",cliente.delete);
    router.get("/:id", cliente.findOne);
    router.get("/", cliente.findAll);
    router.get("/consulta", cliente.findByCedula);
    router.get("/consulta", cliente.findByNombre);
    //router.put("/:id",cliente.update);
    app.use('/api/cliente', router);

};