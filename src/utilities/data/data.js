const axios = require('axios');
module.exports = {
    getFightById(id) {
        return axios.get(`http://localhost:3030/api/catfight/${id}`).then(res => res.data)
    },
    postFightInProgress(body) {
        axios.post(`http://localhost:3030/api/fightinprogress`, body)
    },
    getRandomFight() {
        return axios.get('http://localhost:3030/api/oneRandomCatFight').then(res => res.data[0])
    }
}