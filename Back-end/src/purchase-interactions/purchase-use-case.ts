import mariadb from 'mariadb'

export class userPurchase {
    public firstName: string;
    public lastName: string;
    public email: string;
    public address: string;
    public price : any;

    constructor(firstName: string, lastName: string, email: string, address: string, price : any) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.address = address
        this.price = price
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
            let id = await conn.query(`SELECT id FROM usuario WHERE nome = ?`, [this.firstName])
            let userId = id[0]['id']
            await conn.query(`INSERT INTO compras (id_user, endereco, presente, preco_total, forma_pag, data) VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, this.address, '1', this.price, "credito", new Date().toTimeString()])
            // let id2 = await conn.query(`SELECT id from compras WHERE id_user = ${userId} ORDER BY DATE(data) DESC`)
            // let compraId = id2[0]['id']
            // let id3 = await conn.query(`SELECT id FROM disco WHERE preco_uni = ${this.price}`)
            // let discoId = id3[0]['id']
            // await conn.query('INSERT INTO itens (id_disco, id_compra) VALUES (?,?)', [compraId, discoId])
        }
        catch(err){
            console.log(err)
            return 'Não foi possível, por favor tente novamente'
        }
    }
}
