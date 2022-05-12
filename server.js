const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
    origin: "http://localhost:9091"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Tp Backend - Segunda Parcial" });
});

// set port, listen for requests
const PORT = process.env.PORT || 9090;

require("./app/routes/cliente.routes")(app);
require("./app/routes/restaurante.routes")(app);
require("./app/routes/mesa.routes")(app);
require("./app/routes/reservacion.routes")(app);

app.listen(PORT, () => {
    console.log('Servidor corriendo en puerto 9090: http://localhost:9090/.');
});
