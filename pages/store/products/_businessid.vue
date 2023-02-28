<template>
    <SideBar width="478px" no-btn-close show-cart>
        <div id="productlist" class="productlist">
            <template v-if="loading">
                <Loading />
            </template>
            <template v-else>
                <h3>{{ businessInfo.name }} </h3>
                <i class="close-sidebar" @click="close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23.999" viewBox="0 0 24 23.999">
                        <g id="close" transform="translate(0 -0.005)">
                            <g id="Group_18" data-name="Group 18" transform="translate(0 0.005)">
                                <path id="Path_26" data-name="Path 26" d="M20.489,3.516a12,12,0,1,0,0,16.979A12.019,12.019,0,0,0,20.489,3.516ZM16.952,15.542a1,1,0,1,1-1.415,1.415L12,13.419,8.465,16.956A1,1,0,1,1,7.05,15.541L10.586,12,7.049,8.468A1,1,0,0,1,8.464,7.053L12,10.59l3.537-3.537a1,1,0,1,1,1.415,1.415L13.415,12Z" transform="translate(0 -0.005)" fill="#a5a5a5" />
                            </g>
                        </g>
                    </svg>
                </i>
                <template v-if="list.length===0">
                    <div class="not-found">
                        {{ $t('components.notfound') }}
                    </div>
                </template>
                <template v-else>
                    <ul class="head">
                        <li v-for="(item,index) in categories" :key="index">
                            <button :id="'btn-'+item.id" :class="{'active': typeId == item.id}" @click="changeList(item.id)">
                                {{ item.name }}
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
                                thumb: (item.images)?item.images[0]:'',
                                priceNew: item.promotion_price != null ? item.promotion_price:item.selling_price,
                                priceOld: item.promotion_price != null ? item.selling_price:0,
                                hasDetail:false,
                                shopId : businessInfo.id,
                                shopName : businessInfo.name,
                                times:0,
                                shopThumb:(businessInfo.signboard_photo) ? businessInfo.signboard_photo:''
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
            </template>
        </div>
    </SideBar>
</template>
<script>

// import productItem from '@/components/product/ProductItem'
// import sidebarPage from '@/components/SidebarPage'
export default {
    name: 'Products',
    components: {
        // ProductItem,
        // SidebarPage
    },
    props: {
    },
    // asyncData () {
    async fetch () {
        this.loading = true
        const businessId = this.$route.params.businessid
        const busi = await this.$api.store.getStoreById(businessId)
        this.businessInfo = busi.data
        const categories = await this.$api.product.categoryList(businessId)
        if (categories.status === 'OK') {
            this.categories = categories.results
            if (this.typeId === 0) {
                this.typeId = this.categories[0].id
            }
        } else {
            this.categories = []
        }

        const param = { business_id: this.businessInfo.id, category_id: this.typeId, page: this.page, per_page: process.env.MAX_ITEM_PAGE }
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
        this.showpopdetail()
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
            page: 1,
            typeId: 0,
            businessInfo: {
                type: Object,
                default () {
                    return {
                        id: '0',
                        name: '',
                        description: '',
                        formatted_address: '',
                        photos: '',
                        ctg_type: '',
                        type_id: 0,
                        geometry: null,
                        promotions: null,
                        online: true
                    }
                }
            }
        }
    },
    mounted () {
        this.showpopdetail()
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
        showpopdetail () {
            if (this.businessInfo.id !== '0' && this.businessInfo.id !== undefined) {
                const list = []
                if (this.businessInfo.signboard_photo) {
                    list.push(this.businessInfo.signboard_photo)
                }
                if (this.businessInfo.facade_photo) {
                    list.push(this.businessInfo.facade_photo)
                }
                if (this.businessInfo.photos) {
                    for (let i = 0; i < this.businessInfo.photos.length; i++) {
                        list.push(this.businessInfo.photos[i].photo_reference)
                    }
                }
                const business = {
                    id: this.businessInfo.id,
                    name: this.businessInfo.name,
                    type: this.businessInfo.type,
                    address: this.businessInfo.address,
                    phone: this.businessInfo.phone,
                    reliability: 0,
                    photos: list,
                    geometry: this.businessInfo.geometry,
                    advertisementId: '',
                    statusHeart: false,
                    statusReport: false,
                    noteReport: '',
                    typeView: 'store'
                }
                this.$root.$emit('show_detail_business', business)
            }
        },
        async changeList (typeId) {
            this.typeId = typeId
            this.page = 1
            // this.loading = true
            const param = { business_id: this.businessInfo.id, category_id: this.typeId, page: this.page, per_page: process.env.MAX_ITEM_PAGE }
            const data = await this.$api.product.productList(param)
            // this.loading = false
            if (data.status === 'OK') {
                this.list = data.results.data
                this.start = data.results.from
                this.end = data.results.to
                this.total = data.results.total
            } else {
                this.list = []
            }
        },
        close (evt) {
            this.$router.back()
        }
    }

}
</script>
<style lang="scss">
    @import "@/assets/scss/_variable";
    .productlist{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0px;
        background: $white;
        padding-top: 20px;
        h3{
            font-size: 16px;
            color: $orange;
            text-transform: uppercase;
            padding-left: 20px;
        }
        .head{
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            display: block;
            padding: 5px 10px 10px 10px;
            margin-bottom: 1px;
            height: 45px;
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
            .not-found{
                padding-left: 20px;
            }
        }
        .vscrollbar{
            height: calc( 100% - 70px );
            &.haspage{
                height: calc( 100% - 70px - 65px);
            }
        }
    }

</style>
