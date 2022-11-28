import express from 'express'
import mariadb from 'mariadb'
import { user } from './user-interactions/user-use-case'
import { userHash } from './user-interactions/hash-interaction'
import { userEmail } from './email-interactions/email-use-case'
import { userPurchase } from './purchase-interactions/purchase-use-case'
import { admin } from './admin-interactions/admin-panel-interacion'
const jwt = require("jsonwebtoken");
export const routes = express.Router()
require("dotenv").config();

function checkToken(req: any, res: any, next: any) {
    let token = req.cookies.acess_token
    console.log(token)
    if (!token) {
        return res.status(401)
    }
    try {
        let data = jwt.verify(token, process.env.SECRET)
        res.locals.email = data.email
    }
    catch (err) {
        console.log(err)
        return res.sendStatus(403)
    }
    return next()
}

function checkAdminToken(req: any, res: any, next: any) {
    let token = req.cookies.admin_token
    console.log("vegeta olha aqui: " + token)
    if (!token) {
        return res.status(401)
    }
    try {
        let data = jwt.verify(token, process.env.SECRET)
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
    port: 3306
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
    const status = await registerInteraction.registerUser()
    console.log("Este é o Status : " + status)
    if (status === null) {
        res.status(403).send("The e-mail already exists")
    } else {
        res.status(200)
    }
})

routes.post('/login', async (req, res) => {
    let { nome, email, password } = req.body
    console.log("Eu tô na routes: " + email + password)
    let obj = new user(nome, email, password)
    const resStatus = await obj.loginUser()
    console.log(resStatus + "pq ?")
    if (resStatus == null) {
        res.status(403).send()
    } else if (resStatus === true) {
        console.log('Login funcionando')
        let token = jwt.sign({ email: email }, process.env.SECRET)
        return res.cookie("acess_token", token, { domain: 'localhost', path: '/', httpOnly: false, secure: false }).status(200).send()
    }
})

routes.post('/insertPurchase', checkToken, (req, res) => {
    const email = res.locals.email
    let obj = new userPurchase('', '', email, '', '', '', '', '')
    obj.insertItem()
})

routes.post('/purchase', checkToken, (req, res) => {
    const email = res.locals.email
    console.log(email)
    let obj = new userPurchase(req.body.firstName, req.body.lastName, email, req.body.adress, parseFloat(req.body.price), req.body.discInfo, req.body.gift, req.body.paymentMethod)
    obj.purchaseItem()
    let emailObj = new userEmail(req.body.firstName, email, req.body.firstName, req.body.lastName, req.body.adress, req.body.phone, req.body.paymentMethod)
    emailObj.sendEmail()
    emailObj.sendEmailToOwner()
})

routes.post('/reset', async (req, res) => {
    const { nome, email, password } = req.body
    console.log(email)
    console.log(password)
    let hashObj = new userHash(password)
    let newPassword = await hashObj.hashPassword()
    console.log(newPassword)
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

routes.get('/admin_itens', checkAdminToken, async (req, res) => {
    let obj = new admin()
    const result = await obj.getAllItems()
    console.log(result)
    res.json(result)
})


routes.put('/update_purchase', async (req, res) => {
    console.log(req.query)
    const purchaseId = req.query.id
    console.log("Id lá do routes " + purchaseId)
    let obj = new admin(purchaseId)
    await obj.setDelivered()
})

routes.post('/admin_login', async (req, res) => {
    let { nome, email, password } = req.body
    console.log("Eu tô na routes: " + email + password)
    let obj = new user(nome, email, password)
    const resStatus = await obj.loginUser()
    console.log(resStatus + " pq ?")
    if (resStatus == null) {
        res.status(403).send()
    } else if (resStatus === true) {
        console.log('Login funcionando')
        let token = jwt.sign({ email: email }, process.env.SECRET)
        return res.cookie("admin_token", token, { domain: 'localhost', path: '/', httpOnly: false, secure: false }).status(200).send()
    }
})

routes.post('/user_email', async (req, res) => {
    let { nome, email, password } = req.body
    console.log("Eu tô na routes: " + email + password)
    let obj = new user(nome, email, password)
    const resStatus = await obj.loginUser()
    console.log(resStatus + " pq ?")
    if (resStatus == null) {
        res.status(403).send()
    } else if (resStatus === true) {
        console.log('Login funcionando')
        let token = jwt.sign({ email: email }, process.env.SECRET)
        return res.cookie("admin_token", token, { domain: 'localhost', path: '/', httpOnly: false, secure: false }).status(200).send()
    }
})

routes.get('/user_email', checkToken, async (req, res) => {
    const email = res.locals.email
    console.log(email)
    res.send(email)
})
