import swaggerUi from "swagger-ui-express"
import { Express } from "express"
import swaggerJsdoc from "swagger-jsdoc"

const options:swaggerJsdoc.Options = {
    definition: {
        openapi: "3.1.0",
        info:{
            version: "1.0.0",
            title: 'Rest Api docs'
        }
    },
    apis: ["./src/app.ts", "./src/router.ts", "./src/router/*.ts"]
} 

const swaggerSpec = swaggerJsdoc(options)

const swaggerDocs = (app:Express) =>{
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default swaggerDocs