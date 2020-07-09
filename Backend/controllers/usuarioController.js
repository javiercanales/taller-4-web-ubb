'use strict'

// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Usuario = require('../modelos/usuario.js');

function guardar(req, res) {

    // Devolvemos una respuesta en JSON

    let usuario = new Usuario({
        usuario = req.body.usuario,
        mail = req.body.mail,
        pass = req.body.pass

    })
 

    usuario.save((err, usuariorstore) => {

        if (err) res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send({ "mensaje":"creado correctamente" })

    })
}

function validar(req,res){
   
    Usuario.find({usuario:req.body.usuario,pass:req.body.pass},(err,usuario)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!usuario) return res.status(404).send({message:'Error usuario no existe'})

         
     })

}

module.exports = {
    guardar
    
};
