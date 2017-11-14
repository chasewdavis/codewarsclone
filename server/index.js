const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const CONNECTION_STRING = process.env.CONNECTION_STRING

const app = express();

massive(CONNECTION_STRING).then(db => app.set('db', db));


app.use(express.static(`${__dirname}/../build`));
app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    allowedConnections: ['github']
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    db.find_user([String(profile.identities[0].user_id)]).then(user => {        //edit for our app
        if (user[0]) {
            db.add_visit([String(user[0].auth_id)])                             // edit for our app
            return done(null, user[0].auth_id)
        }
        else {
                db.create_user([
                    // profile.name.givenName,
                    // profile.name.familyName,
                    // profile.nickname,
                    // null,
                    // profile.picture,
                    // profile.identities[0].user_id,
                    // null,
                    // profile.provider
                ])
                    .then(user => {
                        db.add_visit([String(user[0].auth_id)])
                        done(null, user[0].auth_id)
                    })
        }
    })
}));


app.get(`/auth/`, passport.authenticate(`auth0`));
app.get(`/auth/callback`, passport.authenticate(`auth0`, {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
}))
app.get(`/auth/me`, (req, res, next) => {
    console.log(req.user)
    if (!req.user) {
        return res.status(400).send('user not found');
    }
    else return res.status(200).send(req.user);
})
app.get(`/auth/logout`, (req, res, next) => {
    let { user } = req
    req.logOut();
    res.redirect(302, `/`)
})


// OUR ENDPOINTS HERE



// OUR ENDPOINTS ABOVE


passport.serializeUser(function (id, done) {
    done(null, id);
})
passport.deserializeUser(function (id, done) {
    app.get('db').find_user([id])
        .then(user => {
            done(null, user[0]);
        })
})

app.listen(PORT, () => console.log(`CatFights running on port ${PORT}`))
