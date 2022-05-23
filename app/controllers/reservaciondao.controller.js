const db = require("../models");
const Reservacion = db.Reservacion;
const Mesa = db.Mesa;

const { Op } = require("sequelize");

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
            console.log("Creado RESERVACION exitosamente con los siguientes datos: "+
                "fecha: " + reservacion.nombre+
                " hora Inicio: " + reservacion.horaInicio+
                " hora Fin: " + reservacion.horaFin+
                " RestauranteId: " + reservacion.RestauranteId+
                " MesaId: " + reservacion.MesaId+
                " ClienteId: " + reservacion.ClienteId
            );
            res.send(data);
        })
        .catch(err => {
            console.log("Error al craer la reservacion en la fecha: "+reservacion.fecha+" en el restaurante:"+reservacion.RestauranteId+". Error: "+ err.message);
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
        console.log("Actualizado RESERVACION exitosamente con los siguientes datos: "+
            "fecha: " + reserva.nombre+
            " hora Inicio: " + reserva.horaInicio+
            " hora Fin: " + reserva.horaFin+
            " RestauranteId: " + reserva.RestauranteId+
            " MesaId: " + reserva.MesaId+
            " ClienteId: " + reserva.ClienteId
        );
        res.send(data);
    }).catch(err => {
        console.log("Error al actualizar la reservacion con fecha: "+reserva.fecha+" en el restaurante:"+reserva.RestauranteId+". Error: "+ err.message);
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
        console.log("Eliminado RESERVACION exitosamente con el id: "+id);
        res.status(204).send();
    }).catch(err => {
        console.log("Error al eliminar la reservacion con id: "+id+". Error: "+ err.message);
        res.status(500).send("Error al eliminar la reserva");
    })
};


exports.findOne = (req, res) => {
    const id = req.params.id;
    Reservacion.findByPk(id).then(data => {
        if (data){
            console.log("Obtenido RESERVACION exitosamente con el id: "+id);
            res.send(data);
        }
        else{
            console.log("No obtenido la reservacion con id: "+id);
            res.status(404).send("No encontrado");
        }
    }).catch(err => {
        console.log("Error al obtener la reservacion con id: "+id+". Error: "+ err.message);
        res.status(500).send({
            message: "Error al obtener reserva con id=" + id
        });
    });
};

exports.findAll = (req,res) => {
    Reservacion.findAll().then(data => {
        console.log("Obtenido todas las RESERVACIONES exitosamente");
        res.send(data);
    }).catch(err => {
        console.log("Error al obtener todas las reservaciones"+". Error: "+ err.message);
        res.status(500).send({
            message: "Error al obtener todas las reservas"
        });
    });
};



//  4. filtro de mesas no reservadas de un RESTAURANTE, una FECHA, uno o mas RANGOS DE HORA (todas las condiciones juntas, ordenado por  MESA -crec-)

exports.mesasLibres = (req, res) => {

    const horaInicio_= req.body.horaInicio;
    const horaFin_= req.body.horaFin;
    const restauranteId_= req.body.RestauranteId;
    const fecha_= req.body.fecha;

    Reservacion.findAll({
        where: {
            [Op.and]:
            {
                RestauranteId:restauranteId_,
                fecha:{[Op.eq]:fecha_},
                [Op.or]:[
                        {
                            horaInicio:{[Op.lt]:horaFin_},
                            horaFin:{[Op.gt]:horaInicio_}
                        }
                        , {
                            horaInicio:{[Op.gte]:horaInicio_},
                            horaFin:{[Op.lte]:horaFin_}
                        }
                ]
            }
        }
    }).then(data => {
        // Vemos que mesas están reservadas, asignando a un array el id de las mesas
        var mesasOcupadas = [];
        data.map( reserva => {
            mesasOcupadas.push(reserva.MesaId);
        });

        /* Obtenemos todas las mesas del restaurante */
        Mesa.findAll({ where: {RestauranteId:{[Op.eq]:restauranteId_}} })
            .then(totalMesas => {
                // Una vez tenemos todas las mesas, filtramos las que no estan ocupadas
                var mesasDisponibles = totalMesas.filter(
                    mesa => !mesasOcupadas.includes(mesa.id)
                );
                console.log("Obtenido todas las MESAS libres exitosamente para la fecha: "+fecha_+" y rango de horario:"+horaInicio_+" - "+horaFin_+" y restaurante: "+restauranteId_ );
                res.send(mesasDisponibles);
            })
            .catch(err => {
                console.log("Error al obtener todas las mesas del restaurante: "+restauranteId_+". Error: "+ err.message);
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al realizar la operacion."
                });
            });
        }).catch(err => {
        console.log("Error al obtener todas las mesas libres para la fecha: "+fecha_+" y rango de horario:"+horaInicio_+" - "+horaFin_+" y restaurante: "+restauranteId_ +". Error: "+ err.message);
        res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las mesas libres"
            });
        });
};


//  5. filtro de reservaciones por 1 CLIENTE, 1 FECHA , 1 RESTURANTE (por separado: 3 filtros, todos ordenados por HORARIO -crec- Y MESA -crec-)

exports.filterReservaciones = (req, res) => {

    const restaurante = req.body.RestauranteId;
    const clienteId = req.body.ClienteId;
    const fechaString = req.body.fecha;
    var condition = null;
    /*definicion de la condicion */
    if (clienteId) {
        condition = {
            RestauranteId: restaurante,
            fecha: {
                [Op.eq]: fechaString
            },
            ClienteId: clienteId
        }
    }else{
        condition = {
            RestauranteId: restaurante,
            fecha: {
                [Op.eq]: fechaString
            }
        }
    }

    /*extraccion*/
    Reservacion.findAll({
        where: condition,
        order: [
            ['horaInicio', 'ASC'],
            ['horaFin', 'ASC'],
            ['MesaId', 'ASC']
        ]
    })
        .then(data => {
            console.log("Obtenido las RESERVACIONES exitosamente del cliente: "+clienteId+" en fecha: "+fechaString+" en el restaurante: "+restaurante);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las reservaciones."
            });
        });
};