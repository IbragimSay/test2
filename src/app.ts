import express from 'express'
import route from './router'
const app = express()

app.use(express.json())

app.use('/api', route)

export = app