<template>
    <div id="shopping_cart">
        <div class="shopping-cart-header vertical-align">
            <div class="col-12 no-padding-left">
                <label><input type="checkbox" class="check-box" checked="checked" @click="updateShoppingCart($event)"><b class="uppercaseFirst">{{ $t('components.ShoppingCart.shoppingCart') }}</b> ({{ totalItems }} {{ $t('components.ShoppingCart.product') }})</label>
            </div>
        </div>
        <div class="shop-block-cover">
            <div>
                <!-- <div v-if="cartNumber != total">
                    {{ ItemOfShop() }}
                </div> -->
                <template v-for="shop in shops" class="shop-block">
                    <shop
                        :key="shop.shopId"
                        :shop="shop"
                    />
                </template>
            </div>
        </div>

        <div class="shopping-cart-footer flex-column-center">
            <b class="uppercaseAll btn-buy" @click="gotoCheckout()">{{ $t('components.ShoppingCart.btnBuy') }}</b>
            <b>{{ totalCost|formatNumber }}</b>
        </div>
        <Modal id="modal_request_login">
            <template>
                <div class="request-login-form">
                    <a class="bg-orange text-white flex-center" :href="loginUrl">
                        <b>đăng nhập</b>
                    </a>
                    <a class="bg-blue text-white flex-center" :href="loginUrl">
                        <b>đăng ký</b>
                    </a>
                </div>
            </template>
        </Modal>
    </div>
</template>
<script>
/* eslint-disable */
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import Modal from '../modal/Modal'
export default
({
    filters: {
        formatNumber (number) {
            return (new Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'VND' }).format(number))
        }
    },
    components:{
        Modal
    },
    data () {
        return {
            total: 0,
            loginUrl: null
        }
    },
    props:{
        user:null,
        shops:{
            type:Array,
            defaut: ()=> []
        }
    },
    computed: mapState({
        totalCost (state) {
            let totalCost = 0

            if (this.shops) {
                this.shops.map((shop) => {
                    totalCost += shop.checked ? shop.totalCost : 0
                })
            }
            return totalCost;
        },
        totalItems (state){
            let totalItems = 0
            if(this.shops){
                this.shops.map((shop)=>{
                    if(shop.checked){
                        shop.items.map((item)=> {
                            totalItems += item.qty
                        })
                    }
                })
            }
            return totalItems;
        }
    }),
    methods: {
        
        gotoLogin(){
            localStorage.setItem('urlRedirect', window.location.href)
            this.loginUrl = process.env.OAUTH_API + window.location.origin + '/author'
        },
        updateShoppingCart (e) {
            this.shops.map((shop) => {
                shop.checked = e.target.checked
            })
        },
        gotoCheckout () {
            if(!this.user){
                this.gotoLogin();
                this.$bvModal.show('modal_request_login');
                return;
            }
            if(this.totalCost===0)
                return;
            this.$emit('goto-checkout', {'shops':this.shops, 'user':this.user})
        }
    }
})
</script>
<style lang="scss">
@import '~assets/scss/shoppingCart';

</style>
