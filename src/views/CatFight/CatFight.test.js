const  fnc =  require('./cat-fight-fnc');

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