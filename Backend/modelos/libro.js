'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoSchema = Schema(
    {
      nombre:String,
      autor:String,
      year:{type:Number},
      idioma:{type: String, enum:["inglés","español","ingles","español","Inglés","Español","Portugués"], required: true} //Enum (buscar tipo de dato)
    })

module.exports = mongoose.model('libro',AutoSchema)    