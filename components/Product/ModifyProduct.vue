<template>
    <div id="modify-product" class="row fz">
        <div class="col-12">
            <div class="row style-header">
                <label class="text-orange">
                    <n-link to="/admin/product" class="text-orange">
                        Quản lý của hàng
                    </n-link>
                    > Tạo sản phẩm
                </label>
            </div>
        </div>

        <div v-show="viewCategory" class="col-12">
            <category-list ref="selectCategory" :categories="categories" />
            <span class="text-red">{{ categoryError }}</span>
            <div class="float-right">
                <mvp-button name="Tiếp theo" @click.native="setCategory" />
            </div>
        </div>

        <div v-show="!viewCategory" class="col-12 pt-4">
            <div class="row">
                <div class="col-md-8">
                    <!--Name-->
                    <div class="row item">
                        <div class="col-3">
                            <span>Tên sản phẩm<span class="text-red"> *</span></span>
                        </div>
                        <div class="col">
                            <mvp-textbox :disabled="action === 'updateProductStore'" :max-length="300" :value="name" @input.native="name = getValue($event)" />
                            <span class="text-red">{{ nameError }}</span>
                        </div>
                    </div>

                    <!--SKU-->
                    <div class="row item">
                        <div class="col-3">
                            <span>Mã sản phẩm<span class="text-red"> *</span></span>
                        </div>
                        <div class="col">
                            <mvp-textbox :disabled="action === 'updateProductStore'" :value="skuCode" @input.native="skuCode = getValue($event)" />
                            <span class="text-red">{{ skuCodeError }}</span>
                        </div>
                    </div>

                    <!--Brand-->
                    <div class="row item">
                        <div class="col-3">
                            <span>Thương hiệu<span class="text-red"> *</span></span>
                        </div>
                        <div class="col">
                            <mvp-textbox :disabled="action === 'updateProductStore'" :max-length="300" :value="brand" @input.native="brand = getValue($event)" />
                            <span class="text-red">{{ brandError }}</span>
                        </div>
                    </div>

                    <!--Category-->
                    <div class="row item">
                        <div class="col-3">
                            <span>Danh mục<span class="text-red"> *</span></span>
                        </div>
                        <div class="col">
                            <span class="text-orange" @click="switchCatgory">{{ category }}</span>
                        </div>
                    </div>

                    <!--Barcode-->
                    <!--<div class="row item">
                        <div class="col-3">
                            <span>Barcode<span class="text-red"> *</span></span>
                        </div>
                        <div class="col">
                            <mvp-textbox :value="barcode" @input.native="barcode = getValue($event)" />
                            <span class="text-red">{{ barcodeError }}</span>
                        </div>
                    </div>-->

                    <!--base Price-->
                    <!--<div class="row item">
                        <div class="col-3">
                            <span>Giá gốc<span class="text-red"> *</span></span>
                        </div>
                        <div class="col">
                            <mvp-textbox type="number" :value="basePrice" @input.native="basePrice = getValue($event)" />
                            <span class="text-red">{{ basePriceError }}</span>
                        </div>
                    </div>-->

                    <!--Price selling-->
                    <div class="row item">
                        <div class="col-3">
                            <span>Giá<span class="text-red"> *</span></span>
                        </div>
                        <div class="col">
                            <mvp-textbox
                                type="number"
                                :value="sellingPrice"
                                @input.native="sellingPrice = getValue($event)"
                            />
                            <span class="text-red">{{ sellingPriceError }}</span>
                        </div>
                    </div>

                    <!--Quantity-->
                    <div class="row item">
                        <div class="col-3">
                            <span>Số lượng<span class="text-red"> *</span></span>
                        </div>
                        <div class="col">
                            <mvp-textbox type="number" :value="quantity" @input.native="quantity = getValue($event)" />
                            <span class="text-red">{{ quantityError }}</span>
                        </div>
                    </div>

                    <!--State-->
                    <div v-if="action==='updateProductStore'" class="row item">
                        <div class="col-3">
                            <span>Tình trạng</span>
                        </div>
                        <div class="col">
                            <span>{{ quantity> 0? 'Còn hàng': 'Hết Hàng' }}</span>
                        </div>
                    </div>

                    <!--Description-->
                    <div class="row item">
                        <div class="col-3">
                            <span>Mô tả sản phẩm</span>
                        </div>
                        <div class="col">
                            <mvp-textarea :disabled="action === 'updateProductStore'" :max-length="300" :value="description" @input.native="description = getValue($event)" />
                        </div>
                    </div>

                    <!--Unit-->
                    <div class="row item">
                        <div class="col-3">
                            <span>Đơn vị tính</span>
                        </div>
                        <div class="col">
                            <b-form-select
                                v-model="unit"
                                class="height-40 font-size-14"
                                :options="optionsUnit"
                                :disabled="action === 'updateProductStore'"
                            />
                        </div>
                    </div>

                    <!--Guarantee-->
                    <div class="row item">
                        <div class="col-3">
                            <span>Thông tin bảo hành</span>
                        </div>
                        <div class="col">
                            <b-form-select
                                v-model="guarantee"
                                class="height-40 font-size-14"
                                :options="optionsGuarantee"
                                :disabled="action === 'updateProductStore'"
                            />
                        </div>
                    </div>

                    <div class="row item">
                        <div class="col-3">
                            <span>Giá khuyến mãi</span>
                        </div>
                        <div class="col">
                            <mvp-textbox :value="promotionPrice" type="number" @input.native="promotionPrice = getValue($event)" />
                            <span class="text-red">{{ promotionPriceError }}</span>
                        </div>
                    </div>

                    <!--Description-->
                    <div class="row item">
                        <div class="col-3">
                            <span>Mô tả khuyến mãi</span>
                        </div>
                        <div class="col">
                            <mvp-textarea :value="promotionNote" @input.native="promotionNote = getValue($event)" />
                        </div>
                    </div>

                    <!--Start Promotion-->
                    <div class="row item">
                        <div class="col-3">
                            <span>Thời gian bắt đầu khuyến mãi</span>
                        </div>
                        <div class="col">
                            <VueCtkDateTimePicker v-model="promotionStart" />
                            <span class="text-red">{{ promotionStartError }}</span>
                        </div>
                    </div>

                    <!--End Promotion-->
                    <div class="row item">
                        <div class="col-3">
                            <span>Thời gian kết thúc khuyến mãi</span>
                        </div>
                        <div class="col">
                            <VueCtkDateTimePicker v-model="promotionEnd" />
                            <span class="text-red">{{ promotionEndError }}</span>
                        </div>
                    </div>

                    <div class="row item">
                        <div class="col-3">
                            <span>Chiều cao sau đóng gói</span>
                        </div>
                        <div class="col">
                            <mvp-textbox :disabled="action === 'updateProductStore'" :value="packageLength" type="number" @input.native="packageHeight = getValue($event)" />
                        </div>
                    </div>

                    <div class="row item">
                        <div class="col-3">
                            <span>Chiều rộng sau đóng gói</span>
                        </div>
                        <div class="col">
                            <mvp-textbox :disabled="action === 'updateProductStore'" :value="packageWidth" type="number" @input.native="packageWidth = getValue($event)" />
                        </div>
                    </div>

                    <div class="row item">
                        <div class="col-3">
                            <span>Chiều dài sau đóng gói</span>
                        </div>
                        <div class="col">
                            <mvp-textbox :disabled="action === 'updateProductStore'" :value="packageLength" type="number" @input.native="packageLength = getValue($event)" />
                        </div>
                    </div>

                    <div class="row item">
                        <div class="col-3">
                            <span>Trọng lượng sau đóng gói</span>
                        </div>
                        <div class="col">
                            <mvp-textbox :disabled="action === 'updateProductStore'" :value="packageWeight" type="number" @input.native="packageWeight = getValue($event)" />
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <image-selection
                        ref="imageProduct"
                        :disabled="action === 'updateProductStore'"
                        :max="10"
                        :auto-load="true"
                        multiple
                        :files="files"
                    />
                    <span class="text-red">{{ imageError }}</span>
                </div>
            </div>

            <div class="">
                <mvp-checkbox :checked="clearData" name="Xóa thông tin sau khi hoàn tất" @change.native="clearData = $event.target.checked" />

                <div class="float-right">
                    <n-link to="/admin/product">
                        <mvp-button name="Bỏ qua" />
                    </n-link>

                    <mvp-button name="Hoàn tất" @click.native="submitProduct" />
                </div>
            </div>
        </div>

        <modal id="modal-submit-product">
            <div class="modal-body">
                <p class="content-center">
                    {{ resultStatus }}.
                </p>
            </div>
            <footer class="modal-footer content-center">
                <div class="row justify-content-center">
                    <div class="col">
                        <mvp-button name="OK" @click.native="closeModal" />
                    </div>

                    <div>
                        <nuxt-link v-if="action==='add'" to="admin/product">
                            <mvp-button name="Quản lý sản phẩm" />
                        </nuxt-link>
                    </div>
                </div>
            </footer>
        </modal>
    </div>
