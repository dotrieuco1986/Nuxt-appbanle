export default $axios => ({
    getUserPromotions (param) {
        return $axios.$get(`/promotions/shop/${param}`)
    },
    getGoolowPromotions () {
        return $axios.$get('/promotions/goollow')
    },
    getPromotionStore (param, query) {
        if (query) {
            return $axios.$get('/getpromotionstore?page=' + param + '&q=' + query)
        } else {
            return $axios.$get('/getpromotionstore?page=' + param)
        }
    },
    createPromotion () {
        return $axios.$get('/createpromotion')
    },
    editPromotion (param) {
        return $axios.$get('/editpromotion/' + param)
    },
    updatePromotion (data) {
        return $axios.$post('/updatepromotion', data)
    },
    deletePromotion (data) {
        return $axios.$post('/deletepromotion', data)
    }
})
