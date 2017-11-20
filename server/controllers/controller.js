module.exports = {
    randomCatFight: ( req, res ) => {
        
        req.app.get('db').find_random_fight([]).then(fight=>{

            fight.map((obj, obj_index) => {
                obj.tagsArray = [];
                console.log('mapping over fights')
                req.app.get('db').find_tags([obj.cat_fight_id])
                .then(tags => { 
                    tags.map( (tag,tag_index) => {
                        obj.tagsArray.push(tag)
 
                    })
                    if(fight.length-1 === obj_index){
                        res.status(200).send(fight)
                    }  
                })
            })
        })
    },
    getCatFight: ( req, res ) => {
        const db = req.app.get('db');
        db.find_fight([req.params.id]).then(fight=>{
            db.find_tags([req.params.id]).then(tags=>{
                db.find_solutions([req.params.id]).then(solutions=>{
                    res.status(200).send(Object.assign({}, fight[0], {tags}, {solutions}));
                })
                // res.status(200).send(Object.assign({}, fight[0], {tags}, {}));
            })
        })
    },
    oneRandomCatFight: function(req, res, next) {
        const db = req.app.get('db');
        db.get_random_fight().then(fight => {
            let fight_id = fight[0].cat_fight_id;

            db.get_tests([fight_id]).then( tests => {
                fight[0].tests = tests
                console.log(fight)
                res.status(200).send(fight)
            })
        })

    }
    
}