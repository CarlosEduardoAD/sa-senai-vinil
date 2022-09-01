import express from 'express'
export const routes = express.Router()
import mariadb from 'mariadb'
import { user } from './user-interactions/register-user-interaction'
import { userEmail } from './email-interactions/send-email-interaction'

routes.get('/', (req, res) => {
    const conn = mariadb.createPool({
        host : 'localhost',
        user : 'root',
        password : 'carloseduardo08',
        database : 'goldies_sa'
    })
    conn.getConnection().then(
        () => {res.json(req.body)}
    )
})


routes.post('/register', (req, res) => {{
    const {nome , email, password} = req.body
    let registerInteraction = new user(nome, email, password)
    registerInteraction.registerUser()
    res.send('Deu certo a inserção no banco de bakas')
}
})
