<template>
    <div id="shop_checkout">
        <!-- <div class="row margin-30 shop-info-cover border-bottom">
            <p class="shop-icon flex-column-center">
                <svgIcon icon="map-pointer" grow-width-height="24px" has-fill="false" />
            </p>
            <p class="shop-info">
                <b>Nhà hàng hải sản Út Liên</b>
                <span class="shop-address">30 Đống Đa, Phường 2, Tân Bình, Tp. Hồ Chí Minh</span>
            </p>
            <p class="shop-btn-change text-orange" />
        </div> -->
        {{ getTotal }}
        <div class="row margin-30 user-info-cover">
            <p class="shop-icon flex-column-center">
                <svgIcon icon="pin-orange-icon" grow-width-height="24px" has-fill="false" />
            </p>
            <p class="shop-info">
                <b>{{ user.name }}</b><b v-if="user.phone_number"> - {{ user.phone_number }}</b>
                <span v-if="updateShippingAddress" class="shop-address">{{ updateShippingAddress.address }}</span>
            </p>
            <p v-b-modal.edit_address_shipping class="shop-btn-change text-orange btn-edit">
                Thay đổi
            </p>
        </div>

        <!-- <div class="row margin-30 shipping-estimate">
            <div class=" flex-column-center">
                <span>Dự kiến giao hàng: </span>
                <b>14:35 - 21/08 - </b>
                <b class="text-orange"> 3km</b>
            </div>
        </div> -->
        <div class="shop-block-cover">
            <div class="shop-items-cover padding-30 border-top-bottom bg-light-blue">
                <div class="shop-item-row row border-bottom">
                    <div class="col-7 no-padding-left text-gray flex-column-center">
                        <b class="uppercaseAll text-dark-gray">CỬA HÀNG</b>
                    </div>
                    <div class="col-5 no-padding-right text-orange text-right" @click="editShoppingCart">
                        <span class="btn-edit">Sửa</span>
                    </div>
                </div>
                <template v-for="shop in shops">
                    <template v-for="item in shop.items">
                        <ShopItem
                            :key="item.id"
                            :item="item"
                            :shop-name="shop.shopName"
                        />
                    </template>
                </template>
            </div>
        </div>
        <div class="shop-total-block">
            <div class="shop-total-row margin-30 row">
                <div class="col-7 uppercaseFirst padding-0">
                    {{ $t('components.ShoppingCart.totalItems') }} ({{ totalItems }} {{ $t('components.ShoppingCart.item') }})
                </div>
                <div class="col-5 text-right padding-0">
                    <b class="text-orange">{{ totalItemsCost|formatNumber }}</b>
                </div>
            </div>
            <div class="shop-total-row margin-30 row">
                <div class="col-7 uppercaseFirst padding-0">
                    {{ $t('components.ShoppingCart.shipping') }}
                </div>
                <div class="col-5 text-right uppercaseFirst padding-0">
                    + {{ totalShippingCost|formatNumber }}
                </div>
            </div>
            <div v-if="totalShippingCost!==0" class="shop-total-row margin-30 row">
                <div class="col-7 uppercaseFirst padding-0">
                    {{ $t('components.ShoppingCart.shopPromotion') }}
                </div>
                <div class="col-5 text-right padding-0">
                    -{{ totalDiscount|formatNumber }}
                </div>
            </div>
            <div class="row margin-30">
                <InputTypeOne
                    :place-hoder="'Nhập mã voucher của website'"
                    :disabled="true"
                />
            </div>
            <div v-if="GoolowPromotions.length != 0" class="row margin-30">
                Mã khuyến mãi đã lưu&nbsp;
                <span v-b-modal.modal_admin_promotions class="btn-edit text-orange" title="Read more">Xem thêm</span>
            </div>

            <div class="bg-light-blue">
                <div class="margin-30 pay-type">
                    <p class="shop-icon flex-column-center">
                        <svgIcon v-if="defaultPayment.typeId===1" icon="dollar-sign" grow-by-height="24px" has-fill="true" />
                        <svgIcon v-if="defaultPayment.typeId===2" icon="cc-visa-brands" grow-by-height="24px" has-fill="true" />
                        <svgIcon v-if="defaultPayment.typeId===3" icon="credit-card-regular" grow-by-height="24px" has-fill="true" />
                    </p>
                    <p class="shop-info flex-row-center">
                        {{ defaultPayment.value }}
                    </p>
                    <p v-b-modal.modal_choose_payment_method class="btn-edit shop-btn-change text-orange flex-column-center">
                        Thay đổi
                    </p>
                </div>
            </div>
            <Modal id="modal_admin_promotions">
                <Promotions :discount="GoolowPromotions" />
            </Modal>
            <Modal id="edit_address_shipping">
                <ChangeAddressAtCheckout
                    :user-id="user.id"
                    :history-address="historyAddress"
                    @reload-order-location-history="reloadOrderLocationHistory"
                />
            </Modal>
            <Modal id="modal_choose_payment_method">
                <ChangePaymentMethod
                    :payment="paymentMethod"
                    @update-payment-method="updatePaymentMethod"
                />
            </Modal>
        </div>
        <ModalCardType
            :amount="totalCost"
            :order-type="'Order'"
            :return-url="urlSuccess()"
            :call-back-update="false"
        />
        <Modal id="modal_submit_order_result">
            <div v-if="submitOrderResult" class="submit-order-cover">
                <div class="modal-title">
                    <b>đặt hàng thành công </b>
                </div>
                <div class="order-code">
                    Mã đơn hàng của bạn
                    <template v-for="(code, index) in submitOrderResult.data.data">
                        <b v-if="index !== 0" :key="index" class="code text-orange">#{{ code[1] }},</b>
                    </template>
                </div>
                <div class="btn-read-detail bg-blue">
                    <p class="flex-center text-white">
                        Xem chi tiết đơn hàng
                    </p>
                </div>
            </div>
        </Modal>

        <div class="shopping-cart-footer  flex-column-center">
            <b ref="submitOrder" class="uppercaseAll btn-buy" @click="submitOrder">đặt hàng</b>
            <b>{{ totalCost|formatNumber }}</b>
        </div>
    </div>
