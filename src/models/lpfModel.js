const path = require("path")
const fs = require("fs")
const edicionArchivosModel = require("./edicionArchivosModel")

const model={
    dbFechas: path.join(__dirname,"../database/fechasLPF.json"),
    dbEquipos: path.join(__dirname,"../database/equiposLPF.json"),

    getAll:function(){
        return edicionArchivosModel.readData(this.dbFechas)
    },

    getAllTeams:function(){
        return edicionArchivosModel.readData(this.dbEquipos)
    },

    findByNum: function(num){
        let allWeeks = this.getAll()
        let weekFound = allWeeks.find( week => week.num == num)
        return weekFound
    },

}

module.exports = model