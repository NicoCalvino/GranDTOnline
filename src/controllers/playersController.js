const path = require("path")
const fs = require("fs")
const playersModel = require("../models/playersModel")

let rutaBase = "main"

const controller = {
    index: async (req, res) => {
        let usuarios = playersModel.getAll()
        res.render(rutaBase + "/admin",{usuarios})
    }
}

module.exports = controller