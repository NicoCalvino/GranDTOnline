const path = require("path")
const fs = require("fs")
const {validationResult} = require('express-validator')
const usersModel = require("../models/usersModel")

let rutaBase = "users"

const controller = {
    create: async (req, res) => {
        res.render(rutaBase + "/register")
    },
    newTeam: async (req, res) => {
        let errores = validationResult(req)
        if(errores.isEmpty()){

            usersModel.newUser(req.body, req.file?.filename || "escudoGDT.png")

            res.redirect("/users/register")
        }else{
            res.render(rutaBase + "/register",{errores:errores.mapped(), oldInfo:req.body})
        }
    }
}

module.exports = controller