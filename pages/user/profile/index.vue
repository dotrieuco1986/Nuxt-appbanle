<template>
    <div id="user-profile" class="mt-4">
        <div class="header mb-3">
            <p class="header-title">
                Hồ Sơ Của Tôi
            </p>
            <label>Quản lý thông tin hồ sơ để bảo mật tài khoản</label>
        </div>
        <div class="border-bottom" />
        <div class="content mt-4">
            <div class="row">
                <div class="col-12 col-md-9">
                    <form>
                        <div class="form-group row">
                            <label for="user-name" class="col-md-3 col-form-label">Tên Đăng Nhập: *</label>
                            <div class="col-md-9">
                                <input id="user-name" v-model="formData.name" type="text" class="form-control">
                                <div class="errorMessage">
                                    {{ errors.name }}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="first-name" class="col-md-3 col-form-label">Tên: *</label>
                            <div class="col-md-9">
                                <input id="first-name" v-model="formData.firstName" type="text" class="form-control">
                                <div class="errorMessage">
                                    {{ errors.firstName }}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="last-name" class="col-md-3 col-form-label">Họ: *</label>
                            <div class="col-md-9">
                                <input id="last-name" v-model="formData.lastName" type="text" class="form-control">
                                <div class="errorMessage">
                                    {{ errors.lastName }}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-md-3 col-form-label">Email: *</label>
                            <div class="col-md-9">
                                <input id="email" v-model="formData.email" type="text" class="form-control">
                                <div class="errorMessage">
                                    {{ errors.email }}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="phone" class="col-md-3 col-form-label">Số Điện Thoại: *</label>
                            <div class="col-md-9">
                                <input id="phone" v-model="formData.phone" type="text" class="form-control">
                                <div class="errorMessage">
                                    {{ errors.phone }}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="address" class="col-md-3 col-form-label">Địa Chỉ: *</label>
                            <div class="col-md-9">
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
                                        grow-by-height="15px"
                                        has-fill="false"
                                    />
                                </span>
                                <div class="errorMessage">
                                    {{ errors.address }}
                                </div>
                            </div>
                        </div>
                        <!--                        <div class="form-group row">-->
                        <!--                            <label class="col-md-3 col-form-label">Giới tính:</label>-->
                        <!--                            <div class="col-md-9">-->
                        <!--                                <div class="form-check form-check-inline">-->
                        <!--                                    <input id="gridRadios1" class="form-check-input" type="radio" name="gridRadios">-->
                        <!--                                    <label class="form-check-label" for="gridRadios1">-->
                        <!--                                        Nam-->
                        <!--                                    </label>-->
                        <!--                                </div>-->
                        <!--                                <div class="form-check form-check-inline">-->
                        <!--                                    <input id="gridRadios2" class="form-check-input" type="radio">-->
                        <!--                                    <label class="form-check-label" for="gridRadios2">-->
                        <!--                                        Nữ-->
                        <!--                                    </label>-->
                        <!--                                </div>-->
                        <!--                                <div class="form-check form-check-inline">-->
                        <!--                                    <input id="gridRadios3" class="form-check-input" type="radio">-->
                        <!--                                    <label class="form-check-label" for="gridRadios3">-->
                        <!--                                        Khác-->
                        <!--                                    </label>-->
                        <!--                                </div>-->
                        <!--                            </div>-->
                        <!--                        </div>-->
                        <!--                        <div class="form-group row">-->
                        <!--                            <label for="birthday" class="col-md-3 col-form-label">Ngày Sinh:</label>-->
                        <!--                            <div class="col-md-3">-->
                        <!--                                <select id="birthday" class="form-control">-->
                        <!--                                    <option>1</option>-->
                        <!--                                    <option>2</option>-->
                        <!--                                    <option>3</option>-->
                        <!--                                    <option>4</option>-->
                        <!--                                    <option>5</option>-->
                        <!--                                </select>-->
                        <!--                            </div>-->
                        <!--                            <div class="col-md-3">-->
                        <!--                                <select class="form-control">-->
                        <!--                                    <option>1</option>-->
                        <!--                                    <option>2</option>-->
                        <!--                                    <option>3</option>-->
                        <!--                                    <option>4</option>-->
                        <!--                                    <option>5</option>-->
                        <!--                                </select>-->
                        <!--                            </div>-->
                        <!--                            <div class="col">-->
                        <!--                                <select class="form-control">-->
                        <!--                                    <option>1</option>-->
                        <!--                                    <option>2</option>-->
                        <!--                                    <option>3</option>-->
                        <!--                                    <option>4</option>-->
                        <!--                                    <option>5</option>-->
                        <!--                                </select>-->
                        <!--                            </div>-->
                        <!--                        </div>-->
                        <div class="text-center">
                            <button type="button" class="btn btn-primary mb-2" @click.prevent="saveUserClick">
                                Hoàn Tất
                            </button>
                        </div>
                    </form>
                </div>
                <div class="col text-center">
                    <span @click="selectAvatar">
                        <b-avatar
                            v-if="formData.avatar"
                            variant="info"
                            :src="formData.avatar"
                            size="6rem"
                        />
                        <b-avatar
                            v-else
                            variant="info"
                            src="@/assets/admin-image/icon/user.svg"
                            size="6rem"
                        />
                    </span>
                    <input
                        id="avatar-image"
                        type="file"
                        class="d-none"
                        name=""
                        accept=".jpg, .jpeg, .png, .gif, .bmp"
                        @change="imageSelectedChange"
                    >
                    <p class="select-image" @click="selectAvatar">
                        Chọn ảnh
                    </p>
                    <p class="file-type">
                        Dung lượng file tối đa 1 MB<br>
                        Định dạng JPEG, PNG
                    </p>
                    <div class="errorMessage">
                        {{ errors.avatar }}
                    </div>
                </div>
            </div>
        </div>
        <modal id="modal-save-user-success" size="sm">
            <div class="text-center">
                <p>Lưu thông tin thành công</p>
            </div>
        </modal>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AutoComplete from '../../../components/AutoComplete'
