<template>
    <div id="store-create" class="col-12">
        <b-row class="my-1 head-area">
            <b-col sm="12">
                <b-breadcrumb :items="breadcrumbs" />
            </b-col>
        </b-row>
        <div class="row">
            <div class="col-md-12">
                <form class="form-custom create">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group row">
                                <label for="store-business-type" class="col-sm-4 col-form-label label-custom">Loại Quảng Cáo: </label>
                                <div class="col-sm-8">
                                    <select id="store-business-type" v-model="dataBanner.bannerType" name="store-business-type" class="form-control">
                                        <option v-for="item in listTypeAds" :key="item.id" :value="item.id">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div v-show="currentTypeAds === 'onroad'" class="form-group row">
                                <label for="store-business-type" class="col-sm-4 col-form-label label-custom">Số lượng: </label>
                                <div class="col-sm-8">
                                    <input
                                        id="advertisement-quantity"
                                        v-model="dataBanner.quantity"
                                        type="number"
                                        class="form-control form-control-sm"
                                        placeholder="Nhập"
                                        maxlength="3"
                                        :min="quantityMin"
                                        :max="quantityMax"
                                    >
                                    <div class="errorMessage">
                                        {{ errors.quantity }}
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="store-name" class="col-sm-4 col-form-label label-custom">Nội Dung Quảng Cáo: </label>
                                <div class="col-sm-8">
                                    <textarea
                                        id="store-name"
                                        v-model="dataBanner.desc"
                                        class="form-control"
                                        rows="3"
                                        maxlength="300"
                                        placeholder="Nhập nội dung"
                                        @keydown="onDescKeyDown"
                                    />
                                </div>
                            </div>
                            <div v-show="currentTypeAds !== 'onroad'" class="form-group row">
                                <label class="col-sm-4 col-form-label label-custom">Thời Gian Quảng Cáo: </label>
                                <div class="col-sm-8 row">
                                    <div class="position-relative">
                                        <input
                                            id="advertisement-date"
                                            type="text"
                                            class="form-control form-control-sm"
                                            placeholder="Chọn"
                                            :value="dataBanner.date.length > 0 ? 'Chỉnh sửa' : ''"
                                            readonly
                                            @click="datePickerClick"
                                        >
                                        <svg-icon icon="calendar" class="image-calendar" grow-by-height="22px" />
                                    </div>
                                    <div class="errorMessage">
                                        {{ errors.date }}
                                    </div>
                                </div>
                            </div>
                            <div v-show="currentTypeAds !== 'onroad'" class="form-group row">
                                <label class="col-sm-4 col-form-label label-custom">Khung giờ: </label>
                                <div class="col-sm-8 row">
                                    <range-slider ref="childSlider" :data-init="dataBanner.timeInDay" :slider-style="sliderStyle" />
                                </div>
                            </div>
                            <div v-show="currentTypeAds === 'dynamic'" class="form-group row">
                                <label class="col-sm-4 col-form-label label-custom" />
                                <div class="col-sm-8 row">
                                    <div class="times-panel">
                                        <div
                                            v-for="(item, index) in listTimeData"
                                            :key="index"
                                            :class="[dataBanner.time === item.value ? 'active' : '', 'times']"
                                            @click="dataBanner.time = item.value"
                                        >
                                            {{ item.text }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-4 col-form-label label-custom">Danh mục: </label>
                                <div class="col-sm-8 row">
                                    <tree-select
                                        v-model="dataBanner.type"
                                        :id-form="idForm"
                                        :options="bannerTypeOptions"
                                        placeholder="Chọn"
                                    />
                                    <div class="errorMessage">
                                        {{ errors.type }}
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-4 col-form-label label-custom">Số điện thoại liên hệ: </label>
                                <div class="col-sm-8 row">
                                    <input
                                        id="advertisement-phone"
                                        v-model="dataBanner.phone"
                                        type="text"
                                        class="form-control form-control-sm"
                                        placeholder="Nhập số điện thoại"
                                        maxlength="50"
                                    >
                                    <div class="errorMessage">
                                        {{ errors.phone }}
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-4 col-form-label label-custom">Trang web: </label>
                                <div class="col-sm-8 row">
                                    <input
                                        id="advertisement-website"
                                        v-model="dataBanner.website"
                                        type="text"
                                        class="form-control form-control-sm"
                                        placeholder="Nhập trang web"
                                        maxlength="50"
                                    >
                                    <div class="errorMessage">
                                        {{ errors.website }}
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-4 col-form-label label-custom">Liên Kết Cửa Hàng: </label>
                                <div class="col-sm-8">
                                    <div class="input-group-prepend">
                                        <auto-complete
                                            id="advertisement-business"
                                            :submit-value="submitValue"
                                            :url-autocomplete="urlAutocomplete"
                                        />
                                    </div>
                                    <div class="errorMessage">
                                        {{ errors.business }}
                                    </div>
                                </div>
                            </div>
                            <div v-show="currentTypeAds === 'onroad'" class="form-group row">
                                <label class="col-sm-4 col-form-label label-custom">Địa điểm: </label>
                                <div class="col-sm-8">
                                    <div class="input-group-prepend">
                                        <input
                                            id="store-link"
                                            v-model="selectedAddress"
                                            type="text"
                                            class="form-control"
                                            placeholder="Chọn địa điểm"
                                            readonly
                                            @click="showMap"
                                        >
                                        <div class="input-group-text">
                                            <font-awesome-icon icon="map-marker-alt" @click="showMap" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 text-center">
                            <image-selection ref="childImage" :id-form="idForm" />
                            <div class="errorMessage">
                                {{ errors.image }}
                            </div>
                            <!-- <label class="col-sm-12 col-form-label label-custom label-signboard">Chọn bảng hiệu</label>
                            <div class="col">
                                <span class="upload-signboard" @click="openSelectImage">
                                    <span>
                                        Tải lên
                                    </span>
                                </span>
                            </div>
                            <input ref="signboardInput" class="d-none" type="file"> <br>
                            <span class="col-sm-12 text-center -text-gray">Dung lượng tối đa 1MB. <br> Định dạng JPG, PNG. <br> Tỉ lệ ngang dọc 2:1</span> -->
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group row">
                                <div class="col-6 text-right">
                                    <ButtonAdmin :type="resetBtn.type" :class="resetBtn.class" :text="resetBtn.text" @click="handleReset" />
                                </div>
                                <div class="col-6 text-left">
                                    <ButtonAdmin :type="submitBtn.type" :class="submitBtn.class" :text="submitBtn.text" @click="handleSubmit" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <modal id="modal-date-picker" size="sm">
                    <p>NGÀY ĐẶT QUẢNG CÁO</p>
                    <multi-date-picker
                        v-model="dataBanner.date"
                        :value="dataBanner.date"
                        :multi="true"
                        :always-display="true"
                        id-popup="modal-date-picker"
                        :submit-value="datesSubmitSelect"
                    />
                </modal>
                <Modal id="modal-map-popup">
                    <MapPopupSearch :has-event="true" @map-popup-search-location="handleMapSelectPoint" />
                </Modal>
                <modal-request-pay
                    ref="mdRequestPay"
                    :description="'Vui lòng thanh toán để tạo quảng cáo'"
                    :total-amount="bannerPrice"
                    :return-url="returnURL"
                    :order-info="orderInfo"
                    call-back-update
                />
                <modal :id="'modal-unavailable'">
                    <div class="modal-payment-method">
                        <p style="color: red">
                            Ngày, giờ bạn đã chọn không hợp lệ
                        </p>
                        <p>Những ngày đã được chọn</p>
                        <div class="ml-3">
                            <label v-for="(item, index) in unavailableTimeBanner.dates" :key="index" class="mr-3">
                                {{ item }}
                            </label>
                        </div>
                        <p class="mt-3">
                            Khoảng thời gian đã được chọn
                        </p>
                        <label class="ml-3">{{ unavailableTimeBanner.period[0] }} - {{ unavailableTimeBanner.period[1] }}</label>
                    </div>
                </modal>
                <modal-success ref="mdSuccess" :msg="'Tạo quảng cáo thành công'" />
            </div>
        </div>
    </div>
</template>
<style lang="scss">
@import "~/assets/scss/_global";
@import "~/assets/scss/_btable";
@import "~/assets/scss/_stores";
@import "~/assets/scss/_breadcrumb";
</style>
<script>
import ImageSelection from '@/components/ImageSelection.vue'
import ModalRequestPay from '@/components/modal/ModalRequestPay'
import ModalSuccess from '@/components/modal/ModalSuccess'
import MultiDatePicker from '~/components/MultiDatePicker'
import ButtonAdmin from '~/components/buttons/ButtonAdmin.vue'
import RangeSlider from '~/components/RangeSlider.vue'
import MapPopupSearch from '~/components/MapPopupSearch'

export default {
    layout: 'admin',
    components: {
        ButtonAdmin,
        RangeSlider,
        MultiDatePicker,
        MapPopupSearch,
        ImageSelection,
        ModalRequestPay,
        ModalSuccess
    },
    props: {
        headTitle: {
            type: String,
            default: 'Tạo Quảng Cáo'
        }
    },
    // async asyncData ({ app, $axios, route, error }) {
    //     let paymentStatus = null
    //     if (route.query && route.query.vnp_ResponseCode) {
    //         const response = await app.$api.payment.checkResultPayment(route.query)
    //         if (response.status === 'OK' && response.data) {
    //             paymentStatus = response.data
    //         }
    //     }

    //     const listTypeAds = await app.$api.advertisement.getAdsTypes()
    //     const data = await app.$api.store.getCategories()
    //     const arrBannerTypeOptions = []

    //     if (data.status === 200 && data.data && data.data.length > 0) {
    //         const listCategoriesData = data.data

    //         for (let i = 0; i < listCategoriesData.length; i++) {
    //             if (!listCategoriesData[i].parent_id) {
    //                 const item = {
    //                     id: listCategoriesData[i].id,
    //                     label: listCategoriesData[i].name.toUpperCase(),
    //                     children: []
    //                 }
    //                 for (let j = 0; j < listCategoriesData.length; j++) {
    //                     if (listCategoriesData[j].parent_id === listCategoriesData[i].id) {
    //                         const childItem = { id: listCategoriesData[j].id, label: listCategoriesData[j].name }
    //                         item.children.push(childItem)
    //                     }
    //                 }
    //                 if (item.children.length <= 0) {
    //                     item.id = listCategoriesData[i].id + 'S'
    //                     const childItem = { id: listCategoriesData[i].id, label: listCategoriesData[i].name }
    //                     item.children.push(childItem)
    //                 }
    //                 arrBannerTypeOptions.push(item)
    //             }
    //         }
    //     }

    //     const arrayBannerPriceConfig = await app.$api.advertisement.getAdvertisementConfig()

    //     let adsInfo = null
    //     if (route.params && route.params.id) {
    //         const advertisementInfo = await app.$api.advertisement.getAdsById(route.params.id)
    //         adsInfo = {
    //             id: advertisementInfo.id,
    //             bannerType: advertisementInfo.type_id,
    //             type: advertisementInfo.categories,
    //             desc: advertisementInfo.content,
    //             phone: advertisementInfo.contact_phone,
    //             website: advertisementInfo.website,
    //             businessId: advertisementInfo.business_id,
    //             businessAddress: advertisementInfo.business_address,
    //             businessName: advertisementInfo.businessName,
    //             date: advertisementInfo.dates,
    //             timeInDay: advertisementInfo.period,
    //             quantity: advertisementInfo.quantity,
    //             time: advertisementInfo.time,
    //             image: advertisementInfo.photo
    //         }
    //     }

    //     return {
    //         listTypeAds: listTypeAds.result,
    //         bannerTypeOptions: arrBannerTypeOptions,
    //         paymentStatus,
    //         arrayBannerPriceConfig,
    //         dataBanner: adsInfo
    //     }
    // },
    provide () {
        return {
            $update: this.createAdvertisement
        }
    },
    data () {
        return {
            idForm: 'advertisement',
            bannerTypeOptions: [],
            constantTypeAds: [
                'static',
                'dynamic',
                'priority',
                'onroad'
            ],
            listTypeAds: [],
            listTimeData: [
                { value: 5, text: '5s' },
                { value: 10, text: '10s' },
                { value: 15, text: '15s' },
                { value: 20, text: '20s' },
                { value: 25, text: '25s' },
                { value: 30, text: '30s' }
            ],
            dataBanner: {
                id: '0',
                bannerType: 1,
                type: [],
                desc: '',
                phone: '',
                website: '',
                businessId: '',
                businessAddress: '',
                businessName: '',
                date: [],
                timeInDay: [],
                quantity: 0,
                time: 5,
                image: ''
            },
            breadcrumbs: [
                {
                    text: 'Quản Lý Quảng Cáo',
                    href: '/admin/advertisement/list'
                },
                {
                    text: this.headTitle,
                    active: true
                }
            ],
            submitBtn: {
                text: 'Hoàn Tất',
                type: 'submit',
                class: 'btn btn-sucess-custom'
            },
            resetBtn: {
                text: 'Bỏ Qua',
                type: 'reset',
                class: 'btn btn-reset-custom'
            },
            sliderStyle: 'width: 100%',
            urlAutocomplete: 'stores/autocomplete',
            selectedAddress: '',
            quantityMax: 1000,
            quantityMin: 1,
            errors: {
                type: null,
                phone: null,
                website: null,
                image: null,
                business: null,
                quantity: null,
                date: null
            },
            bannerPrice: 0,
            unavailableTimeBanner: {
                period: [],
                dates: []
            },
            datesSelected: [],
            paymentStatus: null,
            paymentMethodPicked: 'INT',
            cardType: [],
            cardTypeSelection: '',
            returnURL: '',
            arrayBannerPriceConfig: []
        }
    },
    computed: {
        currentTypeAds () {
            return this.constantTypeAds[this.dataBanner.bannerType - 1]
        },
        orderInfo () {
            return this.currentTypeAds + 'bannerpayment'
        },
        currentBannerPriceConfig () {
            for (let i = 0; i < this.arrayBannerPriceConfig.length; i++) {
                if (this.arrayBannerPriceConfig[i].advertisement_type === this.dataBanner.bannerType) {
                    return this.arrayBannerPriceConfig[i]
                }
            }
            return null
        }
    },
    watch: {
        paymentStatus (val) {
            if (val && val.info === this.currentTypeAds + 'bannerpayment') {
                if (val.status === '00') {
                    this.$bvModal.show('modal-payment-success')
                } else {
                    this.$bvModal.show('modal-payment-failed')
                }
            }
        },
        dataBanner: {
            handler (val, oldVal) {
                this.caculateBannerPrice()
            },
            deep: true
        },
        bannerPriceConfig: {
            handler (val, oldVal) {
                this.caculateBannerPrice()
            },
            deep: true
        }
    },
    mounted () {
        const _this = this
        this.returnURL = window.location.href
        this.$root.$on('update_banner_data_change', (data) => {
            this.caculateBannerPrice()
        })

        if (this.$route.query && this.$route.query.vnp_ResponseCode) {
            this.$api.payment.checkResultPayment(this.$route.query).then((res) => {
                if (res.status === 'OK' && res.data) {
                    _this.paymentStatus = res.data
                }
            })
        }

        this.$api.advertisement.getAdsTypes().then((res) => {
            _this.listTypeAds = res.result
        })

        this.$api.store.getCategories().then((res) => {
            if (res.status === 200 && res.data && res.data.length > 0) {
                const listCategoriesData = res.data

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
                        _this.bannerTypeOptions.push(item)
                    }
                }
            }
        })

        this.$api.advertisement.getAdvertisementConfig().then((res) => {
            _this.arrayBannerPriceConfig = res
        })

        if (this.$route.params && this.$route.params.id) {
            this.$api.advertisement.getAdsById(this.$route.params.id).then((res) => {
                _this.dataBanner.id = res.id
                _this.dataBanner.bannerType = res.type_id
                _this.dataBanner.type = res.categories
                _this.dataBanner.desc = res.content
                _this.dataBanner.phone = res.contact_phone
                _this.dataBanner.website = res.website
                _this.dataBanner.businessId = res.business_id
                _this.dataBanner.businessAddress = res.business_address
                _this.dataBanner.businessName = res.businessName
                _this.dataBanner.date = res.dates
                _this.dataBanner.timeInDay = res.period
                _this.dataBanner.quantity = res.quantity
                _this.dataBanner.time = res.time
                _this.dataBanner.image = res.photo

                const data = {
                    bannerType: _this.idForm,
                    type: _this.dataBanner.type[0].id,
                    timeInDay: [],
                    image: [_this.dataBanner.image]
                }
                _this.$root.$emit('update_banner_data', data)
            })
        }
    },
    methods: {
        showMap () {
            this.$bvModal.show('modal-map-popup')
        },
        hideMap () {
            this.$bvModal.hide('modal-map-popup')
        },
        openSelectImage () {
            this.$refs.signboardInput.click()
        },
        async handleSubmit (e) {
            e.preventDefault()
            const isInvalid = await this.validateData()
            if (!isInvalid) {
                this.$refs.mdRequestPay.show()
            }
        },
        handleReset (e) {
            e.preventDefault()
        },
        datePickerClick (e) {
            this.$bvModal.show('modal-date-picker')
        },
        onDescKeyDown (evt) {
            if (this.dataBanner.desc != null) {
                if (this.dataBanner.desc.length >= this.descMax) {
                    if (evt.keyCode >= 48 && evt.keyCode <= 90) {
                        evt.preventDefault()
                        return true
                    }
                }
            }
        },
        submitValue (event, data) {
            const _this = this
            if (data) {
                this.dataBanner.businessId = data.id

                this.$api.store.getStoreById(data.id).then(function (response) {
                    if (response.data) {
                        _this.dataBanner.businessName = response.data.name
                        _this.dataBanner.businessAddress = response.data.address
                    }
                })
            }
        },
        handleMapSelectPoint (location, address) {
            this.selectedAddress = address
            this.hideMap()
        },
        async validateData () {
            this.dataBanner.image = this.$refs.childImage.imageSelected
            if (this.currentTypeAds !== 'onroad') {
                this.dataBanner.timeInDay = this.$refs.childSlider.valueData
            }
            this.errors = []
            let isInvalid = false
            if (this.dataBanner.image.length <= 0) {
                this.errors.image = 'Hãy chọn hình quảng cáo.'
                isInvalid = true
            }

            if (!this.dataBanner.phone) {
                this.errors.phone = 'Hãy nhập số điện thoại.'
                isInvalid = true
            } else {
                const phoneTemp = this.dataBanner.phone.replace(/ /g, '')
                const regex = /^(\+84|\d)\d{7,10}$/
                if (!regex.test(phoneTemp)) {
                    this.errors.phone = 'Hãy nhập số điện thoại chính xác, đầy đủ'
                    isInvalid = true
                }
            }

            if (this.dataBanner.website) {
                // eslint-disable-next-line no-useless-escape
                const regex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]\{\};:\'".,<>?«»“”‘’]))/
                if (!regex.test(this.dataBanner.website)) {
                    this.errors.website = 'Nhập địa chỉ trang web chính xác, đầy đủ'
                    isInvalid = true
                }
            }

            if (this.dataBanner.type.length <= 0) {
                this.errors.type = 'Hãy chọn danh mục quảng cáo.'
                isInvalid = true
            }

            if (this.currentTypeAds === 'onroad') {
                if (!this.dataBanner.quantity || this.dataBanner.quantity < this.quantityMin || this.dataBanner.quantity > this.quantityMax) {
                    this.errors.quantity = 'Số lượng quảng cáo phải từ ' + this.quantityMin + ' đến ' + this.quantityMax + '.'
                    isInvalid = true
                }
            } else if (this.dataBanner.date.length <= 0) {
                this.errors.date = 'Hãy chọn ngày đặt quảng cáo.'
                isInvalid = true
            } else {
                const now = new Date()
                now.setHours(0, 0, 0, 0)
                this.dataBanner.date.forEach((value) => {
                    const day = new Date(value)
                    if (day.getTime() < now.getTime()) {
                        this.errors.date = 'Không được chọn ngày của quá khứ.'
                        isInvalid = true
                    }
                })
            }

            if (!isInvalid) {
                isInvalid = await this.checkAvailable()
            }

            return isInvalid
        },
        datesSubmitSelect (data) {
            this.dataBanner.date = data
        },
        async checkAvailable () {
            let isInvalid = false
            if (this.currentTypeAds === 'static') {
                const period = this.$refs.childSlider.valueData
                if (this.dataBanner.date.length > 0 && period.length > 0) {
                    const formData = new FormData()
                    formData.append('dates', this.dataBanner.date.join(','))
                    formData.append('period', period.join('-'))
                    const response = await this.$api.advertisement.checkAdvertisingAvailable(formData)
                    if (response.status === 'ZERO_RESULTS' && response.result) {
                        isInvalid = true
                        this.unavailableTimeBanner.period = response.result.unavailable_period
                        this.unavailableTimeBanner.dates = response.result.unavailable_dates
                        this.$bvModal.show('modal-unavailable')
                    }
                }
            }
            return isInvalid
        },
        caculateBannerPrice () {
            if (this.currentBannerPriceConfig) {
                if (this.currentTypeAds === 'onroad') {
                    this.bannerPrice = this.dataBanner.quantity * this.currentBannerPriceConfig.price_by_quantity
                } else {
                    this.bannerPrice = this.dataBanner.date.length * this.currentBannerPriceConfig.price_by_date
                    const value = this.dataBanner.timeInDay
                    if (value.length > 1) {
                        this.bannerPrice += (value[1] - value[0]) * this.currentBannerPriceConfig.price_by_period
                    }
                    if (this.currentBannerPriceConfig.price_by_duration) {
                        const times = this.currentBannerPriceConfig.price_by_duration.split(';')
                        times.forEach((value) => {
                            if (value.includes(this.dataBanner.time + 's')) {
                                this.bannerPrice += Number(value.split('-')[1])
                            }
                        })
                    }
                }
            }
        },
        createFormData () {
            const formData = new FormData()
            formData.append('banner_type', this.dataBanner.bannerType)
            formData.append('image', this.dataBanner.image[0])
            formData.append('type', this.dataBanner.type[0])
            formData.append('phone', this.dataBanner.phone)

            if (this.dataBanner.website) {
                formData.append('website', this.dataBanner.website)
            }
            if (this.dataBanner.desc) {
                formData.append('desc', this.dataBanner.desc)
            }
            if (this.dataBanner.businessId) {
                formData.append('business_id', this.dataBanner.businessId)
                formData.append('business_address', this.dataBanner.businessAddress)
                formData.append('business_name', this.dataBanner.businessName)
            }

            if (this.idForm === 'onroad') {
                formData.append('quantity', this.dataBanner.quantity)
            } else {
                formData.append('date', this.dataBanner.date.join(','))
                formData.append('time_in_day', this.dataBanner.timeInDay.join('-'))
                if (this.idForm === 'dynamic') {
                    formData.append('time', this.dataBanner.time)
                }
            }

            return formData
        },
        async createAdvertisement () {
            if (this.idForm === 'onroad') {
                this.sendRequest()
            } else {
                const isInvalid = await this.validateData()
                if (!isInvalid) {
                    const formData = this.createFormData()
                    const response = await this.$api.advertisement.updateAdvertisementApi(formData)
                    if (response.status === 'OK') {
                        this.dataBanner = {
                            type: [],
                            desc: '',
                            phone: '',
                            website: '',
                            businessId: '',
                            businessAddress: '',
                            businessName: '',
                            date: [],
                            timeInDay: [],
                            quantity: '',
                            time: 5,
                            image: []
                        }

                        const data = {
                            bannerType: this.idForm,
                            type: null,
                            timeInDay: [],
                            image: []
                        }
                        this.$root.$emit('update_banner_data', data)
                        this.$refs.childImage.removeAllImage()
                        this.$refs.mdSuccess.show()
                    }
                }
            }
        },
        async sendRequest () {
            const _this = this
            const formData = this.createFormData()
            const response = await this.$api.advertisement.createAdvertisement(formData)
            if (response.status === 200) {
                _this.$router.push({
                    path: '/advertisement'
                })
            }
        }
    },
    head () {
        return {
            title: 'Quản lý quảng cáo'
        }
    }
}
</script>
