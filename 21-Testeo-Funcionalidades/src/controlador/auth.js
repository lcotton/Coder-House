import bCrypt from 'bcrypt'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../persistencia/models/users.js'
import logger from '../logger.js'

passport.use(
    'signup',
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        User.findOne({ username: username }, function (err, user) {
          if (err) {
            logger.info('Error in SignUp: ' + err)
            return done(err)
          }
  
          if (user) {
            logger.info('User already exists')
            return done(null, false)
          }
  
          const newUser = {
            username: username,
            password: createHash(password),
          }
  
          User.create(newUser, (err, userWithId) => {
            if (err) {
              logger.info('Error in Saving user: ' + err)
              return done(err)
            }
            logger.info('User Registration succesful')
            logger.info(userWithId)
            return done(null, userWithId)
          })
        })
      }
    )
  )
  
  passport.use(
    'login',
    new LocalStrategy((username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) return done(err)
  
        if (!user) {
          logger.info('User Not Found with username ' + username)
          return done(null, false)
        }
  
        if (!isValidPassword(user, password)) {
          logger.info('Invalid Password')
          return done(null, false)
        }
  
        return done(null, user)
      })
    })
  )
  
  passport.deserializeUser((id, done) => {
    User.findById(id, done)
  })
  
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  
  function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password)
  }
  
  function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
  }

  export default passport
