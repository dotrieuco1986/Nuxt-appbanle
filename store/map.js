export const state = () => ({
    findShops: { status: 0, data: '' }
})

export const mutations = {
    SET_VALUES (state, findShops) {
        state.findShops = findShops
    }
}

export const actions = {
    showShop ({ commit }, shops) {
        commit('SET_VALUES', shops)
    }
}
