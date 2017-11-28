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

    },
    getCat: function(req, res, next) {
        const db = req.app.get('db');
        const catId = req.params.catId
        db.get_cat([catId]).then( resp => {
            console.log(resp)
            res.status(200).send(resp)
        })
    },
    postFightInProgress: function(req, res, next) {
        const db = req.app.get('db');
        const {cats_id, cat_fight_id} = req.body;
        db.create_fight_in_progress([cats_id, cat_fight_id]).then(resp => {
            console.log(resp)
            res.status(200).send(resp)
        })
    },
    updateFightInProgress: function(req, res, next) {
        const db = req.app.get('db')
        const {catId, completed, userSolution, catFightId} = req.body
        console.log("catId",catId)
        console.log("completed",completed)
        console.log("userSolution",userSolution)
        db.update_fight_in_progress([catId, completed, userSolution, catFightId]).then(resp => {
            //console.log(resp)
            res.status(200).send(resp)
        })
    },
    fightTagsByDifficulty: (req, res) => {
        const db = req.app.get('db');
        db.get_all_tags([]).then(tags=>{
            res.status(200).send(tags)
        })
    },
    searchByInput: (req, res) => {
        const db = req.app.get('db');
        db.get_fights_by_input([req.params.input]).then(fights => {
            res.status(200).send(fights)
        })
    },
    searchByDifficulty: (req, res) => {
        const db = req.app.get('db');
        db.get_fights_by_difficulty([req.params.difficulty]).then(fights => {
            res.status(200).send(fights)
        })
    },
    searchByTagName: (req, res) => {
        const db = req.app.get('db');
        db.get_fights_by_tag_name([req.params.tag]).then(fights => {
            res.status(200).send(fights)
        })
    },
    completedFight: function(req, res, next) {
        const db = req.app.get('db');
         console.log(req.body)
        const {catId, completed, userSolution, catFightId, honor} = req.body

        db.completed_fight([catId, completed, userSolution, catFightId]).then(resp => {
            db.update_honor([catId, honor]).then(resp => {
                res.status(200).send(resp)
            })
        })
    },
    numberOfAllies: function(req, res, next) {
        const db = req.app.get('db');
        const clanName = req.params.clanname;
        const catsId = req.params.catsid

        db.number_of_allies([clanName]).then(resp1 => {
            let resp = {resp1}
            db.find_overall_rank([catsId]).then(resp2 => {
                resp.resp2 = resp2
                res.status(200).send(resp)
            })
        })
    }
    
}