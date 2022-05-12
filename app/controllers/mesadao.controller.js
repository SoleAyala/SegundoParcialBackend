const db = require("../models");
const Mesa = db.Mesa;
const Op = db.Sequelize.Op;

//creacion de mesa
exports.create = (req, res) => {
// Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Debe enviar el nombre de la mesa!"
        });
        return;
    }
    if (!req.body.pocision) {
        res.status(400).send({
            message: "Debe enviar la posicion de la mesa!"
        });
        return;
    }
    if (!req.body.planta) {
        res.status(400).send({
            message: "Debe enviar la planta de la mesa!"
        });
        return;
    }
    if (!req.body.capacidad) {
        res.status(400).send({
            message: "Debe enviar la capacidad de comensales de la mesa!"
        });
        return;
    }
// crea un registro restaurante
    const mesa = {
        nombre: req.body.nombre,
        posicion: req.body.pocision,
        planta : req.body.planta,
        capacidad: req.body.capacidad
    };
// Guardamos a la base de datos
    Mesa.create(mesa)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear la mesa."
            });
        });
};

//obtener todas las mesas
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { cliente: { [Op.iLike]: `%${nombre}%` } } : null;
    Mesa.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener la lista de mesas."
            });
        });
};

//obtener una mesa a partir de un id especifico
exports.findOne = (req, res) => {
    const id = req.params.id;
    Mesa.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al encontrar la mesa con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Mesa.findByPk(id)
        .then(mesa => {
            mesa.destroy();
            res.send();
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener la mesa con id=" + id
            });
        });
}