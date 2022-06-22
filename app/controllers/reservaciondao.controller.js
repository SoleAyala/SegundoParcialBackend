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
                ", hora Inicio: " + reservacion.horaInicio+
                ", hora Fin: " + reservacion.horaFin+
                ", RestauranteId: " + reservacion.RestauranteId+
                ", MesaId: " + reservacion.MesaId+
                ", ClienteId: " + reservacion.ClienteId
            );
            res.send(data);
        })
        .catch(err => {
            console.log("Error al craer la reservacion en la fecha: "+reservacion.fecha+" en el restaurante: "+reservacion.RestauranteId+". Error: "+ err.message);
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
            ", hora Inicio: " + reserva.horaInicio+
            ", hora Fin: " + reserva.horaFin+
            ", RestauranteId: " + reserva.RestauranteId+
            ", MesaId: " + reserva.MesaId+
            ", ClienteId: " + reserva.ClienteId
        );
        res.send(data);
    }).catch(err => {
        console.log("Error al actualizar la reservacion con fecha: "+reserva.fecha+" en el restaurante: "+reserva.RestauranteId+". Error: "+ err.message);
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
            console.log("No encontrado la reservacion con id: "+id);
            res.status(404).send("No encontrado");
        }
    }).catch(err => {
        console.log("Error al obtener la reservacion con id: "+id+". Error: "+ err.message);
        res.status(500).send({
            message: "Error al obtener reserva con id= " + id
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
                console.log("Obtenido todas las MESAS libres exitosamente para la fecha: "+fecha_+" y rango de horario: "+horaInicio_+" - "+horaFin_+" y restaurante: "+restauranteId_ );
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
        console.log("Error al obtener todas las mesas libres para la fecha: "+fecha_+" y rango de horario: "+horaInicio_+" - "+horaFin_+" y restaurante: "+restauranteId_ +". Error: "+ err.message);
        res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las mesas libres"
            });
        });
};

//prueba con sql
exports.listaReservaciones = async (req, res) => {

    consulta = 'select r.id, r.fecha, r."horaInicio", r."horaFin", restaurante.id as "RestauranteId", restaurante.nombre as "nombreRestaurante", mesa.id as "MesaId", mesa.nombre as "nombreMesa", mesa.capacidad, c.id as "ClienteId", c.nombre as "nombreCliente" \n' +
        'from public."Reservacions" r join public."Restaurantes" restaurante on r."RestauranteId" = restaurante.id\n' +
        'join public."Mesas" mesa on mesa.id = r."MesaId"\n' +
        'join public."Clientes" c on c.id = r."ClienteId"\n' +
        ';'
    reservaciones = await db.sequelize.query(consulta);

    return res.status(200).json(reservaciones[0]);

}

//  5. filtro de reservaciones por 1 CLIENTE, 1 FECHA , 1 RESTURANTE (por separado: 3 filtros, todos ordenados por HORARIO -crec- Y MESA -crec-)
exports.filterReservaciones = async (req, res) => {
    const clienteId = req.body.ClienteId;

    if (clienteId) {
        consulta = 'select r.id, r.fecha, r."horaInicio", r."horaFin", restaurante.id as "RestauranteId", restaurante.nombre as "nombreRestaurante", mesa.id as "MesaId", mesa.nombre as "nombreMesa", mesa.capacidad, c.id as "ClienteId", c.nombre as "nombreCliente" \n' +
            'from public."Reservacions" r join public."Restaurantes" restaurante on r."RestauranteId" = restaurante.id\n' +
            'join public."Mesas" mesa on mesa.id = r."MesaId"\n' +
            'join public."Clientes" c on c.id = r."ClienteId"\n' +
            'where r."fecha" = (:fecha_dato) AND c."id" = (:cliente_dato) AND restaurante."id" = (:restaurante_dato);'


        reservaciones = await db.sequelize.query(consulta  , {
            replacements: {fecha_dato: req.body.fecha, cliente_dato: req.body.ClienteId, restaurante_dato:req.body.RestauranteId},
            type: db.sequelize.QueryTypes.SELECT
        });

    }else{
        consulta = 'select r.id, r.fecha, r."horaInicio", r."horaFin", restaurante.id as "RestauranteId", restaurante.nombre as "nombreRestaurante", mesa.id as "MesaId", mesa.nombre as "nombreMesa", mesa.capacidad, c.id as "ClienteId", c.nombre as "nombreCliente" \n' +
            'from public."Reservacions" r join public."Restaurantes" restaurante on r."RestauranteId" = restaurante.id\n' +
            'join public."Mesas" mesa on mesa.id = r."MesaId"\n' +
            'join public."Clientes" c on c.id = r."ClienteId"\n' +
            'where r."fecha" = (:fecha_dato) AND restaurante."id" = (:restaurante_dato);'

        reservaciones = await db.sequelize.query(consulta  , {
            replacements: {fecha_dato: req.body.fecha, restaurante_dato:req.body.RestauranteId},
            type: db.sequelize.QueryTypes.SELECT
        });

    }
    return res.status(200).json(reservaciones);


}

