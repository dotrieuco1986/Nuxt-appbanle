<template>
    <div class="pl-3 pr-3">
        <form>
            <div class="form-group">
                <image-selection ref="childImage" :id-form="idForm" />
                <div class="errorMessage">
                    {{ errors.image }}
                </div>
            </div>
            <div v-if="idForm === 'onroad'" class="form-group">
                <label for="advertisement-quantity">Số lượng</label>
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
            <div v-if="idForm !== 'onroad'" class="form-group">
                <label for="advertisement-date">Ngày đặt quảng cáo</label>
                <div class="position-relative">
                    <input
                        id="advertisement-date"
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="Chọn"
                        :name="idForm"
                        :value="dataBanner.date.length > 0 ? 'Chỉnh sửa' : ''"
                        readonly
                        @click="datePickerClick"
                    >
                    <svg-icon
                        icon="calendar"
                        class="image-calendar"
                        grow-by-height="22px"
                        @click="datePickerClick"
                    />
                </div>
                <div class="errorMessage">
                    {{ errors.date }}
                </div>
            </div>
            <div v-if="idForm !== 'onroad'" class="form-group">
                <label>Thời gian</label>
                <range-slider
                    ref="childSlider"
                    :id-form="idForm"
                />
            </div>
            <div v-if="idForm === 'dynamic'" class="form-group">
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
            <div class="form-group">
                <label>Danh mục</label>
                <tree-select
                    v-model="dataBanner.type"
                    :options="bannerTypeOptions"
                    placeholder="Chọn"
                    :id-form="idForm"
                />
                <div class="errorMessage">
                    {{ errors.type }}
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="advertisement-phone">Số điện thoại liên hệ</label>
                        <input
                            id="advertisement-phone"
                            v-model="dataBanner.phone"
                            type="text"
                            class="form-control form-control-sm"
                            placeholder="Nhập"
                            maxlength="50"
                        >
                        <div class="errorMessage">
                            {{ errors.phone }}
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="advertisement-website">Trang web</label>
                        <input
                            id="advertisement-website"
                            v-model="dataBanner.website"
                            type="text"
                            class="form-control form-control-sm"
                            placeholder="Thêm trang web"
                            maxlength="50"
                        >
                        <div class="errorMessage">
                            {{ errors.website }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Nội dung quảng cáo</label>
                <textarea
                    v-model="dataBanner.desc"
                    class="form-control"
                    rows="3"
                    maxlength="300"
                    placeholder="Nhập"
                    @keydown="onDescKeyDown"
                />
                <label class="float-right mt-1">{{ dataBanner.desc.length }}/300</label>
            </div>
            <div class="form-group">
                <label>Liên kết với CSKD</label>
                <auto-complete
                    :submit-value="submitValue"
                    :url-autocomplete="urlAutocomplete"
                    :id-textbox="'auto-' + idForm"
                />
                <div class="errorMessage">
                    {{ errors.business }}
                </div>
            </div>
            <div class="form-group button-gui" @click="createAdvertisementClick">
                <div class="float-left">
                    GỬI
                </div>
                <div class="float-right">
                    {{ getBannerPrice }} đ
                </div>
            </div>
        </form>
        <modal :id="'modal-date-picker-' + idForm" size="sm">
            <p>NGÀY ĐẶT QUẢNG CÁO</p>
            <multi-date-picker
                v-model="datesSelected"
                :multi="true"
                :always-display="true"
                :format="formatDate"
                :id-popup="'modal-date-picker-' + idForm"
                :submit-value="datesSubmitSelect"
            />
        </modal>
        <modal :id="'modal-payment-' + idForm" size="sm">
            <div class="modal-payment">
                <p>Vui lòng thanh toán để tạo quảng cáo</p>
                <p class="money">
                    {{ getBannerPrice }} đ
                </p>
                <mvp-button name="THANH TOÁN" color="payment" class="mr-2" @click.native="paymentClick" />
                <mvp-button name="HỦY" color="cancel" @click.native="cancelPaymentClick" />
            </div>
        </modal>
        <modal :id="'modal-payment-success-' + idForm" size="sm">
            <div class="modal-payment">
                <div class="payment-success-center mb-3">
                    <div class="payment-success-icon payment-success-center">
                        <svg-icon icon="check" />
                    </div>
                </div>
                <p>Thanh toán thành công</p>
            </div>
        </modal>
        <modal :id="'modal-payment-failed-' + idForm" size="sm">
            <div class="modal-payment">
                <div class="payment-success-center mb-3">
                    <div class="payment-success-icon payment-success-center">
                        <svg-icon icon="check" />
                    </div>
                </div>
                <p>Thanh toán không thành công</p>
            </div>
        </modal>
        <modal :id="'modal-payment-method-' + idForm" size="sm">
            <div class="modal-payment-method">
                <p>PHƯƠNG THỨC THANH TOÁN</p>
                <div class="radio">
                    <input id="one" v-model="paymentMethodPicked" type="radio" value="INT">
                    <label for="one">Thẻ tín dung Visa, Master, JCB, Amex</label>
                    <div class="border-bottom mt-2 mb-2" />
                    <input id="two" v-model="paymentMethodPicked" type="radio" value="ATM">
                    <label for="two">Thẻ ATM nội địa</label>
                    <div class="border-bottom mt-2 mb-2" />
                </div>
                <div class="text-center">
                    <mvp-button name="HOÀN TẤT" color="payment" @click.native="paymentMethodClick" />
                </div>
            </div>
        </modal>
        <modal :id="'modal-card-type-' + idForm">
            <div class="modal-payment-method">
                <p>NGÂN HÀNG</p>
                <div class="collapse-wrap">
                    <ul class="list_cart-2 clearfix">
                        <li v-for="card in cardType" :key="card.id">
                            <label :class="[cardTypeSelection === card.code ? 'active': '']" @click="cardTypeSelection = card.code">
                                <img :src="getCardTypeImage(card.logo)" width="200" height="40" :alt="card.code">
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="text-center">
                    <mvp-button name="HOÀN TẤT" color="payment" @click.native="paymentRequestClick" />
                </div>
            </div>
        </modal>
        <modal :id="'modal-unavailable-' + idForm">
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
    </div>
</template>

<script>
import ImageSelection from '@/components/ImageSelection.vue'
import AutoComplete from '@/components/AutoComplete'
import RangeSlider from '@/components/RangeSlider.vue'
import TreeSelect from '@/components/TreeSelect.vue'
import { mapGetters } from 'vuex'
import MultiDatePicker from './MultiDatePicker'
import Modal from './modal/Modal'
import MvpButton from './MVPControl/MvpButton'
import SvgIcon from './common/SvgIcon'

export default {
    name: 'AdvertisementForm',
    components: {
        MvpButton,
        MultiDatePicker,
        AutoComplete,
        ImageSelection,
        Modal,
        RangeSlider,
        TreeSelect,
        SvgIcon
    },
    props: {
        idForm: {
            type: String,
            default: '',
            required: true
        },
        bannerTypeOptions: {
            type: Array,
            default () {
                return []
            },
            required: true
        },
        paymentStatus: {
            type: Object,
            default: null
        },
        bannerPriceConfig: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            listTimeData: [
                { value: 5, text: '5s' },
                { value: 10, text: '10s' },
                { value: 15, text: '15s' },
                { value: 20, text: '20s' },
                { value: 25, text: '25s' },
                { value: 30, text: '30s' }
            ],
            dataBanner: {
                bannerType: this.idForm,
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
            },
            descMax: 300,
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
            urlAutocomplete: 'stores/autocomplete',
            paymentMethodPicked: 'INT',
            cardType: [],
            cardTypeSelection: '',
            bannerPrice: 0,
            unavailableTimeBanner: {
                period: [],
                dates: []
            },
            datesSelected: []
        }
    },
    computed: {
        ...mapGetters({
            checkIsLoggedIn: 'loggedIn',
            loggedInUser: 'user'
        }),
        getBannerPrice () {
            return Intl.NumberFormat('VND').format(this.bannerPrice)
        }
    },
    watch: {
        paymentStatus (val) {
            if (val && val.info === this.idForm + 'bannerpayment') {
                if (val.status === '00') {
                    this.$bvModal.show('modal-payment-success-' + this.idForm)
                } else {
                    this.$bvModal.show('modal-payment-failed-' + this.idForm)
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
        this.$store.dispatch('advertisement/getAdvertisement')
        const datas = this.$store.state.advertisement.datas
        if (datas && datas.bannerType === this.idForm) {
            this.dataBanner = datas
            const data = {
                bannerType: this.idForm,
                type: datas.type[0],
                timeInDay: datas.timeInDay,
                image: datas.image
            }
            this.$root.$emit('update_banner_data', data)

            this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
                if (modalId === 'modal-payment-success-' + this.idForm) {
                    this.createAdvertisement()
                }
            })
        }

        this.$root.$on('update_banner_data_change', (data) => {
            if (data.bannerType === this.idForm) {
                this.caculateBannerPrice()
            }
        })
    },
    methods: {
        caculateBannerPrice () {
            if (this.bannerPriceConfig) {
                if (this.idForm === 'onroad') {
                    this.bannerPrice = this.dataBanner.quantity * this.bannerPriceConfig.price_by_quantity
                } else {
                    this.bannerPrice = this.dataBanner.date.length * this.bannerPriceConfig.price_by_date
                    const value = this.$refs.childSlider.valueData
                    if (value.length > 1) {
                        this.bannerPrice += (value[1] - value[0]) * this.bannerPriceConfig.price_by_period
                    }
                    if (this.bannerPriceConfig.price_by_duration) {
                        const times = this.bannerPriceConfig.price_by_duration.split(';')
                        times.forEach((value) => {
                            if (value.includes(this.dataBanner.time + 's')) {
                                this.bannerPrice += Number(value.split('-')[1])
                            }
                        })
                    }
                }
            }
        },
        async checkAvailable () {
            let isInvalid = false
            if (this.idForm === 'static') {
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
                        this.$bvModal.show('modal-unavailable-' + this.idForm)
                    }
                }
            }
            return isInvalid
        },
        async paymentRequestClick () {
            const formData = new FormData()
            formData.append('amount', this.bannerPrice)
            formData.append('return-url', window.location.href)
            formData.append('card-type', this.cardTypeSelection)
            formData.append('order-info', this.idForm + 'bannerpayment')
            formData.append('type', 'advertisement')

            const response = await this.$api.payment.requestPayment(formData)
            if (response.status === 'OK' && response.data) {
                window.location.href = response.data
            }
        },
        getCardTypeImage (logo) {
            return process.env.SERVER_URL + '/images/card_type/' + logo
        },
        async paymentMethodClick () {
            const response = await this.$api.payment.getCardType(this.paymentMethodPicked)
            if (response.status === 'OK' && response.data && response.data.length > 0) {
                this.cardType = response.data
                this.$bvModal.hide('modal-payment-method-' + this.idForm)
                this.$bvModal.show('modal-card-type-' + this.idForm)
            }
        },
        getBalance () {
            return this.loggedInUser ? this.loggedInUser.profile.balance : 0
        },
        paymentClick () {
            // if (this.getBalance() <= 0) {
            this.$store.dispatch('advertisement/addAdvertisement', this.dataBanner)
            this.$bvModal.show('modal-payment-method-' + this.idForm)
            // }
            this.cancelPaymentClick()
        },
        cancelPaymentClick () {
            this.$bvModal.hide('modal-payment-' + this.idForm)
        },
        datePickerClick (e) {
            this.datesSelected = []
            this.dataBanner.date.forEach((value) => {
                this.datesSelected.push(value)
            })
            this.$bvModal.show('modal-date-picker-' + e.target.name)
        },
        formatDate (date) {
            return date.toLocaleDateString('zh-Hans-CN')
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
        async createAdvertisementClick (e) {
            e.preventDefault()

            const isInvalid = await this.validateData()
            if (!isInvalid) {
                this.$bvModal.show('modal-payment-' + this.idForm)
            }
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
                        this.$store.dispatch('advertisement/addAdvertisement', null)
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
                        this.$router.push({
                            path: '/advertisement'
                        })
                    }
                }
            }
        },
        async validateData () {
            this.dataBanner.image = this.$refs.childImage.imageSelected
            if (this.idForm !== 'onroad') {
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

            if (this.idForm === 'onroad') {
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
        async sendRequest () {
            const _this = this
            const formData = this.createFormData()
            const response = await this.$api.advertisement.createAdvertisement(formData)
            if (response.status === 200) {
                _this.$router.push({
                    path: '/advertisement'
                })
            }
        },
        getBannerTypeId () {
            let bannerTypeId = 0
            if (this.idForm === 'static') {
                bannerTypeId = 1
            } else if (this.idForm === 'dynamic') {
                bannerTypeId = 2
            } else if (this.idForm === 'priority') {
                bannerTypeId = 3
            } else if (this.idForm === 'onroad') {
                bannerTypeId = 4
            }
            return bannerTypeId
        },
        createFormData () {
            const formData = new FormData()
            formData.append('banner_type', this.getBannerTypeId())
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
        datesSubmitSelect (data) {
            this.dataBanner.date = []
            data.forEach((value) => {
                this.dataBanner.date.push(value)
            })
        }
    }
}
</script>

<style lang="scss">
    @import './assets/scss/advertisement';

    .modal-payment {
        text-align: center;

        .money {
            color: $orange;
            font-size: 30px;
            font-weight: bold;
        }

        .cancel {
            background-color: $gray;
            color: $white;
            font-weight: bold;
            width: 125px;
        }

        .payment-success-center {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .payment-success-icon {
            width: 55px;
            height: 55px;
            background-color: $green;
            border-radius: 50%;
            font-size: 30px;
        }
    }

    .modal-payment-method {
        p {
            font-weight: bold;
            font-size: 16px;
            color: $extra-dark-gray;
        }

        label {
            color: $extra-dark-gray;
        }

        .list_cart-2 {
            list-style: none;
            padding: 0;
            box-sizing: inherit;
        }

        .clearfix:after {
            visibility: hidden;
            display: block;
            font-size: 0;
            content: " ";
            height: 0;
            clear: both;
        }

        .list_cart-2 li label {
            color: #434a54;
            font-weight: 500;
            padding: 0;
            height: 4.5em;
            border: 1px solid #dcdcdf;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            line-height: 4.5em;
            display: block;
            position: relative;
            margin-bottom: 0;
            -webkit-transition: all .15s ease;
            -o-transition: all .15s ease;
            transition: all .15s ease;
            text-align: center;
            -webkit-box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, .08);
            box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, .08);
        }

        .list_cart-2 li label:hover, .list_cart-2 li label.active {
            border: 2px solid #fe7235;
        }

        .list_cart-2 input {
            border: none;
            /*background: url(../images/trans.png);*/
            color: #fff;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            font-size: 0;
            z-index: 2;
            left: 0;
            outline: 0 !important;
        }

        .list_cart-2 li {
            float: left;
            width: calc((100%) / 5);
            padding: 5px;
        }

        .list_cart-2 img {
            max-width: 100%;
            height: auto;
            text-align: center;
        }
    }

    .payment {
        background-color: $orange;
        color: $white;
        font-weight: bold;
        width: 126px;
    }
</style>
