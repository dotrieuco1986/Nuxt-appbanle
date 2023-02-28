<template>
    <div id="order-detail">
        <div class="hearder-order-detal">
            <n-link v-if="changeGui" to="listorder">
                <span class="margin-right-10 font-size-18">
                    Đơn Mua Hàng
                </span>
            </n-link>
            <span v-if="changeGui">
                <svg-icon icon="directory" grow-by-height="15px" />
            </span>
            <n-link v-else to="listorder">
                <svg-icon icon="arrow_back" grow-by-height="15px" />
            </n-link>
            <span class="margin-left-10 font-size-18">
                Chi Tiết Đơn Hàng
            </span>
        </div>
        <div class="line-border" />
        <div v-if="dataOrder && dataStore" id="detail-info" class="font-size-16">
            <b-row>
                <b-col lg="6">
                    <b-row>
                        <b-col lg="6" class="info-order-setting">
                            <b>Mã Đơn Hàng:</b>
                        </b-col>
                        <b-col lg="6" class="info-value-order-setting">
                            {{ dataOrder.code }}
                        </b-col>
                    </b-row>

                    <b-row v-if="!changeGui" class="show-info-order">
                        <b-col lg="12" class="info-order-setting">
                            <a v-b-toggle.collapse-info-shop>
                                <span>Thông Tin Cửa Hàng</span>
                            </a>
                        </b-col>
                    </b-row>

                    <b-collapse id="collapse-info-shop" v-model="collapseInfoShopVisible">
                        <b-row>
                            <b-col lg="6" class="info-order-setting">
                                <b>Cửa Hàng:</b>
                            </b-col>
                            <b-col lg="6" class="info-value-order-setting">
                                {{ dataStore.name }}
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col lg="6" class="info-order-setting">
                                <b>Địa Chỉ Mua Hàng:</b>
                            </b-col>
                            <b-col lg="6" class="info-value-order-setting">
                                {{ dataOrder.business_address }}
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col lg="6" class="info-order-setting">
                                <b>Địa chỉ Website:</b>
                            </b-col>
                            <b-col lg="6" class="info-value-order-setting overflow-break-text">
                                <a :href="dataStore.website" target="_blance">
                                    {{ dataStore.website }}
                                </a>
                            </b-col>
                        </b-row>
                    </b-collapse>

                    <b-row>
                        <b-col lg="6" class="info-order-setting">
                            <b>Thông Tin Giao Hàng:</b>
                        </b-col>
                        <b-col lg="6" class="info-value-order-setting overflow-break-text">
                            {{ dataOrder.user_name }} <br>
                            {{ dataOrder.user_phone }} <br>
                            {{ dataOrder.user_address }}
                        </b-col>
                    </b-row>
                </b-col>

                <b-col lg="6" class="setting-tag-money-order">
                    <b-row>
                        <b-col class="info-money-order">
                            <b>Tổng Tiền Hàng:</b>
                        </b-col>
                        <b-col class="info-value-money-order">
                            {{ Intl.NumberFormat('VND').format(dataOrder.sub_total) }} Đ
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col class="info-money-order">
                            <b>Vận Chuyển:</b>
                        </b-col>
                        <b-col class="info-value-money-order">
                            {{ Intl.NumberFormat('VND').format(dataOrder.shipping_cost) }} Đ
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col cols="7" class="info-money-order">
                            <b>Khuyến Mãi/Giảm Giá:</b>
                            <span v-if="dataOrder.promotion_name" @click="showModalNote(1)">
                                <svg-icon icon="question-mark" grow-by-height="25px" />
                            </span>
                        </b-col>
                        <b-col class="info-value-money-order">
                            -{{ Intl.NumberFormat('VND').format(dataOrder.promotion_price) }} Đ
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col class="info-money-order">
                            <b>Phụ Phí:</b>
                            <span v-if="dataOrder.surcharge_note" @click="showModalNote(2)">
                                <svg-icon icon="question-mark" grow-by-height="25px" />
                            </span>
                        </b-col>
                        <b-col class="info-value-money-order">
                            {{ Intl.NumberFormat('VND').format(dataOrder.surcharge_price) }} Đ
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col cols="7" class="info-money-order">
                            <b>Tổng Tiền Thanh Toán:</b>
                        </b-col>
                        <b-col class="info-value-money-order">
                            {{ Intl.NumberFormat('VND').format(dataOrder.total) }} Đ
                        </b-col>
                    </b-row>

                    <b-row v-if="dataOrder.order_note && changeGui">
                        <b-col class="info-order-setting">
                            <b>Ghi Chú:</b>
                        </b-col>
                        <b-col class="info-value-order-setting">
                            {{ dataOrder.order_note }}
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            <b-row>
                <b-col lg="6">
                    <b-row>
                        <b-col lg="6" class="info-order-setting">
                            <b>Hình Thức Thanh Toán:</b>
                        </b-col>
                        <b-col lg="6" class="info-value-order-setting">
                            {{ convertPayment(dataOrder.payment_method) }}
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col lg="6" class="info-order-setting">
                            <b>Trạng Thái:</b>
                        </b-col>
                        <b-col lg="6" class="info-value-order-setting">
                            {{ dataOrder.status_name }}
                        </b-col>
                    </b-row>

                    <b-row v-if="dataOrder.status > 3">
                        <b-col lg="6" class="info-order-setting">
                            <b>Lý Do:</b>
                        </b-col>
                        <b-col lg="6" class="info-value-order-setting">
                            {{ dataOrder.status_note }}
                        </b-col>
                    </b-row>

                    <b-row v-if="dataOrder.order_note && !changeGui">
                        <b-col lg="6" class="info-order-setting">
                            <b>Ghi Chú:</b>
                        </b-col>
                        <b-col lg="6" class="info-value-order-setting">
                            {{ dataOrder.order_note }}
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            <b-row>
                <b-col lg="3" class="detail-product-text">
                    <a v-if="!changeGui" v-b-toggle.collapse-info-item>
                        <b>Chi Tiết Hàng Hoá:</b>
                    </a>
                    <b v-else>Chi Tiết Hàng Hoá:</b>
                </b-col>
            </b-row>
            <b-collapse id="collapse-info-item" v-model="collapseInfoItemVisible">
                <b-row class="list-product">
                    <b-col class="setting-list-product">
                        <b-row
                            v-for="(item, index) in dataOrder.order_detail"
                            :key="index"
                            class="setting-row-produc-item"
                        >
                            <b-col v-if="changeGui" cols="1">
                                <div class="number-product">
                                    {{ index + 1 }}.
                                </div>
                            </b-col>
                            <b-col
                                :cols="changeGui ? '1' : '2'"
                                :class="'padding-bottom-10 padding-left-0 padding-right-0'
                                    + (dataOrder.order_detail.length - 1 === index ? '' : ' border-bottom')"
                            >
                                <img v-if="item.photo" class="img-order" :src="urlImg + item.photo">
                                <img v-else class="img-order" src="@/assets/image/icon/icon-material-insert-photo.svg">
                            </b-col>
                            <b-col
                                cols="6"
                                :class="'padding-bottom-10 overflow-break-text'
                                    + (dataOrder.order_detail.length - 1 === index ? '' : ' border-bottom')"
                            >
                                <b>{{ item.product_name }}</b>
                                <p>{{ item.product_note }}</p>
                            </b-col>
                            <b-col
                                cols="4"
                                :class="'padding-bottom-10 overflow-break-text'
                                    + (dataOrder.order_detail.length - 1 === index ? '' : ' border-bottom')"
                            >
                                Giá: {{ Intl.NumberFormat('VND').format(item.product_price) }} Đ <br>
                                Số Lượng: {{ item.product_quantity }}
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-collapse>
        </div>
        <div v-else>
            {{ notExistOrder }}
        </div>

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
import svgIcon from '~/components/common/SvgIcon.vue'
export default {
    layout: 'user',
    components: {
        svgIcon,
        Modal
    },
    data () {
        return {
            urlImg: process.env.SERVER_IMAGE_URL,
            dataOrder: null,
            dataStore: null,
            dataLocationHistory: null,
            notExistOrder: '',
            changeGui: false,
            noteDescription: '',
            collapseInfoShopVisible: true,
            collapseInfoItemVisible: true
        }
    },
    watch: {
    },
    mounted () {
        if (this.$route.query.id) {
            this.getOrderDetail(this.$route.query.id)
        }
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        handleResize () {
            this.changeGui = window.outerWidth > 991

            if (this.changeGui) {
                this.collapseInfoShopVisible = true
                this.collapseInfoItemVisible = true
            }
        },
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
        async getOrderDetail (id) {
            const response = await this.$api.order.getOrderDetail(id + '/0')
            if (response.status === 200) {
                if (!(response.data.order && response.data.business.result)) {
                    this.notExistOrder = 'Không tồn tại đơn hàng.'
                }
                this.dataOrder = response.data.order
                this.dataStore = response.data.business.result
            } else {
                this.notExistOrder = 'Không tồn tại đơn hàng.'
            }
        }
    }
}
</script>

<style lang="scss">
    @import "../../../assets/scss/_userorderdetail";
</style>
