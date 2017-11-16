const axios = require('axios');
module.exports = {
    getFightById(id) {
        return axios.get(`http://localhost:3030/api/catfight/${id}`).then(res => res.data)
    }
}