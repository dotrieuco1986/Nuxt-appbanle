<template>
    <div id="order-management">
        <div id="order-search" class="row">
            <div class="col-3 padding-0">
                <label class="padding-top-10 font-size-18">Quản Lý Đơn Hàng</label>
            </div>
            <div class="col padding-0 display-inline-flex">
                <label class="setting-input-search">
                    <input
                        v-model="inputInfoSearch"
                        type="text"
                        name="input--info-search"
                        placeholder="Tìm mã đơn hàng/ tên cửa hàng"
                        maxlength="200"
                        required
                    >
                </label>
                <b-button class="btn-search-order" @click="getDataOrder()">
                    <img src="@/assets/image/icon/search.svg">
                </b-button>
            </div>
        </div>

        <div id="order-list-button-store">
            <b-button-group>
                <b-button v-show="showPrevButton" class="button-prev" @click="handleButtonChangeStore(false)">
                    <svg-icon icon="chevron-down" grow-by-height="20px" />
                </b-button>
                <b-button
                    v-for="(store, index) in listStore"
                    :id="'button-change-store-' + index"
                    :key="index"
                    :class="'button-change-store ' + (index > 4 ? 'd-none' : '') + (index === 0 ? ' button-store-chosed ' : '')"
                    :title="store.oldName"
                    @click="actionChangeStore(store.id, index)"
                >
                    {{ store.fixName }}
                </b-button>
                <b-button v-show="showNextButton" class="button-next" @click="handleButtonChangeStore(true)">
                    <svg-icon icon="chevron-down" grow-by-height="20px" />
                </b-button>
            </b-button-group>
        </div>

        <div id="order-list-button" class="margin-top-20">
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
                    <b-col sm="6" class="padding-top-10 padding-bottom-10">
                        <b-row>
                            <b-col sm="2" class="padding-right-0 padding-left-0">
                                <img v-if="itemOrder.photo" class="img-order" :src="urlImg + itemOrder.photo">
                                <img v-else class="img-order" src="@/assets/image/icon/icon-material-insert-photo.svg">
                            </b-col>
                            <b-col sm="10">
                                <b class="font-size-18">Mã đơn: </b> <span class="font-size-18">{{ itemOrder.code }}</span>
                                <div class="font-size-16">
                                    {{ itemOrder.business_name }}
                                </div>
                                <div class="font-size-16">
                                    {{ Intl.NumberFormat('VND').format(itemOrder.total) }} Đ
                                </div>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col sm="3" class="font-size-16 padding-top-5">
                        <div>&nbsp;</div>
                        <div v-if="orderStatus === 0 || orderStatus === 1 || orderStatus === 2" class="action-order color-orange">
                            <a class="color-orange" target="_blank" :href="'/store/products/' + itemOrder.business_id">
                                Copy Link Chỉ Đường
                            </a>
                            <span>
                                <svg-icon icon="address" grow-by-height="16px" />
                            </span>
                        </div>
                        <div v-else>
                            &nbsp;
                        </div>
                        <div class="action-order color-orange" @click="goToPageDetail(itemOrder.id)">
                            <span>
                                Chi tiết
                            </span>
                            <span>
                                <svg-icon icon="fa-edit" grow-by-height="16px" />
                            </span>
                        </div>
                    </b-col>
                    <b-col sm="3" class="font-size-16 padding-top-5">
                        <br>
                        <div v-if="orderStatus === 0 || orderStatus === 1" class="action-order" @click="showModalCancelOrder(itemOrder.id)">
                            <span>
                                Hủy
                            </span>
                            <span>
                                <svg-icon icon="recycle-bin" grow-by-height="16px" />
                            </span>
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
                <MVPPaginate ref="paginateOrder" :api="this.$api.order.getOrder" :param-query="paramGetList" @handleData="handleData" />
            </div>
            <div v-show="!hasData">
                <br>
                <span class="font-size-16"> {{ textNoData }}</span>
                <div v-show="showLoading" class="loading-spinner">
                    <b-spinner variant="primary" label="Spinner" />
                </div>
            </div>
        </div>

        <modal id="modal-reason-cancel-order">
            <div class="modal-body">
                <p> Vui lòng nhập lý do hủy.</p>
                <div>
                    <b-form-textarea
                        id="textarea"
                        v-model="reasonCancel"
                        placeholder="Vui lòng nhập lý do hủy"
                        rows="3"
                        max-rows="6"
                        maxlength="500"
                    />
                </div>
                <div id="error-reason">
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
import SvgIcon from '../../../components/common/SvgIcon'
import MVPPaginate from '~/components/common/Paginate'

