const db = require("../models");
const CabeceraConsumo = db.CabeceraConsumo;
const Op = db.Sequelize.Op;



exports.create = (req, res) => {

    const cabeceraConsumo = {
        MesaId: req.body.MesaId,
        ClienteId: req.body.ClienteId,
        estado: req.body.estado,
        total: req.body.total,
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
        MesaId: req.body.MesaId,
        ClienteId: req.body.ClienteId,
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
    const id = req.params.id; // id de la mesa
    const horaCierre= req.body.horaCierre;
    const fechaCierre= req.body.fechaCierre;
    const cerrado= "cerrado";

    consulta = 'update public."CabeceraConsumos" \n' +
        'set "estado"=(:estado_c), "fechaCierre"=(:fechaCierre_c), "horaCierre"=(:horaCierre_c)  \n' +
        'where public."CabeceraConsumos"."MesaId"=(:id_c) and public."CabeceraConsumos"."estado" = (:a);'

    total_cabecera = await db.sequelize.query(consulta, {
        replacements: {
            id_c: id,
            horaCierre_c: horaCierre,
            fechaCierre_c: fechaCierre,
            estado_c: cerrado,
            a: "abierto"
        },
        type: db.sequelize.QueryTypes.SELECT
    }).then(data => {
        console.log("CABECERA CONSUMO -CERRADO- exitosamente de la mesa con id: " + id);
        res.send("CABECERA CONSUMO -CERRADO- exitosamente de la mesa con id: " + id);
    }).catch(err => {
        console.log("Error al -cerrar- la CABECERA CONSUMO de la mesa con id: " + id + ". Error: " + err.message);
        res.status(500).send({
            message: "Error al -cerrar- la CABECERA CONSUMO de la mesa con id: " + id
        })
    });
}


//actualizar TOTAL de una CABECERA CONSUMO, CONSULTANDO SUS DETALLES
exports.ActualizarTotal = async (req, res) => {
    const id = req.params.id; //id de la mesa

    consulta = 'update public."CabeceraConsumos" \n' +
        'set "total"=(select SUM(p."precio"*d."cantidad") \n' +
        'from public."CabeceraConsumos" c join public."DetalleConsumos" d on c."id" = d."CabeceraConsumoId"\n' +
        'join public."Productos" p on p."id" = d."ProductoId") \n'+
        'where public."CabeceraConsumos"."MesaId"=(:id_c) and public."CabeceraConsumos"."estado" = (:a);'

    total_cabecera = await db.sequelize.query(consulta, {
        replacements: {
            id_c: req.params.id,
            a: "abierto"
        },
        type: db.sequelize.QueryTypes.SELECT
    }).then(data => {
        console.log("Actualizado el TOTAL de la CABECERA CONSUMO exitosamente de la mesa con id: " + id);
        res.send("Actualizado el TOTAL de la CABECERA CONSUMO exitosamente de la mesa con id: " + id);
    }).catch(err => {
        console.log("Error al actualizar el TOTAL de la CABECERA CONSUMO de la mesa con id: " + id + ". Error: " + err.message);
        res.status(500).send({
            message: "Error al actualizar el TOTAL de la CABECERA CONSUMO de la mesa con id: " + id
        })
    });
}

//devuelve todos los detalles del consumo de una cabecera/mesa
exports.ticket = async (req, res) => {
    const id = req.params.id; //id de la mesa

    consulta = 'select distinct c."estado", c."fechaCierre" as "fecha", c."horaCierre" as "hora", r."id" as "RestauranteId", r."nombre" as "nombreRestaurante", mesa.id as "MesaId", mesa.nombre as "nombreMesa", cli.id as "ClienteId", cli.nombre as "nombreCliente", \n' +
        'c.total as "total consumo" \n' +
        'from public."CabeceraConsumos" c join public."DetalleConsumos" d on c."id" = d."CabeceraConsumoId" \n' +
        'join public."Mesas" mesa on mesa."id" = c."MesaId" \n' +
        'join public."Clientes" cli on cli."id" = c."ClienteId" join public."Restaurantes" r on r."id" = mesa."RestauranteId" \n' +
        'where c."MesaId"=(:id_c) and c."estado" = (:a);'
    let resultado1 = await db.sequelize.query(consulta, {
        replacements: {
            id_c: req.params.id,
            a: "abierto"
        },
        type: db.sequelize.QueryTypes.SELECT

    });

    //PASO 2:
    consulta2 = 'select p.id as "ProductoID", p.nombre as "Producto", p.precio, d.cantidad  \n' +
        'from public."CabeceraConsumos" c join public."DetalleConsumos" d on c.id = d."CabeceraConsumoId" \n' +
        'join public."Productos" p on p.id = d."ProductoId" \n' +
        'where c."MesaId"=(:id_c) and c."estado" = (:a);'

    let resultado2 = await db.sequelize.query(consulta2, {
        replacements: {
            id_c: req.params.id,
            a:"abierto"
        },
        type: db.sequelize.QueryTypes.SELECT
    });

    //PASO 3:
    var respuesta = resultado1.concat(resultado2);
    console.log("Ticket EXITOSO de cabecera consumo de la mesa con id: " + id);
    return res.status(200).json(respuesta);
}