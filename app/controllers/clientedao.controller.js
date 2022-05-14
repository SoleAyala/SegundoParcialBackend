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
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear un cliente."
            });
        });
};


exports.update = (req,res) => {
    const cliente = {
        id: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula
    }
    Clientes.update(cliente, {
        where: {
            id: req.body.id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al tratar de actualizar el cliente con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Clientes.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar el cliente con id: " + id);
    })
}


//obtener un cliente a partir de un id especifico
exports.findOne = (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id)
        .then(data => {
            if (data){
                res.send(data);
            }else{
                res.status(404).send("No encontrado");
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al encontrar el cliente con id=" + id
            });
        });
};


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
            res.send(data);
        }else{
            res.status(404).send("No encontrado")
        }
    }).catch(err => {
            res.status(500).send({
                message: "Error al tratar de encontrar el cliente con cedula=" + cedula
            });
    });
};


//obtener todos los clientes
exports.findByNombre = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { cliente: { [Op.iLike]: `%${nombre}%` } } : null;
    Cliente.findAll({ where: condition })
        .then(data => {
            if (data) {
                res.send(data);
            }else{
                res.status(404).send("No encontrado")
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los clientes por nombre"
            });
        });
};

exports.findAll = (req,res) => {
    Clientes.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener todos los clientes"
        });
    });
}



//
// exports.update = (req,res) => {
//     const id = req.params.id
//     const cliente = {
//         nombre: req.body.nombre,
//         apellido: req.body.apellido,
//         cedula: req.body.cedula
//     }
//     Clientes.update(cliente, {
//         where: {
//             id: id
//         }
//     }).then(data => {
//         res.send(data);
//     }).catch(err => {
//         res.status(500).send({
//             message: "Error al tratar de actualizar el cliente con id: " + id
//         })
//     });
// }

