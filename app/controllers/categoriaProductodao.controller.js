const db = require("../models");
const CategoriaProducto = db.CategoriaProducto;
const Op = db.Sequelize.Op;



exports.create = (req, res) => {

    const categoriaProducto = {
        nombre: req.body.nombre
    };

    CategoriaProducto.create(categoriaProducto)
        .then(data => {
            console.log("Creado CATEGORIA PRODUCTO exitosamente con los siguientes datos: "+
                "nombre: " + categoriaProducto.nombre);
            res.send(data);
        })
        .catch(err => {
            console.log("Error al crear la CATEGORIA PRODUCTO con nombre: "+categoriaProducto.nombre+". Error: "+ err.message);
            res.status(500).send({
                message:
                    err.message || "Error al crear la CATEGORIA PRODUCTO."
            });
        });
};

//obtener una CATEGORIA PRODUCTO a partir de un id especifico
exports.findOne = (req, res) => {
    const id = req.params.id;
    CategoriaProducto.findByPk(id)
        .then(data => {
            if(data){
                console.log("Obtenido CATEGORIA PRODUCTO exitosamente con el id: "+id);
                res.send(data);
            }else{
                console.log("No encontrado la CATEGORIA PRODCUTO con id: "+id+". Error: "+ err.message);
                res.status(404).send("No encontrado");
            }
        })
        .catch(err => {
            console.log("Error al obtener la CATEGORIA PRODUCTO con id: "+id+". Error: "+ err.message);
            res.status(500).send({
                message: "Error al encontrar la CATEGORIA PRODUCTO con id=" + id
            });
        });
};


exports.findAll = (req,res) => {
    CategoriaProducto.findAll().then(data => {
        console.log("Obtenido todas las CATEGORIAS PRODUCTO exitosamente");
        res.send(data);
    }).catch(err => {
        console.log("Error al obtener todas las CATEGORIAS PRODUCTO"+". Error: "+ err.message);
        res.status(500).send({
            message: "Error al obtener todas las CATEGORIAS PRODUCTO"
        });
    });
}


exports.findByNombre = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { categoriaProducto: { [Op.iLike]: `%${nombre}%` } } : null;
    CategoriaProducto.findAll({ where: condition })
        .then(data => {
            console.log("Obtenido las CATEGORIAS PRODUCTO exitosamente con el nombre: "+nombre);
            res.send(data);
        })
        .catch(err => {
            console.log("Error al obtener las CATEGORIAS PRODUCTO con nombre: "+nombre+". Error: "+ err.message);
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las CATEGORIAS PRODUCTO."
            });
        });
};

//actualizar datos de una CATEGORIA PRODUCTO
exports.update = (req, res) => {
    const id = req.params.id;
    const categoriaProducto = {
        nombre: req.body.nombre
    }
    CategoriaProducto.update(categoriaProducto, {
        where: {
            id: id
        }
    }).then(data => {
        console.log("Actualizado CATEGORIA PRODUCTO exitosamente con los siguientes datos: "+
            "nombre: " + categoriaProducto.nombre);
        res.send(data);
    }).catch(err => {
        console.log("Error al actualizar la CATEGORIA PRODUCTO con id: "+id+". Error: "+ err.message);
        res.status(500).send({
            message: "Error al actualizar la CATEGORIA PRODUCTO con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    CategoriaProducto.destroy({
        where: {
            id: id
        }
    }).then(data => {
        console.log("Eliminado la CATEGORIA PRODUCTO exitosamente con el id: "+id);
        res.status(204).send();
    }).catch(err => {
        console.log("Error al eliminar la CATEGORIA PRODUCTO con id: "+id+". Error: "+ err.message);
        res.status(500).send("Error al eliminar la CATEGORIA PRODUCTO con id: " + id);
    });
}

