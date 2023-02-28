<template>
    <div id="order-detail">
        <div class="hearder-order-detal">
            <n-link to="listorder">
                <span class="margin-right-10 font-size-18">
                    Đơn Mua Hàng
                </span>
            </n-link>
            <span>
                <svg-icon icon="directory" grow-by-height="15px" />
            </span>
            <span class="margin-left-10 font-size-18">
                Xem Chi Tiết Đơn Hàng
            </span>
        </div>
        <div class="line-border" />
        <div v-if="dataOrder && dataStore" id="detail-info" class="font-size-16">
            <b-row>
                <b-col sm="3">
                    <b>Cửa Hàng:</b>
                </b-col>
                <b-col sm="3">
                    {{ dataStore.name }}
                </b-col>
                <b-col sm="3" />
                <b-col sm="3" />
            </b-row>
            <b-row>
                <b-col sm="3">
                    <b>Mã Đơn Hàng:</b>
                </b-col>
                <b-col sm="3">
                    {{ dataOrder.code }}
                </b-col>
                <b-col sm="3">
                    <b>Tổng Tiền Hàng:</b>
                </b-col>
                <b-col sm="3">
                    {{ Intl.NumberFormat('VND').format(dataOrder.sub_total) }} Đ
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <b>Khách Hàng:</b>
                </b-col>
                <b-col sm="3">
                    {{ dataOrder.user_name }}
                </b-col>
                <b-col sm="3">
                    <b>Vận Chuyển:</b>
                </b-col>
                <b-col sm="3">
                    {{ Intl.NumberFormat('VND').format(dataOrder.shipping_cost) }} Đ
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <b>Hình Thức Thanh Toán:</b>
                </b-col>
                <b-col sm="3">
                    {{ convertPayment(dataOrder.payment_method) }}
                </b-col>
                <b-col sm="3">
                    <b>Khuyến Mãi/Giảm Giá:</b>
                    <span v-if="dataOrder.promotion_name" @click="showModalNote(1)">
                        <svg-icon icon="question-mark" grow-by-height="25px" />
                    </span>
                </b-col>
                <b-col sm="3">
                    -{{ Intl.NumberFormat('VND').format(dataOrder.promotion_price) }} Đ
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <b>Thông Tin Giao Hàng:</b>
                </b-col>
                <b-col sm="3">
                    <div class="overflow-break-text">
                        SĐT: {{ dataOrder.user_phone }} <br>
                        Địa chỉ: {{ dataOrder.user_address }}
                    </div>
                </b-col>
                <b-col sm="3">
                    <b>Phụ Phí:</b>
                    <span v-if="dataOrder.surcharge_note" @click="showModalNote(2)">
                        <svg-icon icon="question-mark" grow-by-height="25px" />
                    </span>
                </b-col>
                <b-col sm="3">
                    <label class="setting-unit-money">
                        <input
                            id="surcharge"
                            v-model="surcharge"
                            type="text"
                            name="surcharge"
                            maxlength="9"
                            placeholder="Phụ Phí"
                            autocomplete="false"
                            :class="Number.isNaN(parseFloat(surcharge)) ? 'color-red' : ''"
                        >
                        <span> Đ</span>
                    </label>
                    <div v-show="isShowButtonApply">
                        <b-button id="apply-button" variant="success" @click="confirmSurcharge">
                            Áp dụng
                        </b-button>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <b>Trạng Thái:</b>
                </b-col>
                <b-col sm="3">
                    <div>
                        <b-form-select v-model="selectedStatus" :options="optionsStatus" @input="confirmChangeStatusOrder" />
                    </div>
                </b-col>
                <b-col sm="3">
                    <b>Tổng Tiền Thanh Toán:</b>
                </b-col>
                <b-col sm="3" :class="Number.isNaN(parseFloat(surcharge)) ? 'color-red' : ''">
                    {{ Intl.NumberFormat('VND').format(totalPrice) }} Đ
                </b-col>
            </b-row>
            <b-row v-if="dataOrder.order_note">
                <b-col sm="3">
                    <b>Ghi chú:</b>
                </b-col>
                <b-col sm="3">
                    <div class="overflow-break-text">
                        {{ dataOrder.order_note }}
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <b>Chi Tiết Hàng Hoá:</b>
                </b-col>
            </b-row>
            <b-row class="list-product">
                <b-col class="setting-list-product">
                    <b-row
                        v-for="(item, index) in dataOrder.order_detail"
                        :key="index"
                        class="setting-row-produc-item"
                    >
                        <b-col sm="1">
                            <div class="number-product">
                                {{ index + 1 }}.
                            </div>
                        </b-col>
                        <b-col
                            sm="1"
                            :class="'padding-left-0 padding-bottom-10'
                                + (dataOrder.order_detail.length - 1 === index ? '' : ' border-bottom')"
                        >
                            <img v-if="item.photo" class="img-order" :src="urlImg + item.photo">
                            <img v-else class="img-order" src="@/assets/image/icon/icon-material-insert-photo.svg">
                        </b-col>
                        <b-col
                            sm="7"
                            :class="'padding-bottom-10'
                                + (dataOrder.order_detail.length - 1 === index ? '' : ' border-bottom')"
                        >
                            <b>{{ item.product_name }}</b>
                        </b-col>
                        <b-col
                            sm="2"
                            :class="'padding-bottom-10'
                                + (dataOrder.order_detail.length - 1 === index ? '' : ' border-bottom')"
                        >
                            Giá: {{ Intl.NumberFormat('VND').format(item.product_price) }} Đ <br>
                            Số Lượng: {{ item.product_quantity }}
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
        <div v-else>
            {{ notExistOrder }}
        </div>
        <modal id="modal-success-update-order">
            <div class="modal-body">
                <p> Cập nhật đơn hàng thành công.</p>
            </div>
        </modal>

        <modal-confirm
            id="modal-confirm-change-status-order"
            :description="descriptionConfirm"
            :ok-txt="'Đổi'"
            :ok-cancel="'Không'"
            @ok-click="updateOrder(true)"
            @close-click="cancelUpdate"
        />

        <modal id="modal-reason-surcharge">
            <div class="modal-body">
                <p> Vui lòng nhập lý do thay đổi phụ phí.</p>
                <div>
                    <b-form-textarea
                        id="textarea"
                        v-model="reasonSurcharge"
                        placeholder="Vui lòng nhập lý do thay đổi phụ phí"
                        rows="3"
                        max-rows="6"
                        maxlength="500"
                    />
                </div>
                <div id="error-reason">
                    {{ reasonError }}
                </div>
            </div>
            <footer class="modal-footer">
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="updateOrder(false)"
                >
                    Gửi
                </button>
            </footer>
        </modal>

        <modal id="modal-note-description">
            <div class="modal-body">
                <p>
                    {{ noteDescription }}
                </p>
            </div>
        </modal>
    </div>
