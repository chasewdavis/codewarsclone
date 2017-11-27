const  fnc =  require('./cat-fight-fnc');
const calls = require('../../utilities/data/data');

let state = {
    click: null,
    code: '',
    testResults: []
}

    describe('Inital state contains correct values', () => {
        test('function expression', () => {
            expect(fnc.checkState(state)).toEqual(true)
        })
    })