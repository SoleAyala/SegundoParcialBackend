//https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
const db = require("../models");
const Cliente = db.Cliente;
const Op = db.Sequelize.Op;




//CREACION DEL CLIENTE
exports.create = (req, res) => {

    const cliente = {
        apellido: req.body.apellido,
        nombre: req.body.nombre,
        cedula: req.body.cedula
    };

    // Guardamos a la base de datos
    Cliente.create(cliente)
        .then(data => {
            console.log("Creado CLIENTE exitosamente con los siguientes datos: "+
                "nombre: " + cliente.nombre+
                " apellido: " +cliente.apellido+
                " cedula: "+cliente.cedula);
            res.send(data);
        })
        .catch(err => {
            console.log("Error al crear el CLIENTE con nombre y apellido: "+cliente.nombre + " " + cliente.apellido +". Error: "+ err.message);
            res.status(500).send({
                message:
                    err.message || "Error al crear el cliente."
            });
        });
};


exports.update = (req,res) => {
    const id = req.params.id

    const cliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula
    }
    Cliente.update(cliente, {
        where: {
            id: id
        }
    }).then(data => {
        console.log("Actualizado CLIENTE exitosamente con los siguientes datos: "+
            "nombre: " + cliente.nombre+
            " apellido: " +cliente.apellido+
            " cedula: "+cliente.cedula);
        res.send(data);
    }).catch(err => {
        console.log("Error al actualizar el CLIENTE con id: "+id+". Error: "+ err.message);
        res.status(500).send({
            message: "Error al tratar de actualizar el cliente con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Cliente.destroy({
        where: {
            id: id
        }
    }).then(data => {
        console.log("Eliminado CLIENTE exitosamente con id: "+id);
        res.status(204).send();
    }).catch(err => {
        console.log("Error al eliminar CLIENTE con id: "+id +". Error: "+ err.message);
        res.status(500).send("Error al eliminar el cliente con id: " + id);
    })
}


//obtener un cliente a partir de un id especifico
exports.findOne = (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id)
        .then(data => {
            if (data){
                console.log("Obtenido CLIENTE exitosamente con id: "+id);
                res.send(data);
            }else{
                console.log("No obtenido CLIENTE con id: "+id);
                res.status(404).send("No encontrado");
            }
        })
        .catch(err => {
            console.log("Error al obtener el CLIENTE con id: "+id +". Error: "+ err.message);
            res.status(500).send({
                message: "Error al encontrar el cliente con id=" + id
            });
        });
};


exports.findAll = (req,res) => {
    Cliente.findAll().then(data => {
        console.log("Obtenido todos los CLIENTES exitosamente");
        res.send(data);
    }).catch(err => {
        console.log("Error al obtener todos los CLIENTES"+". Error: "+ err.message);
        res.status(500).send({
            message: "Error al obtener todos los clientes"
        });
    });
}


/*
NO FUNCIONA: findByCedula ni finByNombre
al llamarlos se ejecuta findAll...
conflito con get
* */

//obtener cliente a partir de un numero de cedula
exports.findByCedula = (req, res) => {
    const cedula = req.query.cedula;
    Cliente.findOne(
        {
            where: {
                cedula:cedula
            }
        }
    ).then(data => {
        if (data){
            console.log("Obtenido CLIENTE exitosamente con cedula: "+cedula);
            res.send(data);
        }else{
            console.log("No obtenido CLIENTE con cedula: "+cedula);
            res.status(404).send("No encontrado")
        }
    }).catch(err => {
        console.log("Error al encontrar el cliente con cedula=" + cedula+". Error: "+ err.message);
        res.status(500).send({
                message: "Error al tratar de encontrar el cliente con cedula=" + cedula
            });
    });
};


//obtener un cliente por su nombre
exports.findByNombre = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { cliente: { [Op.iLike]: `%${nombre}%` } } : null;
    Cliente.findAll({ where: condition })
        .then(data => {
            if (data) {
                console.log("Obtenido los CLIENTES exitosamente con nombre: "+nombre);
                res.send(data);
            }else{
                console.log("No obtenido los CLIENTES con nombre: "+nombre);
                res.status(404).send("No encontrado")
            }
        })
        .catch(err => {
            console.log("Error al encontrar a los clientes con nombre=" + nombre);
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los clientes por nombre"
            });
        });
};




