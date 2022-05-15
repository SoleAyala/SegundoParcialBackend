const db = require("../models");
const Mesa = db.Mesa;
const Op = db.Sequelize.Op;

//creacion de mesa
exports.create = (req, res) => {

    const mesa = {
        nombre: req.body.nombre,
        x: req.body.x,
        y: req.body.y,
        planta : req.body.planta,
        capacidad: req.body.capacidad,
        RestauranteId: req.body.RestauranteId ////////////

    };

    Mesa.create(mesa)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al crear mesa."
            });
        });
};


exports.update = (req,res) => {
    const id = req.params.id
    const mesa = {
        nombre: req.body.nombre,
        x: req.body.x,
        y: req.body.y,
        planta: req.body.planta,
        capacidad: req.body.capacidad,
        RestauranteId: req.body.RestauranteId
    }
    Mesa.update(mesa, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al modificar la mesa con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Mesa.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar el mesa con id: " + id);
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Mesa.findByPk(id).then(data => {
        if (data){
            res.send(data);
        }
        else{
            res.status(404).send("Not found");
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener mesa con id=" + id
        });
    });
};


exports.findAll = (req,res) => {
    Mesa.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener las mesas"
        });
    });
}


exports.findByNombre = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { mesa: { [Op.iLike]: `%${nombre}%` } } : null;
    Mesa.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al obtener las mesas."
            });
        });
};
