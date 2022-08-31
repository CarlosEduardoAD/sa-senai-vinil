import express from 'express'
import cors from 'cors'
import { routes } from './routes'
import mariadb from 'mariadb'

const app = express();

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3000, 'localhost', () => {
    console.log('Server running...')
})