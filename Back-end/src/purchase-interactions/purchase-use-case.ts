import mariadb from 'mariadb'

export class userPurchase {
    public firstName: string;
    public lastName: string;
    public email: string;
    public age: string;
    public address: string;

    constructor(firstName: string, lastName: string, email: string, age: string, address: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.age = age
        this.address = address
    }

    public async purchaseItem(){
        const pool = mariadb.createPool({
            host: 'localhost',
            database: 'goldies_sa',
            password: 'carloseduardo08',
            user: 'root'
        })
        try{
            let conn = await pool.getConnection()
            conn.query(`INSERT INTO compras (id_user, endereco, presente, preco_total, forma_pag) VALUES (SELECT id FROM usuario WHERE nome = ${this.firstName}, ${this.address}, '1', ${this.email}, 'cartão de crédito'`)
            console.log('sim')
        }
        catch(err){
            console.log(err)
        }
    }
}
