import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
    app.i18n = new VueI18n({
        locale: store.state.locale,
        fallbackLocale: 'vi',
        messages: {
            en: require('~/static/locales/en.json'),
            vi: require('~/static/locales/vi.json')
        }
    })

    app.i18n.path = (link) => {
        return `/${link}`
    }
}