export default {
    layout: 'admin',
    components: {
        SvgIcon,
        MVPPaginate,
        Modal
    },
    async fetch () {
        const data = await this.$api.store.getStores('?page=0')
        if ((data.status === 200 || data.status === 'OK') && data.data.length > 0) {
            this.listDataStore = data.data
        }
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
            listDataStore: null,
            listStore: [],
            indexMaxShow: 4,
            indexMinShow: 0,
            maxLengthTextButton: 20,
            currentStoreId: 'all-order',
            errorReason: '',
            indexButton: 0,
            allIdStore: [],
            paramStoreId: []
        }
    },
    computed: {
        paramGetList () {
            return 'status=' + this.orderStatus + '&search=' + this.paramQuery + '&id=' + this.paramStoreId
        },
        showNextButton () {
            return this.listStore && this.listStore.length - 1 > this.indexMaxShow
        },
        showPrevButton () {
            return this.indexMinShow > 0
        }
    },
    watch: {
        inputInfoSearch (val) {
            if (!val) {
                this.inputInfoSearch = ''
            } else {
                // eslint-disable-next-line no-useless-escape
                this.inputInfoSearch = val.replace(/[&\/\\#,=+()@!^$~%.'":*?\-<>{}]/g, '')
            }

            this.$refs.paginateOrder.currentPage = 1
            this.paramQuery = this.inputInfoSearch
        },
        listDataStore (val) {
            this.handleNamestore(val)
        },
        indexButton (val) {
            const elementNew = document.getElementById('button-change-store-' + val)
            if (elementNew) {
                elementNew.classList.add('button-store-chosed')
            }
        }
    },
    destroyed () {
        window.removeEventListener('resize', this.handleResize)
    },
    mounted () {
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.handleResize)
        this.$root.$emit('clear-all')
    },
    methods: {
        actionChangeStore (id, index) {
            if (this.showLoading) { return }
            if (this.currentStoreId === id) { return }
            this.showLoading = true
            const elementOld = document.getElementById('button-change-store-' + this.indexButton)
            if (elementOld) {
                elementOld.classList.remove('button-store-chosed')
            }

            if (id === 'all-order') {
                this.paramStoreId = this.allIdStore
            } else {
                this.paramStoreId = [id]
            }

            this.currentStoreId = id
            this.indexButton = index
        },
        handleResize () {
            if (window.innerWidth >= 1440) {
                this.maxLengthTextButton = 20
            } else if (window.innerWidth >= 1024) {
                this.maxLengthTextButton = 15
            } else if (window.innerWidth >= 720) {
                this.maxLengthTextButton = 10
            } else {
                this.maxLengthTextButton = 5
            }
            this.handleNamestore(this.listDataStore)
        },
        handleButtonChangeStore (isNext) {
            let elementShow = null
            let elementHide = null
            if (isNext && this.indexMaxShow < this.listStore.length) {
                elementShow = document.getElementById('button-change-store-' + (this.indexMaxShow + 1))
                elementHide = document.getElementById('button-change-store-' + this.indexMinShow)
                if (elementShow) {
                    elementShow.classList.remove('d-none')
                }

                if (elementHide) {
                    elementHide.classList.add('d-none')
                }
                this.indexMaxShow += 1
                this.indexMinShow += 1
            } else if (!isNext && this.indexMinShow > 0) {
                elementShow = document.getElementById('button-change-store-' + (this.indexMinShow - 1))
                elementHide = document.getElementById('button-change-store-' + this.indexMaxShow)
                if (elementShow) {
                    elementShow.classList.remove('d-none')
                }

                if (elementHide) {
                    elementHide.classList.add('d-none')
                }
                this.indexMaxShow -= 1
                this.indexMinShow -= 1
            }
        },
        handleNamestore (val) {
            if (!val) { return }
            const arrTempStore = []
            this.allIdStore = []
            if (val.length > 1) {
                arrTempStore.push({ id: 'all-order', oldName: 'Tất cả', fixName: 'Tất cả' })
            }
            val.forEach((value, index) => {
                this.allIdStore.push(value.id)
                const arrStore = { id: null, oldName: null, fixName: null }
                const txt = value.name
                arrStore.id = value.id
                arrStore.oldName = txt
                if (txt.length <= this.maxLengthTextButton) {
                    arrStore.fixName = txt
                } else {
                    let t = txt.substring(0, this.maxLengthTextButton)
                    const re = /\s+\S*$/
                    const m = re.exec(t)
                    t = t.substring(0, m.index)
                    arrStore.fixName = t + '...'
                }
                arrTempStore.push(arrStore)
            })
            if (arrTempStore.length > 0) {
                this.paramStoreId = this.allIdStore
                this.listStore = arrTempStore
            }
        },
        showModalCancelOrder (id) {
            this.orderIdCancel = id
            this.$bvModal.show('modal-reason-cancel-order')
        },
        async cancelOrder () {
            if (!this.reasonCancel) {
                this.errorReason = 'Vui lòng nhập lý do bạn hủy đơn hàng'
                return
            } else {
                this.errorReason = ''
            }
            const formData = new FormData()
            formData.append('order_id', this.orderIdCancel)
            formData.append('status', 4)
            formData.append('note', this.reasonCancel)
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
            this.listOrder = data
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
    @import "../../../assets/scss/_adminordermanagement";
</style>
