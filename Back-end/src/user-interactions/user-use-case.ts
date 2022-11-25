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

export class user {
    public name: string;
    public email: string;
    public password: string;


    constructor(name?: any, email?: any, password?: any) {
        this.name = name
        this.email = email
        this.password = password
    }

    public registerUser() {
        pool.getConnection().then(() => {
            pool.query(`INSERT INTO usuario (nome, email, senha) VALUES (${this.name}, ${this.email}, '${this.password.toString()}')`)
                .then(() => { console.log('Data inserted sucessfully'); })
                .catch((e) => { console.log(e) })
        })
    }

    public async loginUser() {
        console.log('Essa é o email: ' + this.email)
        console.log('Essa é a senha: ' + this.password)
        try {
            let conn = await pool.getConnection()
            const rows = await conn.query(`SELECT senha, id from usuario WHERE email = ${this.email}`)
            if (rows[0] === undefined) {
                return null
            }
            let result = rows[0]['senha']
            let id = rows[0]['id']
            console.log('Essa é a senha que retornei: ' + result)
            const pwCheck = await bcrypt.compare(this.password, (result))
            console.log(pwCheck)
            ;(await conn).end()
            if (!pwCheck) {
                return null
            }
             else {
                return true
            }
        } catch (err) {
            console.log(err)
        }
    }

    public async returnPurchasesFromUser() {
        try {
            let conn = await pool.getConnection()
            const idQuery = await conn.query(`SELECT id FROM usuario WHERE email = ${this.email}`)
            const id = idQuery[0]['id']
            const result = await conn.query('select disco.id, nome, cantor, ano, data from disco inner join itens on itens.id_disco = disco.id inner join compras on itens.id_compra = compras.id where id_user = ?', [id])
            console.log(JSON.stringify(result))
            ;(await conn).end()
            return result
        }
        catch (err) {
            console.log(err)
        }
    }

    public async changeUserPassword() {
        try {
            console.log('Essa é o email: ' + this.email)
            console.log('Essa é a senha: ' + this.password)
            const conn = pool.getConnection()
            let query = await (await conn).query('UPDATE usuario SET senha = ? WHERE email = ?', [this.password, this.email])
            console.log(query)
            ;(await conn).end()
        } catch (err) {
            console.log(err)
        }
    }
}
