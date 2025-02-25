const {Router} = require("express")
const { postBadWords } = require("../controller/bot.controller")

const botRouter = Router()

botRouter.post("/new_bad_word", postBadWords)

module.exports = botRouter