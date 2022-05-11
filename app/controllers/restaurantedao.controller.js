const db = require("../models");
const Restaurante = db.Restaurante;
const Op = db.Sequelize.Op;



//CREACION DE UN RESTAURANTE
exports.create = (req, res) => {
// Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Debe enviar el nombre del restaurante!"
        });
        return;
    }
    if (!req.body.direccion) {
        res.status(400).send({
            message: "Debe enviar la direccion del restaurante!"
        });
        return;
    }
// crea un registro restaurante
    const restaurante = {
        nombre: req.body.nombre,
        direccion: req.body.direccion
    };
// Guardamos a la base de datos
    Restaurante.create(restaurante)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear el restaurante."
            });
        });
};

//obtener un restaurante a partir de un id especifico
exports.findOne = (req, res) => {
    const id = req.params.id;
    Restaurante.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al encontrar el restaurante con id=" + id
            });
        });
};


//obtener todos los restaurantes
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { cliente: { [Op.iLike]: `%${nombre}%` } } : null;
    Restaurante.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener la lista de restaurantes."
            });
        });
};