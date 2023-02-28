<template>
    <div id="chain-create" class="col-12">
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
                                <label
                                    for="store-name"
                                    class="col-sm-3 col-form-label label-custom"
                                >Tên Chuỗi Cửa Hàng: <span class="text-red">*</span>
                                </label>
                                <div class="col-sm-9">
                                    <input
                                        id="store-name"
                                        v-model="$v.storeChainData.name.$model"
                                        type="text"
                                        class="form-control"
                                        :class="{ 'group-error': $v.storeChainData.name.$error }"
                                        placeholder="Tên chuỗi cửa hàng"
                                    >
                                    <span v-if="!$v.storeChainData.name.required" class="msg-error">Tên chuỗi cửa hàng không được để trống</span>
                                    <span v-if="!$v.storeChainData.name.maxLength" class="msg-error">Tên chuỗi cửa hàng không được quá 50 kí tự</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-owner"
                                    class="col-sm-3 col-form-label label-custom"
                                >Tên Người Đại Diện: <span class="text-red">*</span>
                                </label>
                                <div class="col-sm-9">
                                    <input
                                        id="store-owner"
                                        v-model="$v.storeChainData.representation_name.$model"
                                        type="text"
                                        class="form-control"
                                        :class="{ 'group-error': $v.storeChainData.representation_name.$error }"
                                        placeholder="Tên người đại diện"
                                    >
                                    <span v-if="!$v.storeChainData.representation_name.required" class="msg-error">Tên người đại diện không được để trống</span>
                                    <span v-if="!$v.storeChainData.representation_name.maxLength" class="msg-error">Tên người đại diện không được quá 50 kí tự</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-email"
                                    class="col-sm-3 col-form-label label-custom"
                                >Email: <span class="text-red">*</span>
                                </label>
                                <div class="col-sm-9">
                                    <input
                                        id="store-email"
                                        v-model="$v.storeChainData.email.$model"
                                        type="email"
                                        class="form-control"
                                        :class="{ 'group-error': $v.storeChainData.email.$error }"
                                        placeholder="email@goollow68.org"
                                    >
                                    <span v-if="!$v.storeChainData.email.required" class="msg-error">Email không được để trống</span>
                                    <span v-if="!$v.storeChainData.email.email" class="msg-error">Địa chỉ email không đúng định dạng</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    class="col-sm-3 col-form-label label-custom"
                                >Số điện thoại:
                                </label>
                                <div class="col-sm-9">
                                    <template v-for="(item, index) in storeChainData.phones">
                                        <div :key="index" class="row">
                                            <div class="col-11 br-style">
                                                <input
                                                    :id="'store-phone-' + index"
                                                    v-model="$v.storeChainData.phones.$each[index].number.$model"
                                                    type="text"
                                                    class="form-control"
                                                    :class="{ 'group-error': $v.storeChainData.phones.$each[index].number.$error }"
                                                    placeholder="090xxxxxxx"
                                                >
                                                <span v-if="!$v.storeChainData.phones.$each[index].number.maxLength" class="msg-error">Số điện thoại không được quá 15 kí tự</span>
                                            </div>
                                            <div class="col-1 text-right">
                                                <span @click="handlePhoneNumber(item)">
                                                    <svgIcon
                                                        :icon="item.isFirstRow ? 'fa-plus' : 'fa-minus'"
                                                        grow-by-height="15px"
                                                        has-fill="false"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-social"
                                    class="col-sm-3 col-form-label label-custom"
                                >Thêm/bớt cửa hàng:
                                </label>
                                <div class="col-sm-9">
                                    <div class="box-list-store-not-of-chain">
                                        <ul class="wrap">
                                            <li v-for="(value, index) in listStoreUnAssignData" :key="index">
                                                {{ (index + 1) + '. ' + value.name }}
                                                <a class="pull-right orange" @click="handleCheckStoreAsign(value)">
                                                    <svgIcon
                                                        class="curser-pointer"
                                                        icon="fa-plus"
                                                        has-fill="false"
                                                    />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-business-type"
                                    class="col-sm-3 col-form-label label-custom"
                                >Danh sách cửa hàng:
                                </label>
                                <div class="col-sm-9">
                                    <div class="box-list-store-not-of-chain">
                                        <ul class="wrap">
                                            <li v-for="(value, index) in listStoreChecked" :key="index">
                                                {{ (index + 1) + '. ' + value.name }}
                                                <a class="pull-right orange" @click="handleRemoveStore(value)">
                                                    <svgIcon
                                                        class="curser-pointer"
                                                        icon="fa-minus"
                                                        has-fill="false"
                                                    />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 text-center">
                            <label
                                for="store-signboard-image"
                                class="col-sm-12 col-form-label label-custom label-signboard"
                            >Chọn logo chuỗi</label>
                            <div class="col">
                                <span class="upload-signboard" @click="openSelectImage">
                                    <span> Tải lên </span>
                                </span>
                            </div>
                            <input ref="signboardInput" class="d-none" type="file" accept=".jpg, .jpeg, .png, .gif, .bmp" @change="onFileChange"> <br>
                            <div
                                class="col-sm-12 text-center -text-gray"
                            >
                                Dung lượng tối đa 1MB. <br>
                                Định dạng JPG, PNG. <br>
                                Tỉ lệ ngang dọc 2:1
                            </div>
                            <br>
                            <span v-show="error.logo.required" class="text-red">{{ error.logo.required }}</span>
                            <span v-show="error.logo.file_type" class="text-red">{{ error.logo.file_type }}</span>
                            <span v-show="error.logo.file_size" class="text-red">{{ error.logo.file_size }}</span>
                            <span v-show="error.logo.file_scale" class="text-red">{{ error.logo.file_scale }}</span>
                            <div class="row">
                                <div v-if="storeChainData.logo_review === null" class="preview-item col">
                                    <img v-if="storeChainData.logo" :src="imgUrl + storeChainData.logo" alt="hinh">
                                    <span v-if="storeChainData.logo" class="btn-remove-preview" @click="removePreview">x</span>
                                </div>
                                <div v-else class="preview-item col">
                                    <img v-if="storeChainData.logo_review" :src="storeChainData.logo_review" alt="hinh">
                                    <span v-if="storeChainData.logo_review" class="btn-remove-preview" @click="removePreview">x</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group row">
                                <div class="col-6 text-right">
                                    <ButtonAdmin
                                        :type="resetBtn.type"
                                        :class="resetBtn.class"
                                        :text="resetBtn.text"
                                        @click="handleReset"
                                    />
                                </div>
                                <div class="col-6 text-left">
                                    <ButtonAdmin
                                        :type="submitBtn.type"
                                        :class="submitBtn.class"
                                        :text="submitBtn.text"
                                        @click="handleSubmit"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <modal-show-message id="modal-show-message" :msg="message.text" :class-defined="message.class" :icon="message.icon" @close-click="close" />
        <modal-confirm
            id="modal-reset-store-chain"
            :description="'Bạn có chắc chắn muốn bỏ qua thay đổi?'"
            :ok-txt="'Đồng ý'"
            :ok-cancel="'Hủy bỏ'"
            @ok-click="okReset"
        />
    </div>
