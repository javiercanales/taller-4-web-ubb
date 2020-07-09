'use strict'

// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Libro = require('../modelos/libro.js');


function listarTodos(req,res){

    Libro.find({},(err,libro)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!libro) return res.status(404).send({message:'Error el libro no existe'})

         res.status(200).send({libro})
     })
}

function listarPorID(req,res){
    let idLibro = req.params.id
    Libro.findById(idLibro,(err,libro)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!libro) return res.status(404).send({message:'Error el libro no existe'})

         res.status(200).send({libro})
     })
  }

function listarByYear(req,res){
    //    let nombrereq = req.params.nombre

    //ATENCIÓN --------------> importante!
    //params ->viene en la ruta sin nombre de paramertro ej persona/1 
    //query viene con un nombre de parametro en forma de get
    let yearreq = req.params.year
    console.log("El año: "+yearreq);
    Libro.find({ year: yearreq}, (err, libro) => {
        if (!libro) return res.status(404).send({ message: 'Error libro no existe' })
        res.status(200).send({ libro })
    })
}

function listarPorIdioma(req,res){
    //ATENCIÓN --------------> importante!
    //params ->viene en la ruta sin nombre de paramertro ej persona/1 
    //query viene con un nombre de parametro en forma de get
    let idiomareq = req.query.idioma
    console.log("El idioma: "+idiomareq)
    Libro.find({ idioma: idiomareq}, (err, libro) => {
        if (!libro) return res.status(404).send({ message: 'Error libro no existe' })
        res.status(200).send({ libro })
    })
}

// Creamos un método en el controlador, en este caso una accion de pruebas
function guardar(req, res) {

    // Devolvemos una respuesta en JSON
    let libro = new Libro()
    libro.nombre = req.body.nombre
    libro.autor = req.body.autor
    libro.year = req.body.year
    libro.idioma = req.body.idioma

    console.log(libro);
    if (libro.nombre && libro.autor && libro.year && libro.idioma) {
        libro.save((err, libroStore) => {

            if (err) res.status(500).send(`Error base de datos> ${err}`)
    
            res.status(201).send({ libro: libroStore })
        })
    } else {
        res.status(400).send("No vienen todos los campos!")
    }
}
function modificar(req, res) {

    // Devolvemos una respuesta en JSON 
    let id = req.params.id
    let libro = new Libro()
    libro.nombre = req.body.nombre
    libro.autor = req.body.autor
    libro.year = req.body.year
    libro.idioma = req.body.idioma
    libro._id = id

    if (libro.nombre && libro.autor && libro.year && libro.idioma) {
        Libro.findByIdAndUpdate({_id: id}, libro, (err, libroStore) => {

            if (err) res.status(500).send(`Error base de datos> ${err}`)
    
            res.status(200).send("Se ha actualizado el libro")
    
        })
    } else {
        res.status(400).send("No vienen todos los campos!")
    }
}
function borrar(req, res) {

    // Devolvemos una respuesta en JSON
    let id = req.params.id
    Libro.findByIdAndDelete({_id: id},(err, libroDeleted) => {

        if (err) res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send("Se ha borrado el libro")

    })
}

function listarTest(req,res){
    //    let nombrereq = req.params.nombre

    //ATENCIÓN --------------> importante!
    //params ->viene en la ruta sin nombre de paramertro ej persona/1 
    //query viene con un nombre de parametro en forma de get
    let yearreq = req.params.year
    let idiomareq = req.params.idioma
    console.log("El año: "+yearreq);
    console.log("Idioma: "+idiomareq);
    Libro.find({ "year": yearreq, "idioma": idiomareq}, (err, libro) => {
        if (!libro) return res.status(404).send({ message: 'Error libro no existe' })
        res.status(200).send({ libro })
    })
}
function listarIdiomaYear(req,res){
    //    let nombrereq = req.params.nombre

    //ATENCIÓN --------------> importante!
    //params ->viene en la ruta sin nombre de parametro ej persona/1 
    //query viene con un nombre de parametro en forma de get
    let yearreq = req.query.year
    let idiomareq = req.query.idioma
    console.log("El año: "+yearreq);
    console.log("Idioma: "+idiomareq);
    Libro.find({ "year": yearreq, "idioma": idiomareq}, (err, libro) => {
        if (!libro) return res.status(404).send({ message: 'Error libro no existe' })
        res.status(200).send({ libro })
    })
}


module.exports = {
    listarTodos,
    listarPorID,
    listarByYear,
    listarPorIdioma,
    guardar,
    modificar,
    borrar,
    listarTest,
    listarIdiomaYear
};
