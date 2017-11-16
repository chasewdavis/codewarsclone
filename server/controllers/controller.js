module.exports = {
    randomCatFight: ( req, res ) => {
        
        req.app.get('db').find_random_fight([]).then(fight=>{
            res.status(200).send(fight)
        })

    }
    
}