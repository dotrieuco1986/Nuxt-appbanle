<template>
    <div id="user-address" class="mt-4">
        <div class="header mb-4">
            <label class="header-title">
                Địa Chỉ Của Tôi
            </label>
            <div class="float-right">
                <button type="button" class="btn btn-primary">
                    +  Thêm Địa Chỉ Mới
                </button>
            </div>
        </div>
        <div class="border-bottom" />
        <div class="content mt-4">
            <div class="row create-address">
                <div class="col text-right">
                    <label class="mr-2 mb-3">Thêm Địa Chỉ</label>
                    <svg-icon
                        icon="fa-plus"
                        grow-by-height="20px"
                        has-fill="false"
                    />
                </div>
            </div>
            <div v-for="(item, index) in userAddress" :key="item.id" class="row">
                <div :class="[index === userAddress.length - 1 ? '' : 'address-item', 'col']">
                    <form>
                        <div class="form-group row">
                            <label
                                for="full-name"
                                class="col-md-3 col-form-label"
                            >Họ Tên: <span v-if="item.allow_change">&nbsp;*</span></label>
                            <div class="col-md-6 col-lg-7">
                                <input
                                    id="full-name"
                                    v-model.trim="$v.userAddress.$each[index].name.$model"
                                    type="text"
                                    class="form-control"
                                    placeholder="Nhập"
                                    :readonly="!item.allow_change"
                                >
                                <div v-if="!$v.userAddress.$each[index].name.required" class="errorMessage">
                                    Hãy nhập họ và tên
                                </div>
                            </div>
                            <div class="form-check">
                                <div class="radio-default">
                                    <input
                                        id="exampleRadios1"
                                        v-model="selectedAddress"
                                        class="form-check-input"
                                        type="radio"
                                        :value="item.id"
                                    >
                                    <label class="form-check-label" for="exampleRadios1">
                                        Mặc định
                                    </label>
                                </div>
                                <span v-if="item.allow_change" class="ml-2 delete-address" @click="deleteAddressClick(index)">
                                    <svg-icon
                                        icon="fa-minus"
                                        grow-by-height="20px"
                                        has-fill="false"
                                    />
                                </span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label
                                for="phone"
                                class="col-md-3 col-form-label"
                            >Số điện thoại: <span v-if="item.allow_change">&nbsp;*</span></label>
                            <div class="col-md-6 col-lg-7">
                                <input
                                    id="phone"
                                    v-model.trim="$v.userAddress.$each[index].phone.$model"
                                    type="text"
                                    class="form-control"
                                    placeholder="Nhập"
                                    :readonly="!item.allow_change"
                                >
                                <div v-if="!$v.userAddress.$each[index].phone.required" class="errorMessage">
                                    Hãy nhập số điện thoại
                                </div>
                                <div v-else-if="!$v.userAddress.$each[index].phone.strongPhone" class="errorMessage">
                                    Hãy nhập số điện thoại đầy đủ, chính xác
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label
                                :for="item.id.toString()"
                                class="col-md-3 col-form-label"
                            >Địa chỉ: <span v-if="item.allow_change">&nbsp;*</span></label>
                            <div class="col-md-6 col-lg-7">
                                <auto-complete
                                    :submit-value="submitAutoValue"
                                    :clear-value="cleartAutoValue"
                                    :id-textbox="item.id.toString()"
                                    :autocomplete-text="item.address"
                                    :read-only="!item.allow_change"
                                />
                                <img
                                    v-if="item.allow_change"
                                    class="current-location"
                                    src="@/assets/image/icon/target-current.svg"
                                    alt=""
                                    @click="curentLocation"
                                >
                                <span v-if="item.allow_change" class="map-point" @click="showMap(item.id)">
                                    <svg-icon
                                        icon="map-pointer"
                                        grow-by-height="20px"
                                        has-fill="false"
                                    />
                                </span>
                                <div v-if="!item.address" class="errorMessage">
                                    Hãy nhập địa chỉ
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row text-center">
                <div class="col">
                    <button type="button" class="btn btn-primary mb-2" @click.prevent="saveAddressClick">
                        Hoàn Tất
                    </button>
                </div>
            </div>
        </div>
        <modal id="modal-save-user-success" size="sm">
            <div class="text-center">
                <label>Lưu thông tin thành công</label>
            </div>
        </modal>
        <modal-confirm
            id="modal-delete-address"
            :description="'Bạn có chắc chắn muốn xóa?'"
            :ok-txt="'Xóa'"
            :ok-cancel="'Hủy'"
            @ok-click="deleteAddress"
        />
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import AutoComplete from '../../../../components/AutoComplete'
import ModalConfirm from '../../../../components/modal/ModalConfirm'
import svgIcon from '~/components/common/SvgIcon.vue'
const regex = /^(\+84|\d)\d{7,10}$/

