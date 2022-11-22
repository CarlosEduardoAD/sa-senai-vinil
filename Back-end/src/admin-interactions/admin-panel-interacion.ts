import mariadb from 'mariadb'
import bcrypt from 'bcrypt'
require("dotenv").config();
const jwt = require('jsonwebtoken')

const pool = mariadb.createPool({
    host: '127.0.0.1',
    database: 'goldies_sa',
    password: 'carloseduardo08',
    user: 'root'
})

export class admin {
    public id?: any;

    constructor(id?: any) {
        this.id = id
    }

    public async getAllItems() {
        try {
            const conn = pool.getConnection()
            let result = await (await conn).query('SELECT * FROM itens')
            ;(await conn).end()
            return result
        } catch (err) {
            console.log(err)
        }
    }

    public async setDelivered() {
        try {
            console.log("Este é o Id " + this.id)
            const conn = pool.getConnection()
            let result = await (await conn).query(`UPDATE itens SET enviado = 1 WHERE id = "${this.id}"`)
            ;(await conn).end()
            return result
        } catch (err) {
            console.log(err)
        }
    }
}
