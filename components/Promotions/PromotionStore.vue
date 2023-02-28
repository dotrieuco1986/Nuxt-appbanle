<template>
    <div class="p-3">
        <div class="row style-header">
            <label class="text-orange">Quản lý của hàng > Quản lý cửa hàng > Giảm giá</label>
        </div>

        <div class="row">
            <div class="col-3">
                <div class="item">
                    <span> Khuyến Mãi Cho Sản Phẩm</span>
                </div>
            </div>
        </div>

        <div v-if="productId==='all'" class="row">
            <div class="col-3">
                <div class="item">
                    <span>Phần trăm khuyến mãi</span>
                </div>
            </div>
            <div class="col">
                <div class="item">
                    <mvp-textbox
                        :min="1"
                        :max="100"
                        type="number"
                        :value="percent"
                        @input.native="percent = $event.target.value"
                    />
                    <span class="text-red"> {{ percentError }}</span>
                </div>
            </div>
        </div>

        <div v-if="productId!=='all'" class="row">
            <div class="col-3">
                <div class="item">
                    <span>Giá khuyến mãi</span>
                </div>
            </div>
            <div class="col">
                <div class="item">
                    <mvp-textbox type="number" :value="promotionPrice" @input.native="promotionPrice = $event.target.value" />
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-6">
                <!--Start Promotion-->
                <div class="row item">
                    <div class="col-6">
                        <span>Thời gian bắt đầu khuyến mãi</span>
                    </div>
                    <div class="col pl-4">
                        <VueCtkDateTimePicker v-model="promotionStart" />
                        <span class="text-red">{{ promotionStartError }}</span>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <!--End Promotion-->
                <div class="row item">
                    <div class="col-6">
                        <span>Thời gian kết thúc khuyến mãi</span>
                    </div>
                    <div class="col pl-4">
                        <VueCtkDateTimePicker v-model="promotionEnd" />
                        <span class="text-red">{{ promotionEndError }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-3">
                <div class="item">
                    <span> Mô tả khuyến mãi</span>
                </div>
            </div>
            <div class="col">
                <div class="item">
                    <mvp-textarea :value="description" @input.native="description = $event.target.value" />
                </div>
            </div>
        </div>

        <div v-if="productId==='all'" class="float-right text-orange">
            <span>Giảm giá cho tất cả sản phẩm</span>
        </div>

        <div class="float-right pt-4">
            <n-link to="/admin/product">
                <mvp-button name="Bỏ qua" />
            </n-link>

            <mvp-button name="Hoàn tất" @click.native="submitPromotion" />
        </div>

        <modal-status-reponse :response="resultStatus" />
    </div>
</template>

<script>

import MvpTextbox from '@/components/MVPControl/MvpTextbox'
import MvpTextarea from '@/components/MVPControl/MvpTextarea'
import MvpButton from '@/components/MVPControl/MvpButton'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import moment from 'moment'
import ModalStatusReponse from '@/components/modal/ModalStatusReponse'
import ConstantsJS from 'static/constants'

export default {
    name: 'PromotionStore',
    components: { ModalStatusReponse, MvpButton, MvpTextarea, MvpTextbox, VueCtkDateTimePicker },
    props: {
        storeId: {
            type: String,
            required: true
        },
        productId: {
            type: String,
            required: true
        },
        enabled: {
            type: Boolean,
            required: true
        },
        sellingPrice: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            percent: 0,
            promotionPrice: this.sellingPrice,
            promotionEnd: '',
            promotionStart: '',
            description: '',
            percentError: '',
            promotionStartError: '',
            promotionEndError: '',
            resultStatus: ''
        }
    },
    methods: {
        async submitPromotion () {
            if (!this.promotionStart) {
                this.promotionStartError = 'Chưa nhập ngày bắt đầu khuyến mãi'
                return
            } else {
                this.promotionStartError = ''
            }

            if (!this.promotionEnd) {
                this.promotionEndError = 'Chưa nhập ngày kết thúc khuyến mãi'
                return
            } else {
                this.promotionEndError = ''
            }

            const dStart = new Date(this.promotionStart).getTime()
            const dEnd = new Date(this.promotionEnd).getTime()

            if (dStart > dEnd) {
                this.promotionEndError = 'Ngày kết thúc phải lơn hơn ngày bắt đầu'
                return
            } else {
                this.promotionEndError = ''
            }

            const dateStart = moment(this.promotionStart).format('yyyy/MM/DD HH:mm:ss')
            const dateEnd = moment(this.promotionEnd).format('yyyy/MM/DD HH:mm:ss')

            const params = {
                storeId: this.storeId,
                productId: this.productId,
                enabled: this.enabled,
                percent: this.percent,
                promotionPrice: this.sellingPrice,
                promotionStart: dateStart,
                promotionEnd: dateEnd,
                description: this.description
            }

            const response = await this.$api.store.submitPromotion(params)
            if (response.data === ConstantsJS.STR_REQUEST_SUCCESS) {
                this.resultStatus = 'Áp dụng mã khuyến mãi cho sản phẩm thành công'
            } else {
                this.resultStatus = 'Áp dụng mã khuyến mãi cho sản phẩm thất bại'
            }
        }
    }
}
</script>

<style scoped>

.item {
    padding: 10px;
}
</style>
