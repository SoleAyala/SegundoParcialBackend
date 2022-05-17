const db = require("../models");
const Reservacion = db.Reservacion;
const { Op } = require("sequelize");

//id, id de restaurante, id de mesa, fecha, rango de hora, id de cliente
exports.create = (req, res) => {

// crea un registro restaurante
    const reservacion = {
        fecha: req.body.fecha,
        horaInicio: req.body.horaInicio,
        horaFin: req.body.horaFin,
        RestauranteId: req.body.RestauranteId,
        MesaId: req.body.MesaId,
        ClienteId: req.body.ClienteId
    };
// Guardamos a la base de datos
    Reservacion.create(reservacion)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al reservar la mesa."
            });
        });
};


exports.update = (req,res) => {
    const id = req.params.id
    const reserva = {
        fecha: req.body.fecha,
        horaInicio: req.body.horaInicio,
        horaFin: req.body.horaFin,
        RestauranteId: req.body.RestauranteId,
        MesaId: req.body.MesaId,
        ClienteId: req.body.ClienteId
    }
    Reservacion.update(reserva, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar la reserva"
        })
    });
};


exports.delete = (req,res) => {
    const id = req.params.id;
    Reservacion.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar la reserva");
    })
};


exports.findOne = (req, res) => {
    const id = req.params.id;
    Reservacion.findByPk(id).then(data => {
        if (data){
            res.send(data);
        }
        else{
            res.status(404).send("No encontrado");
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener reserva con id=" + id
        });
    });
};

exports.findAll = (req,res) => {
    Reservacion.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener todas las reservas"
        });
    });
};


exports.filter = (req, res) => {
    /*posibles parametros de filtro*/
    const restaurante = req.body.restauranteId;
    const fechaString = req.body.fecha;
    const clienteId = req.body.clienteId;
    let fecha = Date.parse(fechaString);
    var condition = null;

    /*definicion de la condicion */
    if (clienteId) {
        condition = {
            restauranteId: restaurante,
            fecha: {
                [Op.eq]: fecha
            },
            clienteId: clienteId
        }
    }else{
        condition = {
            restauranteId: restaurante,
            fecha: {
                [Op.eq]: fecha
            }
        }
    }

    /*extraccion*/
    Reservacion.findAll({
        where: condition,
        order: [
            ['horario', 'ASC'],
            ['mesaId', 'ASC']
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las reservaciones."
            });
        });
};