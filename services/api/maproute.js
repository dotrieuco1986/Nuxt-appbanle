export default $axios => ({
    geoCode (param) {
        return $axios.post('/geocode/' + param)
    },
    getRoutingOfType (param) {
        return $axios.get('/get-routing-of-type/' + param)
    }
})
