const axios = require('axios');
module.exports = {
    getFightById(id) {
        return axios.get(`http://localhost:3030/api/catfight/${id}`).then(res => res.data)
    },
    postFightInProgress(body) {
        axios.post(`http://localhost:3030/api/fightinprogress`, body)
    },
    putFightInProgress(body) {
        console.log(body)
        console.log("COMPONENT IS UNMOUNTING")
        axios.put(`http://localhost:3030/api/fightinprogress`, body)
    },
    getRandomFight() {
        return axios.get('http://localhost:3030/api/oneRandomCatFight').then(res => res.data[0])
    },
    getCat(catId) {
        return axios.get(`http://localhost:3030/api/getcat/${catId}`)
    },
    postCompletedFightInProgress(body) {
        return axios.post(`http://localhost:3030/api/completedfight`, body)
    },
    getNumberOfAllies(clanName, catsId) {
        return axios.get(`http://localhost:3030/api/numberofallies/${clanName}/${catsId}`)
    },
    updateClan(body) {
        return axios.post('http://localhost:3030/api/updateClan', body)
    }
}