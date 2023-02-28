export const state = () => ({
    isLoggin: false,
    accessToken: null,
    info: {},
    profile: {}
})

export const mutations = {
    SET_TOKEN (state, accessToken) {
        state.accessToken = accessToken
        state.isLoggin = true
    },
    SET_AUTHOR (state, objauthor) {
        state.info = objauthor.info
        state.profile = objauthor.profile
    },
    SET_REMOVE_AUTHOR (state) {
        state.isLoggin = false
        state.accessToken = null
        state.info = {}
        state.profile = {}
        this.$cookies.removeAll()
    }
}

export const actions = {
    setOAuth ({ commit }, data) {
        return commit('SET_AUTHOR', data)
    },
    setAccessToken ({ commit }, accessToken) {
        return commit('SET_TOKEN', accessToken)
    },
    setRemoveAuthor ({ commit }) {
        return commit('SET_REMOVE_AUTHOR')
    }
}
