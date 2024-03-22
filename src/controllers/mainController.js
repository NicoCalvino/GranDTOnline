const path = require("path")
const fs = require("fs")
const usersModel = require("../models/usersModel")
const mainModel = require("../models/mainModel")

let rutaBase = "main"

const controller = {
    index: async (req, res) => {
        let usuarios = usersModel.getAll()
        let infoTorneo = mainModel.infoTorneo()
        console.log(infoTorneo)
        res.render(rutaBase + "/admin",{usuarios, infoTorneo})
    }
}

module.exports = controller