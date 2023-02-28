export default $axios => ({
    getRoadLocation (param) {
        return $axios.$get('/get-road-location/' + param)
    },
    checkLocationInPlot (param) {
        return $axios.$get('/check-location-in-plot/' + param)
    },
    getGeocode (param) {
        return $axios.$post('/geocode/' + param, null)
    }
})
