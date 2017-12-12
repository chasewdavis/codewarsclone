const axios = require('axios');
module.exports = {
    getFightById(id) {
        return axios.get(`/api/catfight/${id}`).then(res => res.data)
    },
    postFightInProgress(body) {
        axios.post(`/api/fightinprogress`, body)
    },
    putFightInProgress(body) {
        // console.log(body)
        // console.log("COMPONENT IS UNMOUNTING")
        axios.put(`/api/fightinprogress`, body)
    },
    getRandomFight() {
        return axios.get('/api/oneRandomCatFight').then(res => res.data[0])
    },
    getCat(catId) {
        return axios.get(`/api/getcat/${catId}`)
    },
    postCompletedFightInProgress(body) {
        return axios.post(`/api/completedfight`, body)
    },
    getNumberOfAllies(clanName, catsId) {
        return axios.get(`/api/numberofallies/${clanName}/${catsId}`)
    },
    updateClan(body) {
        return axios.post('/api/updateClan', body)
    }
}