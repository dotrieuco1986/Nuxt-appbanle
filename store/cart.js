export const state = () => ({
    cartNumber: 0,
    products: []
})

export const mutations = {
    SET_VALUES (state, cart) {
        state.cartNumber = cart.cartNumber
        state.products = cart.products
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export const actions = {
    getCart ({ commit }) {
        let cart = localStorage.getItem('cart')
        if (cart == null) {
            commit('SET_VALUES', { cartNumber: 0, products: [] })
        } else {
            cart = JSON.parse(cart)
            commit('SET_VALUES', { cartNumber: cart.cartNumber, products: cart.products })
        }
    },
    addProduct ({ commit }, item) {
        let cart = localStorage.getItem('cart')
        if (cart == null) {
            cart = { cartNumber: item.qty, products: [item] }
        } else {
            cart = JSON.parse(cart)
            cart.cartNumber = cart.cartNumber + item.qty
            const updatedItem = cart.products.find((element) => { return (element.id === item.id && element.shopId === item.shopId) })
            if (updatedItem !== undefined) {
                updatedItem.qty += item.qty
            } else {
                cart.products.push(item)
            }
        }
        commit('SET_VALUES', cart)
    },
    removeProduct ({ commit }, item) {
        const cart = JSON.parse(localStorage.getItem('cart'))
        const indexFind = cart.products.findIndex(obj => obj.id === item.id)
        // console.log(indexFind)
        if (indexFind !== undefined) {
            if (cart.products[indexFind].qty > item.qty) {
                cart.products[indexFind].qty = cart.products[indexFind].qty - item.qty
            } else {
                cart.products.splice(indexFind, 1)
            }
        }
        cart.cartNumber = cart.cartNumber - item.qty
        // console.log(cart)
        commit('SET_VALUES', cart)
    },
    updateChecked ({ commit }, data) {
        const cart = JSON.parse(localStorage.getItem('cart'))
        cart.products.map(function (el) {
            if (el.shopId === data.shopId) {
                el.checked = data.checked
            }
        })
        commit('SET_VALUES', cart)
    }

}
