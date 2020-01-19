const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/classes/user"); //TBD
const bcrypt = require("bcryptjs");

let user = new User();
//var db = require("../models"); TBD

passport.use(new LocalStrategy( 
    function(username, password, done) {
      user.getUserByEmail(username)
      .then(async function(userInfo){
        let result;
        if (userInfo.length < 1) {
          result = false;
        } else {
<<<<<<< HEAD
          //console.log(userInfo);
          //console.log(userInfo[0].encypted_pw);
          result = await bcrypt.compare(password, userInfo[0].encypted_pw);
          //console.log(result);
=======
          // console.log(userInfo);
          // console.log(userInfo[0].encypted_pw);
          result = await bcrypt.compare(password, userInfo[0].encypted_pw);
          // console.log(result);
>>>>>>> 9027c42dc5a9868a8413874cdb8b4aa84332daf0
        }
        if (!result) {
          //console.log('got into !result');
          done(null, false, {message: 'Incorrect email or password'});
          } else {
            //console.log('userInfo[0] passed to done: ', userInfo[0]);
            done(null, userInfo[0]);
          } 
      })
      .catch(function(err){
        throw err;
      })
    })); 



passport.serializeUser(function(user, done) {
  //console.log('user.id in serialize: ', user.id)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  //console.log('id in deserialize: ', id);
  user.getUserByID(id)
  .then(function(result){
    let userObj = result[0];
    //console.log('ready to send userObj: ', userObj)
    done(null, userObj);
  })
  .catch()
});

// Exporting our configured passport
module.exports = passport;
