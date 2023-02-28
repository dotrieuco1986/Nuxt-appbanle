<template>
    <div class="nav">
        <nuxt-link to="/" class="brand">
            Homepage
        </nuxt-link>
        <nav>
            <nuxt-link to="/event">
                List Events
            </nuxt-link>&nbsp;|
            <nuxt-link to="/event/create">
                Create
            </nuxt-link>&nbsp;|
            <nuxt-link to="/event/default_elements">
                Default elements
            </nuxt-link>&nbsp;|
            <nuxt-link to="/event/pageForTest">
                page for test
            </nuxt-link>
            <a
                v-if="$i18n.locale === 'en'"
                class="Header__Link"
                exact
                @click="switchLanguage('vi')"
            >{{ $t('links.vietnam') }}</a>
            <a
                v-else
                class="Header__Link"
                exact
                @click="switchLanguage('en')"
            >{{ $t('links.english') }}</a>
        </nav>
    </div>
</template>

<script>
export default {
    methods: {
        switchLanguage (locale) {
            //  Update the locale cookie
            this.$cookies.set('locale', locale, { path: '/' })

            //  Refresh page to reload components
            window.location.reload(true)
        }
    }
}
</script>

<style scoped>
.brand {
  /* font-family: 'Montserrat', sans-serif; */
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}
.nav a {
  display: inline-block;
}
</style>
