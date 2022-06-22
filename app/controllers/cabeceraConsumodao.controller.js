const db = require("../models");
const CabeceraConsumo = db.CabeceraConsumo;
const Op = db.Sequelize.Op;



exports.create = (req, res) => {

    const cabeceraConsumo = {
        ReservacionId: req.body.ReservacionId,
        estado: req.body.estado,
        fechaCreacion: req.body.fechaCreacion,
        fechaCierre: req.body.fechaCierre,
        horaCreacion: req.body.horaCreacion,
        horaCierre: req.body.horaCierre
    };

    CabeceraConsumo.create(cabeceraConsumo)
        .then(data => {
            console.log("Creado CABECERA CONSUMO exitosamente con los siguientes datos: "+
                "id: " + cabeceraConsumo.id);
            res.send(data);
        })
        .catch(err => {
            console.log("Error al crear la CABECERA CONSUMO. Error: "+ err.message);
            res.status(500).send({
                message:
                    err.message || "Error al crear la CABECERA CONSUMO."
            });
        });
};

//obtener una CABECERA CONSUMO a partir de un id especifico
exports.findOne = (req, res) => {
    const id = req.params.id;
    CabeceraConsumo.findByPk(id)
        .then(data => {
            if(data){
                console.log("Obtenido CABECERA CONSUMO exitosamente con el id: "+id);
                res.send(data);
            }else{
                console.log("No encontrado la CABECERA CONSUMO con id: "+id+". Error: "+ err.message);
                res.status(404).send("No encontrado");
            }
        })
        .catch(err => {
            console.log("Error al obtener la CABECERA CONSUMO con id: "+id+". Error: "+ err.message);
            res.status(500).send({
                message: "Error al encontrar la CABECERA CONSUMO con id=" + id
            });
        });
};


exports.findAll = (req,res) => {
    CabeceraConsumo.findAll().then(data => {
        console.log("Obtenido todas las CABECERAS CONSUMO exitosamente");
        res.send(data);
    }).catch(err => {
        console.log("Error al obtener todas las CABECERAS CONSUMO"+". Error: "+ err.message);
        res.status(500).send({
            message: "Error al obtener todas las CABECERAS CONSUMO"
        });
    });
}


