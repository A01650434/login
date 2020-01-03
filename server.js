//load in environment var and set the inside process.env
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const flash = require('express-flash')
const session =require('express-session')

//require passport function
const initializePassport = require('./passport-config')
initializePassport(passport, 
    email => users.find(user  => user.email === email),
    id => users.find(user  => user.id === id)
    )
//for  storing locally nodb (at every refresh it's gonna be deleted)
const users = []
//Pointing its using .ejs
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))//taking formas and bulding access
//server to use passport
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false 
}))
app.use(passport.initialize())//func inside pass to set the basics
app.use(passport.session())//to make var persited during the cross of the entire session

//set the route for application
app.get('/', (req, res) => {
    res.render('index.ejs', {name: 'Dafne'})
})

//Routes for views
app.get('/login', (req, res) => { //verify user
    res.render('login.ejs')
})

app.post('/login', passport.authenticate('local',{
   successRedirect: '/', //where to go when success
   failureRedirect: '/login',
   failureFlash: true
}))

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