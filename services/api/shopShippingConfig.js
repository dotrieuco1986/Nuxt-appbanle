export default $axios => ({
    getShippingConfig (shopId) {
        return $axios.$get(`/stores/${shopId}/shipping-configs`)
    },
    getDistance (origin, destination, mode) {
        return $axios.$get('/getdistance?origin=' + origin + '&destination=' + destination + '&mode=' + mode)
    }
})
