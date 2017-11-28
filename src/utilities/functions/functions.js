module.exports = {
    args(str, function_name) {
        // THIS FUNCTION EXTRACTS THE ARGUMENTS OUT OF A FUNCTION STRING

        let i1 = str.indexOf('(') + 1
        let i2 = str.indexOf(')')


        let firstWord = str.split(' ')[0]
        let fourthWord = str.split(' ')[3]

        let assignment = str.indexOf('=') + 1
        let returning = str.indexOf('=>')

        function array(string, i, j) {
            return string.slice(i, j).split(',').map(p => p.trim())
        }

        switch (firstWord) {
            case 'var':
            case 'const':
            case 'let':
                if (fourthWord !== 'function') {
                    let argsArea = str.slice(assignment, returning).trim()
                    let last = argsArea.length - 1
                    if (argsArea == '_') {
                        return [""]
                    }
                    else if (argsArea[0] == '(' && argsArea[last] == ')') {
                        return array(argsArea, 1, last)
                    }
                    else {
                        return array(str, assignment, returning)
                    }
                }
                break;
            default:
                return array(str, i1, i2)
        }
        return array(str, i1, i2)
    },
    types(param, type) {
        switch (type) {
            case 'boolean':
                return param === 'true' ? true : false
            case 'null':
                return null
            case 'undefined':
                return undefined
            case 'number':
                return parseInt(param)
            case 'string':
                return String(param)
            // case 'symbol':
            // return 
            case 'object':

                return param
            case 'array':

                return param
            default:
                return param;
        }
    },
    body(str) {
        // THIS FUNCTION RETURNS THE BODY OUT OF A FUNCTION STRING

        let i1 = str.indexOf('{') + 1
        let i2 = str.lastIndexOf('}')
        if (i1 === 0 || i2 === -1) {
            i1 = str.indexOf('=>') + 3
            i2 = str.length
            return 'return ' + str.slice(i1, i2)
        }
        return str.slice(i1, i2)
    },
    runTests(args, body, tests) {
        let f = new Function(args, body)
        return tests.map(test => {
            test.result = f.apply(null, test.parameters)
            test.passed = test.result === test.expected_result
            return test
        })
    },
    convertCase(str) {
        var lower = str.toLowerCase();
        return lower.replace(/(^| )(\w)/g, function(x) {
          return x.toUpperCase();
        });
    }
}