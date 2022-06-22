const db = require("../models");
const Producto = db.Producto;
const Op = db.Sequelize.Op;



exports.create = (req, res) => {

    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        CategoriaProductoId: req.body.CategoriaProductoId
    };

    Producto.create(producto)
        .then(data => {
            console.log("Creado PRODUCTO exitosamente con los siguientes datos: "+
                "nombre: " + producto.nombre + " precio: " + producto.precio);
            res.send(data);
        })
        .catch(err => {
            console.log("Error al crear el PRODUCTO con nombre: "+producto.nombre+". Error: "+ err.message);
            res.status(500).send({
                message:
                    err.message || "Error al crear el PRODUCTO."
            });
        });
};

//obtener un PRODUCTO a partir de un id especifico
exports.findOne = (req, res) => {
    const id = req.params.id;
    Producto.findByPk(id)
        .then(data => {
            if(data){
                console.log("Obtenido el PRODUCTO exitosamente con el id: "+id);
                res.send(data);
            }else{
                console.log("No encontrado el PRODCUTO con id: "+id+". Error: "+ err.message);
                res.status(404).send("No encontrado");
            }
        })
        .catch(err => {
            console.log("Error al obtener el PRODUCTO con id: "+id+". Error: "+ err.message);
            res.status(500).send({
                message: "Error al encontrar el PRODUCTO con id=" + id
            });
        });
};


exports.findAll = (req,res) => {
    Producto.findAll().then(data => {
        console.log("Obtenido todos los PRODUCTOS exitosamente");
        res.send(data);
    }).catch(err => {
        console.log("Error al obtener todos los PRODUCTOS"+". Error: "+ err.message);
        res.status(500).send({
            message: "Error al obtener todos los PRODUCTOS"
        });
    });
}


exports.findByNombre = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { producto: { [Op.iLike]: `%${nombre}%` } } : null;
    Producto.findAll({ where: condition })
        .then(data => {
            console.log("Obtenido los PRODUCTOS exitosamente con el nombre: "+nombre);
            res.send(data);
        })
        .catch(err => {
            console.log("Error al obtener los PRODUCTOS con nombre: "+nombre+". Error: "+ err.message);
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los PRODUCTOS."
            });
        });
};

//actualizar datos de un PRODUCTO
exports.update = (req, res) => {
    const id = req.params.id;
    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        CategoriaProductoId: req.body.CategoriaProductoId
    }
    Producto.update(producto, {
        where: {
            id: id
        }
    }).then(data => {
        console.log("Actualizado PRODUCTO exitosamente con los siguientes datos: "+
            "nombre: " + producto.nombre + " precio: " + producto.precio);
        res.send(data);
    }).catch(err => {
        console.log("Error al actualizar el PRODUCTO con id: "+id+". Error: "+ err.message);
        res.status(500).send({
            message: "Error al actualizar el PRODUCTO con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Producto.destroy({
        where: {
            id: id
        }
    }).then(data => {
        console.log("Eliminado el PRODUCTO exitosamente con el id: "+id);
        res.status(204).send();
    }).catch(err => {
        console.log("Error al eliminar el PRODUCTO con id: "+id+". Error: "+ err.message);
        res.status(500).send("Error al eliminar el PRODUCTO con id: " + id);
    });
}


exports.getListaProductos = async (req, res) => {

    consulta = 'select p.id, p.nombre, p.precio, p."CategoriaProductoId", c.nombre as "categoria" \n'+
        ' from public."Productos" p join public."CategoriaProductos" c on p."CategoriaProductoId" = c.id;'

    listaProductos = await db.sequelize.query(consulta);
    return res.status(200).json(listaProductos[0]);

}



exports.getProductosByIdCategoria = async (req, res) => {
    const CategoriaId = req.params.id;

    consulta = 'select p.id, p.nombre, p.precio \n'+
               ' from public."Productos" p join public."CategoriaProductos" c on p."CategoriaProductoId" = c.id where c."id" = :CategoriaId;'

    listaProductos = await db.sequelize.query(consulta, {
        replacements: { CategoriaId: CategoriaId },
        type: db.sequelize.QueryTypes.SELECT
    });


    return res.status(200).json(listaProductos);

}

