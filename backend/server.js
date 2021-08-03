require('dotenv').config() //.env Access
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5500;
const router = require('./routes')
const DbConnect = require('./database')
const cors = require('cors');

const corsOption = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));

DbConnect()
app.use(express.json())
app.use(router)
// app.get('/', (req, res) =>{
//     res.send('Hello World!')
// })

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))