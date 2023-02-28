<template>
    <side-bar>
        <div id="business-container">
            <business-container
                :id="advertisementInfo.business_id?advertisementInfo.business_id:''"
                :advertisement-id="advertisementInfo.id"
                :online="online"
                :name="advertisementInfo.name?advertisementInfo.name: ''"
                :address="advertisementInfo.business_address?advertisementInfo.business_address:''"
                :type="advertisementInfo.category"
                :phone="advertisementInfo.contact_phone"
                :geometry="advertisementInfo.location"
                :photo-advertisement="advertisementInfo.photo"
                :status-report="statusReport"
                :note-report="noteReport"
                type-view="adv"
                modal-id="1"
            />
            <div class="row" style="border-top: 1px solid #CBD4DA;">
                <business-info v-if="advertisementInfo.contact_phone" :name="advertisementInfo.contact_phone" icon="phone" />
                <business-info v-if="advertisementInfo.website" :name="advertisementInfo.website" icon="global" />
            </div>
        </div>
    </side-bar>
</template>
<script>
import SideBar from '@/components/SideBar'
import BusinessContainer from '@/components/BusinessDetail/BusinessContainer'
import BusinessInfo from '@/components/BusinessDetail/BusinessInfo'

export default {
    name: 'Index',
    components: {
        BusinessContainer,
        SideBar,
        BusinessInfo
    },
    data () {
        return {
            id: this.$route.params.id,
            online: false,
            geometry: null,
            statusReport: false,
            noteReport: '',
            advertisementInfo: {
                id: '',
                business_id: '',
                category: '',
                name: '',
                business_address: '',
                location: {},
                photo: ''
            }
        }
    },
    async mounted () {
        const response = await this.$api.store.getAdvertisementById(this.id)
        this.advertisementInfo = response.data

        if (this.$store.state.auth.loggedIn) {
            const response = await this.$api.store.getMoreInfoStore(this.$route.params.id)
            const data = response.data

            this.statusReport = data.statusReport
            this.noteReport = data.noteReport
        }

        this.showPopUp()
    },
    methods: ({
        showPopUp () {
            const params = {
                id: this.advertisementInfo.business_id ? this.advertisementInfo.business_id : '',
                advertisementId: this.advertisementInfo.id,
                name: this.advertisementInfo.name,
                type: this.advertisementInfo.category,
                address: this.advertisementInfo.business_address ? this.advertisementInfo.business_address : '',
                phone: this.advertisementInfo.contact_phone,
                reliability: 0,
                geometry: this.advertisementInfo.location,
                photos: this.advertisementInfo.photo,
                statusHeart: this.statusHeart,
                statusReport: this.statusReport,
                noteReport: this.noteReport,
                typeView: 'adv'
            }
            this.$root.$emit('show_detail_business', params) // like this
        }
    }),
    head () {
        return {
            title: this.advertisementInfo.name,
            meta: [
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: process.env.SERVER_IMAGE_URL + (this.advertisementInfo.photo
                        ? this.advertisementInfo.photo : 'no-images.png')
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: process.env.BASE_URL + this.$route.path
                },
                {
                    hid: 'og:type',
                    property: 'og:type',
                    content: this.advertisementInfo.category
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: this.advertisementInfo.business_address
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.advertisementInfo.business_address
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
@import '../../../assets/scss/_business-info';
</style>
