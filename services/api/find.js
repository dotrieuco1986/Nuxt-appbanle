export default $axios => ({
    findAround (param) {
        param.site_code = process.env.SITE_CODE
        return $axios.$post('/find-business', param)
    }
})
