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
    },
    mergeTagsByIgnoringLetterS(arr){
        arr.sort((a,b) => {
            a.count = a.count * 1;
            b.count = b.count * 1;
            a.tag_name = a.tag_name.toUpperCase();
            b.tag_name = b.tag_name.toUpperCase();
            if(a.tag_name < b.tag_name) {
                return -1;
            }
            if(a.tag_name > b.tag_name) {
                return 1;
            }
            return 0
        });
        for(let i = 1; i < arr.length; i++) {
            // since tag_names are sorted alphabetically checking the second word's last letter works 
            if(arr[i].tag_name.slice(arr[i].tag_name.length - 1) === "S"){
                // now check if tag names are the same other than last letter (which we know is "S")
                if(arr[i].tag_name.slice(0,-1) === arr[i-1].tag_name){
                    // here we know the words are a match so we can merge the two
                    // we will keep the first get rid of the second
                    arr[i-1].tag_name = arr[i].tag_name
                    arr[i-1].count += arr[i].count
                    arr.splice(i,1)
                    i--;
                }
                
            }
        }
        return arr.sort((a,b) => b.count - a.count);
    },

    mergeTagsByIgnoringCase(arr){
        arr.sort((a,b) => {
            a.count = a.count * 1;
            b.count = b.count * 1;
            a.tag_name = a.tag_name.toUpperCase();
            b.tag_name = b.tag_name.toUpperCase();
            if(a.tag_name < b.tag_name) {
                return -1;
            }
            if(a.tag_name > b.tag_name) {
                return 1;
            }
            return 0
        });
        for(let i = 1; i < arr.length; i++) {
            if(arr[i - 1].tag_name === arr[i].tag_name) {
                arr[i - 1].count = (arr[i-1].count * 1 ) + ( arr[i].count * 1 );
                arr.splice(i, 1);
                i--;
            }
        }
        return arr.sort((a,b) => b.count - a.count);
    }

}