</template>
<style lang="scss">
@import "~/assets/scss/_global";
@import "~/assets/scss/_btable";
@import "~/assets/scss/_stores";
@import "~/assets/scss/_breadcrumb";
#store-choose-address {
    .modal-body {
        padding: 0;
    }
}
.msg-error {
    display: none;
}
.group-error {
    border-color: red;
}
.group-error + .msg-error {
    display: block;
    color: red;
}
</style>
<script>
import ModalShowMessage from '@/components/modal/ModalShowMessage'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import svgIcon from '~/components/common/SvgIcon.vue'
import ButtonAdmin from '~/components/buttons/ButtonAdmin.vue'
export default {
    layout: 'admin',
    components: {
        svgIcon,
        ButtonAdmin,
        ModalShowMessage
    },
    mixins: [validationMixin],
    props: {
        headTitle: {
            type: String,
            default: 'Tạo Chuỗi Cửa Hàng'
        }
    },
    validations: {
        storeChainData: {
            name: {
                required,
                maxLength: maxLength(50)
            },
            representation_name: {
                required,
                maxLength: maxLength(50)
            },
            email: {
                required,
                email
            },
            phones: {
                $each: {
                    number: {
                        maxLength: maxLength(15)
                    }
                }
            }
        }
    },
    async fetch () {
        const result = await this.$api.store.getCategories()
        const listCategoriesData = result.data
        for (let index = 0; index < listCategoriesData.length; ++index) {
            if (listCategoriesData[index].parent_id) {
                const objdata = { id: listCategoriesData[index].id, name: listCategoriesData[index].name, parentid: listCategoriesData[index].parent_id, state: false }
                this.listChildCategories.push(objdata)
            } else {
                this.listParentCategories.push(listCategoriesData[index])
            }
        }
    },
    data () {
        return {
            initListStoreUnAssignData: [],
            listStoreUnAssignData: [],
            listStoreChecked: [],
            breadcrumbs: [
                {
                    text: 'Quản Lý Chuỗi Cửa Hàng',
                    href: '/admin/chains/list'
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
            listChildCategories: [],
            listParentCategories: [],
            open: true,
            storeChainData: {
                id: 0,
                name: '',
                phones: [],
                logo: '',
                logo_review: null,
                representation_name: '',
                email: ''
            },
            firstPhoneNumber: {
                number: '',
                isFirstRow: true
            },
            statusUncheck: false,
            imgUrl: process.env.SERVER_IMAGE_URL,
            message: {
                class: 'error',
                text: '',
                icon: 'close'
            },
            error: {
                logo: {
                    required: '',
                    file_type: '',
                    file_size: '',
                    file_scale: ''
                }
            },
            removeImage: false,
            isError: false
        }
    },
    mounted () {
        this.getUnAssignStores()
        if (this.$route.params.id) {
            this.getChain()
        } else if (this.storeChainData.phones.length === 0) {
            this.storeChainData.phones.push(this.firstPhoneNumber)
        }
    },
    methods: {
        async getChain () {
            const storeChain = await this.$api.store.getChainById(this.$route.params.id)
            if (storeChain.data === 'Connection Failure') {
                this.getChain()
            } else {
                this.storeChainData.id = storeChain.data.id
                this.storeChainData.name = storeChain.data.name
                this.storeChainData.logo = storeChain.data.logo
                this.storeChainData.representation_name = storeChain.data.representation_name
                this.storeChainData.email = storeChain.data.email

                if (storeChain.data.phones !== null && storeChain.data.phones.length) {
                    this.storeChainData.phones = []
                    storeChain.data.phones.forEach((value, index) => {
                        const phone = {}
                        phone.number = value
                        phone.isFirstRow = false
                        if (index === 0) {
                            phone.isFirstRow = true
                        }
                        this.storeChainData.phones.push(phone)
                    })
                } else {
                    this.storeChainData.phones.push(this.firstPhoneNumber)
                }
                this.getStores(storeChain.data.id)
            }
        },
        getStores (id) {
            const that = this
            this.$api.store.getStoresByChain(id).then((res) => {
                if (res.data === 'Connection Failure') {
                    that.getStores(id)
                } else if (res.data.length) {
                    res.data.forEach((item) => {
                        this.listStoreChecked.push(item)
                    })
                }
            })
        },
        getUnAssignStores () {
            this.$api.store.getStores('?page=0&belongs_to_chain=false').then((res) => {
                if (res.data === 'Connection Failure') {
                    this.getUnAssignStores()
                } else {
                    this.listStoreUnAssignData = res.data
                    this.initListStoreUnAssignData = res.data
                    for (let index = 0; index < this.listStoreUnAssignData.length; ++index) {
                        this.listStoreUnAssignData[index].isChecked = false
                    }
                    for (let index = 0; index < this.initListStoreUnAssignData.length; ++index) {
                        this.initListStoreUnAssignData[index].isChecked = false
                    }
                }
            })
        },
        handleRemoveStore (item) {
            const index = this.listStoreChecked.indexOf(item)
            if (index > -1) {
                this.listStoreChecked.splice(index, 1)
            }
            if (this.listStoreUnAssignData.includes(item)) {
                const index = this.listStoreUnAssignData.indexOf(item)
                if (index > -1) {
                    this.listStoreUnAssignData[index].isChecked = false
                }
            } else {
                item.isChecked = false
                this.listStoreUnAssignData.push(item)
            }
        },
        handleCheckStoreAsign (item) {
            if (this.listStoreChecked.includes(item)) {
                const index = this.listStoreChecked.indexOf(item)
                if (index > -1) {
                    this.listStoreChecked.splice(index, 1)
                }
            } else {
                const indexUnAssign = this.listStoreUnAssignData.indexOf(item)
                if (indexUnAssign > -1) {
                    this.listStoreUnAssignData.splice(indexUnAssign, 1)
                }
                this.listStoreChecked.push(item)
            }
        },
        handlePhoneNumber (item) {
            if (item.isFirstRow) {
                const newPhoneNumber = {
                    number: '',
                    isFirstRow: false
                }
                this.storeChainData.phones.push(newPhoneNumber)
            } else {
                const indexOfItem = this.storeChainData.phones.indexOf(item)
                this.storeChainData.phones.splice(indexOfItem, 1)
            }
        },
        openSelectImage () {
            this.$refs.signboardInput.click()
        },
        handleSubmit (e) {
            e.preventDefault()
            this.$v.$touch()
            const error = this.$v.$invalid
            if (error || this.isError) {
                return false
            } else {
                const arrListStoreSet = []
                if (this.listStoreChecked.length) {
                    this.listStoreChecked.forEach((item) => {
                        arrListStoreSet.push(item.id)
                    })
                }

                const formData = new FormData()
                formData.append('id', this.storeChainData.id)
                formData.append('name', this.storeChainData.name)
                formData.append('phones', JSON.stringify(this.storeChainData.phones))
                formData.append('logo', this.storeChainData.logo)
                formData.append('email', this.storeChainData.email)
                formData.append('representation_name', this.storeChainData.representation_name)
                formData.append('arr_list_stores_selected', JSON.stringify(arrListStoreSet))
                if (this.removeImage) {
                    formData.append('is_delete_logo', this.removeImage)
                }

                this.$api.store.createChain(formData).then((res) => {
                    const _this = this
                    _this.message.class = 'success'
                    _this.message.text = 'Lưu chuỗi cửa hàng thành công'
                    _this.message.icon = 'check'
                    _this.$bvModal.show('modal-show-message')
                }).catch((error) => {
                    if (error.response) {
                        this.message.class = 'error'
                        this.message.text = 'Lưu chuỗi cửa hàng thất bại: ' + error.response.data.message
                        this.message.icon = 'error'
                        this.$bvModal.show('modal-show-message')
                    }
                })
            }
        },
        handleReset (e) {
            this.$bvModal.show('modal-reset-store-chain')
        },
        okReset () {
            this.$router.push({
                path: '/admin/chains/list'
            })
        },
        close () {
            if (this.message.class === 'success') {
                this.$router.push({
                    path: '/admin/chains/list'
                })
            }
        },
        onFileChange (e) {
            const that = this
            const file = e.target.files[0]
            this.removeImage = false
            if (file) {
                that.error.logo.required = ''
                const url = URL.createObjectURL(file)
                const img = new Image()
                img.onload = function () {
                    if ((this.height + this.height) !== this.width) {
                        that.storeChainData.logo = null
                        that.storeChainData.logo_review = null
                        that.error.logo.file_scale = 'Hình ảnh không đúng tỉ lệ 2:1'
                        that.error.logo.file_size = ''
                        that.error.logo.file_type = ''
                        that.isError = true
                        return false
                    } else if (file.size > 1000000) {
                        that.storeChainData.logo = null
                        that.storeChainData.logo_review = null
                        that.error.logo.file_scale = ''
                        that.error.logo.file_size = 'Hình ảnh tải lên phải nhỏ hơn 1MB'
                        that.error.logo.file_type = ''
                        that.isError = true
                        return false
                    } else {
                        that.error.logo.file_scale = ''
                        that.error.logo.file_size = ''
                        that.error.logo.file_type = ''

                        that.storeChainData.logo = file
                        that.storeChainData.logo_review = url
                        that.isError = false
                    }
                }
                img.onerror = function () {
                    that.storeChainData.logo = null
                    that.storeChainData.logo_review = null
                    that.error.logo.file_scale = ''
                    that.error.logo.file_size = ''
                    that.error.logo.file_type = 'File sai định dạng.'
                    that.isError = true
                    return false
                }
                img.src = url
            }
        },
        removePreview () {
            this.removeImage = true
            this.storeChainData.logo = null
            this.storeChainData.logo_review = null
        }
    },
    head () {
        return {
            title: 'Quản lý chuỗi cửa hàng'
        }
    }
}
</script>
