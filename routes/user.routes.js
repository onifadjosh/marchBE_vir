const express = require("express")
const { getDbUserPage, saveDbUser, getDbUser, deleteDbUser, editDbUser, login, verifyUser } = require("../controllers/user.controller")
const router = express.Router()


router.get("/addDbUser", getDbUserPage)
router.post("/addDbUser", saveDbUser)
router.get("/dbUsers", verifyUser, getDbUser)
router.delete("/user/:id", deleteDbUser)
router.patch("/user/:id", editDbUser)
router.post("/login", login)

module.exports=router