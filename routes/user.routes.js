const express = require("express")
const { getDbUserPage, saveDbUser, getDbUser } = require("../controllers/user.controller")
const router = express.Router()


router.get("/addDbUser", getDbUserPage)
router.post("/addDbUser", saveDbUser)
router.get("/dbUsers", getDbUser)

module.exports=router