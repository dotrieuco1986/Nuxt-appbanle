import VueNotifications from 'vue-notifications'
import Vue from 'vue'
import iziToast from 'izitoast'// https://github.com/dolce/iziToast
import 'izitoast/dist/css/iziToast.min.css'

function toast ({ title, message, type, timeout, position, cb }) {
    if (type === VueNotifications.types.warn) { type = 'warning' }
    return iziToast[type]({ title, message, timeout, position })
}

const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
}

Vue.use(VueNotifications, options)
export default VueNotifications