exports.getReservacionByID = async (req, res) => {

    const id = req.params.id;

    consulta = 'select  res.id as "RestauranteId", res.nombre as "nombreRestaurante", \n' +
        '\t\tm.id as "MesaId", m.nombre as "nombreMesa", m.capacidad,\n' +
        '\t\tc.id as "ClienteId", concat(c.nombre, \' \' , c.apellido) as "nombreCliente",\n' +
        '\t\tr.id, r.fecha, r."horaInicio", r."horaFin"  \n' +
        'from public."Reservacions" r\n' +
        'join public."Mesas" m on r."MesaId" = m.id\n' +
        'join public."Restaurantes" res on r."RestauranteId" = res.id\n' +
        'join public."Clientes" c on r."ClienteId" = c.id\n' +
        'where r."id" = :id;';


    reservacion = await db.sequelize.query(consulta,{
        replacements: { id: id },
        type: db.sequelize.QueryTypes.SELECT
    });

    return res.status(200).json(reservacion[0]);

}

//VERIFICA SI LA MESA ESTA LIBRE O NO, ATENDIENDO LAS RESERVACIONES HECHAS Y LOS CONSUMOS DE LAS MESAS
exports.mesaLIBRE = async (req, res) => {
    const id = req.params.id; //id de la mesa

    const horaInicio_ = req.body.horaInicio;
    const horaFin_ = req.body.horaFin;
    const restauranteId_ = req.body.RestauranteId;
    const fecha_ = req.body.fecha;


    //1. vemos si la mesa elegida esta en la lista de mesas reservadas
    var disponible = "NO LIBRE";
    consulta = 'select * \n' +
        'from public."Reservacions" c \n' +
        'where c."MesaId" = (:id) and c."fecha" = (:fecha_) and c."horaInicio" < (:horafin_) and c."horaFin" > (:horainicio_) and c."horaInicio" >= (:horainicio_) and c."horaFin" <= (:horafin_) ;'
    let resultado1 = await db.sequelize.query(consulta, {
        replacements: {
            id: req.params.id,
            horainicio_: req.body.horaInicio,
            horafin_: req.body.horaFin,
            fecha_: req.body.fecha
        },
        type: db.sequelize.QueryTypes.SELECT
    });


    //2. vemos si hay una cabecera con estado ABIERTO con esa mesa
    consulta2 = 'select * \n' +
        'from public."CabeceraConsumos" c \n' +
        'where c."MesaId" = (:id) and c."estado" = (:estado_abierto);'
    let resultado2 = await db.sequelize.query(consulta2, {
        replacements: {
            id: req.params.id,
            estado_abierto: "abierto"
        },
        type: db.sequelize.QueryTypes.SELECT
    });

    if (resultado2.toString() === "" && resultado1.toString() === "") {
        disponible = "LIBRE";
    }

    //3. respuesta
    console.log("Mesa " + disponible + " para la fecha: " + fecha_ + " y rango de horario: " + horaInicio_ + " - " + horaFin_ + " y restaurante: " + restauranteId_);
    res.send(disponible);
};

//PRUEBA
exports.mesasOcupadasPrueba = async (req, res) => {

    const ini = req.body.horaInicio;
    const fin = req.body.horaFin;
    const restauranteId = req.body.RestauranteId;
    const fecha = req.body.fecha;


    consulta = 'select m.id, m.nombre, m.capacidad, m.planta, m.x, m.y, m."RestauranteId", r.id as "ReservacionId" \n' +
        'from public."Mesas" m join public."Reservacions" r on r."MesaId" = m.id\n' +
        'where r.fecha = :fecha and r."horaInicio" = :ini and r."horaFin"= :fin and r."RestauranteId" = :restauranteId;\n'
    let mesasOcupadas = await db.sequelize.query(consulta, {
        replacements: {
            ini: ini,
            fin: fin,
            fecha: fecha,
            restauranteId: restauranteId
        },
        type: db.sequelize.QueryTypes.SELECT
    });

    return res.status(200).json(mesasOcupadas);
};


