const db = require("../models");
const Cliente = db.Cliente;
const Op = db.Sequelize.Op;




//CREACION DEL CLIENTE
exports.create = (req, res) => {
// Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Debe enviar el nombre del cliente!"
        });
        return;
    }
    if (!req.body.apellido) {
        res.status(400).send({
            message: "Debe enviar el apellido del cliente!"
        });
        return;
    }
    if (!req.body.cedula) {
        res.status(400).send({
            message: "Debe enviar el numero de cedula del cliente!"
        });
        return;
    }
// crea un registro cliente
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

//obtener un cliente a partir de un id especifico
exports.findOne = (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al encontrar el cliente con id=" + id
            });
        });
};


//obtener cliente a partir de un numero de cedula
exports.findbycedula = (req, res) => {
    const cedula = req.params.cedula;
    Cliente.findByPk(cedula)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al encontrar el cliente con cedula=" + cedula
            });
        });
};


//obtener todos los clientes
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { cliente: { [Op.iLike]: `%${nombre}%` } } : null;
    Ventas.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los clientes."
            });
        });
};





