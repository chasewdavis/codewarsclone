const calls = require('../../utilities/data/data');


describe("api calls for fights", function() {
    test("get random fight", function() {
        expect.assertions(1);
        return calls.getRandomFight().then(res => {
            expect(typeof res.cat_fight_id).toEqual('number')
        })
    })

    test("get random fight returns the propert test_id", function() {
        expect.assertions(1);
        return calls.getRandomFight().then(res => {
            expect(typeof res.tests[0].test_id).toEqual('number')
        })
    })

    test("get random fight returns an array", function() {
        expect.assertions(1);
        return calls.getRandomFight().then(res => {
            console.log(res);
            expect(typeof res).toEqual('object')
        })
    })


})

describe("get user data", function() {
    test("get correct user", function() {
        expect.assertions(1);
        return calls.getCat(1).then(res => {
            expect(res.data[0].cats_id).toEqual(1)
        })
    })
})