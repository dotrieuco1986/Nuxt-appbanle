<template>
    <div class="shop-block">
        <div class="shop-header vertical-align border-top-bottom">
            <div class="">
                <label>
                    <input type="checkbox" class="check-box" :checked="shop.checked" @click="updateShoppingCart($event)">
                    <SvgIcon icon="store" grow-by-height="2em" has-fill="false" />
                    <span class="uppercaseFirst">{{ shop.shopName }}</span>
                </label>
            </div>
            <div class="text-right">
                <template v-if="shop.discount">
                    <div v-b-modal="shop.shopId" class="btn-discount" title="Promotion" @click="toggleModal()">
                        <p class="vertical-align">
                            <span class="uppercaseFirst">{{ $t('components.ShoppingCart.discount') }}</span>
                            <SvgIcon icon="chevron-down" grow-by-height="13px" has-fill="false" />
                        </p>
                    </div>
                </template>
            </div>
        </div>
        <div class="shopping-cart-selected flex-column-center">
            <span v-if="getPromotion" class="uppercaseFirst">{{ $t('components.ShoppingCart.appliedPromotion') }} {{ getPromotion.format_type == 1 ? (getPromotion.format_value|formatNumber) : (getPromotion.format_value + '%') }}</span>
        </div>
        <template v-for="item in shop.items">
            <ShopItem
                :key="item.itemId"
                :item="item"
            />
        </template>
        <Modal v-if="applyResult===null" :id="shop.shopId">
            <Promotions
                :discount="shop.discount"
                :total-cost="shop.totalCost"
                @applyResult="applyResult=$event"
            />
        </Modal>
        <Modal v-if="applyResult!==null" id="modal-alert">
            <success v-if="applyResult==true" success-text="Mã voucher đã được áp dụng thành công" />
            <success v-if="applyResult!==true" :success-text="applyResult" />
        </Modal>
        <div class="shop-total-block">
            <div class="shop-total-row row">
                <div class="col-7 uppercaseFirst">
                    {{ $t('components.ShoppingCart.totalItems') }} ({{ totalItem }} {{ $t('components.ShoppingCart.item') }})
                </div>
                <div class="col-5 text-right">
                    <b class="text-orange">{{ totalPrice|formatNumber }}</b>
                </div>
            </div>
            <div v-if="getPromotion" class="shop-total-row row">
                <div class="col-7 uppercaseFirst">
                    {{ $t('components.ShoppingCart.shopPromotion') }}
                </div>
                <div class="col-5 text-right">
                    -{{ getPromotion.format_type == 1 ? (getPromotion.format_value|formatNumber) : (shop.discountValue|formatNumber) }}
                </div>
            </div>
            <div class="shop-total-row row">
                <div class="col-7 uppercaseFirst">
                    <div class="shipping-block" @click="toggleShow">
                        {{ $t('components.ShoppingCart.shipping') }}
                        <SvgIcon icon="icon-info" grow-by-height="24px" />
                        <div class="shipping-more-info bg-white anim-speed" :class="isShow? 'show': ''">
                            Vui lòng liên hệ shop để biết<br>
                            thêm thông tin về phí vận chuyển<br>
                            <b>0909134567</b>
                        </div>
                    </div>
                </div>
                <div class="col-5 text-right uppercaseFirst">
                    + {{ shop.shippingCost|formatNumber }}
                </div>
                {{ totalCost }}
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import {mapState} from 'vuex'
import SvgIcon from '../common/SvgIcon.vue'
import ShopItem from './ShopItem'
import Promotions from '../Promotions/Promotions'
import Modal from '../modal/Modal'
export default {
    filters: {
        formatNumber (number) {
            return (new Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'VND' }).format(number))
        }
    },
    props:{
        shop:null
    },
    components:{
        SvgIcon,
        ShopItem,
        Promotions,
        Modal
    },
    data(){
        return {
            promo:'',
            applyResult:null,
            isShow:false
        }
    },
    mounted(){
        this.getShopShippingConfig();
        this.getShopPromotion();
    },
    computed: {
        totalItem(state){
            let totalItem = 0;
            this.shop.items.map((item)=>{
                totalItem += item.qty;
            });
            
            return totalItem;
        },
        totalPrice(state){
            let totalPrice = 0;
            this.shop.items.map((item)=>{
                totalPrice += item.qty * item.priceNew
            });
            return totalPrice;
        },
        totalCost(state){
            let totalCost = 0;
            this.shop.items.map((item)=>{
                totalCost += item.qty * item.priceNew
            });
            if(totalCost === 0){
                this.shop.totalCost = 0;
                return;
            } 
            this.shop.subTotal = totalCost;  
            const shopPromo = this.getPromotion;
            if(shopPromo){
                //disount follow price
                if(shopPromo.format_type===1)
                    this.shop.discountValue = shopPromo.format_value;
                else{ // discount follow percent
                    let discountValue = totalCost*shopPromo.format_value/100;
                    //has limit maximum discount value
                    this.shop.discountValue = discountValue >= shopPromo.format_max_value ? shopPromo.format_max_value : discountValue
                }
                totalCost -= this.shop.discountValue;
                this.shop.promotionId = shopPromo.id;
            }
            
            totalCost += this.shop.shippingCost;
            this.shop.totalCost = totalCost;
        },
        getPromotion(){
            let promo = null;
            const discount = this.shop.discount;
            if(discount!==null){
                discount.map((ele)=>{
                    if(ele.type===-1)
                        promo = ele;
                })
            }
            return promo;
        },
        updateItemQty(data){
            this.shop.items.map((item) =>{
                if(item.id ===data.id){
                    item.qty = data.qty
                }
            })
        },
        
    },
    methods: {
        updateShoppingCart(e){
            this.shop.checked = e.target.checked;
            this.shop.items.map((item)=>{
                item.checked = e.target.checked
            })
        },
        toggleModal(){
            this.applyResult=null;
        },
        toggleShow(){
            this.isShow = !this.isShow;
        },
        async getShopShippingConfig(){
            await this.$api.shopShippingConfig.getShippingConfig(this.shop.shopId)
            .then(res => this.shop.shopShippingConfig = res)
            .catch(err => console.log(err))
        },
        async getShopPromotion(){
            await this.$api.promotions.getUserPromotions(this.shop.shopId)
            .then(res => this.shop.discount = res)
            .catch(err => console.log(err))
            // await this.$api.promotions.getGoolowPromotions()
            // .then(res=> this.shop.discount = res)
            // .catch(err => console.log(err))
        },
        
    }
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/shoppingCart';

</style>
