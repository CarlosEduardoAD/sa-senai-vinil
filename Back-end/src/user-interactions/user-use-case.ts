import mariadb from 'mariadb'

export class user {
    public _name: string;
    public _email: string;
    public _password: string;


    constructor(name?: any, email?: any, password?: any) {
        this._name = name
        this._email = email
        this._password = password
    }

    public registerUser() {
        const pool = mariadb.createPool({
            host: 'localhost',
            database: 'goldies_sa',
            password: 'carloseduardo08',
            user: 'root'
        })
        pool.getConnection().then(() => {
            pool.query(`INSERT INTO usuario (nome, endereco, email, fone, senha) VALUES ('${this._name}', 'rua dos sussy bakas', '${this._email}', '00 12345-1234', '${this._password}')`)
                .then(() => { console.log('Data inserted sucessfully') })
                .catch((e) => { console.log(e) })
        })
    }

    public loginUser() {

    }
}
