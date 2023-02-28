<template>
    <div id="order-management">
        <div id="order-search" class="row">
            <div v-if="changeGuiI" class="col-2 padding-0">
                <label class="padding-top-10 font-size-18">Đơn mua hàng</label>
            </div>
            <div class="col padding-0 display-inline-flex">
                <label class="setting-input-search">
                    <input
                        v-model="inputInfoSearch"
                        type="text"
                        name="input--info-search"
                        placeholder="Tìm mã đơn hàng/ tên cửa hàng"
                        maxlength="200"
                        @change="searchOrder"
                    >
                </label>
                <b-button class="btn-search-order" @click="getDataOrder()">
                    <span>
                        <svg-icon icon="search" has-fill="true" grow-by-height="20px" />
                    </span>
                </b-button>
            </div>
        </div>
        <div id="order-list-button">
            <div class="setting-button">
                <b-button-group>
                    <b-button
                        v-for="item in listTagOrder"
                        :id="item.name"
                        :key="item.name"
                        :class="item.visible ? 'active-button' : ''"
                        @click="tagShowHide(item.name, item.status)"
                    >
                        {{ item.text }}
                    </b-button>
                </b-button-group>
            </div>
        </div>
        <div class="list-order">
            <div v-show="hasData">
                <b-row v-for="(itemOrder, index) in listOrder" :id="'order-item-' + itemOrder.id" :key="index" class="item-store">
                    <b-col :cols="changeGuiI ? '6' : '7'" class="setting-info-order">
                        <b-row>
                            <b-col v-if="changeGuiI" cols="2" class="padding-right-0 padding-left-0">
                                <img v-if="itemOrder.photo" class="img-order" :src="urlImg + itemOrder.photo">
                                <img v-else class="img-order" src="@/assets/image/icon/icon-material-insert-photo.svg">
                            </b-col>
                            <b-col :cols="changeGuiI ? '10' : '12'">
                                <b>Mã đơn: </b> <span>{{ itemOrder.code }}</span>
                                <div>
                                    {{ itemOrder.business_name }}
                                </div>
                                <div>
                                    {{ Intl.NumberFormat('VND').format(itemOrder.total) }} Đ
                                </div>
                                <div v-if="!changeGuiI">
                                    {{ formatDate(itemOrder.updated_at) }}
                                </div>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col :cols="changeGuiI ? '3' : '5'" class="setting-action-order">
                        <div> &nbsp;</div>
                        <div class="action-order color-orange">
                            <a class="color-orange" target="_blank" :href="'/store/products/' + itemOrder.business_id">
                                Mua thêm
                            </a>
                        </div>
                        <div class="action-order color-orange" @click="goToPageDetail(itemOrder.id)">
                            Chi tiết
                        </div>
                        <div v-if="!changeGuiI && orderStatus === 0 || orderStatus === 1" class="action-order" @click="showModalCancelOrder(itemOrder.id)">
                            Hủy
                        </div>
                    </b-col>
                    <b-col v-if="changeGuiI" cols="3" class="font-size-16 padding-top-5">
                        <br>
                        <div v-if="orderStatus === 0 || orderStatus === 1" class="action-order" @click="showModalCancelOrder(itemOrder.id)">
                            Hủy
                        </div>
                        <div v-else>
                        &nbsp;
                        </div>
                        <div>{{ formatDate(itemOrder.updated_at) }}</div>
                    </b-col>
                </b-row>
                <div v-show="showLoading" class="loading-spinner">
                    <b-spinner variant="primary" label="Spinner" />
                </div>
                <span v-show="changeGuiI">
                    <MVPPaginate ref="paginateOrder" :api="this.$api.order.getOrder" :param-query="paramGetList" @handleData="handleData" />
                </span>
                <div v-show="!changeGuiI && !isLastPage" class="action-load-more">
                    <button
                        type="button"
                        @click="handleLoadMore"
                    >
                        Xem thêm
                    </button>
                </div>
            </div>
            <div v-show="!hasData" class="notify-nothing-order">
                <span> {{ textNoData }}</span>
            </div>
        </div>

        <modal id="modal-reason-cancel-order">
            <div class="modal-body">
                <p> Vui lòng nhập lý do hủy.</p>
                <div id="select-reason-cancel">
                    <b-form-radio-group
                        v-model="selectedReason"
                        :options="optionReasonCancel"
                        class="mb-3"
                        value-field="item"
                        text-field="name"
                        disabled-field="notEnabled"
                    />
                </div>
                <div v-if="selectedReason === 'Lý do khác'">
                    <b-form-textarea
                        id="textarea"
                        v-model="reasonCancel"
                        placeholder="Vui lòng nhập lý do hủy"
                        rows="3"
                        max-rows="6"
                        maxlength="500"
                    />
                </div>
                <div v-if="selectedReason === 'Lý do khác'" id="error-reason">
                    {{ errorReason }}
                </div>
            </div>
            <footer class="modal-footer">
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="cancelOrder"
                >
                    Gửi
                </button>
            </footer>
        </modal>
    </div>
