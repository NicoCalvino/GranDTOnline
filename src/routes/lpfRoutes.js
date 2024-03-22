const express = require ("express")
const app = express()
const {body} = require("express-validator")

let camposLocales = []
let camposVisitantes = []

for(let i = 1;i<=14;i++){camposLocales.push("local"+i)}
for(let i = 1;i<=14;i++){camposVisitantes.push("visitante"+i)}

let camposJuntos = camposLocales.concat(camposVisitantes)

const weekValidations=[
    body(camposLocales).notEmpty().withMessage("INDICAR LOCAL"),
    body(camposVisitantes).notEmpty().withMessage("INDICAR VISITANTE"),
    body(camposJuntos).custom((value, {req}) =>{
        let rep = 0
        camposJuntos.forEach(campo => {
            let valorCampo = req.body[campo]
            if(valorCampo == value){
                rep = rep +1
            }
        })
        if (rep >1){
            console.log(rep + " VOY A DAR ERROR")
            throw new Error('ESTE EQUIPO ESTA REPETIDO')
        }
        return true
    })
]

const router = express.Router()

const lpfController = require("../controllers/lpfController")

router.get("/", lpfController.index)
router.get("/week/:weekNo", lpfController.weekTimes)
router.post("/week/:weekNo", weekValidations, lpfController.updateWeekTimes)

module.exports=router