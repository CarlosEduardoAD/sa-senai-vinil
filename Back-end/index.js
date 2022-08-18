const pg = require('pg')
const express = require('express');

const app = express();

app.get('/purchase', (req, res) => {
    res.send("Ao potência")
})

app.get('/', (req, res) => { res.send('Tudo jóia ?') })



app.listen(3000, () => {
    console.log("Server is working !")
})