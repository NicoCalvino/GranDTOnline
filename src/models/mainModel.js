const path = require ("path")
const fs = require("fs")
const edicionArchivosModel = require("./edicionArchivosModel")

const model = {    
    dbInfo: path.join(__dirname,"../database/infoTorneo.json"),
    infoTorneo:function(){
        let info = edicionArchivosModel.readData(this.dbInfo)
        return info
    }
}

module.exports=model