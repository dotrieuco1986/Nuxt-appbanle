export default $axios => ({
    forgotPassword (email) {
        return $axios.$post('/auth/password/forgot', { email })
    },

    login (email, password) {
        return $axios.$post('/auth/login', { email, password })
    },

    logout () {
        return $axios.$get('/auth/logout')
    },

    register (payload) {
        return $axios.$post('/auth/register', payload)
    },

    checkUser (token) {
        return $axios.$post('/check-auth', { access_token: token })
    },

    getAvatar (id) {
        return $axios.$get('/get-avatar/' + id)
    },
    updatePassword (data) {
        return $axios.$post('/update-password/', data)
    }
})
