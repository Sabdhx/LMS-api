const express = require("express")
const { createUser, signIn, userVerification, userLogout} = require("../controller/auth.js")

const router = express.Router();

router.post('/create-user',createUser)
router.post('/login',signIn)
router.get('/user',userVerification)
router.get('/logout',userLogout)

module.exports = router