const express = require('express');
const routes = express.Router();
const controllerOng = require("./controllers/OngController");
const sessionController = require("./controllers/SessionController");
const controllerIncidents = require("./controllers/IncidentController");

routes.post('/sessions',sessionController.create);

routes.get('/ongs', controllerOng.all);

routes.post('/ongs',controllerOng.create);

routes.post('/incidents',controllerIncidents.create);

routes.get('/incidents', controllerIncidents.all);

routes.get('/all_incidents',controllerIncidents.allByOng);

routes.delete('/incidents/:id',controllerIncidents.delete);


module.exports = routes;