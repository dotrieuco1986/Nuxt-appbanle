export const state = () => ({
    datas: null
})

export const mutations = {
    SET_VALUES (state, data) {
        state.datas = data.datas
        localStorage.setItem('advertisement', JSON.stringify(data))
    }
}

export const actions = {
    getAdvertisement ({ commit }) {
        let advertisement = localStorage.getItem('advertisement')
        if (advertisement == null) {
            commit('SET_VALUES', { datas: null })
        } else {
            advertisement = JSON.parse(advertisement)
            commit('SET_VALUES', { datas: advertisement.datas })
        }
    },
    addAdvertisement ({ commit }, item) {
        commit('SET_VALUES', { datas: item })
    }
}
