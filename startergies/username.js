const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    const mongoose=require('mongoose');
    const User=require('../models/user');
const key=require('../setup/myurl').key;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;
module.exports=passport=>{
passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
    User.findOne({id: jwt_payload.id}, function(err, user) {
    
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
}