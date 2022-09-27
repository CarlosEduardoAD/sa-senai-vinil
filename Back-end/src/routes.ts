import express from 'express'
export const routes = express.Router()
import mariadb from 'mariadb'
import { user } from './user-interactions/user-use-case'
import { userHash } from './user-interactions/hash-interaction'
import { userEmail } from './email-interactions/email-use-case'
import { userPurchase } from './purchase-interactions/purchase-use-case'

const conn = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'carloseduardo08',
    database: 'goldies_sa'
})

routes.get('/', (req, res) => {
    conn.getConnection().then(
        () => { res.json(req.body) }
    )
})


routes.post('/register', async (req, res) => {
    {
        const { nome, email, password } = req.body
        let obj = new userHash(password)
        let result = obj.hashPassword()
        let registerInteraction = new user(nome, email, await result)
        registerInteraction.registerUser()
        res.status(200)
    }
})

routes.post('/login', (req, res) => {
    let { nome, email, password } = req.body
    console.log(nome, email, password)
    let obj = new user(nome, email, password)
    obj.loginUser()
    res.status(200).send('User Found !')
})

routes.post('/purchase', (req, res) => {
    console.log(req.body.firstName)
    let obj = new userPurchase(req.body.firstName, req.body.lastName, req.body.email, req.body.adress, parseFloat(req.body.price))
    obj.purchaseItem()
    let emailObj = new userEmail(req.body.firstName, req.body.email)
    emailObj.sendEmail()
    console.log(req.body)
})

routes.post('/reset', async (req, res) => {
    const {nome, email, password} = req.body
    console.log(email)
    console.log(password)
    let hashObj = new userHash(password)
    let newPassword = hashObj.hashPassword()
    let obj = new user(nome, email, await newPassword)
    obj.changeUserPassword()
    console.log(req.body)
})

