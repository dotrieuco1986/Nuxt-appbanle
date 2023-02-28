<template>
    <div class="shop-item-row row border-bottom">
        <div class="">
            <div class="shop-item">
                <div class="display-flex item-qty" @click="showItemPopup(item.id)">
                    <span class="icon-count"><b>{{ item.qty }}</b></span>
                </div>
                <p>
                    <b class="uppercaseFirst">{{ item.name }}</b><br>
                    <span v-if="!shopName">
                        <small class="text-orange remove-item uppercaseFirst" title="Remove" @click="removeAll">{{ $t('components.ShoppingCart.btnRemove') }}</small>
                    </span>
                    <span v-if="shopName" class="text-gray">
                        Cung cấp: <span class="text-dark-gray">{{ shopName }}</span>
                    </span>
                </p>
            </div>
        </div>
        <div class="">
            <p class="text-right">
                <span class="price-new">{{ item.priceNew|formatNumber }}</span><br>
                <span v-if="!shopName && item.priceOld!=0" class="price-old text-gray">{{ item.priceOld|formatNumber }}</span>
            </p>
        </div>
        <Modal :id="item.id" class="modal_add_more_item">
            <template>
                <div class="product-item-row">
                    <div class="product-thumb">
                        <img :src="imgUrl + item.thumb">
                    </div>
                    <div class="product-info">
                        <b class="product-name">{{ item.name }}</b>
                        <span class="product-times">Đã được đặt <b>{{ item.times }}+</b> lần</span>
                        <b class="text-orange product-price-new">{{ item.priceNew|formatNumber }}</b>
                        <span v-if="item.priceOld" class="product-price-old">{{ item.priceOld|formatNumber }}</span>
                    </div>
                    <div class="product-qty flex-column-center">
                        <div class="quantity-box flex-center">
                            <div class="icon-minous" @click="removeOne()" />
                            {{ item.qty }}
                            <div class="icon-plus" @click="addMore()" />
                        </div>
                    </div>
                </div>
                <div class="btn-add bg-orange text-white" @click="finish(item.id)">
                    <b>THÊM</b>
                    <b>+{{ item.priceNew*item.qty|formatNumber }}</b>
                </div>
            </template>
        </Modal>
    </div>
</template>
<script>
import Modal from '../modal/Modal'
export default {
    filters: {
        formatNumber (number) {
            return (new Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'VND' }).format(number))
        }
    },
    components: {
        Modal
    },
    props: {
        item: {
            type: Object,
            default: null
        },
        shopName: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            imgUrl: process.env.SERVER_IMAGE_URL
        }
    },
    methods: {
        addMore () {
            // return this.item.qty++
            this.item.qty = 1
            // return this.item
            this.$store.dispatch('cart/addProduct', this.item)
        },
        removeOne () {
            // return this.item.qty === 0 ? 0 : this.item.qty--
            // return this.item
            this.item.qty = 1
            this.$store.dispatch('cart/removeProduct', this.item)
        },
        removeAll () {
            return this.$store.dispatch('cart/removeProduct', this.item)
        },
        finish (data) {
            this.$bvModal.hide(data)
        },
        showItemPopup (id) {
            this.$bvModal.show(id)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/shoppingCart';
.modal-dialog{
    width:420px;
    padding:20px 30px;
}
.product-item-row{
    width:100%;
    display:flex;
    flex-direction: row;
    .product-thumb{
        max-width:90px; height:90px;
        border-radius: 5px;
        overflow: hidden;
        img{
            width:100%; height:100%;
        }
    }
    .product-info{
        display:flex;
        flex-direction: column;
        padding:0 15px;
        width:80%;
        .product-name,
        .product-price-new{
            font-size: 18px;
        }
        .product-times{
            font-size: 12px;
        }
    }
    .product-qty{
        width:90px;
        .quantity-box{
            width:90px; height: 34px;
            border:1px solid $light-blue;
            border-radius:30px;
            padding:1px;
            position:relative;
            text-align: center;

            .icon-plus,
            .icon-minous{
                width:30px;
                height:30px;
                border-radius: 100%;
                position:absolute;
                background:$orange;
                left:2px;
                top:0;
                cursor: pointer;
                &::before,
                &::after{
                    width:70%;
                    height:4px;
                    content:''; display:block;
                    position:absolute;
                    left:15%; top:calc((100% - 4px) / 2);
                    background:#fff;
                    border-radius: 2px;
                }
            }
            .icon-plus{
                right:2px;
                left:unset;
                &::after{
                    -webkit-transform: rotate(90deg);
                }
            }
        }
    }

}
.btn-add{
    width:100%;
    border-radius: 5px;
    height: 40px;
    margin-top:20px;
    padding:0 10px;
    font-size: 18px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}
</style>
