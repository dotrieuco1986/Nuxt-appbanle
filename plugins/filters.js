import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (value) => {
    if (!value) { return '' }
    return moment(value).format('LL')
})

Vue.filter('date', (value) => {
    if (!value) { return '' }
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
    return Intl.DateTimeFormat('vi-VN', options).format(value)
})

Vue.filter('formatCurrency', function (value, withSymbol = true) {
    return formatNumber(value, 0, ',', '.') + (withSymbol ? ' VNĐ' : '')
})

function formatNumber (n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? 2 : c
    d = d === undefined ? '.' : d
    t = t === undefined ? ',' : t
    const s = n < 0 ? '-' : ''
    const i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
    let j = i.length
    j = j > 3 ? j % 3 : 0
    return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '')
};
