import express from 'express'
import mariadb from 'mariadb'
import { user } from './user-interactions/user-use-case'
import { userHash } from './user-interactions/hash-interaction'
import { userEmail } from './email-interactions/email-use-case'
import { userPurchase } from './purchase-interactions/purchase-use-case'
const jwt = require("jsonwebtoken");
export const routes = express.Router()
require("dotenv").config();

function checkToken(req: any, res: any, next: any) {
    let token = req.cookies.acess_token
    if(!token){
        return res.status(401)
    }
    try {
        let data =  jwt.verify(token, process.env.SECRET)
        res.locals.email = data.email
    }
    catch (err) {
        console.log(err)
        return res.sendStatus(403)
    }
    return next()
}


const conn = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'carloseduardo08',
    database: 'goldies_sa',
    port : 3306
})

routes.get('/', (req, res) => {
    conn.getConnection().then(
        () => { res.json(req.body) }
    )
})


routes.post('/register', async (req, res) => {
    const { nome, email, password } = req.body
    let obj = new userHash(password)
    let result = obj.hashPassword()
    let registerInteraction = new user(nome, email, await result)
    registerInteraction.registerUser()
    res.status(200)
})

routes.post('/login', (req, res) => {
    let { nome, email, password } = req.body
    console.log(nome, email, password)
    let obj = new user(nome, email, password)
    obj.loginUser()
    let token = jwt.sign({email : email}, process.env.SECRET)
    return res.cookie("acess_token", token, {domain : 'localhost', path: '/', httpOnly: false, secure : false}).status(200).json('Logged in !').send()
})

routes.post('/insertPurchase', checkToken, (req, res) => {
    const email = res.locals.email
    let obj = new userPurchase('', '', email, '', '', '')
    obj.insertItem()
})

routes.post('/purchase', checkToken, (req, res) => {
    let obj = new userPurchase(req.body.firstName, req.body.lastName, req.body.email, req.body.adress, parseFloat(req.body.price), req.body.discInfo)
    obj.purchaseItem()
    let emailObj = new userEmail(req.body.firstName, req.body.email)
    emailObj.sendEmail()
})

routes.post('/reset', async (req, res) => {
    const { nome, email, password } = req.body
    console.log(email)
    console.log(password)
    let hashObj = new userHash(password)
    let newPassword = hashObj.hashPassword()
    let obj = new user(nome, email, await newPassword)
    obj.changeUserPassword()
    console.log(req.body)
})

routes.post('/subscribe', async (req, res) => {
    const { user, email } = req.body
    let obj = new userEmail(user, email)
    obj.subscribeEmail()
})

routes.get('/itens', checkToken, async (req, res) => {
    const email = res.locals.email
    console.log(email)
    let obj = new user('', email, '')
    let result = await obj.returnPurchasesFromUser()
    console.log(result)
    res.json(result)
})
