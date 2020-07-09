'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var libroController = require('../controllers/libroController');
 
// Llamamos al router
var api = express.Router();
 
// Rutas para guardar, obtener, modificar y eliminar libros
api.post('/libro', libroController.guardar);
api.get('/libro', libroController.listarTodos);
api.get('/libroporid/:id', libroController.listarPorID);

api.get('/libroidiomayear', libroController.listarIdiomaYear);
//para un get con varios parametros en la forma ..api?id=1&nombre=javier&...
//se capturan con query
api.get('/librotest/:year/:idioma', libroController.listarTest);
//para un get con varios parametros en la forma ..api/id/nombre/.../etc
//se capturan con params

api.put('/libro/:id', libroController.modificar);
api.delete('/libro/:id', libroController.borrar);

//ignorar estos
api.get('/librobyyear/:year', libroController.listarByYear);
api.get('/libroporidioma', libroController.listarPorIdioma);

// Exportamos la configuración
module.exports = api;

