export default $axios => ({
    getAllAdvertisement (param) {
        return $axios.$get('/get-all-advertisement' + param)
    },
    getAllAdvertisementOnRoad () {
        return $axios.$get('/get-all-advertisement-onroad')
    },
    createAdvertisement (param) {
        return $axios.$post('/create-advertisement', param)
    },
    updateAdvertisement (param) {
        return $axios.$post('/update-advertisement', param)
    },
    updateAdvertisementApi (param) {
        return $axios.$post('/update-advertisement-api', param)
    },
    getAdvertisementImage (param) {
        return $axios.$get('/get-advertisement-image/' + param)
    },
    getAdvertisementConfig (param) {
        return $axios.$get('/advertisement/config/all', null)
    },
    checkAdvertisingAvailable (param) {
        return $axios.$post('/check-available', param)
    },
    getAdsTypes () {
        return $axios.$get('/get-ads-types')
    },
    getAllAdvertisementApi (param) {
        return $axios.$post('/get-all-advertisement-api', param)
    },
    getAdsById (param) {
        return $axios.$get('/get-advertisement/' + param)
    },
    editAdsApi (param) {
        return $axios.$post('/edit-advertisement-api', param)
    }
})
