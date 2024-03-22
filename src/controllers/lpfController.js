const path = require("path")
const fs = require("fs")
const lpfModel = require("../models/lpfModel")
const mainModel = require("../models/mainModel")
const {validationResult} = require('express-validator')


let rutaBase = "lpf"

const controller = {
    index: async (req, res) => {
        let infoTorneo = mainModel.infoTorneo()

        res.render(rutaBase + "/lpf",{infoTorneo})
    },
    weekTimes:async (req, res) => {
        let nroFecha = req.params.weekNo
        let infoFecha = lpfModel.findByNum(nroFecha)
        let equiposLPF = lpfModel.getAllTeams()
        if (infoFecha){

        }else{
            res.render(rutaBase + "/lpfNewTimes",{nroFecha, equiposLPF})
        }
        
    },
    updateWeekTimes:async (req, res) => {
        let nroFecha = req.params.weekNo
        let errores = validationResult(req)
        if (errores.isEmpty()){
            
        } else {
            let equiposLPF = lpfModel.getAllTeams()
            res.render(rutaBase + "/lpfNewTimes",{nroFecha,equiposLPF, errores:errores.mapped()})
        }
        
    }
}

module.exports = controller