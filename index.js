require('dotenv').config()

const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080



app.get('/', (_req, res) => {
    res.status(202).json({
        health: "up",
        success: true,
    })
})

app.get('/productos', async (_req, res) => {
    try {
        const data = await fs.promises.readFile(`./storage/products.txt`, "utf-8")
        const arrayOfData = JSON.parse(data)
        res.status(200).json(arrayOfData)
    } catch (error) {
        res.status(500).send(`${error.message}`)
    }
})
app.get('/productosRandom/', async (_req, res) => {
    try {
        const data = await fs.promises.readFile(`./storage/products.txt`, "utf-8")
        const arrayOfData = JSON.parse(data)
        const randomNum = Math.floor(Math.random() * arrayOfData.length)

        res.status(200).send(arrayOfData[randomNum])

    } catch (error) {
        res.status(500).send(`${error.message}`)
    }
})


app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}/`)
    console.log(`All products: http://localhost:${PORT}/productos`)
    console.log(`Random products: http://localhost:${PORT}/productosRandom`)
})