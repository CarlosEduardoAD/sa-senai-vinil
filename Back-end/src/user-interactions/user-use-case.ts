import mariadb from 'mariadb'
import bcrypt from 'bcrypt'
require("dotenv").config();
const jwt = require("jsonwebtoken");

export class user {
    public _name: string;
    public _email: string;
    public password: string;


    constructor(name?: any, email?: any, password?: any) {
        this._name = name
        this._email = email
        this.password = password
    }

    public registerUser() {
        const pool = mariadb.createPool({
            host: 'localhost',
            database: 'goldies_sa',
            password: 'carloseduardo08',
            user: 'root'
        })
        pool.getConnection().then(() => {
            pool.query(`INSERT INTO usuario (nome, endereco, email, fone, senha) VALUES (${this._name}, 'rua dos sussy bakas', ${this._email}, '00 12345-1234', '${this.password.toString()}')`)
                .then(() => { console.log('Data inserted sucessfully') })
                .catch((e) => { console.log(e) })
        })
    }

    public async loginUser() {
        const pool = mariadb.createPool({
            host: 'localhost',
            database: 'goldies_sa',
            password: 'carloseduardo08',
            user: 'root'
        })
        try {
            console.log('Essa é o email: ' + this._email)
            console.log('Essa é a senha: ' + this.password)
            let conn = await pool.getConnection()
            const rows = await conn.query(`SELECT senha, id from usuario WHERE email = ${this._email}`)
            let result = rows[0]['senha']
            let id = rows[0]['id']
            console.log('Essa é a senha que retornei: ' + result)
            bcrypt.compare(this.password, String(result), function (err, res) {
                if (err) {
                    console.log(err)
                }
                else {
                    try {
                        console.log(res)
                    } catch (err) {
                        console.log(err)
                    }

                }
            })
        } catch (err) {
            return "Wrong password"
        }
    }

    public async returnPurchasesFromUser() {
        const pool = mariadb.createPool({
            host: 'localhost',
            database: 'goldies_sa',
            password: 'carloseduardo08',
            user: 'root'
        })

        try {
            let conn = await pool.getConnection()
            const result = await conn.query('SELECT * FROM compras WHERE nome = ?', [this._name])
            console.log(result)
        }
        catch (err) {
            console.log(err)
        }
    }

    public async changeUserPassword() {
        const pool = mariadb.createPool({
            host: 'localhost',
            database: 'goldies_sa',
            password: 'carloseduardo08',
            user: 'root'
        })

        try {
            console.log('Essa é o email: ' + this._email)
            console.log('Essa é a senha: ' + this.password)
            const conn = pool.getConnection()
            let query = await (await conn).query('UPDATE usuario SET senha = ? WHERE email = ?', [this.password, this._email])
            console.log(query)
        } catch (err) {
            console.log(err)
        }
    }
}
