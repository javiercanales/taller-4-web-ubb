'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

 var cors = require('cors')
 app.use(cors())
 app.options('*', cors());

var persona_routes = require('./routes/personaRoute');
var auto_routes = require('./routes/autoRoute');
var auto_person_routes = require('./routes/autopersonaRoute');
var profesor_routes = require('./routes/profesoreRoute');
var asignatura_routes = require('./routes/asignaturaRoute');
var persona_asignatura_routes = require('./routes/personas_asignaturaRoute');
var libro_routes = require('./routes/libroRoute');

const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', persona_routes);
app.use('/api', auto_routes);
app.use('/api', auto_person_routes);
app.use('/api', profesor_routes);
app.use('/api', asignatura_routes);
app.use('/api', persona_asignatura_routes);
app.use('/api', libro_routes);

mongoose.connect('mongodb+srv://javiercanales:javiercc@cluster0-teszm.mongodb.net/tallerweb?retryWrites=true&w=majority', (err, res) => {

    if(err){
        console.log("NO CONECTA")
    }
    app.listen(4000, () => {
        console.log("Esta corriendo en puerto 4000")
    })
})

/**
 * 			Taller 4 

Utilizando react js, genere la inserción y carga de datos para la entidad Libros utilizando el backend que se realizo en el taller 3. 

Considere crear los inputs para registrar el libro (utilice React-Hooks-Form) 
Y al presionar Enviar → Llamar al metodo Post de guardar libros. → utilice axios
Al momento de guardar recargue la tabla

Para la tabla(utilice materia-Datatable) considerar el end point que recupera todos los libros.

Utilizar como ejemplo el proyecto adjunto 

Ojo con 2 cosas:
Corse en el backend, miren las lines 6,7 y 8 del index del proyecto adjunto. 

En el front si van a ver en ejecucion el proyecto adjunto, recuerden que deben instalar paquetes que tiene el package.json, para eso  deben utilizar npm install (al nivel del directorio del proyecto) 
o yarn install (si es que instalaron este gestor de paquetes)

para ejecutar npm start o yarn start

 */