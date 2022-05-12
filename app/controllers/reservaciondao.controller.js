const db = require("../models");
const Reservacion = db.Reservacion;
const Op = db.Sequelize.Op;
//id, id de restaurante, id de mesa, fecha, rango de hora, id de cliente, cantidad solicitada
//creacion de mesa
exports.create = (req, res) => {
// Validate request
    if (!req.body.fecha) {
        res.status(400).send({
            message: "Debe enviar la fecha de la reservacion!"
        });
        return;
    }
    if (!req.body.rango) {
        res.status(400).send({
            message: "Debe enviar el rango de horario de la reservacion!"
        });
        return;
    }
    if (!req.body.cantidad) {
        res.status(400).send({
            message: "Debe enviar la cantidad de reservacion!"
        });
        return;
    }

// crea un registro restaurante
    const reservacion = {
        fecha: req.body.fecha,
        rango: req.rango,
        cantidad : req.body.cantidad
    };
// Guardamos a la base de datos
    Reservacion.create(reservacion)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear la reservacion."
            });
        });
};


//obtener una mesa a partir de un id especifico
exports.findOne = (req, res) => {
    const id = req.params.id;
    Reservacion.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al encontrar la reservacion con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Reservacion.findByPk(id)
        .then(mesa => {
            mesa.destroy();
            res.send();
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener la reservacion con id=" + id
            });
        });
}