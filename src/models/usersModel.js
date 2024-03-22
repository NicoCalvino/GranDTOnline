const path = require("path")
const fs = require("fs")
const bcryptjs = require("bcryptjs")
const edicionArchivosModel = require("./edicionArchivosModel")
const multer = require("multer")

const model={
    dbUsuarios: path.join(__dirname,"../database/usuarios.json"),

    getAll:function(){
        return edicionArchivosModel.readData(this.dbUsuarios)
    },

    newId: function(){
        let allUsers = this.getAll()
        let lastUser = allUsers.pop()
        if (lastUser){
            return lastUser.id + 1
        }
        return 1
    },

    findById: function(id){
        let allUsers = this.getAll()
        let userFound = allUsers.find( usuario => usuario.id == id)
        return userFound
    },

    findByField: function(field, info){
        let allUsers = this.getAll()
        let userFound = allUsers.find( usuario => usuario[field] == info)
        return userFound
    },

    attributeList: function(field){
        let allUsers = this.getAll()
        let list = []
        allUsers.forEach(user=>{
            list.push(user[field])
        })
        return list
    },

    newUser: function(info, escudo){
        let allUsers = this.getAll()

        let newUser ={
            id:this.newId(),
            tipo:"DT",
            nombre:info.nombre,
            apellido:info.apellido,
            equipo:info.equipo,
            password: bcryptjs.hashSync(info.equipo,10),
            apodo:info.apodo,
            escudo: escudo.filename
        }
        allUsers.push(newUser)
        edicionArchivosModel.saveData(this.dbUsuarios,allUsers)
        return newUser
    }
}

module.exports = model