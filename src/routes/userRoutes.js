const express = require ("express")
const path = require("path")
const app = express()
const multer = require("multer")
const {body} = require("express-validator")

const userValidations=[
    body("nombre").notEmpty().withMessage("INDICAR NOMBRE"),
    body("apellido").notEmpty().withMessage("INDICAR APELLIDO"),
    body("apodo").notEmpty().withMessage("INDICAR APODO"),
    body("equipo").notEmpty().withMessage("INDICAR NOMBRE EQUIPO"),
]

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        let folder = path.join(__dirname, "../public/img/escudos")
        cb(null,folder)
    },
    filename:function(req,file,cb){
        cb(null, Date.now() + '_img_'+ path.extname(file.originalname))
    }
})

let fileUpload = multer({storage: storage })

const router = express.Router()

const userController = require("../controllers/userController")

router.get("/register", userController.create)
router.post("/create", fileUpload.single('escudo'), userValidations, userController.newTeam)

module.exports=router