</template>

<script>
import Modal from '@/components/modal/Modal.vue'
import MVPPaginate from '~/components/common/Paginate'
import svgIcon from '~/components/common/SvgIcon.vue'

export default {
    layout: 'user',
    components: {
        MVPPaginate,
        Modal,
        svgIcon
    },
    data () {
        return {
            urlImg: process.env.SERVER_IMAGE_URL,
            reasonCancel: '',
            showLoading: true,
            orderStatus: 0,
            offset: 2,
            showPagination: false,
            listOrder: [],
            inputInfoSearch: null,
            listTagOrder: [
                { name: 'collapse-order-wait', text: 'Chờ xác nhận', visible: true, status: 0 },
                { name: 'collapse-order-confirm', text: 'Xác nhận', visible: false, status: 1 },
                { name: 'collapse-order-wait-take', text: 'Chờ lấy hàng', visible: false, status: 2 },
                { name: 'collapse-order-taken', text: 'Đã giao', visible: false, status: 3 },
                { name: 'collapse-order-abort', text: 'Đã hủy', visible: false, status: 4 }
            ],
            paramQuery: '',
            hasData: true,
            textNoData: '',
            orderIdCancel: null,
            changeGuiI: false,
            isLastPage: false,
            selectedReason: '',
            optionReasonCancel: [
                { item: 'Thay đổi đia chỉ giao hàng', name: 'Thay đổi đia chỉ giao hàng' },
                { item: 'Thay đổi mã Voucher', name: 'Thay đổi mã Voucher' },
                { item: 'Thủ tục Thanh toán rắc rối', name: 'Thủ tục Thanh toán rắc rối' },
                { item: 'Tìm thấy Gía rẻ hơn chổ khác', name: 'Tìm thấy Gía rẻ hơn chổ khác' },
                { item: 'Đổi ý không muốn mua nữa', name: 'Đổi ý không muốn mua nữa' },
                { item: 'Lý do khác', name: 'Lý do khác' }
            ],
            errorReason: ''
        }
    },
    computed: {
        paramGetList () {
            return 'status=' + this.orderStatus + '&search=' + this.paramQuery
        }
    },
    watch: {
    },
    mounted () {
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
        this.$root.$on('is-last-page', (isLastPage) => {
            this.isLastPage = isLastPage
        })
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        handleLoadMore () {
            const numberNextPage = this.$refs.paginateOrder.currentPage + 1
            if (numberNextPage <= this.$refs.paginateOrder.totalPages) {
                this.showLoading = true
                this.$refs.paginateOrder.currentPage = numberNextPage
            }
        },
        searchOrder () {
            if (!this.inputInfoSearch) {
                this.inputInfoSearch = ''
                this.paramQuery = this.inputInfoSearch
                this.$refs.paginateOrder.currentPage = 1
            } else {
                setTimeout(() => {
                    this.showLoading = true
                    // eslint-disable-next-line no-useless-escape
                    this.inputInfoSearch = this.inputInfoSearch.replace(/[&\/\\#,=+()@!^$~%.'":*?\-<>{}]/g, '')
                    this.paramQuery = this.inputInfoSearch
                    this.$refs.paginateOrder.currentPage = 1
                }, 500)
            }
        },
        handleResize () {
            const changeGuiOld = this.changeGuiI
            this.changeGuiI = window.outerWidth > 991
            if (this.changeGuiI !== changeGuiOld) {
                this.$refs.paginateOrder.currentPage = 1
                this.isLastPage = this.$refs.paginateOrder.currentPage === this.$refs.paginateOrder.totalPages
            }
        },
        showModalCancelOrder (id) {
            this.orderIdCancel = id
            this.$bvModal.show('modal-reason-cancel-order')
        },
        async cancelOrder () {
            const formData = new FormData()
            if (this.selectedReason === 'Lý do khác') {
                if (!this.reasonCancel) {
                    this.errorReason = 'Vui lòng nhập lý do bạn hủy đơn hàng'
                    return
                } else {
                    this.errorReason = ''
                }
                formData.append('note', this.reasonCancel)
            } else {
                formData.append('note', this.selectedReason)
            }
            formData.append('order_id', this.orderIdCancel)
            formData.append('status', 4)
            const response = await this.$api.order.createOrder(formData)
            if (response.status === 200) {
                this.$refs.paginateOrder.getList()
            }
            this.$bvModal.hide('modal-reason-cancel-order')
        },
        getDataOrder () {
            this.showLoading = true
            this.$refs.paginateOrder.getList()
        },
        goToPageDetail (id) {
            if (this.showLoading) { return }
            this.$router.push({
                path: 'orderdetail',
                query: {
                    id
                }
            })
        },
        goToBuyMore (id) {
            if (this.showLoading) { return }
            this.$router.push({
                path: '/store/products/' + id
            })
        },
        formatDate (data) {
            if (data) {
                const arrDate = data.split(' ')
                return arrDate[1].split(':')[0] + ':' + arrDate[1].split(':')[1] + ' | ' + arrDate[0]
            }
        },
        handleData (data) {
            if (this.$refs.paginateOrder.currentPage > 1 && !this.changeGuiI) {
                data.forEach((value) => {
                    this.listOrder.push(value)
                })
            } else {
                this.listOrder = data
                this.isLastPage = this.$refs.paginateOrder.currentPage === this.$refs.paginateOrder.totalPages
            }
            this.showLoading = false
            if (this.listOrder !== null && this.listOrder.length > 0) {
                this.hasData = true
                this.textNoData = ''
            } else {
                this.hasData = false
                switch (this.orderStatus) {
                case 0:
                    this.textNoData = 'Không có đơn hàng đang chờ xác nhận.'
                    break
                case 1:
                    this.textNoData = 'Không có đơn hàng đã xác nhận.'
                    break
                case 2:
                    this.textNoData = 'Không có đơn hàng đang giao.'
                    break
                case 3:
                    this.textNoData = 'Không có đơn hàng đã giao.'
                    break
                case 4:
                    this.textNoData = 'Không có đơn hàng đã hủy.'
                    break
                default:
                    this.textNoData = ''
                }
            }
        },
        tagShowHide (name, orderStatus) {
            this.showLoading = true
            if (this.$refs.paginateOrder.currentPage === 1) {
                this.$refs.paginateOrder.getList()
            } else {
                this.$refs.paginateOrder.currentPage = 1
            }
            this.orderStatus = orderStatus
            this.listTagOrder.forEach((value) => {
                const elementButton = document.getElementById(value.name)
                if (value.name === name) {
                    value.visible = true
                    elementButton.classList.add('active-button')
                } else {
                    value.visible = false
                    elementButton.classList.remove('active-button')
                }
            })
        }
    }
}
</script>

<style lang="scss">
    @import "../../../assets/scss/_userordermanagement";
</style>
