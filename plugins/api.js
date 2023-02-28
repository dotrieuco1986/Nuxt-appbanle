import Auth from '~/services/api/auth'
import Find from '~/services/api/find'
import Store from '~/services/api/store'
import Product from '~/services/api/product'
import Chat from '~/services/api/chat'
import MapRoute from '~/services/api/maproute'
import Promotions from '~/services/api/promotions'
import Order from '~/services/api/order'
import Survey from '~/services/api/survey'
import ShopShippingConfig from '~/services/api/shopShippingConfig'
import Advertisement from '~/services/api/advertisement'
import Payment from '~/services/api/payment'
import Map from '~/services/api/map'
import UserProfile from '~/services/api/userProfile'

export default ({ $axios, store }, inject) => {
    if (process.client) {
        const token = store.getters.accessToken

        if (token) {
            $axios.setToken(token, 'Bearer')
        }
    }

    // Initialize API repositories
    const repositories = {
        auth: Auth($axios),
        find: Find($axios),
        store: Store($axios),
        product: Product($axios),
        chat: Chat($axios),
        mapRoute: MapRoute($axios),
        promotions: Promotions($axios),
        order: Order($axios),
        survey: Survey($axios),
        shopShippingConfig: ShopShippingConfig($axios),
        advertisement: Advertisement($axios),
        payment: Payment($axios),
        map: Map($axios),
        userProfile: UserProfile($axios)
    }
    inject('api', repositories)
}
