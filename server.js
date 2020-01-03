const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
//const passport = require('passport')

//require passport function
//const initializePassport = require('./passport-config')
//initializePassport(passport)
//for  storing locally nodb (at every refresh it's gonna be deleted)
const users = []
//Pointing its using .ejs
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))//taking formas and bulding access

//set the route for application
app.get('/', (req, res) => {
    res.render('index.ejs', {name: 'Dafne'})
})

//Routes for views
app.get('/login', (req, res) => { //verify user
    res.render('login.ejs')
})

app.post('/login', (req,  res) => {

})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

//app for registering users
app.post('/register', async (req,  res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,  10)//10 is fast and secure
        users.push({ //this would be automathically generated with a db
            id: Date.now().toString(),
            name:  req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
console.log(users);
})

//PORT
app.listen(3000)

//pasportjs for auth and persisting the user thru all the dif requests 