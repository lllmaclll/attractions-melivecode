const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

// connect mysql database
const connection = mysql.createConnection({
    host: process.env.DB_MYSQL_HOST,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_NAME
})


// ตรวจสอบการเชื่อมต่อฐานข้อมูล
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err)
        return
    }
    console.log('Connected to MySQL')
})

app.get('/test', (req, res, next) => {
    res.json({ msg: 'test-naja' })
})

app.get('/attractions', (req, res, next) => {
    const query = 'SELECT * FROM attractions;'

    connection.query(query, (err, results, fields) => {
        if (err) {
            // Handle error
            console.log('Error executing query: ', err)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
        // Send the results as JSON
        res.status(200).json(results)
    })
})

app.listen(process.env.APP_PORT, () => {
    console.log(`web server listening on port ${process.env.APP_PORT}`)
})