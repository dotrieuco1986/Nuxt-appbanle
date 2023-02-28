<template>
    <div class="advertisement">
        <div class="sidebar-small text-center">
            <div class="create-panel rounded-left">
                <div class="create-button" @click="createClick">
                    <font-awesome-icon icon="plus" />
                </div>
            </div>

            <div v-if="listData.length > 0" id="drag-menu" class="items-panel vscrollbar">
                <div id="item-advertisement">
                    <div v-for="item in listData" :key="item.id">
                        <advertisement-item :data="item" />
                        <div class="border-bottom" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AdvertisementItem from '@/components/AdvertisementItem'
import { mapGetters } from 'vuex'

export default {
    name: 'Index',
    components: {
        AdvertisementItem
    },
    data () {
        return {
            listData: []
        }
    },
    computed: {
        ...mapGetters({
            checkIsLoggedIn: 'loggedIn',
            loggedInUser: 'user'
        })
    },
    mounted () {
        if (!this.checkIsLoggedIn) {
            this.$router.push({ path: '/' })
        }

        this.addEventDragImage()

        this.$root.$on('update_quang_cao', (isNew, data, location) => {
            this.updateAds(isNew, data, location)
        })

        this.$root.$on('handle_touch_move', (id, position) => {
            this.handleDataWhenDrop(id, position)
        })

        this.fetch()
        this.getAdsFromApi()
    },
    methods: {
        async getAdsFromApi () {
            const response = await this.$api.advertisement.getAllAdvertisementApi()
            if (response.status === 'OK' && response.result && response.result.length > 0) {
                const data = []
                response.result.forEach((item) => {
                    if (item.location && item.location.coordinates) {
                        item.type = 'Feature'
                        item.geometry = {
                            coordinates: item.location.coordinates,
                            type: 'Point'
                        }
                        data.push(item)
                    }
                })
                this.$root.$emit('show-advertisement-on-map', { features: data })
            }
        },
        async fetch () {
            const data = await this.$api.advertisement.getAllAdvertisementOnRoad()
            if (data.status === 200 && data.data && data.data.length > 0) {
                this.listData = data.data
            } else {
                this.pushRoute()
            }
        },
        addEventDragImage () {
            const _this = this

            document.addEventListener('dragover', function (event) {
                event.preventDefault()
            }, false)

            document.addEventListener('drop', function (event) {
                event.preventDefault()

                const id = event.dataTransfer.getData('advertisement-item-id')
                const position = { clientX: event.clientX, clientY: event.clientY }
                _this.handleDataWhenDrop(id, position)
            }, false)
        },
        handleDataWhenDrop (id, position) {
            const _this = this
            if (id) {
                let adsDatas = null
                for (let i = 0; i < _this.listData.length; i++) {
                    if (_this.listData[i].id.toString() === id.toString()) {
                        adsDatas = _this.listData[i]
                        break
                    }
                }

                if (adsDatas) {
                    const mapDiv = document.getElementById('mainmap')
                    const coordsX = position.clientX - mapDiv.offsetLeft
                    const coordsY = position.clientY + 10 - mapDiv.offsetTop

                    const dataarr = { coordX: coordsX, coordY: coordsY, adsData: adsDatas }
                    _this.$root.$emit('add_marker_on_map', dataarr)
                }
            }
        },
        createClick () {
            this.pushRoute()
        },
        async updateAds (isNew, data, location) {
            const _this = this
            let formData = new FormData()
            formData.append('id', data.id)
            formData.append('banner_type', 4)
            formData.append('location', location)

            if (isNew) {
                formData.append('image', data.image)
                formData.append('type', data.type)
                formData.append('desc', data.content)
                formData.append('phone', data.phone)
                if (data.business_id) {
                    formData.append('business_id', data.business_id)
                }
            }

            const response = await this.$api.advertisement.updateAdvertisementApi(formData)
            if (response.status === 'OK' && isNew) {
                formData = new FormData()
                formData.append('id', data.id)
                _this.$api.advertisement.updateAdvertisement(formData)
                _this.updateListData(data.id)
            }
        },
        pushRoute () {
            const url = '/advertisement/create'
            this.$router.push({ path: url })
        },
        updateListData (id) {
            for (let i = 0; i < this.listData.length; i++) {
                if (this.listData[i].id === id) {
                    this.listData[i].quantity -= 1
                    if (this.listData[i].quantity <= 0) {
                        this.listData.splice(i, 1)
                    }
                    break
                }
            }
        }
    }
}
</script>

<style lang="scss">
    @import './assets/scss/advertisement';
</style>
