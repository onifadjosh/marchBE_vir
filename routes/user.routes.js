const express = require("express")
const { getDbUserPage, saveDbUser, getDbUser, deleteDbUser } = require("../controllers/user.controller")
const router = express.Router()


router.get("/addDbUser", getDbUserPage)
router.post("/addDbUser", saveDbUser)
router.get("/dbUsers", getDbUser)
router.delete("/user/:id", deleteDbUser)

module.exports=router