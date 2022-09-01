import express from 'express'
export const routes = express.Router()
import mariadb from 'mariadb'
import { Pool } from 'pg'

routes.get('/', (req, res) => {
    const conn = mariadb.createPool({
        host : 'localhost',
        user : 'root',
        password : 'carloseduardo08',
        database : 'goldies_sa'
    })
    conn.getConnection().then(
        () => {res.send('sim')}
    )
})


routes.get('/register', (req,res) => {{
    res.send('eu existo')
}
})
