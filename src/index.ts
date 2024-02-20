import app  from './app'
import 'dotenv/config'

const PORT = process.env.PORT || 3500
console.log(PORT)


app.listen(PORT)