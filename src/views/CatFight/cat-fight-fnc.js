module.exports = {
    checkState: function(state) {
        console.log(state)
       if(state.click == null && state.code == '') {
           return true
       } 
       else {
           return false
       }
    }
}