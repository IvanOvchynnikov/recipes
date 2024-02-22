const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://recipes:pass@cluster0.ifjsgjy.mongodb.net/?retryWrites=true&w=majority";
const PORT = 5050

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


const dataBase = {}


mongoose.connect(mongoURI)
    .then((result) => {
        app.listen(PORT)
        console.log("Server Started!")
    })
    .catch((err) => {
        console.log(err)
    });

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const userModel = mongoose.model('User', userSchema);

const checkUsername = async (username) => {
    try {
        const user = await userModel.findOne({username: username});
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


app.get('/login', (req, res) => {
    res.render('login.ejs', {
        authenticationFailed: false
    });
})

app.post('/login', async (req, res) => {
    try {
        const user = await checkUsername(req.body.username)
        if (user !== null) {
            if (user.password === req.body.password) {
                res.redirect('/home/' + encodeURIComponent(req.body.username));
            } else {
                res.render('login.ejs', {
                    authenticationFailed: true
                })
            }
        } else {
            res.render('login.ejs', {
                authenticationFailed: true
            })
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/signup', (req, res) => {
    res.render('signup.ejs');
})

app.post('/signup', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    if (await checkUsername(username) === null) {
        const userData = new userModel({
            username: username,
            password: password
        })
        userData.save();
        res.redirect('/login');
    } else {
        res.status(400).send({
            message: 'Provided username is already taken, please choose another one!'
        })
    }
})

app.get('/home/:username', (req, res) => {
    res.render('home.ejs')
})

