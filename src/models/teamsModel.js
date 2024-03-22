const path = require("path")
const fs = require("fs")
const bcryptjs = require("bcryptjs")
const edicionArchivosModel = require("./edicionArchivosModel")
const jugadoresModel = require("./playersModel")
const usersModel = require("./usersModel")
const multer = require("multer")

const model={
    dbEquipos: path.join(__dirname,"../database/equipos.json"),

    getAll:function(){
        return edicionArchivosModel.readData(this.dbEquipos)
    },

    findByDt: function(dt){
        let allTeams = this.getAll()
        let teamFound = allTeams.find( equipo => equipo.dt == dt)
        return teamFound
    },

    dtCargados:function(){
        let allTeams = this.getAll()
        let dts = []
        allTeams.forEach(equipo => {
            dts.push(equipo.dt)
        })
        return dts
    },

    pendingDTs:function(){
        let allDts = usersModel.attributeList("apodo")
        let dtsUsados = this.dtCargados()
        let dts=[]

        allDts.forEach(dt => {
            if (dtsUsados.includes(dt)==false){
                dts.push(dt)
            }    
        })

        return dts
    },

    updateTeam: function(dt, titulares, suplentes, capitan){
        let allTeams = this.getAll()

        let codigosTitulares =[]
        let codigosSuplentes =[]

        titulares.forEach(jugador=>{
            codigosTitulares.push(jugador.id)
        })
        suplentes.forEach(jugador=>{
            codigosSuplentes.push(jugador.id)
        })

        let newTeam ={
            dt:dt.apodo,
            titulares:codigosTitulares,
            suplentes:codigosSuplentes,
            capitan:capitan,
        }
        allTeams.push(newTeam)
        edicionArchivosModel.saveData(this.dbEquipos,allTeams)
        jugadoresModel.updateWeekPlayers(allTeams)
        console.log("estoy en teamsModel y actualice los jugadores de la fecha")
        return newTeam
    }
}

module.exports = model