</template>

<script>
import Modal from '@/components/modal/Modal.vue'
import ModalConfirm from '@/components/modal/ModalConfirm'
import svgIcon from '~/components/common/SvgIcon.vue'
export default {
    layout: 'admin',
    components: {
        svgIcon,
        Modal,
        ModalConfirm
    },
    data () {
        return {
            reasonSurcharge: '',
            reasonError: '',
            urlImg: process.env.SERVER_IMAGE_URL,
            dataOrder: null,
            dataStore: null,
            dataLocationHistory: null,
            surcharge: 0,
            oldSurcharge: 0,
            selectedStatus: null,
            orderStatus: 0,
            optionsStatus: [
                { value: '0', text: 'Chờ xác nhận' },
                { value: '1', text: 'Xác nhận' },
                { value: '2', text: 'Đang giao' },
                { value: '3', text: 'Đã giao' },
                { value: '4', text: 'Đã hủy', disabled: true }
            ],
            notExistOrder: '',
            noteDescription: ''
        }
    },
    computed: {
        descriptionConfirm () {
            return 'Bạn muốn đổi trạng thái đơn hàng sang "' + this.formatStatus(this.selectedStatus) + '".'
        },
        isShowButtonApply () {
            return !Number.isNaN(parseFloat(this.surcharge)) && this.surcharge && parseFloat(this.surcharge) !== this.oldSurcharge
        },
        totalPrice () {
            let result = this.dataOrder && this.dataOrder.total ? this.dataOrder.total : 0
            if (this.surcharge) {
                result = result - this.oldSurcharge + parseFloat(this.surcharge)
            }
            return result
        }
    },
    watch: {
        surcharge (val) {
            if (typeof val === 'string' || val instanceof String) {
                // eslint-disable-next-line no-useless-escape
                this.surcharge = val.replace(/[&\/\\#,_=+()@!^$~%|.'":*?\-<>{}[\];]/g, '').replace(/[a-zA-Z]/g, '')
            }
        }
    },
    mounted () {
        if (this.$route.query.id) {
            this.getOrderDetail(this.$route.query.id)
        }
    },
    methods: {
        showModalNote (index) {
            this.noteDescription = ''
            switch (index) {
            case 1:
                this.noteDescription = this.dataOrder.promotion_name
                break
            case 2:
                this.noteDescription = this.dataOrder.surcharge_note
                break
            default:
                this.noteDescription = ''
            }
            if (this.noteDescription) {
                this.$bvModal.show('modal-note-description')
            }
        },
        convertPayment (value) {
            let strResult = ''
            switch (value) {
            case 'CAST':
                strResult = 'Tiền mặt'
                break
            case 'VISA':
                strResult = 'Thẻ tín dụng Visa, Master, JCB, Amex'
                break
            case 'ATM':
                strResult = 'Thẻ ATM nội địa'
                break
            default:
                strResult = ''
            }
            return strResult
        },
        confirmChangeStatusOrder () {
            if (this.orderStatus !== this.selectedStatus) {
                this.$bvModal.show('modal-confirm-change-status-order')
            }
        },
        cancelUpdate () {
            this.selectedStatus = this.orderStatus
        },
        async updateOrder (updateStatus) {
            const formData = new FormData()
            formData.append('status', this.selectedStatus)
            if (!updateStatus && this.isShowButtonApply) {
                if (!this.reasonSurcharge) {
                    this.reasonError = 'Vui lòng nhập lý do bạn thay đổi phụ phí.'
                    return
                } else {
                    this.reasonError = ''
                }
                formData.append('surcharge_price', this.surcharge)
                formData.append('total', this.totalPrice)
                formData.append('surcharge_note', this.reasonSurcharge)
            }
            formData.append('order_id', this.dataOrder.id)
            const response = await this.$api.order.createOrder(formData)
            if (response.status === 200) {
                this.$bvModal.hide('modal-reason-surcharge')
                this.$bvModal.show('modal-success-update-order')
                this.oldSurcharge = parseFloat(response.data.surcharge_price)
                this.dataOrder.total = response.data.total
                this.dataOrder.surcharge_note = response.data.surcharge_note
                this.orderStatus = response.data.status
            }
        },
        formatStatus (status) {
            let strResult = ''
            switch (parseInt(status)) {
            case 0:
                strResult = 'chờ xác nhận'
                break
            case 1:
                strResult = 'xác nhận'
                break
            case 2:
                strResult = 'giao hàng'
                break
            case 3:
                strResult = 'đã giao hàng'
                break
            case 4:
                strResult = 'hủy'
                break
            default:
                strResult = ''
            }
            return strResult
        },
        async getOrderDetail (id) {
            const response = await this.$api.order.getOrderDetail(id + '/1')
            if (response.status === 200) {
                if (!(response.data.order && response.data.business.result)) {
                    this.notExistOrder = 'Không tồn tại đơn hàng.'
                }

                this.dataOrder = response.data.order
                this.dataStore = response.data.business.result
                this.surcharge = response.data.order.surcharge_price
                this.oldSurcharge = response.data.order.surcharge_price
                this.selectedStatus = response.data.order.status
                this.orderStatus = response.data.order.status
                this.reasonSurcharge = response.data.order.surcharge_note
            } else {
                this.notExistOrder = 'Không tồn tại đơn hàng.'
            }
        },
        confirmSurcharge () {
            this.reasonError = ''
            this.$bvModal.show('modal-reason-surcharge')
        }
    }
}
</script>

<style lang="scss">
    @import "../../../assets/scss/_adminorderdetail";
</style>
