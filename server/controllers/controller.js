const waitUntil = require('wait-until');

module.exports = {
    createCatFight: (req, res, next) => {
        // console.log(req.body)
        const db = app.get('db')
        db.create_fight([1, req.body.name, req.body.description, req.body.rank, req.body.solution, req.body.name, req.body.placeholder])
            .then(newFight => {

                let a = req.body.tests.length
                let b = req.body.hiddenTests.length
                let c = req.body.tags.length

                req.body.tests.map((test, i) => {
                    // console.log(test)
                    db.create_test(newFight[0].cat_fight_id, test.parameters, test.parameter_types, test.expected_result, test.expected_result_type, false)
                        .then(() => a--)
                })
                req.body.hiddenTests.map((test, i) => {
                    db.create_test(newFight[0].cat_fight_id, test.parameters, test.parameter_types, test.expected_result, test.expected_result_type, true)
                        .then(() => b--)
                })
                req.body.tags.map((tag, i) => {
                    db.create_tag(newFight[0].cat_fight_id, tag)
                        .then(() => c--)
                })

                waitUntil(50, 400, () => a + b + c === 0, () => {
                    res.send(newFight)
                })

            })
    },
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
                db.get_completed_fights([catsId]).then(resp3 => {
                    resp.resp3 = resp3
                    db.get_authored_fights([catsId]).then(resp4 => {
                        resp.resp4 = resp4
                        res.status(200).send(resp)
                    })
                })
            })
        })
    }
    
}