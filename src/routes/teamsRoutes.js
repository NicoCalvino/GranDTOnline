const express = require ("express")
const path = require("path")
const app = express()
const teamsModel = require("../models/teamsModel")
const playersModel = require("../models/playersModel")
const {body} = require("express-validator")

let camposIdJugadores = []
for(let i = 1;i<=11;i++){
  camposIdJugadores.push("tit"+i)
}
for(let i = 1;i<=4;i++){
  camposIdJugadores.push("sup"+i)
}

todosIds = playersModel.getAllIds()

const initialValidation=[
    body("dtEquipo").notEmpty().withMessage("INDICAR TECNICO"),
    body(camposIdJugadores).notEmpty().withMessage("INDICAR ID").isLength({ min: 4}).withMessage("ID INCORRECTO").isIn(todosIds).withMessage("ID NO ENCONTRADO")
]

const finalValidation=[
    body("capitan").notEmpty().withMessage("FALTA INDICAR CAPITAN"),
    body("dtRepetido").custom((value, {req}) => {
        let dtElegido = req.body.dtEquipo
        let dtsCargados = teamsModel.dtCargados()

        if (dtsCargados.includes(dtElegido)){
          throw new Error("YA HAY UN EQUIPO CARGADO PARA ESTE DT")
        }
        return true
      })
]

const router = express.Router()

const teamsController = require("../controllers/teamsController")

router.get("/create", teamsController.create)
router.get("/view/:apodo", teamsController.view)
router.post("/firstUpload", initialValidation, teamsController.firstUploead)
router.post("/finalUpload", finalValidation, teamsController.finalUpload)

module.exports=router