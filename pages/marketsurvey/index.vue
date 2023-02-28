<template>
    <div class="market-servey">
        <SideBar width="455px" no-btn-close right>
            <div class="details vscrollbar">
                <h3>{{ $t('survey.title') }}</h3>
                <h4>{{ $t('survey.location') }}<span class="text-red">*</span></h4>
                <auto-complete
                    ref="autocomplete"
                    id-textbox="cskd_address"
                    :submit-value="getDataAutocomplete"
                    :autocomplete-text="address"
                    input-style="border-radius: 5px; padding-right: 100px;"
                    icon-style="right: 50px;"
                    url-autocomplete="stores/autocomplete"
                />
                <span v-show="locationMsgError" id="location_err" class="errorMessage">{{ locationMsgError }}</span>
                <h4>{{ $t('survey.radius') }}</h4>
                <!-- <slider-radius ref="rangeslider" v-model="radiusrang" /> -->
                <label>{{ radiusrang }}m</label>
                <vue-slider
                    ref="slider"
                    v-model="radiusrang"
                    :max="1000"
                    :min="100"
                />

                <input
                    v-show="showmail"
                    v-model.trim="$v.mail.$model"
                    class="custom margin-top-10"
                    :class="{ 'group-error': $v.mail.$error }"
                    type="text"
                    placeholder="email"
                >

                <span v-if="!$v.mail.required && showmail" class="msg-error">Vui lòng nhập email</span>
                <span v-if="!$v.mail.email && showmail" class="msg-error">Sai định dạng email</span>
                <h4>{{ $t('survey.statistical') }}</h4>
                <ul class="vscrollbar">
                    <li v-for="(item,index) in statistic" :key="index">
                        <input :id="'statistic_'+ item.id" class="check-box" type="checkbox" :disabled="index>1?true:false" @change="statisticChange">
                        <span :class="{'gray':index>1}">{{ item.name }}</span>
                    </li>
                </ul>
                <span v-show="statisticalMsgError" id="statistical_err" class="errorMessage">{{ statisticalMsgError }}</span>
                <h4>{{ $t('survey.businessType') }}</h4>
                <tree-select
                    v-model="selectValue"
                    :options="parentTypes"
                    placeholder="Chọn"
                    @selectChange="changeChilds"
                />
                <div class="child-type">
                    <label v-for="(item) in checkChilds" :key="item.id">
                        <input :id="'check_' + item.id" class="check-box" type="checkbox" :name="'check[' + item.id + ']'" @change="categoriChange">
                        <span>{{ item.label }}</span>
                    </label>
                </div>
                <span v-show="categoryMsgError" id="category_err" class="errorMessage">{{ categoryMsgError }}</span>
                <p><a href="/images/market-survey-demo.pdf" target="_blank">{{ $t('survey.seepdf') }}</a></p>
                <p class="ta-center mb-0">
                    <span>{{ $t('survey.ifsurvey') }}</span>
                </p>
                <p class="ta-center">
                    <span>{{ $t('survey.ifcall') }} <strong class="orange">0909123456</strong></span>
                </p>
                </span></span>
            </div>
            <button class="submit" @click="makeServey">
                <span class="left">{{ $t('survey.see') }}</span><span class="right">{{ getAmount | formatNumber }}</span>
            </button>
        </SideBar>
        <modal-request-pay
            ref="mdRequestPay"
            :description="$t('survey.pleasePay')"
            :total-amount="getAmount"
            :return-url="urlSuccess()"
            order-type="marketsurvey"
            call-back-update
        />
    </div>
