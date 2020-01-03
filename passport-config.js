const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

function initialize(passport, getUserByEmail, getUserById) {
    //function under a funct
    const authenticateUser = async (email, password, done) => { //auth with email and passw. done (the confirmation  )
        const user = getUserByEmail(email)//return a uuser or null
        if (user == null) {
            return done(null, false, {message: 'No user with that email'})
        }
        //try cause its async
        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password incorrect'})
            } 
        //compare and return
        } catch (e) {
            return done(e)
        }
    }
      passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))//username name + the function that will auth the user
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id)) 
        })
    }

module.exports = initialize