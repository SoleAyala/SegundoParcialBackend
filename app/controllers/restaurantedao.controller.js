const db = require("../models");
const Restaurante = db.Restaurante;
const Op = db.Sequelize.Op;



exports.create = (req, res) => {

    const restaurante = {
        nombre: req.body.nombre,
        direccion: req.body.direccion
    };

    Restaurante.create(restaurante)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al crear el restaurante."
            });
        });
};

//obtener un restaurante a partir de un id especifico
exports.findOne = (req, res) => {
    const id = req.params.id;
    Restaurante.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            }else{
                res.status(404).send("No encontrado");
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al encontrar el restaurante con id=" + id
            });
        });
};


exports.findAll = (req,res) => {
    Restaurante.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener todos los restaurantes"
        });
    });
}


exports.findByNombre = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { restaurante: { [Op.iLike]: `%${nombre}%` } } : null;
    Restaurante.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener el restaurante."
            });
        });
};

//actualizar datos de un restaurante
exports.update = (req, res) => {
    const id = req.params.id;
    const restaurante = {
        nombre: req.body.nombre,
        direccion: req.body.direccion
    }
    Restaurante.update(restaurante, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar el restaurante con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Restaurantes.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar el restaurante con id: " + id);
    });
}

