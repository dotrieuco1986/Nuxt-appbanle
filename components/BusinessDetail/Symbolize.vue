<template>
    <div :class="[status && (icon === 'heart' || icon === 'maps-and-location') ? 'active' : '','symbol-component']" class="" @click="doTask()">
        <div class="symbol">
            <svg-icon :icon="icon" class="icon-info-business" has-fill="true" />
        </div>
        <span v-if="name">{{ name }}</span>

        <!--Modal Share-->
        <modal v-if="icon==='share'" :id="modalId">
            <share :store-name="storeName" :address="address" :photos="photos" />
        </modal>

        <!--Modal Report-->
        <modal v-if="icon==='maps-and-location'" :id="modalId">
            <report
                :id="id"
                :name="storeName"
                :type="type"
                :address="address"
                :status-report="active"
                :note-report="note"
                @close="closeModal(modalId)"
            />
        </modal>

        <modal v-if="icon==='store'" :id="modalId">
            <div class="modal-body">
                <p class="content-center">
                    {{ resultStatus }}.
                </p>
            </div>
            <footer class="modal-footer content-center">
                <mvp-button name="OK" @click.native="closeModal(modalId)" />
            </footer>
        </modal>
    </div>
</template>

<script>
import MvpButton from '@/components/MVPControl/MvpButton'
import Modal from '../modal/Modal'
import SvgIcon from '../common/SvgIcon'
import { ConstantsJS } from '../../static/constants'
import Share from './Share'
import Report from './Report'

export default {
    components: { MvpButton, Report, SvgIcon, Share, Modal },
    props: {
        id: {
            type: String,
            required: true
        },
        modalId: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            required: true
        },
        storeName: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        photos: {
            type: Array,
            default: null
        },
        icon: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        },
        note: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        },
        geometry: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            status: this.active,
            resultStatus: ''
        }
    },
    watch: {
        active () {
            this.status = this.active
        }
    },
    methods: {
        doTask () {
            switch (this.icon) {
            case 'road-sign':
                this.route()
                break

            case 'cart':
                this.shopify()
                break

            case 'heart':
                this.doSavePlace()
                break

            case 'share':
                this.share()
                break

            case 'maps-and-location':
                this.report()
                break
            case 'store':
                this.store()
                break
            }
        },
        route () {
            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.MAPS_ROUTE,
                query: {
                    source: this.$route.query.source,
                    target: this.geometry.coordinates[1] + ',' + this.geometry.coordinates[0],
                    type: ConstantsJS.ROUTING_TYPES.PEDESTRIAN
                }
            })
        },
        shopify () {
            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.STORE_PRODUCTS,
                params: {
                    businessid: this.id
                }
            })
        },
        async savePlace (formData) {
            const response = await this.$api.store.savePlace(formData)
            if (response.data.status === ConstantsJS.STR_REQUEST_SUCCESS) {
                this.status = !this.status
            }
        },
        doSavePlace () {
            const formData = new FormData()
            formData.append('place_id', this.id)
            formData.append('address', this.address)
            formData.append('is_delete', this.status)
            formData.append('link', window.location.href)
            formData.append('description', '')
            formData.append('hinh', this.photos ? this.photos[0] : '')

            this.savePlace(formData)
        },
        share () {
            this.$bvModal.show(this.modalId)
        },
        report () {
            this.$bvModal.show(this.modalId)
        },
        store () {
            if (!this.id) {
                this.resultStatus = 'Chưa liên kết kênh bán'
                this.$bvModal.show(this.modalId)
                return
            }

            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.STORE,
                params: {
                    id: this.id
                }
            })
        },
        closeModal (id) {
            this.$bvModal.hide(id)
        }
    }
}
</script>

<style lang="scss">
    @import '../../assets/scss/_symbol';
</style>