</template>

<script>
import MvpTextbox from '@/components/MVPControl/MvpTextbox'
import MvpTextarea from '@/components/MVPControl/MvpTextarea'
import MvpButton from '@/components/MVPControl/MvpButton'
import ImageSelection from '@/components/ImageSelection'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import ConstantsJS from 'static/constants'
import moment from 'moment'
import CategoryList from '@/components/MVPControl/CategoryList'
import MvpCheckbox from '@/components/MVPControl/MvpCheckbox'
import Modal from '@/components/modal/Modal'

export default {
    name: 'ModifyProduct',
    components: {
        Modal,
        MvpCheckbox,
        CategoryList,
        ImageSelection,
        MvpButton,
        MvpTextarea,
        MvpTextbox,
        VueCtkDateTimePicker
    },
    props: {
        product: {
            type: Object,
            default: null
        },
        action: {
            type: String,
            default: 'add'
        },
        id: {
            type: String,
            default: '',
            description: 'id of product'
        },
        businessId: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            categories: null,
            units: [
                'Bao', 'Bình', 'Bọc', 'Bộ', 'Cây', 'Chậu', 'Gói', 'Giỏ', 'Hộp', 'Hũ', 'Kệ', 'Lọ', 'Lốc', 'Lon', 'Ly', 'Mét',
                'Ống', 'Quả', 'Quyển', 'Sợi', 'Tấm', 'Tệp', 'Thanh', 'Thẻ', 'Thỏi', 'Thùng', 'Túi', 'Tuýt', 'Vỉ', 'Viên', 'Xấp'
            ],
            guarantees: [
                '3 tháng', '6 tháng', '9 tháng', '1 năm', '1,5 năm', '2 năm', '3 năm', '4 năm', '5 năm'
            ],
            name: '',
            skuCode: '',
            barcode: '',
            brand: '',
            category: '',
            categoryId: 0,
            unit: '',
            basePrice: '',
            sellingPrice: '',
            quantity: '',
            guarantee: '',
            promotionPrice: '',
            promotionNote: '',
            promotionStart: '',
            promotionEnd: '',
            description: '',
            files: [],
            packageHeight: '',
            packageWidth: '',
            packageLength: '',
            packageWeight: '',
            resultStatus: '',

            nameError: '',
            skuCodeError: '',
            barcodeError: '',
            brandError: '',
            categoryError: '',
            basePriceError: '',
            sellingPriceError: '',
            quantityError: '',
            promotionPriceError: '',
            promotionStartError: '',
            promotionEndError: '',
            imageError: '',
            viewCategory: this.action === 'add',
            clearData: false
        }
    },
    computed: {
        optionsUnit () {
            const list = []
            this.units.forEach(function (item) {
                list.push({
                    value: item,
                    text: item
                })
            })

            return list
        },
        optionsGuarantee () {
            const list = []
            this.guarantees.forEach(function (item) {
                list.push({
                    value: item,
                    text: item
                })
            })

            return list
        }
    },
    watch: {
        product () {
            this.name = this.product ? this.product.name : ''
            this.skuCode = this.product ? this.product.sku_code : ''
            this.barcode = this.product ? this.product.barcode : ''
            this.brand = this.product ? this.product.brand : ''
            this.category = this.product && this.product.category ? this.product.category.id : ''
            this.unit = this.product ? this.product.unit : ''
            this.basePrice = this.product && this.product.base_price ? this.product.base_price.toString() : ''
            this.sellingPrice = this.product && this.product.selling_price ? this.product.selling_price.toString() : ''
            this.quantity = this.product && this.product.quantity ? this.product.quantity.toString() : ''
            this.guarantee = this.product ? this.product.guarantee_info : ''
            this.promotionPrice = this.product && this.product.promotion_price ? this.product.promotion_price.toString() : ''
            this.promotionNote = this.product ? this.product.promotion_note : ''
            this.promotionStart = this.product ? this.product.promotion_start_datetime : ''
            this.promotionEnd = this.product ? this.product.promotion_end_datetime : ''
            this.description = this.product ? this.product.description : ''
            this.files = this.product ? this.product.images : []
            this.packageHeight = this.product && this.product.package_height ? this.product.package_height.toString() : ''
            this.packageWidth = this.product && this.product.package_width ? this.product.package_width.toString() : ''
            this.packageLength = this.product && this.product.package_length ? this.product.package_length.toString() : ''
            this.packageWeight = this.product && this.product.package_weight ? this.product.package_weight.toString() : ''

            this.categories = this.product ? this.product.categories : null
            const category = this.getCategory(this.product)
            this.categoryId = category.id
            this.category = category.value
        }
    },
    methods: {
        async submitProduct () {
            let isError = false
            if (!this.name) {
                this.nameError = 'Chưa nhập tên sản phẩm'
                isError = true
            } else {
                this.nameError = ''
            }

            if (!this.skuCode) {
                this.skuCodeError = 'Chưa nhập mã sản phẩm'
                isError = true
            } else {
                this.skuCodeError = ''
            }

            /* if (!this.barcode) {
                this.barcodeError = 'Chưa nhập barcode'
                isError = true
            } else {
                this.barcodeError = ''
            } */

            if (!this.brand) {
                this.brandError = 'Chưa nhập thương hiệu'
                isError = true
            } else {
                this.brandError = ''
            }

            /*
            if (!this.basePrice) {
                this.basePriceError = 'Chưa nhập giá gốc'
                isError = true
            } else {
                this.basePriceError = ''
            } */

            if (!this.sellingPrice) {
                this.sellingPriceError = 'Chưa nhập giá bán'
                isError = true
            } else {
                this.sellingPriceError = ''
            }

            const images = this.$refs.imageProduct.listImageSeleted
            if (this.action.includes('update') || (images && images.length > 0)) {
                this.imageError = ''
            } else {
                this.imageError = 'Chưa chọn hình ảnh'
                isError = true
            }

            if (this.promotionPrice || this.promotionStart || this.promotionEnd) {
                if (!this.promotionPrice) {
                    this.promotionPriceError = 'Chưa nhập giá khuyến mãi'
                    isError = true
                } else {
                    this.promotionPriceError = ''
                }

                if (!this.promotionStart) {
                    this.promotionStartError = 'Chưa nhập ngày bắt đầu khuyến mãi'
                    isError = true
                } else {
                    this.promotionStartError = ''
                }

                if (!this.promotionEnd) {
                    this.promotionEndError = 'Chưa nhập ngày kết thúc khuyến mãi'
                    isError = true
                } else {
                    this.promotionEndError = ''
                }

                const dStart = new Date(this.promotionStart).getTime()
                const dEnd = new Date(this.promotionEnd).getTime()

                if (dStart > dEnd) {
                    this.promotionEndError = 'Ngày kết thúc phải lơn hơn ngày bắt đầu'
                    isError = true
                } else {
                    this.promotionEndError = ''
                }
            }

            if (isError) {
                return
            }

            const params = new FormData()
            params.append('action', this.action)
            params.append('name', this.name)
            params.append('skuCode', this.skuCode)
            // params.append('barcode', this.barcode)
            params.append('brand', this.brand)
            params.append('category', this.categoryId)
            // params.append('basePrice', this.basePrice)
            params.append('sellingPrice', this.sellingPrice)
            params.append('quantity', this.quantity)
            params.append('unit', this.unit)
            params.append('guarantee', this.guarantee)

            params.append('promotionPrice', this.promotionPrice)
            const dateStart = this.promotionStart ? moment(this.promotionStart).format('yyyy/MM/DD HH:mm:ss') : ''
            const dateEnd = this.promotionStart ? moment(this.promotionEnd).format('yyyy/MM/DD HH:mm:ss') : ''
            params.append('promotionStart', dateStart)
            params.append('promotionEnd', dateEnd)
            params.append('promotionNote', this.promotionNote)

            params.append('description', this.description)
            params.append('packageHeight', this.packageHeight)
            params.append('packageWidth', this.packageWidth)
            params.append('packageLength', this.packageLength)
            params.append('packageWeight', this.packageWeight)

            for (let i = 0; i < images.length; i++) {
                params.append('images' + i, images[i])
            }

            params.append('totalImage', images.length)

            params.append('id', this.id)
            params.append('businessId', this.businessId)

            const response = await this.$api.store.submitProduct(params)
            const data = response.data

            if (data.status === ConstantsJS.STR_REQUEST_SUCCESS) {
                this.resultStatus = this.id ? 'Cập nhật sản phẩm thành công' : 'Tạo sản phẩm thành công'

                if (this.action === 'add') {
                    this.resultStatus += '. Bạn có muốn tạo thêm sản phẩm?'
                    this.clearInfo()
                }
            } else {
                this.resultStatus = (this.id ? 'Cập nhật sản phẩm thất bại, ' : 'Tạo sản phẩm thất bại, ') + data.message
            }

            this.$bvModal.show('modal-submit-product')
        },
        clearInfo () {
            this.name = ''
            this.skuCode = ''
            this.barcode = ''
            this.brand = ''
            this.category = ''
            this.unit = ''
            this.basePrice = ''
            this.sellingPrice = ''
            this.quantity = ''
            this.guarantee = ''
            this.promotionPrice = ''
            this.promotionNote = ''
            this.promotionStart = ''
            this.promotionEnd = ''
            this.description = ''
            this.files = []
            this.packageHeight = ''
            this.packageWidth = ''
            this.packageLength = ''
            this.packageWeight = ''
        },
        getValue ($event) {
            return $event.target.value
        },
        setCategory () {
            this.category = this.$refs.selectCategory.categoryValue
            this.categoryId = this.$refs.selectCategory.categoryId

            if (this.categoryId === 0) {
                this.categoryError = 'Danh mục sản phẩm chưa được chọn'
            } else {
                this.categoryError = ''
                this.viewCategory = !this.viewCategory
            }
        },
        getCategory (product) {
            let categoryId = 0
            let categoryValue = ''

            if (product && product.categories) {
                let item = product.categories
                categoryId = item.id
                categoryValue += item.name

                if (item.items.length > 0) {
                    item = item.items[0]
                    categoryId = item.id
                    categoryValue = categoryValue + ' > ' + item.name

                    if (item.items.length > 0) {
                        item = item.items[0]
                        categoryId = item.id
                        categoryValue = categoryValue + ' > ' + item.name

                        if (item.items.length > 0) {
                            item = item.items[0]
                            categoryId = item.id
                            categoryValue = categoryValue + ' > ' + item.name
                        }
                    }
                }
            }

            return {
                id: categoryId,
                value: categoryValue
            }
        },
        disable () {
            return this.action === 'updateProductStore'
        },
        switchCatgory () {
            if (!this.disable()) {
                this.viewCategory = !this.viewCategory
            }
        },
        closeModal () {
            this.$bvModal.hide('modal-submit-product')
        }
    },
    head () {
        return {
            title: this.id ? 'Chỉnh sửa sản phẩm' : 'Tạo sản phẩm'
        }
    }
}
</script>

<style lang="scss">
#modify-product {
    padding: 30px 20px;

    .item {
        padding-bottom: 10px
    }

    img {
        object-fit: cover;
        margin: 8px;
    }

    .header-upload {
        text-decoration: underline;
        color: #FE7235;
        justify-content: center
    }
}
</style>
