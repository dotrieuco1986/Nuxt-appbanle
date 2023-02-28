<template>
    <div v-show="totalPages > 1" id="paginate" class="overflow-auto">
        <b-pagination
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
            <template v-slot:page="{page, active}">
                <b v-show="active">{{ page }}</b> trong {{ totalPages }}
            </template>
        </b-pagination>
    </div>
</template>

<script>
import svgIcon from '~/components/common/SvgIcon.vue'
export default {
    name: 'MVPPaginate',
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
        }
    },
    data () {
        return {
            rows: 0,
            currentPage: 1,
            items: [],
            hasData: false,
            open: true,
            perPage: 10,
            timer: null
        }
    },
    computed: {
        totalPages () {
            return Math.ceil(this.rows / this.perPage)
        }
    },
    watch: {
        currentPage (val) {
            this.$root.$emit('is-last-page', val === this.totalPages)
        },
        paramQuery (val) {
            this.beforeGetList()
        }
    },
    mounted () {
        this.getList()
    },
    beforeDestroy () {
        const _this = this
        if (this.timer) {
            clearTimeout(_this.timer)
        }
    },
    methods: {
        beforeGetList () {
            const _this = this
            if (this.timer) {
                clearTimeout(_this.timer)
            }
            this.timer = setTimeout(() => this.getList(), 500)
        },
        getList () {
            const _this = this
            const param = '?page=' + this.currentPage + (this.paramQuery && this.paramQuery !== '' ? '&' + this.paramQuery : '')

            this.api(param).then((res) => {
                const response = res.data.data ? res.data : res
                _this.rows = response.total
                _this.perPage = response.per_page
                _this.currentPage = response.current_page
                this.$emit('handleData', (response.data))
            })
        }
    }
}
</script>

<style lang="scss">
    @import '~assets/scss/variable';
    @import "~assets/scss/_paginate";
</style>
