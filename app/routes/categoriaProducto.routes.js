module.exports = app => {
    const categoriaProducto = require("../controllers/categoriaProductodao.controller");
    var router = require("express").Router();
    router.post("/", categoriaProducto.create);
    router.put("/:id", categoriaProducto.update);
    router.delete("/:id", categoriaProducto.delete);
    router.get("/", categoriaProducto.findAll);
    router.get("/:id", categoriaProducto.findOne);
    app.use('/api/categoriaProducto', router);
};