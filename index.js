const cors = require("cors")
const express = require("express")
const botRouter = require("./router/bot.router")
require("dotenv").config()

const app = express()

app.use(botRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("Server is running at the port:" + PORT);
})