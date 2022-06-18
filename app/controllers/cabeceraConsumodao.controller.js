const db = require("../models");
const CabeceraConsumo = db.CabeceraConsumo;
const Op = db.Sequelize.Op;



exports.create = (req, res) => {

    const cabeceraConsumo = {
        MesaId: req.body.MesaId,
        ClienteId: req.body.ClienteId,
        estado: req.body.estado,
        total: req.body.total,
        fechaHoraCreacion: req.body.fechaHoraCreacion,
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
        MesaId: req.body.MesaId,
        ClienteId: req.body.ClienteId,
        estado: req.body.estado,
        total: req.body.total,
        fechaHoraCreacion: req.body.fechaHoraCreacion,
        fechaHoraCierre: req.body.fechaHoraCierre
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

//************************************************************************** NO FUNCIONA

//poner estado CERRADO a una CABECERA CONSUMO
exports.cerrar = async (req, res) => {
    const id = req.params.id;

    consulta = 'update CabeceraConsumos where CabeceraConsumos."id"=(id_c) CabeceraConsumos."total"= \n' +
        '(select SUM(p."precio"*d."cantidad") as "nuevo_total" \n' +
        'from public."CabeceraConsumos" c join public."DetalleConsumos" d on c."id" = d."CabeceraConsumoId"\n' +
        'join public."Productos" p on p."id" = d."ProductoId"\n' +
        'where c."id" = (:id_c));'

    total_cabecera = await db.sequelize.query(consulta, {
        replacements: {
            id_c: id,
        },
        type: db.sequelize.QueryTypes.SELECT
    }).then(data => {
        console.log("Actualizado el TOTAL de la CABECERA CONSUMO exitosamente con id: " + id);
        res.send(data);
    }).catch(err => {
        console.log("Error al actualizar el TOTAL de la CABECERA CONSUMO con id: " + id + ". Error: " + err.message);
        res.status(500).send({
            message: "Error al actualizar el TOTAL de la CABECERA CONSUMO con id: " + id
        })
    });


    //*******************************************


    const cabeceraConsumo = {
        MesaId: req.body.MesaId,
        ClienteId: req.body.ClienteId,
        estado: req.body.estado,
        total: req.body.total,
        fechaHoraCreacion: req.body.fechaHoraCreacion,
        fechaHoraCierre: req.body.fechaHoraCierre
    }
    CabeceraConsumo.update(cabeceraConsumo, {
        where: {
            id: id
        }
    }).then(data => {
        console.log("Actualizado CABECERA CONSUMO exitosamente con id: " + id);
        res.send(data);
    }).catch(err => {
        console.log("Error al actualizar la CABECERA CONSUMO con id: " + id + ". Error: " + err.message);
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

//************************************************************************** NO FUNCIONA

//actualizar TOTAL de una CABECERA CONSUMO, CONSULTANDO SUS DETALLES
exports.ActualizarTotal = async (req, res) => {
    const id = req.params.id;

    consulta = 'update CabeceraConsumos where CabeceraConsumos."id"=(id_c) CabeceraConsumos."total"= \n' +
        '(select SUM(p."precio"*d."cantidad") as "nuevo_total" \n' +
        'from public."CabeceraConsumos" c join public."DetalleConsumos" d on c."id" = d."CabeceraConsumoId"\n' +
        'join public."Productos" p on p."id" = d."ProductoId"\n' +
        'where c."id" = (:id_c));'

    total_cabecera = await db.sequelize.query(consulta, {
        replacements: {
            id_c: id,
        },
        type: db.sequelize.QueryTypes.SELECT
    }).then(data => {
        console.log("Actualizado el TOTAL de la CABECERA CONSUMO exitosamente con id: " + id);
        res.send(data);
    }).catch(err => {
        console.log("Error al actualizar el TOTAL de la CABECERA CONSUMO con id: " + id + ". Error: " + err.message);
        res.status(500).send({
            message: "Error al actualizar el TOTAL de la CABECERA CONSUMO con id: " + id
        })
    });
}