</template>
<script>
import svgIcon from '../common/SvgIcon'
import ShopItem from '../shoppingCart/ShopItem'
import InputTypeOne from '../common/inputTypeOne'
import Modal from '../modal/Modal'
import Promotions from '../Promotions/Promotions'
import ModalCardType from '../modal/ModalCardType'
import ChangePaymentMethod from './changePaymentMethod'
import ChangeAddressAtCheckout from './changeAddressAtCheckout'

export default {
    filters: {
        formatNumber (number) {
            return (new Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'VND' }).format(number))
        }
    },
    components: {
        svgIcon,
        ShopItem,
        InputTypeOne,
        Modal,
        Promotions,
        ChangePaymentMethod,
        ChangeAddressAtCheckout,
        ModalCardType
    },
    props: {
        user: null,
        shops: {
            type: Array,
            defaut: () => []
        },
        paymentMethod: {
            type: Array,
            default: () => [
                {
                    typeId: 1,
                    typeName: 'CAST',
                    status: 1,
                    value: 'Tiền mặt'
                },
                {
                    typeId: 2,
                    typeName: 'VISA',
                    status: 0,
                    value: 'Thẻ tín dung Visa, Master, JCB, Amex'
                },
                {
                    typeId: 3,
                    typeName: 'ATM',
                    status: 0,
                    value: 'Thẻ ATM nội địa'
                }
            ]
        },
        paymentSuccess: {
            type: String,
            default: 'null'
        }
    },
    data () {
        return {
            totalItems: 0,
            totalItemsCost: 0,
            totalCost: 0,
            totalShippingCost: 0,
            totalDiscount: 0,
            GoolowPromotions: [],
            defaultPayment: '',
            defaultShippingAddress: null,
            historyAddress: [],
            submitOrderResult: null,
            notice_msg: null,
            order_status: 0
        }
    },
    computed: {
        updateShippingAddress () {
            let defaultAddress = null
            if (this.historyAddress.data) {
                this.historyAddress.data.map((item) => {
                    if (item.default === 1) {
                        defaultAddress = item
                        this.defaultShippingAddress = item
                    }
                })
            }
            return defaultAddress
        },
        getTotal (state) {
            this.shops.map((shop) => {
                this.totalShippingCost = 0
                this.totalItem = 0
                this.totalItemsCost = 0
                this.totalCost = 0
                this.totalDiscount = 0
                if (shop.checked) {
                    shop.items.map((item) => {
                        this.totalItems += item.qty
                        this.totalItemsCost += item.qty * item.priceNew
                    })

                    this.totalShippingCost += parseInt(shop.shippingCost)
                    this.totalDiscount += shop.discountValue
                    this.totalCost += shop.totalCost
                    this.totalCost += shop.shippingCost
                    this.totalCost -= shop.discountValue
                }
            })
            return ''
        }
    },
    mounted () {
        this.getGoolowPromotions()
        // this.getTotal()
        this.getDefaultPaymentMethod()
        this.getDefaultShippingAddress()
        // this.getDistance(shop.location, this.defaultShippingAddress.address)
    },
    methods: {
        // getTotal (state) {
        //     this.shops.map((shop) => {
        //         if (shop.checked) {
        //             shop.items.map((item) => {
        //                 this.totalItems += item.qty
        //                 this.totalItemsCost += item.qty * item.priceNew
        //             })
        //             this.totalCost += shop.totalCost
        //             this.totalShippingCost += shop.shippingCost
        //             this.totalDiscount += shop.discountValue
        //         }
        //     })
        // },
        editShoppingCart () {
            this.$emit('edit-shopping-cart')
        },
        updatePaymentMethod (paymentId) {
            this.paymentMethod.map((payment) => {
                if (payment.typeId === paymentId) {
                    payment.status = 1
                    this.defaultPayment = payment
                } else { payment.status = false }
            })
            // import order with status pending if payment method is AMT or VISA
            if (paymentId !== 1 && this.submitOrderResult === null) {
                this.order_status = -1
                const formData = this.prepareOrder()
                // this.$emit('form-data', formData)
                this.importOrder(formData)
            }
        },
        getDefaultPaymentMethod () {
            this.paymentMethod.map((payment) => {
                if (payment.status === 1) {
                    this.defaultPayment = payment
                }
            })
        },
        async getGoolowPromotions () {
            this.GoolowPromotions = await this.$api.promotions.getGoolowPromotions()
        },

        async getHistoryAddress () {
            return await this.$api.order.getOrderLocation()
        },
        async getDefaultShippingAddress (state) {
            this.historyAddress = await this.getHistoryAddress()
            this.historyAddress.data.map((add) => {
                if (add.default === 1) {
                    this.defaultShippingAddress = add
                }
            })
            this.shops.map((shop) => {
                this.updateShopShippingCost(shop)
            })
        },
        reloadOrderLocationHistory () {
            this.shops.map((shop) => {
                this.updateShopShippingCost(shop)
            })
        },

        async updateShopShippingCost (shop) {
            let origin = this.defaultShippingAddress.location.split(',')
            origin = origin[0] > origin[1] ? origin[1] + ',' + origin[0] : origin
            let distance = 0
            // console.log(this.defaultShippingAddress.location)
            await this.$api.shopShippingConfig.getDistance(origin, shop.location, 'bike')
                .then((res) => { distance = res })
                .catch()
            distance = parseFloat(distance / 1000)
            // console.log(distance)
            let shippingCost = 0
            shop.shopShippingConfig.map((config) => {
                if (config.condition.from <= distance && distance <= config.condition.to) {
                    // console.log(config.condition.money)
                    shippingCost = config.condition.money
                }
            })
            shop.shippingCost = shippingCost
        },

        submitOrder () {
            // request input shipping address if dont have any default
            if (!this.defaultShippingAddress) {
                this.$bvModal.show('edit_address_shipping')
                return
            }
            // import order with payment method is CAST
            if (this.defaultPayment.typeId === 1) {
                this.order_status = 0
                if (this.submitOrderResult) {
                    // update status order if order exits
                    this.submitOrderResult.data.data.map((code) => {
                        const formData = new FormData()
                        formData.append('order_id', code[0])
                        formData.append('status', this.order_status)
                        formData.append('payment_method', this.defaultPayment.typeName)
                        this.importOrder(formData)
                    })
                    this.$bvModal.show('modal_submit_order_result')
                } else {
                    // import new order
                    const formData = this.prepareOrder()
                    // this.$emit('form-data', formData)
                    this.importOrder(formData)
                }
            }
        },
        prepareOrder () {
            const formData = new FormData()
            formData.append('user_id', this.user.id)
            formData.append('user_name', this.defaultShippingAddress.name)
            formData.append('user_phone', this.defaultShippingAddress.phone)
            formData.append('user_address', this.defaultShippingAddress.address)
            formData.append('user_location', this.defaultShippingAddress.location)
            formData.append('user_place_id', this.defaultShippingAddress.place_id)
            formData.append('payment_method', this.defaultPayment.typeName)
            formData.append('status', this.order_status)

            // parent record
            let subTotal = 0
            let total = 0
            this.shops.map((shop) => {
                subTotal += shop.subTotal
                total += shop.totalCost
            })

            formData.append('sub_total', subTotal)
            formData.append('total', total)
            formData.append('shops', JSON.stringify(this.shops))
            return formData
        },
        async importOrder (formData) {
            if (!this.submitOrderResult) { this.submitOrderResult = await this.$api.order.createOrder(formData) } else { await this.$api.order.createOrder(formData) }
            if (this.submitOrderResult.status === 200 && this.order_status === 0) {
                this.$bvModal.show('modal_submit_order_result')
            }
            if (this.order_status === -1) { this.$emit('update-order-code', this.submitOrderResult.data.data) }
        },
        urlSuccess () {
            return process.env.BASE_URL + '/shoppingcart'
        }

    }
}
</script>
<style lang="scss" scope>
@import '~assets/scss/shoppingCart';
#shop_checkout{

    .margin-30{
        margin:0 30px !important;
    }
    .padding-30{
        padding: 0 30px !important;
    }
    .row{
        padding:12px 0 !important;
    }
    .shop-block-cover{ height: auto !important;}
    .shop-info-cover,
    .user-info-cover,
    .pay-type{
        display: flex;
        flex-direction: row;
        p{
            display:flex;
            &.shop-icon{
                width:30px;
            }
            &.shop-info{
                b{font-size: 16px;}
                flex-direction: column;
                line-height:inherit;
                flex:1;
                width: calc(100% - 100px);
            }
            &.shop-btn-change{
                font-size:14px;
                width: 70px;
                text-align: right;
                justify-content: flex-end;
            }
        }

    }
    .user-info-cover{height:70px}
    .shipping-estimate{
        padding:0 0 15px 0 !important;
        &>div{
            width:100%; height:30px;
            border:1px solid $extra-light-blue;
            border-radius: 30px;
            padding:0 15px;
        }

    }
    .btn-edit{
        cursor:pointer;
    }
    .shop-block-cover{
        height:calc(100% - 332px) !important;
    }
    .shop-item-row{
        width:100% !important; margin:0;

        &.border-bottom{
            border-bottom-color: $white !important;
        }
        &:nth-last-child(1){
            border-bottom:none !important;
        }
    }
    .shop-total-block{
        height:200px;
        padding:10px 0 !important;
        .row{
            padding:5px 0 !important;
        }
    }
    .input-format-one{
        width: 100%;
        margin:0;
    }
    .pay-type{
        height: 40px;
        .shop-icon{ margin-right:10px}
        .shop-info{
            width:calc(100% - 40px)
        }
    }

}

</style>
