export default $axios => ({
    productList (param) {
        return $axios.$get('/products', { params: param })
    },
    categoryList (businessId) {
        return $axios.$get('/categorylist?business_id=' + businessId)
    }

})
