export default $axios => ({
    getUserProfile (param) {
        return $axios.$get('/user-profile/' + param)
    },
    saveUserProfile (param) {
        return $axios.$post('/user-profile', param)
    }
})
