import Vue from 'vue'
import mvp from 'mvp-maps'
import 'leaflet/dist/leaflet.css'
const L = require('leaflet')

const VueLeaflet = {
    install (Vue, options) {
        Vue.prototype.$mvp = mvp
        Vue.prototype.$L = L
    }
}
Vue.use(VueLeaflet)
export default VueLeaflet
