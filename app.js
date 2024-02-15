const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 5050

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


const startApp = async () => {
    try {
        app.listen(PORT, () => {
            console.log("Server Started!")
        })
    } catch (e) {
        console.log("e")
    }
}

app.get('/login', (req, res) => {
    res.render('login.ejs',{
        authenticationFailed: false
    });
})

app.post('/login', (req, res) => {
    const data = req.body
    if (data.username !== "Ivan" || data.password !== "1212") {
        res.render('login.ejs', {
            authenticationFailed: true
        })
    } else {
        res.redirect('/home')
    }
})

startApp();

