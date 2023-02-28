require('dotenv').config()

const environment = {
    API_URL: process.env.API_URL
}

export default {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    ssr: true,
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'server',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        script: [
            {
                src: 'https://sp.zalo.me/plugins/sdk.js'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Global CSS
     */
    css: [
        '@/assets/scss/_variable',
        '@/assets/scss/_global',
        '@/assets/scss/_notification',
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        '~/plugins/api',
        '~/plugins/i18n.js',
        { src: '~/plugins/mvp-maps.js', ssr: false },
        '~/plugins/fontawesome.js',
        { src: '~/plugins/notification.js', ssr: false },
        { src: '~/plugins/vue-star-rating.js', ssr: false },
        { src: '~/plugins/vue-slick-carousel.js' },
        // '~/plugins/chat/v-chat.js',
        '~/plugins/daterange-picker.js',
        '~plugins/filters.js',
        '~plugins/axios.js'
    ],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        '@nuxtjs/dotenv', ['@nuxtjs/fontawesome', {
            component: 'fa',
            suffix: true
        }]
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/proxy',
        'cookie-universal-nuxt'
    ],
    env: environment,
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        proxy: true,
        prefix: '/api/'
    },
    proxy: {
        '/api/': { target: environment.API_URL, pathRewrite: { '^/api/': '' } }
    },
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {
        extend(config, ctx) {
            config.module.rules.push({
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/,
                options: {
                    fix: true
                }
            })
        },
        splitChunks: {
            layouts: true
        }
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#39b982' },

    i18n: {
        strategy: 'no_prefix',
        defaultLocale: 'vi',
        lazy: true,
        locales: ['en', 'vi']
    },
    router: {
        middleware: 'i18n'
    }
}
