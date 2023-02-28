export const state = () => ({
    locales: ['en', 'vi'],
    locale: 'vi',
    auth: {},
    accessToken: null
})

export const mutations = {
    SET_LANG (state, locale) {
        if (state.locales.includes(locale)) {
            state.locale = locale
        }
    },
    setAuth (state, auth) {
        if (!auth) {
            auth = {
                accessToken: null,
                user: null,
                loggedIn: false
            }
        }
        state.auth = auth
    },
    setAccessToken (state, token) {
        state.accessToken = token
    }
}

export const actions = {
    nuxtServerInit ({ commit }, { app, req }) {
        let auth = this.$cookies.get('auth')

        if (!auth) {
            auth = {
                accessToken: null,
                user: null,
                loggedIn: false
            }
        } else if (auth.accessToken) {
            app.$axios.setToken(auth.accessToken, 'Bearer')
        }
        commit('setAuth', auth)

        let accessToken = this.$cookies.get('accessToken')
        if (!accessToken) {
            accessToken = null
        }
        commit('setAccessToken', accessToken)
    }
}

export const getters = {
    loggedIn: (state) => {
        return state.auth ? state.auth.loggedIn : false
    },
    user: (state) => {
        return state.auth ? state.auth.user : null
    },
    accessToken: (state) => {
        return state.auth ? state.auth.accessToken : null
    },
    accessToken2: (state) => {
        return state.accessToken ? state.accessToken : null
    }
}
