require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const cors = require('cors');
const controller = require('./controllers/controller');


const app = express();

// for hosting
app.use( express.static( `${__dirname}/../build` ) );

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const CONNECTION_STRING = process.env.CONNECTION_STRING

massive(CONNECTION_STRING).then(db => app.set('db', db))

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL//,
    // allowedConnections: ['github']
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    db.find_cat([String(profile.identities[0].user_id)]).then(user => {
        //console.log("user from Auth0Strat", user)        //edit for our app
        if (user[0]) {
            // db.add_visit([String(user[0].user_id)])                             // edit for our app
            return done(null, user[0].auth_id)
        }
        else {
            db.create_cat([
                profile.nickname,
                null,
                profile.picture,
                profile.identities[0].user_id,
            ])
                .then(user => {
                    db.find_cat([String(user[0].auth_id)])
                    return done(null, user[0].auth_id)
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
    // console.log("/auth/me user:", req.user)
    if (!req.user) {
        return res.status(400).send('user not found');
    }
    else return res.status(200).send(req.user);
})
app.get(`/auth/logout`, (req, res, next) => {
    let { user } = req
    req.logOut();
    res.redirect(302, `/login`)
})


// OUR ENDPOINTS HERE

app.get(`/api/cats`, (req, res, next) => {
    const db = app.get('db')
    db.get_cats().then(users => res.send(users))
})

app.get(`/api/catfight/:id`, (req, res, next) => {
    // console.log(req.params)
    const db = app.get('db')
    let fight = {}
    db.get_fight(req.params.id).then(resp => {
        fight = resp[0]
        db.get_tests(req.params.id)
            .then(response => {
                // console.log(response)
                fight = Object.assign({}, fight, { tests: response })
                // console.log(fight)
                res.status(200).send(fight)
            })
    })
})

app.post(`/api/createfight`, controller.createCatFight)

app.post('/api/fightinprogress', controller.postFightInProgress)
app.post('/api/completedfight', controller.completedFight)
app.put('/api/fightinprogress', controller.updateFightInProgress)
app.post('/api/updateClan', controller.updateClan)

app.get('/api/oneRandomCatFight', controller.oneRandomCatFight)
app.get(`/api/randomCatFight`, controller.randomCatFight)
app.get(`/api/getCatFight/:id`, controller.getCatFight)
app.get(`/api/getcat/:catId`, controller.getCat)
app.get(`/api/fightTagsByDifficulty`, controller.fightTagsByDifficulty)
app.get(`/api/searchByInput/:input`, controller.searchByInput)
app.get(`/api/searchByDifficulty/:difficulty`, controller.searchByDifficulty)
app.get(`/api/searchByTagName/:tag`, controller.searchByTagName)
app.get('/api/numberofallies/:clanname/:catsid', controller.numberOfAllies)

// OUR ENDPOINTS ABOVE


passport.serializeUser(function (id, done) {
    return done(null, id);
})
passport.deserializeUser(function (id, done) {
    app.get('db').find_cat([id])
        .then(user => {
            return done(null, user[0]);
        })
})

// required for hosting
const path = require('path')

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = process.env.PORT || 8095;

app.listen(PORT, () => console.log(`CatFights running on port ${PORT}`))
