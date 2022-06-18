module.exports = app => {
    const producto = require("../controllers/productodao.controller");
    var router = require("express").Router();
    router.post("/", producto.create);
    router.put("/:id", producto.update);
    router.delete("/:id", producto.delete);
    router.get("/", producto.findAll);
    router.get("/:id", producto.findOne);
    app.use('/api/producto', router);
};