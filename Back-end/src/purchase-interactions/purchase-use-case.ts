import mariadb from 'mariadb'

export class userPurchase {
    public firstName: string;
    public lastName: string;
    public email: string;
    public address: string;
    public price: any;
    public obj: any
    public gift : any;
    public paymentMethod : any;

    constructor(firstName: string, lastName: string, email: string, address: string, price: any, obj: any, gift : any, paymentMethod : any) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.address = address
        this.price = price
        this.obj = obj
        this.gift = gift
        this.paymentMethod = paymentMethod
    }

    public async insertItem() {
        const pool = mariadb.createPool({
            host: 'localhost',
            database: 'goldies_sa',
            password: 'carloseduardo08',
            user: 'root'
        })
        try {
            let conn = await pool.getConnection()
            let id = await conn.query(`SELECT id FROM usuario WHERE email = ${this.email}`,)
            let userId = id[0]['id']
            console.log(userId)
            await conn.query(`INSERT INTO compras (id_user, data) VALUES (?, ?)`, [userId, new Date().valueOf()])
        }
        catch (err) {
            console.log(err)
            return 'Não foi possível, por favor tente novamente'
        }
    }

    public async purchaseItem() {
        const pool = mariadb.createPool({
            host: 'localhost',
            database: 'goldies_sa',
            password: 'carloseduardo08',
            user: 'root'
        })
        try {
            let conn = await pool.getConnection()
            let size = Object.keys(this.obj).length
            console.log('Este é o Tamanho' + size)
            for (let i = 0; i < size; i++) {
                console.log(this.obj[i])
                let objId = this.obj[i].id
                let discQuantity = this.obj[i].count
                console.log('Este é o id ' + objId)
                console.log('Esta é a quantidade ' + discQuantity)
                let id = await conn.query(`SELECT id FROM usuario WHERE email = ${this.email}`)
                let userId = id[0]['id']
                console.log(userId)
                let id2 = await conn.query(`SELECT id FROM disco WHERE articul_id = ${Number(objId)}`)
                let discId = id2[0]['id']
                console.log(discId)
                let id3 = await conn.query(`SELECT id FROM compras WHERE id_user = ${Number(userId)} ORDER BY data DESC LIMIT ${size}`)
                let purchaseId = id3[i]['id']
                console.log('Este é o id da compra ' + purchaseId)
                await conn.query(`UPDATE compras SET endereco = ${this.address}, presente = ${this.gift ? '1' : '0'}, preco_total = ${this.price}, forma_pag = '${(this.paymentMethod)}' ORDER BY CAST(data AS INT) desc LIMIT ?`,[size])
                await conn.query('INSERT INTO itens(id_disco, id_compra, quantidade) VALUES (?, ?, ?)', [discId, purchaseId, discQuantity])
                console.log('FUNCIONOU')
            }
        }
        catch (err) {
            console.log(err)
            return 'Não foi possível, por favor tente novamente'
        }
    }
}