//actualizar datos de una CABECERA CONSUMO
exports.update = (req, res) => {
    const id = req.params.id;

    const cabeceraConsumo = {
        ReservacionId: req.body.ReservacionId,
        estado: req.body.estado,
        total: req.body.total,
        fechaCreacion: req.body.fechaCreacion,
        fechaCierre: req.body.fechaCierre,
        horaCreacion: req.body.horaCreacion,
        horaCierre: req.body.horaCierre
    }
    CabeceraConsumo.update(cabeceraConsumo, {
        where: {
            id: id
        }
    }).then(data => {
        console.log("Actualizado CABECERA CONSUMO exitosamente con id: "+id);
        res.send(data);
    }).catch(err => {
        console.log("Error al actualizar la CABECERA CONSUMO con id: "+id+". Error: "+ err.message);
        res.status(500).send({
            message: "Error al actualizar la CABECERA CONSUMO con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    CabeceraConsumo.destroy({
        where: {
            id: id
        }
    }).then(data => {
        console.log("Eliminado la CABECERA CONSUMO exitosamente con el id: "+id);
        res.status(204).send();
    }).catch(err => {
        console.log("Error al eliminar la CABECERA CONSUMO con id: "+id+". Error: "+ err.message);
        res.status(500).send("Error al eliminar la CABECERA CONSUMO con id: " + id);
    });
}

//poner estado CERRADO a una CABECERA CONSUMO
exports.cerrar = async (req, res) => {
    const id = req.params.id;
    const horaCierre= req.body.horaCierre;
    const fechaCierre= req.body.fechaCierre;
    const cerrado= "cerrado";

    consulta = 'update public."CabeceraConsumos" \n' +
        'set "estado"=:estado_c, "fechaCierre"=:fechaCierre_c, "horaCierre"=:horaCierre_c  \n' +
        'where public."CabeceraConsumos"."id"=:id_c;'

    /*consulta = 'update public."CabeceraConsumos" \n' +
        'set "estado"=(:estado_c), "fechaCierre"=(:fechaCierre_c), "horaCierre"=(:horaCierre_c)  \n' +
        'where public."CabeceraConsumos"."id"=(:id_c) and public."CabeceraConsumos"."estado" = (:a);'*/

    total_cabecera = await db.sequelize.query(consulta, {
        replacements: {
            id_c: id,
            horaCierre_c: horaCierre,
            fechaCierre_c: fechaCierre,
            estado_c: cerrado
        },
        type: db.sequelize.QueryTypes.SELECT
    }).then(data => {
        console.log("CABECERA CONSUMO -CERRADO- exitosamente de la mesa con id: " + id);
        res.status(204).send();

    }).catch(err => {
        console.log("Error al -cerrar- la CABECERA CONSUMO de la mesa con id: " + id + ". Error: " + err.message);
        res.status(500).send({
            message: "Error al -cerrar- la CABECERA CONSUMO de la mesa con id: " + id
        })
    });
}


//actualizar TOTAL de una CABECERA CONSUMO, CONSULTANDO SUS DETALLES
exports.ActualizarTotal = async (req, res) => {
    const id = req.params.id; //id de la cabecera

    consulta = 'update public."CabeceraConsumos"  \n' +
        '\tset total = (select coalesce( SUM(p."precio"*d."cantidad"), 0) as totalCabecera\n' +
        '\tfrom public."CabeceraConsumos" c join public."DetalleConsumos" d on c."id" = d."CabeceraConsumoId"\n' +
        '\tjoin public."Productos" p on p."id" = d."ProductoId" where c.id= :id)\n' +
        'where public."CabeceraConsumos"."id" = :id;';

    /*consulta = 'update public."CabeceraConsumos" \n' +
        'set "total"=(select SUM(p."precio"*d."cantidad") \n' +
        'from public."CabeceraConsumos" c join public."DetalleConsumos" d on c."id" = d."CabeceraConsumoId"\n' +
        'join public."Productos" p on p."id" = d."ProductoId") \n'+
        'where public."CabeceraConsumos"."id"=:id;'*/

    /*consulta = 'update public."CabeceraConsumos" \n' +
        'set "total"=(select SUM(p."precio"*d."cantidad") \n' +
        'from public."CabeceraConsumos" c join public."DetalleConsumos" d on c."id" = d."CabeceraConsumoId"\n' +
        'join public."Productos" p on p."id" = d."ProductoId") \n'+
        'where public."CabeceraConsumos"."id"=(:id_c) and public."CabeceraConsumos"."estado" = (:a);'
     */

    total_cabecera = await db.sequelize.query(consulta, {
        replacements: {
            id: id
        },
        type: db.sequelize.QueryTypes.SELECT
    }).then(data => {
        console.log("Actualizado el TOTAL de la CABECERA CONSUMO exitosamente de la mesa con id: " + id);
        res.status(204).send(data);
    }).catch(err => {
        console.log("Error al actualizar el TOTAL de la CABECERA CONSUMO de la mesa con id: " + id + ". Error: " + err.message);
        res.status(500).send({
            message: "Error al actualizar el TOTAL de la CABECERA CONSUMO de la mesa con id: " + id
        })
    });
}


exports.getCabeceraConsumoByReservaId = async( req, res) =>{
    const ReservacionId = req.params.id;

    consulta = 'select * from public."CabeceraConsumos" c where c."ReservacionId" = :id;';

    reserva = await db.sequelize.query(consulta, {
        replacements: { id: ReservacionId },
        type: db.sequelize.QueryTypes.SELECT
    });

    return res.status(200).json(reserva[0]);


}
