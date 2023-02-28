<template>
    <div :id="item.id" class="ProductItem d-flex">
        <div class="img">
            <img :src="imgUrl + item.thumb" alt="">
        </div>
        <div class="details">
            <strong>
                {{ item.name }}
            </strong>
            <div class="">
                <div class="left">
                    <p>
                        <span>{{ $t('components.ProductItem.ordered') }}</span>
                        <b>{{ item.times }} {{ $t('components.ProductItem.times') }}</b>
                    </p>
                    <p class="price-new" :class="{'padding-top-10':item.priceOld==0}">
                        {{ item.priceNew | formatNumber }}
                    </p>
                    <p v-if="item.priceOld > 0" class="price-old">
                        {{ item.priceOld | formatNumber }}
                    </p>
                </div>
                <ButtonQty :has-detail="item.hasDetail" :item="item" @showDetail="showDetail" />
            </div>
        </div>
        <Modal :id="'modal-'+item.id">
            <ProductItemDetail :item="item" />
        </Modal>
    </div>
</template>

<script>
/* eslint-disable */
// import '../buttons/ButtonSale'
// import '../buttons/ButtonIcon'
// import '../buttons/ButtonQty'
export default {
    name: 'ProductItem',
    components: {},
    filters: {
        formatNumber (number) {
            return (new Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'VND' }).format(number))
        }
    },
    props: {
        item: {
            type: Object,
            default () {
                return {
                    id:'',
                    name: '22',
                    thumb: '',
                    priceNew: 0,
                    priceOld: 0,
                    description: '',
                    size: [],
                    color: [],
                    times:0,
                    hasDetail:false,
                    shopThumb:''
                }
            }
        }
    },
    methods: {
        showDetail(){
            this.$bvModal.show('modal-'+this.item.id)
        }
    },
    data(){
        return{
            imgUrl: process.env.SERVER_IMAGE_URL
        }
    }
}

</script>

<style lang="scss">
@import "@/assets/scss/_variable";
    .ProductItem{
        flex-direction: row;
        border-top: 1px solid #CBD4DA;
        padding: 15px;
        .img{
            flex: initial;
            padding: 5px 15px 5px 5px;
            img{
                border-radius: 4px;
                width: 90px;
                height: 90px;
            }
        }
        strong{
            font-size: 16px;
        }
        .details{
            flex: 1;
            padding-top: 5px;
            .left{
                float: left;
                strong{
                    font-size: 16px;
                }
                p{
                    font-size: 14px;
                    font-weight: normal;
                    margin: 0px;
                    span{
                        font-size: 12px;
                    }
                }
                .price-new{
                    color: #FE7235;
                    font-size: 16px;
                    font-weight: bold;
                }
                .price-old{
                    font-size: 14px;
                    text-decoration: line-through;
                    font-weight:normal;
                }
            }
        }
    }
    @media (max-width:$phone){
        .ProductItem{
            padding: 10px;
            strong{
                font-size: 14px;
            }
            .details{
                .left{
                    strong{
                        font-size: 14px;
                    }
                    p{
                        font-size: 14px;
                        font-weight: normal;
                        margin: 0px;
                        span{
                            font-size: 10px;
                        }
                    }
                    .price-new{
                        color: #FE7235;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .price-old{
                        font-size: 14px;
                        text-decoration: line-through;
                        font-weight:normal;
                    }
                }
            }
        }
    }
</style>
