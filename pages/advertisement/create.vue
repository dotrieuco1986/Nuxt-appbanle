<template>
    <div class="advertisement">
        <side-bar :right="true" :width="width" @closeSidebar="pushRoute">
            <div class="vscrollbar">
                <h4>TẠO QUẢNG CÁO</h4>
                <div>
                    <b-tabs v-model="tabIndex" content-class="mt-3">
                        <b-tab title="Banner tĩnh" active>
                            <advertisement-form
                                id-form="static"
                                :banner-type-options="bannerTypeOptions"
                                :payment-status="paymentStatus"
                                :banner-price-config="bannerPriceConfig.static"
                            />
                        </b-tab>
                        <b-tab title="Banner động">
                            <advertisement-form
                                id-form="dynamic"
                                :banner-type-options="bannerTypeOptions"
                                :payment-status="paymentStatus"
                                :banner-price-config="bannerPriceConfig.dynamic"
                            />
                        </b-tab>
                        <b-tab title="Ưu tiên">
                            <advertisement-form
                                id-form="priority"
                                :banner-type-options="bannerTypeOptions"
                                :payment-status="paymentStatus"
                                :banner-price-config="bannerPriceConfig.priority"
                            />
                        </b-tab>
                        <b-tab title="Cắm bảng">
                            <advertisement-form
                                id-form="onroad"
                                :banner-type-options="bannerTypeOptions"
                                :payment-status="paymentStatus"
                                :banner-price-config="bannerPriceConfig.onroad"
                            />
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </side-bar>
    </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import { mapGetters } from 'vuex'
import AdvertisementForm from '../../components/AdvertisementForm'

export default {
    name: 'Create',
    components: {
        AdvertisementForm,
        SideBar
    },
    data () {
        return {
            width: '461px',
            bannerTypeOptions: [],
            paymentStatus: null,
            bannerPriceConfig: {
                static: null,
                dynamic: null,
                priority: null,
                onroad: null
            },
            tabIndex: 0
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

        this.fetch()

        this.$store.dispatch('advertisement/getAdvertisement')
        const datas = this.$store.state.advertisement.datas
        if (datas) {
            if (datas.bannerType === 'static') {
                this.tabIndex = 0
            } else if (datas.bannerType === 'dynamic') {
                this.tabIndex = 1
            } else if (datas.bannerType === 'priority') {
                this.tabIndex = 2
            } else {
                this.tabIndex = 3
            }
        }
    },
    created () {
        this.getAdvertisementConfig()
        this.getCategories()
        this.getAdsFromApi()
    },
    methods: {
        pushRoute () {
            this.$router.push({ path: '/advertisement' })
        },
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
        fetch () {
            this.getPaymentStatus()
        },
        async getPaymentStatus () {
            if (this.$route.query && this.$route.query.vnp_ResponseCode) {
                const response = await this.$api.payment.checkResultPayment(this.$route.query)
                if (response.status === 'OK' && response.data) {
                    this.paymentStatus = response.data
                }
            }
        },
        async getAdvertisementConfig () {
            const response = await this.$api.advertisement.getAdvertisementConfig()
            for (let i = 0; i < response.length; i++) {
                if (response[i].advertisement_type === 1) {
                    this.bannerPriceConfig.static = response[i]
                } else if (response[i].advertisement_type === 2) {
                    this.bannerPriceConfig.dynamic = response[i]
                } else if (response[i].advertisement_type === 3) {
                    this.bannerPriceConfig.priority = response[i]
                } else if (response[i].advertisement_type === 4) {
                    this.bannerPriceConfig.onroad = response[i]
                }
            }
        },
        async getCategories () {
            const data = await this.$api.store.getCategories()
            if (data.status === 200 && data.data && data.data.length > 0) {
                const listCategoriesData = data.data
                for (let i = 0; i < listCategoriesData.length; i++) {
                    if (!listCategoriesData[i].parent_id) {
                        const item = {
                            id: listCategoriesData[i].id,
                            label: listCategoriesData[i].name.toUpperCase(),
                            children: []
                        }
                        for (let j = 0; j < listCategoriesData.length; j++) {
                            if (listCategoriesData[j].parent_id === listCategoriesData[i].id) {
                                const childItem = { id: listCategoriesData[j].id, label: listCategoriesData[j].name }
                                item.children.push(childItem)
                            }
                        }
                        if (item.children.length <= 0) {
                            item.id = listCategoriesData[i].id + 'S'
                            const childItem = { id: listCategoriesData[i].id, label: listCategoriesData[i].name }
                            item.children.push(childItem)
                        }
                        this.bannerTypeOptions.push(item)
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss">
    @import './assets/scss/advertisement';
</style>
