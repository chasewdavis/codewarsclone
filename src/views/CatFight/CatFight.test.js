const  fnc =  require('./cat-fight-fnc');
const calls = require('../../utilities/data/data');

let state = {
    click: null,
    code: '',
    testResults: []
}

    // describe('Inital state contains correct values', () => {
    //     test('function expression', () => {
    //         expect(fnc.checkState(state)).toEqual(true)
    //     })
    // })

    test("get fight by id", function() {
        expect.assertions(1);
        return calls.getFightById(1).then(res => {
            expect(res.cat_fight_id).toEqual(1)
        })
    })