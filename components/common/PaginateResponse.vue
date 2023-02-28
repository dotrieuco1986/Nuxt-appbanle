<template>
    <div v-show="totalPages > 1" id="paginate" class="overflow-auto">
        <div
            v-if="mobile && loadPage < totalPages"
            class="d-flex justify-content-center"
        >
            <b-button
                class="page-link"
                :disabled="isLoading"
                type="button"
                @click="
                    currentPage++;
                    getList(currentPage);
                "
            >
                <b-spinner v-show="isLoading" small />
                {{ isLoading ? "Loading..." : " Xem thêm" }}
            </b-button>
        </div>
        <b-pagination
            v-if="!mobile"
            v-model="currentPage"
            align="center"
            :limit="1"
            :total-rows="rows"
            :per-page="perPage"
            :hide-ellipsis="true"
            aria-controls="list-stores"
            class="mt-4"
            @input="getList(currentPage)"
        >
            <template v-slot:first-text>
                <span class="color-primary">
                    <svg-icon icon="fast-backward" grow-by-height="16px" />
                </span>
            </template>
            <template v-slot:prev-text>
                <span class="color-primary">
                    <svg-icon icon="step-backward" grow-by-height="12px" />
                </span>
            </template>
            <template v-slot:next-text>
                <span class="color-primary">
                    <svg-icon icon="step-forward" grow-by-height="12px" />
                </span>
            </template>
            <template v-slot:last-text>
                <span class="color-primary">
                    <svg-icon icon="fast-forward" grow-by-height="16px" />
                </span>
            </template>
            <template v-slot:page="{ page, active }">
                <b v-show="active">{{ page }}</b> trong {{ totalPages }}
            </template>
        </b-pagination>
    </div>
</template>

<script>
import svgIcon from '~/components/common/SvgIcon.vue'
export default {
    name: 'PaginateResponse',
    components: {
        svgIcon
    },
    props: {
        api: {
            type: Function,
            required: true
        },
        paramQuery: {
            type: String,
            default: ''
        },
        widthMobile: {
            type: Number,
            default: 1024,
            required: false
        }
    },
    data () {
        return {
            rows: 0,
            currentPage: 1,
            loadPage: 0,
            items: [],
            itemsAll: [],
            hasData: false,
            open: true,
            perPage: 10,
            mobile: false,
            totalPages: 0,
            isLoading: false
        }
    },
    watch: {
        paramQuery (val) {
            this.getList()
        }
    },
    mounted () {
        window.addEventListener('resize', this.handleResize)
        const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
        if (width < this.widthMobile) {
            this.mobile = true
        } else {
            this.mobile = false
        }
        this.getList()
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        handleResize () {
            const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
            if (width < this.widthMobile) {
                this.mobile = true
            } else {
                this.mobile = false
            }
            this.returnData()
        },
        getList () {
            if (this.currentPage <= this.loadPage) {
                this.items = this.itemsAll.slice(
                    (this.currentPage - 1) * this.perPage,
                    this.currentPage * this.perPage - 1
                )
                this.returnData()
            } else {
                this.isLoading = true
                const _this = this
                const param = '?page=' + this.currentPage + '&' + this.paramQuery

                this.api(param).then((res) => {
                    const response = res.data.data ? res.data : res
                    _this.rows = response.total
                    _this.perPage = response.per_page
                    _this.currentPage = _this.loadPage = response.current_page
                    _this.totalPages = response.last_page
                    response.data.forEach((element) => {
                        _this.itemsAll.push(element)
                    })
                    _this.items = response.data
                    _this.returnData()
                    this.isLoading = false
                })
            }
        },
        returnData () {
            if (this.mobile) {
                this.$emit('handleData', this.itemsAll)
            } else {
                this.$emit('handleData', this.items)
            }
        }
    }
}
</script>

<style lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/_paginate";
</style>
