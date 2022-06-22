const db = require("../models");
const DetalleConsumo = db.DetalleConsumo;
const Op = db.Sequelize.Op;



exports.create = (req, res) => {

    const detalleConsumo = {
        CabeceraConsumoId: req.body.CabeceraConsumoId,
        ProductoId: req.body.ProductoId,
        cantidad: req.body.cantidad
    };

    DetalleConsumo.create(detalleConsumo)
        .then(data => {
            console.log("Creado DETALLE CONSUMO exitosamente con los siguientes datos: "+
                "id: " + detalleConsumo.id);
            res.send(data);
        })
        .catch(err => {
            console.log("Error al crear el DETALLE CONSUMO. Error: "+ err.message);
            res.status(500).send({
                message:
                    err.message || "Error al crear el DETALLE CONSUMO."
            });
        });
};

//obtener un DETALLE CONSUMO a partir de un id especifico
exports.findOne = (req, res) => {
    const id = req.params.id;
    DetalleConsumo.findByPk(id)
        .then(data => {
            if(data){
                console.log("Obtenido DETALLE CONSUMO exitosamente con el id: "+id);
                res.send(data);
            }else{
                console.log("No encontrado la DETALLE CONSUMO con id: "+id+". Error: "+ err.message);
                res.status(404).send("No encontrado");
            }
        })
        .catch(err => {
            console.log("Error al obtener la DETALLE CONSUMO con id: "+id+". Error: "+ err.message);
            res.status(500).send({
                message: "Error al encontrar la DETALLE CONSUMO con id=" + id
            });
        });
};


exports.findAll = (req,res) => {
    DetalleConsumo.findAll().then(data => {
        console.log("Obtenido todas los DETALLES CONSUMO exitosamente");
        res.send(data);
    }).catch(err => {
        console.log("Error al obtener todas los DETALLES CONSUMO"+". Error: "+ err.message);
        res.status(500).send({
            message: "Error al obtener todas los DETALLES CONSUMO"
        });
    });
}


//actualizar datos de una CABECERA CONSUMO
exports.update = (req, res) => {
    const id = req.params.id;
    const detalleConsumo = {
        CabeceraConsumoId: req.body.CabeceraConsumoId,
        ProductoId: req.body.ProductoId,
        cantidadId: req.body.cantidad,
    }
    CabeceraConsumo.update(detalleConsumo, {
        where: {
            id: id
        }
    }).then(data => {
        console.log("Actualizado DETALLE CONSUMO exitosamente con id: "+id);
        res.send(data);
    }).catch(err => {
        console.log("Error al actualizar el DETALLE CONSUMO con id: "+id+". Error: "+ err.message);
        res.status(500).send({
            message: "Error al actualizar el DETALLE CONSUMO con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    DetalleConsumo.destroy({
        where: {
            id: id
        }
    }).then(data => {
        console.log("Eliminado el DETALLE CONSUMO exitosamente con el id: "+id);
        res.status(204).send();
    }).catch(err => {
        console.log("Error al eliminar el DETALLE CONSUMO con id: "+id+". Error: "+ err.message);
        res.status(500).send("Error al eliminar el DETALLE CONSUMO con id: " + id);
    });
}


//obtiene los detalles de consumo de una cabecera
exports.getDetallesDeConsumoByIdCabecera = async (req, res) => {
    const CabeceraConsumoId = req.params.id;

    consulta = 'select d."id",  d."ProductoId",  p."nombre", p."precio", d."cantidad", (p."precio"* d."cantidad") as total, d."CabeceraConsumoId" \n' +
                'from public."DetalleConsumos" d join public."Productos" p on d."ProductoId" = p."id" \n' +
                'where d."CabeceraConsumoId" = :CabeceraConsumoId;'



    listaDetallesConsumo = await db.sequelize.query(consulta, {
        replacements: { CabeceraConsumoId: CabeceraConsumoId },
        type: db.sequelize.QueryTypes.SELECT
    });


    return res.status(200).json(listaDetallesConsumo);

}

