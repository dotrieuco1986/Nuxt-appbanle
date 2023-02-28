<template>
    <div id="user-address" class="mt-4">
        <div class="header mb-4">
            <label class="header-title">
                Địa Chỉ Của Tôi  >  Thêm Địa Chỉ
            </label>
        </div>
        <div class="border-bottom" />
        <div class="content mt-4">
            <div class="row">
                <div class="col">
                    <form>
                        <div class="form-group row">
                            <label
                                for="full-name"
                                class="col-md-3 col-form-label"
                            >Họ Tên: *</label>
                            <div class="col-md-6 col-lg-7">
                                <input
                                    id="full-name"
                                    v-model.trim="$v.formData.fullName.$model"
                                    type="text"
                                    class="form-control"
                                    placeholder="Nhập"
                                >
                                <div v-if="!$v.formData.fullName.required" class="errorMessage">
                                    Hãy nhập họ và tên
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label
                                for="phone"
                                class="col-md-3 col-form-label"
                            >Số điện thoại: *</label>
                            <div class="col-md-6 col-lg-7">
                                <input
                                    id="phone"
                                    v-model.trim="$v.formData.phone.$model"
                                    type="text"
                                    class="form-control"
                                    placeholder="Nhập"
                                >
                                <div v-if="!$v.formData.phone.required" class="errorMessage">
                                    Hãy nhập số điện thoại
                                </div>
                                <div v-else-if="!$v.formData.phone.strongPhone" class="errorMessage">
                                    Hãy nhập số điện thoại đầy đủ, chính xác
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label
                                for="address"
                                class="col-md-3 col-form-label"
                            >Địa chỉ: *</label>
                            <div class="col-md-6 col-lg-7">
                                <auto-complete
                                    id="address"
                                    :submit-value="submitAutoValue"
                                    :clear-value="cleartAutoValue"
                                    id-textbox="address-auto"
                                    :autocomplete-text="formData.address"
                                />
                                <img
                                    class="current-location"
                                    src="@/assets/image/icon/target-current.svg"
                                    alt=""
                                    @click="curentLocation"
                                >
                                <span class="map-point" @click="showMap">
                                    <svg-icon
                                        icon="map-pointer"
                                        grow-by-height="20px"
                                        has-fill="false"
                                    />
                                </span>
                                <div v-if="!formData.address" class="errorMessage">
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
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import AutoComplete from '../../../../components/AutoComplete'
import svgIcon from '~/components/common/SvgIcon.vue'
const regex = /^(\+84|\d)\d{7,10}$/

export default {
    name: 'Create',
    layout: 'user',
    components: { AutoComplete, svgIcon },
    mixins: [validationMixin],
    data () {
        return {
            formData: {
                fullName: '',
                address: '',
                phone: '',
                placeId: '',
                location: ''
            }
        }
    },
    validations: {
        formData: {
            fullName: { required },
            phone: {
                required,
                strongPhone (phone) {
                    return regex.test(phone)
                }
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
            this.formData.address = addresss
            this.formData.placeId = placeIds
            this.formData.location = locations.location.join(',')
            this.$bvModal.hide('model-map-popup')
        })
    },
    methods: {
        showMap () {
            this.$root.$emit('model-map-popup')
        },
        curentLocation () {
        },
        submitAutoValue (event, data) {
            this.formData.address = data.description
            this.formData.placeId = data.id
            this.formData.location = data.geometry.coordinates.join(',')
        },
        cleartAutoValue (id) {
            this.formData.address = ''
            this.formData.placeId = ''
            this.formData.location = ''
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
        async saveAddressClick () {
            const errors = this.$v.formData.$anyError

            if (errors === false && this.formData.address) {
                const formData = new FormData()
                formData.append('user_id', this.getUserID)
                formData.append('name', this.formData.fullName)
                formData.append('location', this.formData.location)
                formData.append('address', this.formData.address)
                formData.append('place_id', this.formData.placeId)
                formData.append('so_dien_thoai', this.formData.phone)
                formData.append('default', 0)
                const response = await this.$api.order.createOrderLocation(formData)
                if (response.status === 200 && response.data) {
                    this.$bvModal.show('modal-save-user-success')
                }
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

        .content button {
            border-radius: 20px;
            background-color: $orange;
            border-color: $orange;
        }

        .map-point {
            position: absolute;
            top: 9px;
            right: -5px;
        }

        .current-location {
            width: 24px;
            position: absolute;
            top: 8px;
            right: 20px;
            cursor: pointer;
        }

        .autocomplete-clear,
        .autocomplete-spinner {
            right: 35px;
        }

        .autocomplete-input input {
            padding-right: 60px !important;
        }

        @media (min-width: $mq-tiny) and (max-width: $tablet) {
            .content button {
                width: 100%;
                border-radius: 5px;
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

            .header,
            .border-bottom {
                display: none;
            }
        }
    }
</style>