import SvgIcon from '../../../components/common/SvgIcon'
import Modal from '../../../components/modal/Modal'

export default {
    name: 'Index',
    layout: 'user',
    components: { Modal, SvgIcon, AutoComplete },
    data () {
        return {
            userProfile: null,
            formData: {
                name: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                avatar: '',
                address: '',
                addressId: '',
                placeId: '',
                location: ''
            },
            errors: {
                name: null,
                firstName: null,
                lastName: null,
                email: null,
                phone: null,
                avatar: null,
                address: null
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
        this.getUserProfile()
        this.getUserAddress()
    },
    mounted () {
        this.$root.$on('map-popup-search-location', (locations, addresss, placeIds) => {
            this.formData.address = addresss
            this.formData.location = locations.location.join(',')
            this.formData.placeId = placeIds
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
            this.formData.location = data.geometry.coordinates.join(',')
            this.formData.placeId = data.id
        },
        cleartAutoValue (id) {
        },
        async getUserAddress () {
            const response = await this.$api.order.getOrderLocation()
            if (response.status === 200 && response.data) {
                response.data.forEach((item) => {
                    if (item.allow_change === 0) {
                        this.formData.address = item.address
                        this.formData.addressId = item.id
                    }
                })
            }
        },
        async getUserProfile () {
            const response = await this.$api.userProfile.getUserProfile(this.getUserID)
            if (response.status === 'OK' && response.data) {
                this.userProfile = response.data
                this.formData.name = this.userProfile.info.name
                this.formData.firstName = this.userProfile.info.first_name
                this.formData.lastName = this.userProfile.info.last_name
                this.formData.email = this.userProfile.info.email
                this.formData.phone = this.userProfile.info.phone_number
                this.formData.avatar = this.userProfile.profile.avatar ? process.env.SERVER_URL + '/' + this.userProfile.profile.avatar : ''
            }
        },
        async saveUserClick () {
            this.errors = []
            let isValid = true
            if (!this.formData.name) {
                this.errors.name = 'Hãy nhập user name'
                isValid = false
            }
            if (!this.formData.firstName) {
                this.errors.firstName = 'Hãy nhập tên của bạn'
                isValid = false
            }
            if (!this.formData.lastName) {
                this.errors.lastName = 'Hãy nhập họ của bạn'
                isValid = false
            }
            if (!this.formData.email) {
                this.errors.email = 'Hãy nhập địa chỉ email'
                isValid = false
            }
            if (!this.formData.phone) {
                this.errors.phone = 'Hãy nhập số điện thoại'
                isValid = false
            }
            if (!this.formData.address) {
                this.errors.address = 'Hãy nhập địa chỉ'
                isValid = false
            }

            if (isValid) {
                const formData = new FormData()
                formData.append('id', this.getUserID)
                formData.append('name', this.formData.name)
                formData.append('first_name', this.formData.firstName)
                formData.append('last_name', this.formData.lastName)
                formData.append('email', this.formData.email)
                formData.append('phone_number', this.formData.phone)
                if (this.formData.avatar) {
                    formData.append('avatar', this.formData.avatar)
                }
                if (this.formData.address && this.formData.location) {
                    formData.append('address_id', this.formData.addressId)
                    formData.append('address', this.formData.address)
                    formData.append('location', this.formData.location)
                    formData.append('place_id', this.formData.placeId)
                }
                const response = await this.$api.userProfile.saveUserProfile(formData)
                if (response.status === 'OK' && response.data) {
                    this.$bvModal.show('modal-save-user-success')
                }
            }
        },
        selectAvatar () {
            document.getElementById('avatar-image').click()
        },
        imageSelectedChange (evt) {
            const _this = this
            if (evt && evt.target) {
                const fileInput = evt.target
                if (fileInput.files && fileInput.files.length > 0) {
                    this.errors.avatar = null
                    const image = fileInput.files[0]

                    if (this.isImageValid(image)) {
                        const img = new Image()
                        img.src = URL.createObjectURL(image)
                        img.onload = function () {
                            const canvas = document.createElement('CANVAS')
                            canvas.height = this.naturalHeight
                            canvas.width = this.naturalWidth

                            const ctx = canvas.getContext('2d')
                            ctx.drawImage(this, 0, 0)

                            _this.formData.avatar = canvas.toDataURL('image/png')
                        }
                        img.onerror = function () {
                            fileInput.value = ''
                            _this.errors.avatar = 'File sai định dạng.'
                            return false
                        }
                    } else {
                        fileInput.value = ''
                        this.errors.avatar = 'File sai định dạng hoặc có kích thước lớn (tối đa 1Mb).'
                        return false
                    }
                }
            }
        },
        isImageValid (image) {
            const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
            return allowedExtensions.exec(image.name) && image.size < 1048576
        }
    }
}
</script>

<style lang="scss">
    @import './assets/scss/variable';

    #user-profile {
        .header {
            .header-title {
                color: $orange;
                font-weight: bold;
            }
        }

        [type='text'] {
            height: 40px;
            font-size: inherit;
        }

        .select-image {
            font-weight: bold;
            margin-top: 1rem;
            cursor: pointer;
        }

        .content button {
            border-radius: 20px;
            background-color: $orange;
            border-color: $orange;
        }

        .current-location {
            width: 24px;
            position: absolute;
            top: 8px;
            right: 20px;
            cursor: pointer;
        }

        .map-point {
             position: absolute;
             top: 9px;
             right: -5px;
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
            .content .row {
                display: flex;
                flex-direction: column-reverse;
            }

            .content .form-group {
                 display: flex;
                 flex-direction: column;
             }

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
            .border-bottom,
            .select-image,
            .file-type {
                display: none;
            }
        }
    }
</style>
