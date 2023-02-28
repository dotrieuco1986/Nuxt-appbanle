<template>
    <div id="user-address" class="mt-4">
        <div class="header mb-4">
            <label class="header-title">
                Đổi Mật Khẩu
            </label>
            <div class="float-right pt-3 color-orange">
                Vui lòng không chia sẻ mật khẩu để bảo mật.
            </div>
        </div>
        <div class="border-bottom" />
        <div class="content mt-4">
            <div class="row">
                <div class="col">
                    <form>
                        <div class="form-group row">
                            <label
                                for="old-password"
                                class="col-md-3 col-form-label"
                            >Mật Khẩu Cũ: *</label>
                            <div class="col-md-6 col-lg-7">
                                <input
                                    id="old-password"
                                    v-model.trim="$v.formData.oldPassword.$model"
                                    type="text"
                                    class="form-control"
                                    placeholder="Nhập"
                                >
                                <div v-if="!$v.formData.oldPassword.required" class="errorMessage">
                                    Hãy nhập mật khẩu cũ
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label
                                for="new-password"
                                class="col-md-3 col-form-label"
                            >Mật khẩu mới: *</label>
                            <div class="col-md-6 col-lg-7">
                                <input
                                    id="new-password"
                                    v-model.trim="$v.formData.newPassword.$model"
                                    type="text"
                                    class="form-control"
                                    placeholder="Nhập"
                                >
                                <div v-if="!$v.formData.newPassword.required" class="errorMessage">
                                    Hãy nhập mật khẩu mới
                                </div>
                                <div v-else-if="!$v.formData.newPassword.strongPassword" class="errorMessage">
                                    Mật khẩu cần phải có chữ, số, ký tự đặc biệt và lớn hơn 8 ký tự
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label
                                for="confirm-password"
                                class="col-md-3 col-form-label"
                            >Xác Nhận Mật Khẩu: *</label>
                            <div class="col-md-6 col-lg-7">
                                <input
                                    id="confirm-password"
                                    v-model.trim="$v.formData.confirmPassword.$model"
                                    type="text"
                                    class="form-control"
                                    placeholder="Nhập"
                                >
                                <div v-if="!$v.formData.confirmPassword.required" class="errorMessage">
                                    Hãy nhập mật khẩu mới
                                </div>
                                <div v-else-if="!$v.formData.confirmPassword.sameAsPassword" class="errorMessage">
                                    Mật khẩu xác nhận không khớp với mật khẩu mới
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row text-center warning mb-3">
                <div class="col">
                    Vui lòng không chia sẻ mật khẩu để bảo mật.
                </div>
            </div>
            <div class="row text-center">
                <div class="col">
                    <button type="button" class="btn btn-primary mb-2" @click.prevent="savePasswordClick">
                        Hoàn Tất
                    </button>
                </div>
            </div>
        </div>
        <modal id="modal-inform" size="sm">
            <div class="text-center">
                <label>{{ message }}</label>
            </div>
        </modal>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, sameAs } from 'vuelidate/lib/validators'

export default {
    name: 'Create',
    layout: 'user',
    mixins: [validationMixin],
    data () {
        return {
            formData: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            message: ''
        }
    },
    validations: {
        formData: {
            oldPassword: { required },
            newPassword: {
                required,
                strongPassword (newPassword) {
                    return (
                        /[a-z]/.test(newPassword) && // checks for a-z
                        /[0-9]/.test(newPassword) && // checks for 0-9
                        /\W|_/.test(newPassword) && // checks for special char
                        newPassword.length >= 8
                    )
                }
            },
            confirmPassword: {
                required,
                sameAsPassword: sameAs('newPassword')
            }
        }
    },
    computed: {
        ...mapGetters({
            checkIsLoggedIn: 'loggedIn',
            loggedInUser: 'user',
            accessToken: 'accessToken'
        }),
        getUserID () {
            return this.loggedInUser ? this.loggedInUser.info.id : 0
        }
    },
    created () {
    },
    mounted () {
    },
    methods: {
        async savePasswordClick () {
            const formTouched = !this.$v.formData.$anyDirty
            const errors = this.$v.formData.$anyError

            if (errors === false && formTouched === false) {
                const formData = new FormData()
                formData.append('password', this.formData.oldPassword)
                formData.append('new_password', this.formData.newPassword)
                formData.append('access_token', this.accessToken)
                const response = await this.$api.auth.updatePassword(formData)
                if (response.status === 200) {
                    this.$router.push({
                        path: '/user/profile'
                    })
                } else if (response.status === 103) {
                    this.message = 'Bạn hãy nhập mật khẩu cũ và mật khẩu mới'
                    this.$bvModal.show('modal-inform')
                } else if (response.status === 102) {
                    this.message = 'Mật khẩu cũ không đúng, vui lòng kiểm tra lại'
                    this.$bvModal.show('modal-inform')
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

        .warning {
            display: none;
        }

        .color-orange {
            color: $orange;
        }

        @media (min-width: $mq-tiny) and (max-width: $tablet) {
            .content button {
                width: 100%;
                border-radius: 5px;
            }

            .header,
            .border-bottom {
                display: none;
            }

            .warning {
                display: block;
            }
        }
    }
</style>
