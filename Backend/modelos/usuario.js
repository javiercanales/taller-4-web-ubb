'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UsuarioSchema = Schema(
    {
      usuario:String,
      mail: String,
      pass:String
     
      

    })

module.exports = mongoose.model('usuario',UsuarioSchema)    