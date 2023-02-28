<template>
    <side-bar id="sidebar-business">
        <div id="business-container">
            <business-container
                :id="store.id"
                :online="online"
                :name="store.name"
                :address="store.address"
                :type="store.type"
                :photos="store.listPhoto"
                :reliability="store.reliability"
                :rating="store.rating"
                :review-number="store.reviewNumber"
                :geometry="store.geometry"
                :status-heart="statusHeart"
                :status-report="statusReport"
                :note-report="noteReport"
                modal-id="1"
            />
            <div class="row" style="border-top: 1px solid #CBD4DA;">
                <business-info v-if="store.address" :name="store.address" icon="home" />
                <business-info v-if="store.website" :name="store.website" icon="global" />
                <business-info v-if="store.facebook" :name="store.facebook" icon="fb" />
                <business-info v-if="store.youtube" :name="store.youtube" icon="youtube" />
                <business-info v-if="store.phone" :name="store.phone" icon="phone" />
                <active-hours v-if="store.active_hours" :active-hours="store.active_hours" icon="accept-clock" />
            </div>

            <div class="row">
                <span class="edit-info">Chỉnh sửa thông tin</span>
            </div>
        </div>
    </side-bar>
</template>

<script>

import { mapState } from 'vuex'
import BusinessInfo from '../../components/BusinessDetail/BusinessInfo'
import SideBar from '../../components/SideBar'
import BusinessContainer from '../../components/BusinessDetail/BusinessContainer'
import ActiveHours from '../../components/BusinessDetail/ActiveHours'

export default {
    components: {
        ActiveHours,
        BusinessContainer,
        SideBar,
        BusinessInfo
    },
    async fetch ({ store, params }) {
        await store.dispatch('stores/fetchStore', params.id)
    },
    data () {
        return {
            id: this.$route.params.id,
            online: false,
            geometry: null,
            statusHeart: false,
            statusReport: false,
            noteReport: ''
        }
    },
    computed: mapState({
        store: state => state.stores.store
    }),
    async mounted () {
        if (this.$store.state.auth.loggedIn) {
            const response = await this.$api.store.getMoreInfoStore(this.$route.params.id)
            const data = response.data

            this.statusHeart = data.statusHeart
            this.statusReport = data.statusReport
            this.noteReport = data.noteReport
        }
        this.showPopUp()
    },
    methods: ({
        showPopUp () {
            const store = this.$store.state.stores.store
            const params = {
                id: store.id,
                advertisementId: '',
                name: store.name,
                type: store.type,
                address: store.address,
                phone: store.phone,
                reliability: store.reliability,
                geometry: store.geometry,
                photos: store.listPhoto,
                statusHeart: this.statusHeart,
                statusReport: this.statusReport,
                noteReport: this.noteReport,
                typeView: 'store'
            }
            this.$root.$emit('show_detail_business', params) // like this
        }
    }),
    head () {
        return {
            title: this.$store.state.stores.store.name,
            meta: [
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: process.env.SERVER_IMAGE_URL + (this.$store.state.stores.store.listPhoto.length > 0
                        ? this.$store.state.stores.store.listPhoto[0] : 'no-images.png')
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: process.env.BASE_URL + this.$route.path
                },
                {
                    hid: 'og:type',
                    property: 'og:type',
                    content: this.$store.state.stores.store.type
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: this.$store.state.stores.store.address
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.$store.state.stores.store.address
                },
                {
                    hid: 'fb:app_id',
                    property: 'fb:app_id',
                    content: '2427123050676744'
                }
            ]
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/_business-info';
</style>
