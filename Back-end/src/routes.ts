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
        res.send('Data sucessfully inserted')
    }
})

routes.post('/login', (req, res) => {
    let {nome, email, password } = req.body
    console.log(nome, email, password)
    let obj = new user(nome, email, password)
    obj.loginUser()
    res.status(200).send('User Found !')
})

routes.post('/purchase', (req, res) => {
    let {fn, ln, email, age, add} = req.body
    let obj = new userPurchase(fn, ln, email, age, add)
    obj.purchaseItem()
    console.log(req.body)

})
