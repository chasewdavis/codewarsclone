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
        req.app.get('db').find_fight([req.params.id]).then(fight=>{
            req.app.get('db').find_tags([req.params.id]).then(tags=>{
                res.status(200).send(Object.assign({}, fight[0], {tags}));
            })
        })
    }
    
}