export const state = () => ({
    store: {}
})

export const mutations = {
    SET_STORE (state, store) {
        state.store = store
    }
}

export const actions = {
    fetchStore ({ commit }, id) {
        return this.$api.store.getStoreById(id).then(function (response) {
            const list = []
            const data = response.data
            for (let i = 0; i < data.photos.length; i++) {
                list.push(data.photos[i].photo_reference)
            }

            if (data.facade_photo) {
                list.push(data.facade_photo)
            }

            if (data.signboard_photo) {
                list.push(data.signboard_photo)
            }

            response.data.listPhoto = list

            if (list.length === 0) {
                response.data.listPhoto.push('no-image.png')
            }

            commit('SET_STORE', response.data)
        })
    }
}
