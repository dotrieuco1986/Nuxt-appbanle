export const state = () => ({
    promotions: []
})

export const mutations = {
    SET_VALUES (state, promotions) {
        state.promotions = promotions
    },
    UPDATE_CHECKED (state, data) {
        const promotions = state.promotions.promotions
        promotions.map((promo) => {
            if (data.type === 0) {
                if (promo.id === data.id) { promo.type = 1 } else {
                    promo.type = 0
                }
            } else if (data.type === 1) {
                if (promo.id === data.id) { promo.type = 0 }
            } else if (data.type === -1) {
                if (promo.id === data.id) { promo.type = data.type }
            }
        })
        state.promotions.promotions = promotions
    },
    UPDATE_USED (state, data) {
        // console.log(data.promotions)
        // console.log(state.promotions)
        // data.promotions.map((promo) => {
        //     if (promo.type === 1) {
        //         promo.type = -1
        //     }
        // })
        // state.promotions.promotions = data
    }
}

export const actions = {
    getUserPromotions ({ commit }) {
        let promo = localStorage.getItem('promotions')
        if (promo == null) {
            commit('SET_VALUES', { promotions: [] })
        } else {
            promo = JSON.parse(promo)
            commit('SET_VALUES', { promotions: promo })
        }
    },
    updateChecked ({ commit }, data) {
        commit('UPDATE_CHECKED', data)
    },
    updateUsed ({ commit }, data) {
        commit('UPDATE_USED', data)
    }

}
