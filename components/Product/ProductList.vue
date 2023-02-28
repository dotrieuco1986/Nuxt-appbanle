<template>
    <div :id="id" class="sidebar-product">
        <template v-if="loading">
            <Loading />
        </template>
        <template v-else>
            <i class="close-sidebar" @click="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23.999" viewBox="0 0 24 23.999">
                    <g id="close" transform="translate(0 -0.005)">
                        <g id="Group_18" data-name="Group 18" transform="translate(0 0.005)">
                            <path id="Path_26" data-name="Path 26" d="M20.489,3.516a12,12,0,1,0,0,16.979A12.019,12.019,0,0,0,20.489,3.516ZM16.952,15.542a1,1,0,1,1-1.415,1.415L12,13.419,8.465,16.956A1,1,0,1,1,7.05,15.541L10.586,12,7.049,8.468A1,1,0,0,1,8.464,7.053L12,10.59l3.537-3.537a1,1,0,1,1,1.415,1.415L13.415,12Z" transform="translate(0 -0.005)" fill="#a5a5a5" />
                        </g>
                    </g>
                </svg>
            </i>
            <ul class="head">
                <li v-for="(ctg,idx) in categories" :key="idx">
                    <button :id="'btn-'+ctg.id" :class="{'active': typeId == ctg.id}">
                        {{ ctg.name }}
                    </button>
                </li>
            </ul>
            <div class="vscrollbar" :class="{'haspage':total>20}">
                <product-item
                    v-for="(item,index) in list"
                    :id="'proitem-'+item.id"
                    :key="index"
                    :item="{
                        id: item.id,
                        name: item.name,
                        thumb: item.images[0],
                        priceNew: item.promotion_price != null ? item.promotion_price:item.selling_price,
                        priceOld: item.promotion_price != null ? item.selling_price:0,
                        hasDetail:false,
                        shopId : businessInfo.id,
                        shopName : businessInfo.name
                    }
                    "
                />
            </div>
            <sidebar-page
                :start="start"
                :end="end"
                :total="total"
                @previous-event="previous"
                @next-event="next"
            />
        </template>
    </div>
</template>
<script>

// import productItem from '@/components/product/ProductItem'
// import sidebarPage from '@/components/SidebarPage'
export default {
    name: 'ProductList',
    components: {
        // ProductItem,
        // SidebarPage
    },
    props: {
        id: {
            type: String,
            default: 'productlist'
        },
        typeId: {
            type: Number,
            default: 0
        },
        businessInfo: {
            type: Object,
            default () {
                return {
                    id: 0,
                    name: '',
                    description: '',
                    formatted_address: '',
                    photo_reference: '',
                    ctg_type: '',
                    type_id: 0,
                    geometry: null,
                    promotions: null,
                    online: true
                }
            }
        }
    },
    // asyncData () {
    async fetch () {
        this.loading = true
        const categories = await this.$api.product.categoryList(this.businessInfo.id)
        if (categories.status === 'OK') {
            this.categories = categories.results
            if (this.typeId === 0) {
                this.typeId = this.categories[0].id
            }
        } else {
            this.categories = []
        }

        const param = { business_id: this.businessInfo.id, page: this.page, per_page: process.env.MAX_ITEM_PAGE }
        const data = await this.$api.product.productList(param)
        this.loading = false
        if (data.status === 'OK') {
            this.list = data.results.data
            this.start = data.results.from
            this.end = data.results.to
            this.total = data.results.total
        } else {
            this.list = []
        }
    },
    data () {
        return {
            list: [],
            categories: [],
            active_tab: 0,
            start: 0,
            end: 20,
            total: 30,
            show_modal: false,
            close_sidebar: true,
            imgUrl: process.env.SERVER_IMAGE_URL,
            loading: true,
            page: 1
        }
    },
    mounted () {
        const business = {
            id: this.businessInfo.id,
            name: this.businessInfo.name,
            type: this.businessInfo.ctg_type,
            address: this.businessInfo.formatted_address,
            reliability: 0,
            photos: [this.businessInfo.photo_reference],
            geometry: this.businessInfo.geometry
        }
        this.$root.$emit('show_detail_business', business)
    },
    methods: {
        previous (evt) {
            this.page = this.page - 1
            this.$fetch()
        },
        next (evt) {
            this.page = this.page + 1
            this.$fetch()
        },
        callmap () {
            this.$store.dispatch('map/showShop', { status: 1, data: 'bac' })
        },
        close (evt) {
            this.$emit('close', evt)
        }
    }

}
</script>
<style lang="scss">
    @import "@/assets/scss/_variable";
    .sidebar-product{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0px;
        background: $white;
        padding-top: 20px;
        .head{
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            display: block;
            padding: 35px 10px 10px 10px;
            margin-bottom: 1px;
            height: 61px;
            li{
                list-style:none;
                display: inline-block;
                padding: 5px;
                button{
                    border: none !important;
                    outline: none !important;
                    background: transparent;
                    font-size: 16px;
                    font-weight: 500;
                    color:$dark-gray;
                    &.active{
                        color: $blue;
                    }
                }
            }
            &::-webkit-scrollbar {
                height: 6px;
            }
            /* Track */
            &::-webkit-scrollbar-track {
                background: #f1f1f1;
            }
            /* Handle */
            &::-webkit-scrollbar-thumb {
                background: #4aa9c5;
                border-radius: 6px;
            }
            /* Handle on hover */
            &::-webkit-scrollbar-thumb:hover {
                background: #239dc0;
            }
        }
        .vscrollbar{
            height: calc( 100% - 62px );
            &.haspage{
                height: calc( 100% - 62px - 65px);
            }
        }
    }

</style>
