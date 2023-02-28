<template>
    <div id="changeAddressAtCheckout">
        <div class="row modal-header uppercaseAll">
            <b>địa chỉ giao hàng</b>
        </div>
        <div class="row">
            <div class="col-md-6 col-12 padding-left-0">
                <p>
                    Người nhận
                </p>
                <InputTypeOne
                    :model="userName"
                    :has-btn-apply="false"
                    :place-holder="'Người nhận'"
                    @return-value="getUserName"
                />
            </div>
            <div class="col-md-6 col-12 padding-right-0">
                <p>
                    Điện thoại
                </p>
                <InputTypeOne
                    :type="'tel'"
                    :has-btn-apply="false"
                    :place-holder="'Điện thoại'"
                    @return-value="getPhoneNumber"
                />
            </div>
        </div>
        <div class="row flex-column">
            <p>Địa chỉ</p>
            <!-- <InputTypeOne
                :has-btn-apply="false"
                :place-holder="'Địa chỉ'"
                @return-value="getAddress"
            /> -->
            <AutoComplete
                class="col"
                :url-autocomplete="urlAutocomplete"
                :input-text="autocompleteText"
                :input-style="input_style"
                :id-textbox="idSearchAddress"
                :submit-value="returnAddress"
                :style-spinner="styleSpinner"
            />
        </div>
        <div class="row find-on-map flex-column-center">
            <div class="col-6 flex-column-center text-orange">
                <p v-html=" message " />
            </div>
            <div class="col-6 col-right">
                <SvgIcon icon="map-pointer" has-fill="true" grow-by-height="24px" />
                <span class="text-orange">Tìm trên bản đồ</span>
            </div>
        </div>
        <div class="row">
            <span class="btn-apply bg-orange text-white flex-center" @click="validateUser">Hoàn tất</span>
        </div>
        <div v-if="historyAddress" class="row address-list scroller">
            <p v-for="item in historyAddress.data" :key="item.id" class="border-bottom flex-column-center" @change="updateChecked(item)">
                <input
                    :id="item.id"
                    :key="item.id"
                    v-model="defaultAddress"
                    :value="item.id"
                    type="radio"
                    name="shippingAddress"
                    :checked="item.default===1"
                >
                <label :for="item.id" class="text-extra-dark-gray">
                    <b>{{ item.name }} - {{ item.so_dien_thoai }}</b>
                    {{ item.address }}
                </label>
                <span v-if="item.default===0" class="btn-close" title="close" @click="deleteOrderLocationHistory(item.id)" />
            </p>
        </div>
    </div>
</template>
<script>
import InputTypeOne from '../common/inputTypeOne'
import SvgIcon from '../common/SvgIcon'
import Success from '../common/Success'
import Modal from '../modal/Modal'
import AutoComplete from '../AutoComplete'
export default {
    components: [
        InputTypeOne,
        SvgIcon,
        Success,
        Modal,
        AutoComplete
    ],
    props: {
        userId: {
            type: String,
            default: ''
        },
        historyAddress: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            error: [],
            userName: '',
            phoneNumber: '',
            message: '',
            autocompleteText: '',
            urlAutocomplete: 'autocomplete',
            idSearchAddress: 'autocomplete-map-popup-search',
            styleSpinner: 'color: gray !important;',
            address: null,
            targetPoint: null,
            userPlaceId: null,
            defaultAddress: null
        }
    },
    methods: {
        getUserName (data) {
            this.userName = data
        },
        getPhoneNumber (data) {
            this.phoneNumber = data
        },
        getAddress (data) {
            this.address = data
        },
        returnAddress (event, target) {
            this.address = target.description
            this.targetPoint = target.geometry.coordinates
            this.userPlaceId = target.id
        },
        validateUser () {
            this.error = []
            this.message = ''
            if (this.userName.length < 2) { this.error.push('Vui lòng nhập lại tên!') }
            if (this.phoneNumber.length !== 10) { this.error.push('Vui lòng nhập lại số điện thoại!') }
            if (!this.address) { this.error.push('Vui lòng nhập lại địa chỉ nhận hàng!') }
            if (this.error.length !== 0) {
                this.error.map((er) => {
                    this.message += er + '<br>'
                })
            } else {
                const formData = new FormData()
                formData.append('name', this.userName)
                formData.append('user_id', this.userId)
                formData.append('location', [this.targetPoint[0], this.targetPoint[1]] + '')
                formData.append('address', this.address)
                formData.append('place_id', this.userPlaceId)
                formData.append('so_dien_thoai', this.phoneNumber)
                formData.append('default', 1)
                this.CreateNewAddress(formData)
                this.$emit('reload-order-location-history')
                this.$bvModal.hide('edit_address_shipping')
            }
        },
        async CreateNewAddress (newAddress) {
            await this.$api.order.createOrderLocation(newAddress)
        },
        updateChecked (item) {
            this.historyAddress.data.map((add) => {
                if (add.id === this.defaultAddress) { add.default = 1 } else { add.default = 0 }
            })
            this.$emit('reload-order-location-history')
            this.$bvModal.hide('edit_address_shipping')
        },
        async deleteOrderLocationHistory (id) {
            await this.$api.order.deleteOrderLocation(id)
            this.$emit('reload-order-location-history')
        }

    }
}
</script>
<style lang="scss" scope>
@import '~assets/scss/variable';
@import '~assets/scss/discount';

#edit_address_shipping{
    .modal-dialog{
        max-width: 865px;
        .modal-body{
            padding:0;
        }
    }
}
#changeAddressAtCheckout{
    width:100%;
    .row,
    .autocomplete-input{
        padding:0 1em 18px 1em;
        margin:0;
        &.modal-header{
            padding-top:1em;
        }
    }
    .input-format-one{
        margin:0;
        padding-bottom:0
    }
    p{ margin-bottom:10px;}
    .find-on-map{
        padding-bottom:0px;
        .col-right{
            display:flex;
            justify-content: flex-end;
        }
        path{
            fill:$orange
        }
    }
    .address-list{
        padding:0;
        max-height:170px;
        background:$light-blue;
        &.scroller{
            overflow-y:scroll;
        }
        p{
            margin:0 1em;
            padding:15px 0;
            width:100%;
            justify-content: space-between;
            input[type="radio"]{
                margin-right:20px;
            }
            label{
                width:100%;
                display:flex;
                flex-direction: column;
            }
        }
    }
    .autocomplete-input{
        height: 40px;
        border-radius: $border-radius;
        border: 1px solid $extra-light-blue;
        display:flex;
        align-content: center;
        padding:0;
    }
    #autocomplete-map-popup-search{
        display: flex;
        flex: 1;
        height: inherit;
        font-size: 14px;
        border: none;
        height: 100%;
        border-radius: $border-radius !important;
        &:focus {
            outline: none;
            color: $dark-gray
        }
    }
    span.btn-close {
        width: 24px;
        height: 24px;
        background: $gray;
        display: block;
        position: relative;
        border-radius: 100%;
        float: right;
        cursor: pointer;
        top:0; left:0;
        &::before,
        &::after {
            width: 60%;
            height: 2px;
            background: $white;
            content: '';
            display: block;
            position: absolute;
            border-radius: 4px;
            left: 20%;
            top: calc(50% - 1px);
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transfrom: rotate(-45deg);
        }
        &::after {
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transfrom: rotate(45deg);
        }
    }
}
@media (max-width: $phone) {

}
</style>
