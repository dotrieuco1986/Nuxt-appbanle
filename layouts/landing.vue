<template>
    <div class="warraper">
        <nuxt />
    </div>
</template>

<style lang="scss">
    @import '../assets/scss/_variable';
    @import '../assets/scss/_landing68';
    @import '../assets/scss/_bootstrapcustom';
</style>

<script>

export default {
    name: 'Landing',
    components: { },
    data () {
        return {
            map: null,
            src_avatar: null,
            isLoggedIn: true,
            name: null,
            role: null,
            isAdmin: false,
            balance_user: 0,
            listPLCSKD: [],
            loaiCSKD: [],
            targetCoordinates: null,
            input_style: 'border-radius: 15px; padding-right: 35px !important;',
            autocompleteText: '',
            radiusrang: '300',
            isFilter: false
        }
    },
    computed: {
        btnStates () {
            return this.buttons.map(btn => btn.state)
        },
        getFilter () {
            return this.isFilter
        }
    },
    mounted () {
        this.$root.$on('model-map-popup', () => {
            this.showMap()
        })
    },
    methods: {
        showMap () {
            this.$bvModal.show('map-popup')
        },
        showFilter () {
            if (this.isFilter === true) {
                this.isFilter = false
            } else {
                this.isFilter = true
            }
        }
    },
    head: {
        bodyAttrs: {
            class: 'body-landing'
        }
    }
}
</script>
