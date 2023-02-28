<template>
    <div class="container">
        <div class="text-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    layout: 'logging',
    components: {},
    created () {
    },
    mounted () {
        const token = this.$route.query.access_token
        const _app = this
        this.$api.auth.checkUser(token).then((res) => {
            const accessToken = res.access_token
            const userData = res.logged_user
            const auth = {
                accessToken,
                user: userData,
                loggedIn: true
            }
            _app.$store.commit('setAuth', auth)
            _app.$cookies.set('auth', auth, { maxAge: 60 * 60 * 24 * 3, secure: false, sameSite: 'lax' })
            _app.$store.commit('setAccessToken', token)
            _app.$cookies.set('accessToken', token, { maxAge: 60 * 60 * 24 * 3, secure: false, sameSite: 'lax' })
            const urlRedirect = localStorage.getItem('urlRedirect')
            localStorage.removeItem('urlRedirect')
            window.location.href = urlRedirect || '/'
        }).catch((error) => {
            if (error.response.status !== 200) {
                this.$cookies.remove('auth')
                this.$store.commit('setAuth', null)
                window.location.href = process.env.OAUTH_API + window.location.origin + '/author'
            }
        })
    },
    head () {
        return {
            title: 'Event Listing'
        }
    }
}
</script>
