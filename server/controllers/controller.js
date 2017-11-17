module.exports = {
    randomCatFight: ( req, res ) => {
        
        req.app.get('db').find_random_fight([]).then(fight=>{

            fight.map((obj, obj_index) => {
                obj.tagsArray = [];
                req.app.get('db').find_tags([obj.cat_fight_id])
                .then(tags => { tags.map( (tag,tag_index) => {

                    obj.tagsArray.push(tag)

                    //if we are at the end of the fight array AND at the end of the tags array send back the information
                    if(fight.length-1 === obj_index && tags.length - 1 === tag_index){
                        res.status(200).send(fight)
                    } 
                })})
            })
        })
    }
    
}