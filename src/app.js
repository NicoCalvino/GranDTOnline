const path = require("path");
const express =require("express");
const app = express()
const PORT = process.env.PORT || 3000;

const mainRoutes = require("./routes/mainRoutes")
const userRoutes = require("./routes/userRoutes")
const teamsRoutes = require("./routes/teamsRoutes")
const playersRoutes = require("./routes/playersRoutes")
const lpfRoutes = require("./routes/lpfRoutes")

app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))

app.use(express.urlencoded({extender:false}))
app.use(express.json())

app.use(express.static(path.join(__dirname,"public")))

app.use("/users", userRoutes)
app.use("/teams", teamsRoutes)
app.use("/players", playersRoutes)
app.use("/lpf", lpfRoutes)
app.use("/", mainRoutes)

app.listen(PORT, function(){console.log("Gran DT Online corriendo en " + PORT)});