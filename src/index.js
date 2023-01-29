import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI)

try {
  await mongoClient.connect()
  console.log('Mongo conectado')
} catch (error) {
  console.log(error)
}

const db = mongoClient.db('projetao')

const server = express()
server.use(cors())
server.use(express.json())

server.post('/products', async (req, res) => {
  try {
    const product = req.body
    await db.collection('products').insertOne(product)
    res.send(201).status('Produto criado')
  } catch (error) {
    res.status(500).send(error.message)
  }
})

server.get('/products', async (req, res) => {
  try {
    const products = await db.collection('products').find().toArray()
    res.send(products)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

const port = process.env.PORT || 5000

server.listen(port, () => console.log(`Server running in port: ${port}`))