export default {
    name: 'Index',
    layout: 'user',
    components: { ModalConfirm, AutoComplete, svgIcon },
    mixins: [validationMixin],
    data () {
        return {
            userAddress: [],
            userAddressDefaultItem: null,
            selectedAddress: 0,
            formData: {
                name: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                avatar: ''
            },
            actionId: 0
        }
    },
    validations: {
        userAddress: {
            $each: {
                name: { required },
                phone: {
                    required,
                    strongPhone (phone) {
                        return regex.test(phone)
                    }
                },
                address: { required }
            }
        }
    },
    computed: {
        ...mapGetters({
            checkIsLoggedIn: 'loggedIn',
            loggedInUser: 'user'
        }),
        getUserID () {
            return this.loggedInUser ? this.loggedInUser.info.id : 0
        }
    },
    created () {
        this.getUserAddress()
    },
    mounted () {
        this.$root.$on('map-popup-search-location', (locations, addresss, placeIds) => {
            const _this = this
            if (_this.userAddress) {
                _this.userAddress.forEach((item) => {
                    if (item.id === _this.actionId) {
                        item.address = addresss
                        item.place_id = placeIds
                        item.location = locations.location.join(',')
                    }
                })
            }
            this.$bvModal.hide('model-map-popup')
        })
    },
    methods: {
        async deleteAddress () {
            const index = this.actionId
            const id = this.userAddress[index].id
            const response = await this.$api.order.deleteOrderLocation(id)
            if (response.status === 200 && response.data) {
                this.userAddress.splice(index, 1)
            }
        },
        deleteAddressClick (id) {
            this.actionId = id
            this.$bvModal.show('modal-delete-address')
        },
        showMap (id) {
            this.actionId = id
            this.$root.$emit('model-map-popup')
        },
        curentLocation () {
        },
        submitAutoValue (event, data) {
            const id = event.target.parentNode.id.split('-')[0]
            this.userAddress.forEach((item) => {
                if (item.id.toString() === id) {
                    item.address = data.description
                    item.place_id = data.id
                    item.location = data.geometry.coordinates.join(',')
                }
            })
        },
        cleartAutoValue (id) {
            this.userAddress.forEach((item) => {
                if (item.id.toString() === id) {
                    item.address = ''
                    item.place_id = ''
                    item.location = ''
                }
            })
        },
        async getUserAddress () {
            const _this = this
            const response = await this.$api.order.getOrderLocation()
            if (response.status === 200 && response.data) {
                this.userAddress = response.data
                this.userAddress.sort(function (a, b) {
                    return a.allow_change - b.allow_change
                })
                this.userAddress.forEach((item) => {
                    if (item.default === 1) {
                        _this.selectedAddress = item.id
                    }
                })
            }
        },
        saveAddressClick () {
            const _this = this
            const errors = this.$v.userAddress.$anyError
            let isValid = true

            this.userAddress.forEach((item) => {
                if (!item.address) {
                    isValid = false
                }
            })

            if (errors === false && isValid) {
                this.userAddress.forEach((item) => {
                    if (item.id === _this.selectedAddress) {
                        item.default = 1
                    } else {
                        item.default = 0
                    }
                })
                this.submit()
            }
        },
        async submit () {
            const formData = new FormData()
            formData.append('data', JSON.stringify(this.userAddress))
            const response = await this.$api.order.updateOrderLocation(formData)
            if (response.status === 200 && response.data) {
                this.$bvModal.show('modal-save-user-success')
            }
        }
    }
}
</script>

<style lang="scss">
    @import './assets/scss/variable';

    #user-address {
        .header {
            .header-title {
                color: $orange;
                font-weight: bold;
            }

            button {
                color: $orange;
                background-color: $white;
                border-color: $orange;
                font-size: inherit;
            }
        }

        [type='text'] {
            height: 40px;
            font-size: inherit;
        }

        .address-item {
            border-bottom: 1px solid #dee2e6 !important;
            margin-bottom: 15px;
        }

        .form-check {
            position: absolute;
            top: 7px;
            right: 15px;
            display: flex;
            padding-left: 0;
            align-items: center;

            .radio-default {
                display: flex;
                flex-direction: row-reverse;
            }

            label {
                line-height: 2.2;
                padding-right: 1.6rem;
            }
        }

        .content button {
            border-radius: 20px;
            background-color: $orange;
            border-color: $orange;
        }

        .create-address {
            display: none;

            label {
                color: $orange;
            }
        }

        .map-point {
            position: absolute;
            top: 9px;
            right: -5px;
        }

        .autocomplete-clear,
        .autocomplete-spinner {
            right: 35px;
        }

        .autocomplete-input input {
            padding-right: 60px !important;
        }

        .current-location {
            width: 24px;
            position: absolute;
            top: 8px;
            right: 20px;
            cursor: pointer;
        }

        .delete-address {
            cursor: pointer;
        }

        @media (min-width: $mq-tiny) and (max-width: $tablet) {
            .content button {
                width: 100%;
                border-radius: 5px;
            }

            .address-item {
                border-bottom: none;
            }

            .create-address {
                display: block
            }

            .header,
            .border-bottom {
                display: none;
            }

            .map-point {
                right: 20px;
            }

            .current-location {
                right: 40px;
            }

            .autocomplete-clear,
            .autocomplete-spinner {
                right: 55px;
            }

            .autocomplete-input input {
                padding-right: 80px !important;
            }
        }
    }
</style>
