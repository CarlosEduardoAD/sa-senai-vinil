import express from 'express'
import { appendFile } from 'fs'

export const routes = express.Router()

routes.get('/', (req, res) => {
    console.log('aoba')
})