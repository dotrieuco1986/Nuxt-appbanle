export default $axios => ({
    getStores (param) {
        return $axios.get('/stores' + param)
    },
    copyStore (id) {
        return $axios.post('/stores/copy/' + id)
    },
    getStoreById (id) {
        return $axios.get('/stores/view/' + id)
    },
    getAdvertisementById (id) {
        return $axios.get('/advertisement/view/' + id)
    },
    getMoreInfoStore (id) {
        return $axios.get('/more-info-store/' + id)
    },
    getCategories () {
        return $axios.get('/stores/categories')
    },
    createBusiness (param) {
        return $axios.$post('/stores', param)
    },
    getActivityTypes () {
        return $axios.get('/get-activity-types')
    },
    getIndustryCertifications () {
        return $axios.get('/get-industry-certifications')
    },
    report (param) {
        return $axios.post('delete-business', param)
    },
    savePlace (param) {
        return $axios.post('save-place', param)
    },
    getBusinessShippingConfigs (id) {
        return $axios.get('stores/' + id + '/shipping-configs')
    },
    deleteStore (id) {
        return $axios.delete('stores/' + id)
    },
    getDataForReportPage (arrStoreId) {
        return $axios.get('/stores/get-data-report/' + arrStoreId)
    },
    getStaticReportPage (arrStoreId, startTime, endTime, period) {
        return $axios.get('/stores/custom-static/' + arrStoreId + '/' + startTime + '/' + endTime + '/' + period)
    },
    getWareHouse (param) {
        const page = param.match(/\d+/)[0]
        return $axios.get('warehouse-json/' + page)
    },
    getAllWareHouse (param) {
        return $axios.get('warehouse-json/0')
    },
    getCategoriesDefault () {
        return $axios.get('/get-categories-default')
    },
    getProduct (id) {
        return $axios.get('/get-product/' + id)
    },
    getProductsStore (param) {
        const data = param.split('&')
        const page = data[0].match(/\d+/)[0]
        return $axios.get('get-products-store/' + data[1] + page)
    },
    deleteProduct (param) {
        return $axios.post('/delete-product', param)
    },
    submitProduct (param) {
        return $axios.post('/submit-product', param)
    },
    addProduct2Store (param) {
        return $axios.post('/add-product-2-store', param)
    },
    deleteProductsStore (param) {
        return $axios.post('/delete-products-store', param)
    },
    submitPromotion (param) {
        return $axios.post('/submit-promotion', param)
    },
    turnOffPromotion (id) {
        return $axios.get('/turn-off-promotion/' + id)
    },
    getChains (param) {
        return $axios.get('/store-chains' + param)
    },
    createChain (param) {
        return $axios.post('/store-chains', param)
    },
    getChainById (id) {
        return $axios.get('/store-chains/' + id)
    },
    getStoresByChain (id) {
        return $axios.get('/store-chains/' + id + '/stores')
    },
    deleteStoreChain (id) {
        return $axios.delete('store-chains/' + id)
    }
})
