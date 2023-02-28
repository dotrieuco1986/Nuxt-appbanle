<template>
    <div class="sidebar-find">
        <SideBar width="478px" no-btn-close>
            <span class="btn-close" title="close" @click="goBackCart" />
            <!-- <div class="d-flex .flex-column"> -->
            <div v-if="cartNumber != total">
                {{ ItemOfShop() }}
            </div>
            <shoppingCart
                v-if="!showCheckout"
                :shops="shops"
                :user="user"
                @goto-checkout="getShopsData"
            />
            <shopCheckout
                v-if="showCheckout"
                :shops="shops"
                :user="user"
                :payment-success="paymentSuccess"
                @edit-shopping-cart="editShoppingCart"
                @update-order-code="getOrderCodes"
            />
        </SideBar>
        <ModalSuccess
            :size="'md'"
            :msg="notice_msg"
        />
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

import SideBar from '@/components/SideBar'
import shoppingCart from '~/components/shoppingCart/ShoppingCart'
import shopCheckout from '~/components/shopCheckout/shopCheckout'
import ModalSuccess from '~/components/modal/ModalSuccess'
export default {
    name: 'ShoppingCart',
    components: {
        SideBar,
        shoppingCart,
        shopCheckout,
        ModalSuccess
    },
    data () {
        return {
            total: 0,
            shops: [],
            user: null,
            showCheckout: false,
            paymentSuccess: null,
            notice_msg: '',
            order_codes: []
        }
    },
    computed: mapState({
        ...mapGetters({
            checkIsLoggedIn: 'loggedIn',
            loggedInUser: 'user'
        }),
        cartNumber: state => state.cart.cartNumber,
        products: state => state.cart.products
    }),
    mounted () {
        this.$store.dispatch('cart/getCart')
        this.ItemOfShop()
        this.getPaymentResult()

        if (this.loggedInUser) { this.user = this.loggedInUser.info }
    },
    methods: {
        ItemOfShop () {
            const products = this.products
            const shops = []
            let exis = false
            for (let i = 0; i < products.length; i++) {
                const product = products[i]
                shops.map((shop) => {
                    if (shop.shopId === product.shopId) {
                        exis = true
                        const tempItem = {
                            id: product.id,
                            name: product.name,
                            priceNew: product.priceNew,
                            priceOld: product.priceOld,
                            qty: product.qty,
                            thumb: product.thumb,
                            times: product.times ? product.times : 0
                        }
                        shop.items.push(tempItem)
                    } else {
                        exis = false
                    }
                })
                if (exis === false) {
                    shops.push(this.getUserPromotions(products[i]))
                }
            }
            this.total = this.cartNumber
            this.shops = shops
        },

        getUserPromotions (product) {
            const discount = null
            // await this.$api.promotions.getUserPromotions(product.shopId)
            //     .then(res => discount = res)
            //     .catch(err => console.log(err))
            if (product.shopId) {
                const tempshop = {
                    shopId: product.shopId,
                    shopName: product.shopName,
                    checked: true,
                    discount,
                    promotionId: null,
                    promotionDescription: null,
                    discountValue: 0,
                    shippingCost: 0,
                    subTotal: 0,
                    totalCost: 0,
                    shopShippingConfig: null,
                    thumb: product.shopThumb ? product.shopThumb : '',
                    location: product.localtion ? product.location : '10.7672468454545,106.68825476055',
                    items: [
                        {
                            id: product.id,
                            name: product.name,
                            priceNew: product.priceNew,
                            priceOld: product.priceOld,
                            qty: product.qty,
                            thumb: product.thumb,
                            times: product.times ? product.times : 0
                        }
                    ]
                }
                return tempshop
            }
        },
        getShopsData (data) {
            this.shops = data.shops
            this.user = data.user
            this.showCheckout = true
        },
        editShoppingCart () {
            this.showCheckout = false
        },
        getUserInfo (data) {
            this.user = data
        },
        goBackCart (e) {
            this.$router.back()
        },
        async getPaymentResult () {
            if (this.$route.query.vnp_BankTranNo) {
                const respone = await this.$api.payment.checkResultPayment(this.$route.query)
                if (respone.status === 'OK') {
                    const comp = await this.$api.survey.updateComplete(respone.info)

                    if (comp.status === 'OK') {
                        this.updateOrder()

                        this.notice_msg = 'Your transaction is success!'
                        this.$bvModal.show('modal-success')
                    } else {
                        this.notice_msg = 'There are errors with your payment. Plz contact with your supplier for more information!'
                        this.$bvModal.show('modal-success')
                        this.showCheckout = true
                    }
                }
                return false
            }
        },
        getOrderCodes (codes) {
            this.order_codes = codes
        },
        updateOrder () {
            this.order_codes.map((code) => {
                const formData = new FormData()
                formData.append('order_id', code[0])
                formData.append('status', this.order_status)
                this.$api.order.createOrder(formData)
            })
        }
    }
}
</script>
<style lang="scss">
@import '~assets/scss/variable';
span.btn-close {
        width: 24px;
        height: 24px;
        background: $gray;
        display: block;
        position: relative;
        border-radius: 100%;
        float: right;
        cursor: pointer;
        top:10px; right:10px;
        &::before,
        &::after {
            width: 60%;
            height: 2px;
            background: $white;
            content: '';
            display: block;
            position: absolute;
            border-radius: 4px;
            left: 20%;
            top: calc(50% - 1px);
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transfrom: rotate(-45deg);
        }
        &::after {
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transfrom: rotate(45deg);
        }
    }
#modal_submit_order_result{
    .submit-order-cover{
        text-align:center;
        .modal-title{
            font-size: 20px; text-align: center;
            border-bottom:0;
            text-transform: uppercase;
        }
        .order-code{
            margin:10px 0;
        }
        .code{font-size:20px}
        .btn-read-detail{
            height: 40px;
            min-width: 200px;
            font-size: 16px;
            padding: 0 50px;
            border-radius: 5px;
            border: none !important;
            text-transform: uppercase;
            display: inline-block;
            p{
                margin:0; padding:0;
                width:100%; height:100%;
            }
        }
    }
}
</style>
