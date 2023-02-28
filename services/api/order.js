export default $axios => ({
    getOrder (param) {
        return $axios.get('/get-order' + param)
    },
    getOrderLocation () {
        return $axios.get('/get-order-location-history')
    },
    createOrderLocation (param) {
        return $axios.post('/create-order-location-history', param)
    },
    deleteOrderLocation (param) {
        return $axios.get('/delete-order-location-history/' + param)
    },
    createOrder (param) {
        return $axios.post('/create-order', param)
    },
    getOrderDetail (param) {
        return $axios.get('/get-order-detail/' + param)
    },
    updateOrderLocation (param) {
        return $axios.post('/update-user-address-history', param)
    }
})
