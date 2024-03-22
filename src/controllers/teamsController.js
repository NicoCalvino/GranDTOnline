const path = require("path")
const fs = require("fs")
const {validationResult} = require('express-validator')
const teamsModel = require("../models/teamsModel")
const playersModel = require("../models/playersModel")
const usersModel = require("../models/usersModel")

let rutaBase = "teams"

const controller = {
    create: async (req, res) => {
        let dtsPendientes = teamsModel.pendingDTs()
        res.render(rutaBase + "/create", {dtsPendientes})
    },
    firstUploead: async (req, res) => {
        let errores = validationResult(req)
        if(errores.isEmpty()){
            let dt = usersModel.findByField("apodo",req.body.dtEquipo)
            let titulares = []
            let suplentes=[]
            for (let i=1;i<=11;i++){
                let infoJugador = playersModel.findById("J" + req.body["tit"+i])
                titulares.push(infoJugador)
            }
            for (let i=1;i<=4;i++){
                let infoJugador = playersModel.findById("J" + req.body["sup"+i])
                suplentes.push(infoJugador)
            }

            res.render(rutaBase + "/create", {dt,titulares,suplentes})
        }else{
            let dtsPendientes = teamsModel.pendingDTs()
            res.render(rutaBase + "/create",{dtsPendientes, errores:errores.mapped(), oldInfo:req.body})
        }
    },
    finalUpload: async (req, res) => {
        let dt = usersModel.findByField("apodo",req.body.dtEquipo)
        let titulares = []
        let suplentes=[]
        for (let i=1;i<=11;i++){
            let infoJugador = playersModel.findById("J" + req.body["tit"+i])
            titulares.push(infoJugador)
        }
        for (let i=1;i<=4;i++){
            let infoJugador = playersModel.findById("J" + req.body["sup"+i])
            suplentes.push(infoJugador)
        }
        let errores = validationResult(req)
        if(errores.isEmpty()){
            let capitan = req.body.capitan
            teamsModel.updateTeam(dt,titulares, suplentes, capitan)
            res.redirect("/teams/create")
        }else{
            res.render(rutaBase + "/create",{dt,titulares,suplentes, errores:errores.mapped()})
        }
    },
    view: async (req, res) => {
        let dtParametro = req.params.apodo
        let equipo = teamsModel.findByDt(dtParametro)
        
        let titulos = ["ID","JUGADOR","CAP","POS","EQUIPO","VS","JUEGA CON","DIA","JUEGA","SUMA","PTOS","ACT","FIG","GOL","PEN","ORO","VIS","GEC","REC","AMA","ROJ","ERR","INV","PAT","BAS"]
        let titulares =[]
        let suplentes =[]
        let capitan = playersModel.findById(equipo.capitan)
        let dt = usersModel.findByField("apodo",dtParametro)
        equipo.titulares.forEach(id =>{
            titulares.push(playersModel.findById(id))
        })
        equipo.suplentes.forEach(id =>{
            suplentes.push(playersModel.findById(id))
        })

        res.render(rutaBase + "/viewRoster",{dt,titulos,titulares,suplentes,capitan})

    }
}

module.exports = controller