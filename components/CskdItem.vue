<template>
    <div class="cskdItem d-flex" @mouseenter="mouseover" @mouseleave="mouseout">
        <n-link :to="linkURL">
            <div class="img">
                <img :src="imgUrl + item.photo_reference" alt="">
            </div>
        </n-link>
        <div class="details">
            <n-link :to="linkURL">
                <strong>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        class="icon-online"
                        :class="{'is-online':item.online}"
                    >
                        <g id="Ellipse_71" data-name="Ellipse 71" stroke="#fff" stroke-width="1">
                            <circle cx="6" cy="6" r="6" stroke="none" />
                            <circle cx="6" cy="6" r="5.5" fill="none" />
                        </g>
                    </svg>
                    {{ item.name }}
                </strong>
                <p>{{ item.formatted_address }}</p>
            </n-link>
            <div class="">
                <label v-if="item.ads" class="ads">Quảng cáo</label>
                <ButtonSale v-for="(promo,index) in item.promotions" :key="index" :text="promo" />
                <div class="right">
                    <ButtonIcon icon-name="direct" enable @click="gotodirect" />
                    <ButtonIcon
                        v-if="item.has_product"
                        icon-name="product"
                        enable
                        class="margin-left-10"
                        @click="displayProducts"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './buttons/ButtonSale'
import './buttons/ButtonIcon'
import Constants from '../static/constants'
export default {
    name: 'CskdItem',
    components: {
    },
    props: {
        item: {
            type: Object,
            default () {
                return {
                    id: 0,
                    name: 'nha hang 1',
                    description: 'Fast Food, Kem, Ăn vặt, Lẩu',
                    formatted_address: '11 Phan Ngữ, Phường Đa Kao, Quận 1, Hồ Chí Minh',
                    photo_reference: 'P00020164fb97d655c06acf8c8b8526b0a15',
                    type: 'business',
                    type_id: 430,
                    geometry: null,
                    promotions: null,
                    online: true,
                    has_product: false,
                    ads: false
                }
            }
        },
        location: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            imgUrl: process.env.SERVER_IMAGE_URL,
            showProduct: false
        }
    },
    computed: {
        showProductStatus () {
            return this.showProduct
            // this.$router.back()
        },
        linkURL () {
            if (this.item.ads) {
                return '/advertisement/info/' + this.item.ads
            }
            return '/store/' + this.item.id
        }
    },
    methods: {
        displayProducts () {
            // this.showProduct = true
            this.$router.push({
                path: '/store/products/' + this.item.id
            })
        },
        hideProducts () {
            this.showProduct = false
            this.$root.$emit('refesh-icon-search')
        },
        mouseover () {
            this.$root.$emit('open-business-info', this.item.id)
        },
        mouseout () {
            this.$root.$emit('close-business-info', this.item.id)
        },
        gotodirect () {
            this.$router.push({
                name: Constants.ROUTES_NAME.MAPS_ROUTE,
                query: {
                    source: this.location,
                    target: this.item.geometry.coordinates[1] + ',' + this.item.geometry.coordinates[0],
                    type: 'bike'
                }
            })
        }
    }
}
</script>
<style lang="scss">
@import "@/assets/scss/_variable";
.cskdItem{
    flex-direction: row;
    border-top: 1px solid #CBD4DA;
    padding: 15px;
    .img{
        flex: initial;
        padding: 5px 15px 5px 5px;
        img{
            border-radius: 4px;
        }
    }
    .details{
        flex: 1;
        padding-top: 5px;
        width: 100%;
        overflow: hidden;
        a{
            color: #333333 !important;
            text-decoration: none !important;
        }
    }
    img{
        width: 90px;
        height: 90px;
    }
    strong{
        font-size: 16px;
    }
    p{
        font-size: 14px;
        font-weight: normal;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
    }
    .btn-product{
        border: none;
        border-radius: 50%;
        padding: 0;
        height: 30px;
        width: 30px;
    }
    .right{float: right}
    .icon-online{
        fill:#b9b9b9;
        &.is-online{
            fill:#24B400;
        }
    }
    .ads{
        background: #EFF3F6;
        padding: 5px 10px;
        border-radius: 6px;
    }
}
@media (max-width:$phone){
    .cskdItem{
        padding: 10px;
    }
}
</style>
