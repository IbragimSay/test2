import express from 'express'
import route from './router'
import  swaggerDocs from './util/swager'
const app = express()


app.use(express.json())
app.use('/api', route)

swaggerDocs(app)


export = app