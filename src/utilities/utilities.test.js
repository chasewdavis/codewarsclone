const f = require('./utilities')

let s = {
    // es5
    expression: 'const add = function (a, b) {return a + b}',
    // anonDeclaration: 'function (a, b) {return a + b}',
    declaration: 'function add(a, b) {return a + b}',
    manyArgs: 'function add(a, b, c, d, e) {return a + b + c + d + e}',
    //  es6
    es6Expression: 'const add = (a, b) => {return a + B}',
    es6NoCurls: 'const add = (a, b) => a + b',
    es6OneArg: 'const add = a => {a + 2}',
    es6NoBraces: 'const add = a => a',
    // no Args
    noArgs: 'function add() {return 5}',
    // anonNoArgs: 'function () {return 5}',
    es6NoArgs: '() => 5',
    es6_: '_ => 5'
}

// find let, const, var --- then find no function keyword --- then find what is between = and =>

let func = () => {
    let myFunction = (a, b) => {

    }
}

let func = _ => {

}

function func() {

}

let func = function () {

}

describe('Function Parsing Algorithms:', () => {
    describe('Parameter Parsing:', () => {
        describe('ES5 Functions:', () => {
            test('function expression', () => {
                expect(f.args(s.expression)).toEqual(['a', 'b'])
            })
            test('anonymous function declaration', () => {
                expect(f.args(s.anonDeclaration)).toEqual(['a', 'b'])
            })
            test('function declaration', () => {
                expect(f.args(s.declaration)).toEqual(['a', 'b'])
            })
            test('many parameters', () => {
                expect(f.args(s.manyArgs)).toEqual(['a', 'b', 'c', 'd', 'e'])
            })
        })
        describe('ES6 Functions:', () => {
            test('function expression', () => {
                expect(f.args(s.es6Expression)).toEqual(['a', 'b'])                
            })
            test('function no {}', () => {
                expect(f.args(s.es6NoCurls)).toEqual(['a', 'b'])
            })
            test('function no ()', () => {
                expect(f.args(s.es6OneArg)).toEqual(['a'])
            })
            test('function no () or {}', () => {
                expect(f.args(s.es6NoBraces)).toEqual(['a'])
            })
        })
        // describe('No Parameter Functions:', () => {
        test('function declaration', () => {
            expect(f.args(s.noArgs)).toEqual([""])
        })
        test('anonymous function declaration', () => {
            expect(f.args(s.anonNoArgs)).toEqual([""])
        })
        test('ES6 function', () => {
            expect(f.args(s.es6NoArgs)).toEqual([""])
        })
        test('ES6 underscore', () => {
            expect(f.args(s.es6_)).toEqual([""])
        })
        // })
    })
    // describe('Body Parsing:', () => {
    //     describe('ES5 Functions:', () => {

    //     })
    //     describe('ES6 Functions:', () => {

    //     })
    //     describe('No Parameter Functions:', () => {

    //     })
    // })
})
