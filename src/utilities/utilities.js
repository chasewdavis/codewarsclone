module.exports = {
    args(str, function_name) {



        let i1 = str.indexOf('(') + 1
        let i2 = str.indexOf(')')


        
        let newStr = str.slice(i1, i2)
        let arr = newStr.split(',')

        return arr.map(p => p.trim())
    }
}