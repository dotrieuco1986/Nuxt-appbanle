export const state = () => ({
    myGoollow68Location: null
})

export const mutations = {
    SET_ADDRESS (state, data) {
        state.myGoollow68Location = data
        if (state.myGoollow68Location) {
            localStorage.setItem('myGoollow68Location', JSON.stringify(data))
        }
    }
}

export const actions = {
    getAddress ({ commit }) {
        const data = localStorage.getItem('myGoollow68Location')
        const obj = JSON.parse(data)
        if (obj == null) {
            commit('SET_ADDRESS', null)
        } else {
            commit('SET_ADDRESS', obj)
        }
    },
    setAddress ({ commit }, data) {
        commit('SET_ADDRESS', data)
    }
}
