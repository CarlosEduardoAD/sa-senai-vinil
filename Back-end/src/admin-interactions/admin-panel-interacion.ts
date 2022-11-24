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
            let result = await (await conn).query('SELECT disco.nome, itens.id, itens.id_disco, itens.id_compra, compras.preco_total, compras.data, itens.quantidade, itens.enviado FROM itens INNER JOIN disco on itens.id_disco = disco.id INNER JOIN compras on itens.id_compra = compras.id')
            ;(await conn).end()
            console.log(result)
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
