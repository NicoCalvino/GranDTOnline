const path = require("path")
const fs = require("fs")
const edicionArchivosModel = require("./edicionArchivosModel")
const teamsModel = require("./teamsModel")

const model={
    dbJugadores: path.join(__dirname,"../database/jugadores.json"),
    dbJugadoresFecha: path.join(__dirname,"../database/jugadoresDeLaFecha.json"),
    
    getAll:function(){
        return edicionArchivosModel.readData(this.dbJugadores)
    },

    getAllIds:function(){
        let allPlayers = this.getAll()
        let ids =[]

        allPlayers.forEach(jugador => {
            ids.push(jugador.id.replace('J',''))
        })

        return ids
    },

    findById: function(id){
        let allPlayers = this.getAll()
        let playerFound = allPlayers.find( player => player.id == id)
        return playerFound
    },

    weekPlayers:function(){
        let jugadores = edicionArchivosModel.readData(this.dbJugadoresFecha)
        let infoCompleta = []

        jugadores.forEach(jugador => {
            let infoJugador = this.findById(jugador.id)
            
        })

    },

    updateWeekPlayers:function(equipos){
        let jugadores = []

        equipos.forEach(equipo => {
            let todosJugadores = equipo.titulares.concat(equipo.suplentes)

            todosJugadores.forEach(jugador =>{
                if(!jugadores.includes(jugador)){
                    jugadores.push({
                        id:jugador,
                        suma:'',
                        act:'',
                        fig:'',
                        gol:'',
                        pen:'',
                        oro:'',
                        vis:'',
                        gec:'',
                        rec:'',
                        ama:'',
                        roj:'',
                        err:'',
                        inv:'',
                        pat:'',
                        bas:''
                    })
                }
            })
        })
        edicionArchivosModel.saveData(this.dbJugadoresFecha,jugadores)
        return jugadores
    }

}

module.exports = model