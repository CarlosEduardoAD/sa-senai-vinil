import express from 'express'
import cors from 'cors'
import { routes } from './routes'
import mariadb from 'mariadb'
import nodemailer from 'nodemailer'
require("dotenv").config();
const node_cron = require('node-cron')
const app = express();
const cookieParser = require("cookie-parser")
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(express.urlencoded({extended : true}))
app.use(cors(corsOptions))
app.use(express.json())
app.use(routes)

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:
    {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS
    },
    tls: {
        rejectUnauthorized: false,
    }
})

const emailJob =
    node_cron.schedule('* */12 * * *', async () => {
        let pool = mariadb.createPool({
            host: 'localhost',
            user: 'root',
            password: 'carloseduardo08',
            database: 'goldies_sa'
        })

        try {
            const conn = await pool.getConnection()
            let query = await conn.query('SELECT user_email from subscriptions')
            let result = query
            for (let row of result) {
                transport.sendMail({
                    from: 'Goldy <carloseduardomarianoregis@gmail.com>',
                    to: row['user_email'],
                    text: 'Já deu uma olhada nas nossas promoções ? Elas estão fervendo !'
                })
            }

        } catch (err) {
            console.log(err)
            console.log('Não foi possível')
        }
    })

emailJob.start();


app.listen(3000, 'localhost', async () => {
    await console.log('Server running...')
})
