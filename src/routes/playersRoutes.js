const express = require ("express")
const path = require("path")
const app = express()

const router = express.Router()

const playersController = require("../controllers/playersController")

router.get("/weekPlayers", playersController.index)

module.exports=router