const f = require('./functions')

let s = {
    // es5
    expression: 'const add = function (a, b) {return a + b}',
    // anonDeclaration: 'function (a, b) {return a + b}',
    declaration: 'function add(a, b) {return a + b}',
    manyArgs: 'function add(a, b, c, d, e) {return a + b + c + d + e}',
    //  es6
    es6Expression: 'const add = (a, b) => {return a + b}',
    es6NoCurls: 'const add = (a, b) => a + b',
    es6OneArg: 'const add = a => {return a + 2}',
    es6NoBraces: 'const add = a => a',
    // no Args
    noArgs: 'function add() {return 5}',
    // anonNoArgs: 'function () {return 5}',
    es6NoArgs: 'const add = () => 5',
    es6_: 'var add = _ => 5',
    // test arrays with built in corner cases
    array1: [
        {count: "14", tag_name: "MATHEMATICS"},
        {count: "2", tag_name: "CONCATENATION"},
        {count: "442", tag_name: "nUmBeRs"},
        {count: "4", tag_name: "nUmBeRS"}
    ],
    array2: [
        {count: "4", tag_name: "NUMBERS"},
        {count: "4", tag_name: "MATHEMATICS"},
        {count: "3", tag_name: "ARRAY"},
        {count: "4", tag_name: "NUMBER"},
        {count: "22", tag_name: "LOGIC"},
        {count: "3", tag_name: "ARRAYS"}
    ]

}

// find let, const, var --- then find no function keyword --- then find what is between = and =>

// let func = () => {
//     let myFunction = (a, b) => {

//     }
// }

// let func = _ => {

// }

// function func() {

// }

// let func = function () {

// }

describe('Function Parsing and Creating Algorithms:', () => {
    describe('Argument Parsing:', () => {
        describe('ES5 Functions:', () => {
            test('function expression', () => {
                expect(f.args(s.expression)).toEqual(['a', 'b'])
            })
            // test('anonymous function declaration', () => {
            //     expect(f.args(s.anonDeclaration)).toEqual(['a', 'b'])
            // })
            test('function declaration', () => {
                expect(f.args(s.declaration)).toEqual(['a', 'b'])
            })
            test('many arguments', () => {
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
        describe('No Argument Functions:', () => {
            test('function declaration', () => {
                expect(f.args(s.noArgs)).toEqual([""])
            })
            // test('anonymous function declaration', () => {
            //     expect(f.args(s.anonNoArgs)).toEqual([""])
            // })
            test('ES6 function', () => {
                expect(f.args(s.es6NoArgs)).toEqual([""])
            })
            test('ES6 underscore', () => {
                expect(f.args(s.es6_)).toEqual([""])
            })
        })
    })
    describe('Body Parsing:', () => {
        describe('ES5 Functions:', () => {
            test('function expression', () => {
                expect(f.body(s.expression)).toEqual('return a + b')
            })
            // test('anonymous function declaration', () => {
            //     expect(f.body(s.anonDeclaration)).toEqual('return a + b')
            // })
            test('function declaration', () => {
                expect(f.body(s.declaration)).toEqual('return a + b')
            })
            test('many arguments', () => {
                expect(f.body(s.manyArgs)).toEqual('return a + b + c + d + e')
            })
        })
        describe('ES6 Functions:', () => {
            test('function expression', () => {
                expect(f.body(s.es6Expression)).toEqual('return a + b')
            })
            test('function no {}', () => {
                expect(f.body(s.es6NoCurls)).toEqual('return a + b')
            })
            test('function no ()', () => {
                expect(f.body(s.es6OneArg)).toEqual('return a + 2')
            })
            test('function no () or {}', () => {
                expect(f.body(s.es6NoBraces)).toEqual('return a')
            })
        })
        describe('No Argument Functions:', () => {
            test('function declaration', () => {
                expect(f.body(s.noArgs)).toEqual('return 5')
            })
            // test('anonymous function declaration', () => {
            //     expect(f.body(s.anonNoArgs)).toEqual([""])
            // })
            test('ES6 function', () => {
                expect(f.body(s.es6NoArgs)).toEqual('return 5')
            })
            test('ES6 underscore', () => {
                expect(f.body(s.es6_)).toEqual('return 5')
            })
        })
    })
    describe('Test Running:', () => {
        test('function expression', () => {

        })
    })
})

describe('Tests related to Search folder', () => {
    describe('mergeTagsByIgnoringLetterS', () => {
        test('check that array is now correct (properly merging)', () => {
            expect.assertions(1);
            let long = f.mergeTagsByIgnoringLetterS(s.array2.slice()).length
            expect(long).toEqual(4)
        })
        test('check that array sorts properly', () => {
            expect.assertions(1);
            let newArray = f.mergeTagsByIgnoringLetterS(s.array2.slice())
            expect(newArray[0].tag_name).toEqual("LOGIC")
        })
    })

    describe('asdf', () => {
        test('proper data type', () => {
            let type = typeof f.convertCase('55');
            expect(type).toEqual('string')
        })
        test('proper capitalization', () => {
            expect(f.convertCase('hElLo')).toEqual('Hello');
        })
        test('check to see that function sorts properly', () => {
            let newArray = f.mergeTagsByIgnoringCase(s.array1)
            expect(newArray[0].tag_name).toEqual('NUMBERS');
        })
        test('check to see that all tag names are now uppercase', () => {
            let newArray = f.mergeTagsByIgnoringCase(s.array1)
            let foundLowerCase = false;

            // PROVE THAT TEST WILL FAIL WITH CODE BELOW
            // newArray = [
            //     {count: "2", tag_name: "logic"},
            //     {count: "2", tag_name: "CONCATENATION"},
            //     {count: "2", tag_name: "Math"}
            // ]

            newArray.forEach(e=>{
                if(e.tag_name !== e.tag_name.toUpperCase()){
                    foundLowerCase = true;
                }
            })
            expect(foundLowerCase).toEqual(false);
        })
    })

    
})
