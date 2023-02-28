<template lang="html">
    <div class="productitem-detal">
        <div class="ProductItem d-flex">
            <div class="img">
                <img :src="item.thumb" alt="">
            </div>
            <div class="details">
                <strong>
                    {{ item.title }}
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
                    <ButtonQty :item="item" />
                </div>
            </div>
        </div>
        <div class="group">
            {{ item.description }}
        </div>
        <div class="group">
            <h3>{{ $t('components.ProductItem.size') }}</h3>
            <ul>
                <li><b-button>S</b-button></li>
            </ul>
        </div>
        <div class="group">
            <h3>{{ $t('components.ProductItem.color') }} </h3>
        </div>
        <b-button><strong>{{ $t('components.ProductItem.add') }}</strong><strong>120000</strong></b-button>
    </div>
</template>

<script>
import './ProductItem'
export default {
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
                    title: '22',
                    thumb: '',
                    priceNew: 0,
                    priceOld: 0,
                    description: '',
                    size: [],
                    color: []
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .productitem-detal{
        padding: 10px 20px;
        .group{
            border-top: 1px solid #CBD4DA;
            padding: 10px 0px;
            h3{
                font-size: 16px;
                font-weight: bold;
            }
            ul{
                li{
                    list-style:none;
                    margin-right: 10px;
                }
            }
        }
    }
</style>