</template>
<script>
import SideBar from '@/components/SideBar'
import TreeSelect from '@/components/TreeSelect'
import AutoComplete from '@/components/AutoComplete'
import ModalRequestPay from '@/components/modal/ModalRequestPay'
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import Constants from '@/static/constants'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
import '@/components/modal/ModalSuccess'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
export default {
    name: 'Marketservey',
    components: {
        SideBar,
        TreeSelect,
        AutoComplete,
        ModalRequestPay,
        VueSlider
    },
    filters: {
        formatNumber (number) {
            return (new Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'VND' }).format(number))
        }
    },
    mixins: [validationMixin],
    provide () {
        return {
            $update: this.update
        }
    },
    async fetch () {
        const res = await this.$api.store.getCategories()

        if (res.status === 200) {
            const ctglist = res.data
            const parentTypes = []
            const childTypes = {}
            for (let i = 0; i < ctglist.length; i++) {
                if (ctglist[i].parent_id == null) {
                    const item = {
                        id: ctglist[i].id,
                        label: ctglist[i].name.toUpperCase()
                    }
                    parentTypes.push(item)
                } else {
                    const item = {
                        id: ctglist[i].id,
                        label: ctglist[i].name
                    }
                    const attr = "'" + ctglist[i].parent_id + "'"
                    if (childTypes[attr] === undefined) {
                        childTypes[attr] = [item]
                    } else {
                        childTypes[attr].push(item)
                    }
                }
            }
            this.parentTypes = parentTypes
            this.childTypes = childTypes
        }
    },
    data () {
        return {
            statistic: [
                { id: 1, name: 'Số chung cư và căn hộ' },
                { id: 2, name: 'Tiện ích trong từng chung cư' },
                { id: 3, name: 'Diện tích từng căn hộ trong chung cư' },
                { id: 4, name: 'Đường/hẻm trong khu vực khảo sát: bề rộng/chiều dài/vỉa hè/1-2 chiều' },
                { id: 5, name: 'Bề rộng mặt tiền nhà' },
                { id: 6, name: 'Diện tích từng nhà: diện tích đất/xây dựng/số tầng xây' },
                { id: 7, name: 'Số công trình trong bán kính xác định' },
                { id: 8, name: 'Dân số dự kiến trong từng đơn vị ở' },
                { id: 9, name: 'Tỷ lệ tội phạm của khu vực' },
                { id: 10, name: 'Tỷ lệ giới tính trong khu ở' }
            ],
            price: {
                statistic: 1000000,
                category: 200000
            },
            totalAmount: 0,
            parentTypes: [],
            childTypes: [],
            address: '',
            location: '',
            placeid: '',
            selectValue: [],
            checkChilds: [],
            radiusrang: Constants.DEFAULT_RADIUS,
            categoriSelected: [],
            statisticSelected: [],
            statisticalMsgError: '',
            categoryMsgError: '',
            locationMsgError: '',
            emailMsgError: '',
            mail: ''

        }
    },
    validations: {
        mail: {
            required,
            email
        }
    },
    computed: {
        getChilds () {
            if (this.selectValue[0] !== undefined) {
                return this.childTypes["'" + this.selectValue[0] + "'"]
            } else {
                return []
            }
        },
        showmail () {
            if (this.radiusrang > 300 || (this.categoriSelected.length + this.statisticSelected.length) >= 5) {
                return true
            }
            return false
        },
        getAmount () {
            return this.statisticSelected.length * this.price.statistic + this.categoriSelected.length * this.price.category
        }
    },
    mounted () {
        this.$root.$emit('clear-all')
    },
    methods: {
        getDataAutocomplete (event, data) {
            if (data) {
                this.location = data.geometry.coordinates[1] + ',' + data.geometry.coordinates[0]
                this.address = data.address
                this.placeid = data.id
            }
        },
        changeChilds (val) {
            this.checkChilds = []
            this.categoriSelected = []
            if (val.id !== undefined) {
                this.checkChilds = this.childTypes["'" + val.id + "'"]
            }
        },
        categoriChange (evt) {
            const id = evt.target.id.replace('check_', '')
            if (evt.target.checked === true) {
                this.categoriSelected.push(id)
            } else {
                this.categoriSelected = this.categoriSelected.filter(item => item !== id)
            }
        },
        statisticChange (evt) {
            const id = evt.target.id.replace('statistic_', '')
            if (evt.target.checked === true) {
                this.statisticSelected.push(id)
            } else {
                this.statisticSelected = this.statisticSelected.filter(item => item !== id)
            }
        },
        makeServey () {
            let errflg = false
            this.categoryMsgError = ''
            this.locationMsgError = ''
            this.statisticalMsgError = ''
            if (this.location.length === 0) {
                this.locationMsgError = 'Chọn điểm đặt CSKD.'
                errflg = true
            }
            if (this.categoriSelected.length === 0 && this.statisticSelected.length === 0) {
                this.categoryMsgError = 'Chọn loại thống kê hoặc chọn loại hình kinh doanh'
                errflg = true
            }
            this.$v.$touch()
            if (this.$v.mail.$error && this.showmail) {
                errflg = true
            }
            if (!errflg) {
                this.$refs.mdRequestPay.show()
            }
        },
        async update () {
            const param = {
                location: this.location,
                address: this.address,
                radius: this.radiusrang,
                email: this.mail,
                amount: this.getAmount,
                payed: 0,
                statistical: this.statisticSelected.join(','),
                category: this.categoriSelected.join(','),
                placeid: this.placeid
            }
            const request = await this.$api.survey.update(param)
            if (request.status === 'OK') {
                return request.id
            } else {
                return 0
            }
        },
        urlSuccess () {
            return process.env.BASE_URL + '/marketsurvey/success'
        }
    }

}
</script>

