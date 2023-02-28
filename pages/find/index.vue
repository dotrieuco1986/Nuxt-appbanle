<template>
    <div id="find-business" class="sidebar-find">
        <SideBar width="478px" no-btn-close show-cart :show-dlpdf="surveyID">
            <!-- <div class="d-flex .flex-column"> -->
            <template v-if="loading">
                <Loading />
            </template>
            <template v-else>
                <ul class="head">
                    <li>
                        <ButtonNumber :text="categories.name" :number="categories.total" :active="categories.id == activeTab" />
                    </li>
                </ul>
                <div v-if="list.length===0" class="not-found">
                    {{ $t('components.notfound') }}
                </div>
                <div v-else class="vscrollbar" :class="{'haspage':categories.total>20}">
                    <n-link v-for="(item,idx) in ads" :key="idx" :to="'/advertisement/info/' + item.id">
                        <img class="ads-img" :src="imgUrl + item.photo">
                    </n-link>
                    <CskdItem
                        v-for="(item,index) in list"
                        :key="index"
                        :item="item"
                        :location="$route.query.location"
                    />
                </div>
                <SidebarPage
                    v-if="categories.total>20"
                    :start="start"
                    :end="end"
                    :total="categories.total"
                    @previous-event="previous"
                    @next-event="next"
                />
            </template>
        </SideBar>
    </div>
</template>
<script>
import SideBar from '@/components/SideBar'
import '@/components/CskdItem'
import '@/components/buttons/ButtonNumber'
import '@/components/SidebarPage'
import '@/components/common/Loading'
// import api from '@/plugins/api'
export default {
    name: 'FindAround',
    components: {
        SideBar
    },
    // fetchOnServer: false,
    async fetch () {
        // const categories = { name: 'Tất cả', total: 360, id: 0 }
        const param = this.$route.query
        param.page = this.page
        param.per_page = process.env.MAX_ITEM_PAGE
        this.loading = true
        const data = await this.$api.find.findAround(param)
        this.loading = false
        if (data.status === 'OK') {
            this.list = data.features
            this.ads = data.ads
            this.categories = { name: 'Tất cả', total: data.total, id: 0 }
            this.start = data.start
            this.end = data.end
        } else {
            this.list = []
            this.categories = { name: 'Tất cả', total: 0, id: 0 }
        }
        const location = this.$route.query.location
        const exp = location.split(',')
        this.radius = this.$route.query.radius
        this.lat = exp[0]
        this.lng = exp[1]
        this.$root.$emit('map-around-circle', { features: this.list }, this.lat, this.lng, this.radius, true)
    },
    data () {
        return {
            list: [],
            categories: { name: 'Tất cả', total: 0, id: 0 },
            activeTab: 0,
            start: 0,
            end: 20,
            lat: '',
            lng: '',
            radius: 50,
            page: 1,
            loading: true,
            ads: [],
            imgUrl: process.env.SERVER_IMAGE_URL
        }
    },
    computed: {
        surveyID () {
            if (this.$route.query.survey !== undefined) {
                return parseInt(this.$route.query.survey)
            }
            return 0
        }
    },
    watch: {
        '$route.query': '$fetch'
    },

    mounted () {
        const location = this.$route.query.location
        const exp = location.split(',')
        this.radius = this.$route.query.radius
        this.lat = exp[0]
        this.lng = exp[1]
        this.$root.$emit('map-around-circle', { features: this.list }, this.lat, this.lng, this.radius, true)
        this.$root.$on('refesh-icon-search', () => {
            this.$root.$emit('map-around-circle', { features: this.list }, this.lat, this.lng, this.radius, true)
        })
    },
    methods: {
        previous (evt) {
            this.page = this.page - 1
            this.$fetch()
        },
        next (evt) {
            this.page = this.page + 1
            this.$fetch()
        }
    }
}
</script>
<style lang="scss">
@import "@/assets/scss/_variable";
    .sidebar-find{
        .head{
            overflow-x: auto;
            white-space: nowrap;
            display: block;
            padding: 15px 10px 10px 10px;
            margin-bottom: 1px;
            li{
                list-style:none;
                display: inline-block;
                padding: 5px;
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
        .ads-img{
            height: 135px;
            padding: 20px;
            &:first-child{
                padding-top: 0px;
            }
        }
        .not-found{
            padding-left: 20px;
        }
    }
    .vscrollbar{
        height: calc( 100% - 68px );
        &.haspage{
            height: calc( 100% - 68px - 65px);
        }
    }
@media (max-width:$phone){
    .sidebar-find{
        .ads-img{
            padding: 15px;
        }
    }
}
</style>
