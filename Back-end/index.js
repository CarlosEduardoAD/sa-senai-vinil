const express = require('express');

const app = express();

app.get('/purchase', (req, res) =>
{
    res.send("Ao potência")
})


app.listen(3000, () => {
    console.log("Server is working !")
})