<style lang="scss">
    @import '@/assets/scss/_checkbox';
    @import '@/assets/scss/_variable';
    @import '@/assets/scss/_rangeslider';
    .market-servey{
        .details{
            padding: 15px;
            overflow-y: auto;
            height: calc(100% - 65px);
        }
        .orange{
            color: $orange;
        }
        .ta-center{
            text-align: center;
        }
        h3{
            font-size: 16px;
            color: $orange;
            text-transform: uppercase;
        }
        h4{
            font-size: 14px;
            padding: 10px 0px;
            margin: 10px 0 0 0;
        }
        a{
            color: $orange !important;
        }
        ul{
            height: 150px;
            padding: 0px;
            li{
                list-style: none;
                clear: both;
                padding: 5px 0px;
                input[type='checkbox'] {
                }
                .gray{
                    color: $gray;
                }
            }
        }
        .submit{
            position: fixed;
            padding: 15px;
            bottom: 0px;
            border: none !important;
            outline: none !important;
            width: 100%;
            height: 65px;
            background: $orange;
            color:$white;
            display: block;
            font-size: 18px;
            .left{
                float: left;
                text-transform: uppercase;
            }
            .right{
                float: right;
            }
        }
        #cskd_address{
            font-size: 14px;
            height: 40px;
            border-radius: 5px;
            border-color: $extra-light-blue;
            border: 1px solid $extra-light-blue;

            &::placeholder {
                font-size: 14px;
            }

            &:focus,
            &:hover {
                outline: none !important;
                border-color: $extra-light-blue;
                box-shadow: 0 0 10px $extra-light-blue;
            }
        }
        .child-type{
            padding: 5px 0px;
            label{
                padding: 5px 15px 5px 0px;
                display: inline-block;
                line-height: 24px;
                .check-box{
                    margin-right:10px;
                }
            }
        }
        .vue-slider{
            height: 10px !important;
        }
        .vue-slider-dot{
            width:26px !important;
            height:26px !important;
        }
        .vue-slider-dot-handle{
            cursor: pointer;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #FE7235;
            border: 2px solid #fff;
            box-sizing: border-box;
            /* box-shadow: 0.5px 0.5px 10px 5px rgba(0, 0, 0, 0.3); */
            box-shadow: 0 0 6px rgba(0,0,0,0.3);
            -moz-box-shadow: 0 0 6px rgba(0,0,0,0.3);
            -webkit-box-shadow: 0 0 6px rgba(0,0,0,0.3);
            -o-box-shadow: 0 0 6px rgba(0,0,0,0.3);
        }
        .vue-slider-process{
            background-color:#4AA9C5;
        }
        .group-error{
            border-color: red;
        }
        .msg-error{
            display: none;
        }
        .group-error + .msg-error {
            display: block;
            color: red;
        }
    }

</style>
