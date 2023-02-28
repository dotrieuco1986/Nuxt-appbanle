<template>
    <div id="stores" class="col-12">
        <b-row class="my-1 head-area">
            <b-col sm="2">
                <label class="label-title">Quản Lý Quảng Cáo</label>
            </b-col>
            <b-col sm="6">
                <b-form inline>
                    <b-form-input v-model="inputInfoSearch" type="text" class="search-form" placeholder="Tìm quảng cáo" />
                    <b-button type="submit" class="btn-search">
                        <font-awesome-icon icon="search" />
                    </b-button>
                </b-form>
            </b-col>
            <b-col sm="4">
                <n-link to="/admin/advertisement/create" class="btn btn-add-store">
                    <font-awesome-icon icon="plus" />Thêm Quảng Cáo
                </n-link>
            </b-col>
        </b-row>
        <b-row class="my-1 count-area">
            <b-col sm="12">
                <h2 class="item">
                    {{ rows }} quảng cáo
                </h2>
            </b-col>
        </b-row>
        <div id="list-advertisements">
            <b-row v-for="(item, index) in items" :key="index" class="my-1 item-store">
                <b-col class="d-none d-sm-block" sm="1" />
                <b-col sm="10">
                    <img class="img-signboard" :src="imgUrl + item.photo" :alt="item.name">
                    <div class="information">
                        <b-row>
                            <b-col sm="6" class="col-12 basic-info">
                                Nội dung: {{ item.content }} <br>
                                SĐT: {{ item.contact_phone }} <br>
                                Email: {{ item.contact_email }}
                            </b-col>
                            <b-col sm="3" class="col-6">
                                <b-row>
                                    <b-col>
                                        Chỉnh sửa
                                    </b-col>
                                    <b-col>
                                        <a :href="'/admin/advertisement/edit/' + item.id">
                                            <font-awesome-icon icon="pencil-alt" />
                                        </a>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        Gia hạn
                                    </b-col>
                                    <b-col>
                                        <a :href="'/admin/advertisement/edit/' + item.id">
                                            <font-awesome-icon icon="clock" />
                                        </a>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        Xóa
                                    </b-col>
                                    <b-col>
                                        <a @click="handleDelete(item.id)">
                                            <font-awesome-icon icon="trash" />
                                        </a>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col sm="3" class="col-6">
                                <b-row>
                                    <b-col />
                                </b-row>
                                <b-row>
                                    <b-col>
                                        Trạng thái: {{ buildStatus(item.suspended, item.dates) }}
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        {{ buildTimerShow(item.period, item.dates) }}
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col class="d-none d-sm-block" sm="1" />
            </b-row>
        </div>
        <MVPPaginate v-show="items !== null && items.length < rows" ref="paginateAdvertisements" :api="this.$api.advertisement.getAllAdvertisement" :param-query="paramGetList" @handleData="handleData" />
        <modal-confirm
            id="modal-delete-advertisement"
            :description="'Bạn có chắc chắn muốn xóa?'"
            :ok-txt="'Xóa ngay'"
            :ok-cancel="'Chờ xíu'"
            @ok-click="okDelete"
        />
        <modal-show-message id="modal-show-message" :msg="message.text" :class-defined="message.class" :icon="message.icon" />
    </div>
</template>
<style lang="scss">
    @import "../../../assets/scss/_variable";
    @import "../../../assets/scss/_btable";
    @import "../../../assets/scss/_stores";
    @import "../../../assets/scss/_paginate";
</style>
<script>
import ModalConfirm from '@/components/modal/ModalConfirm'
import ModalShowMessage from '@/components/modal/ModalShowMessage'
import moment from 'moment'
import MVPPaginate from '~/components/common/Paginate'
// import svgIcon from '~/components/common/SvgIcon.vue'

export default {
    layout: 'admin',
    components: {
        MVPPaginate,
        ModalConfirm,
        ModalShowMessage
        // svgIcon
    },
    data () {
        return {
            rows: 0,
            items: [],
            open: true,
            paramQuery: '',
            inputInfoSearch: null,
            imgUrl: process.env.SERVER_IMAGE_URL,
            idItem: '',
            message: {
                class: 'error',
                text: '',
                icon: 'close'
            }
        }
    },
    computed: {
        paramGetList () {
            return this.paramQuery
        }
    },
    watch: {
        inputInfoSearch (val) {
            this.$refs.paginateAdvertisements.currentPage = 1
            if (!val) {
                this.inputInfoSearch = null
            }
            this.paramQuery = 'query=' + this.inputInfoSearch
        }
    },
    mounted () {},
    methods: {
        handleDelete (id) {
            if (id) {
                this.$bvModal.show('modal-delete-advertisement')
                this.idItem = id
            }
        },
        okDelete () {
            this.$api.store.deleteStore(this.idItem).then((res) => {
                this.message.class = 'success'
                this.message.text = 'Xóa quảng cáo thành công'
                this.message.icon = 'check'
                this.$bvModal.show('modal-show-message')
                this.$refs.paginateAdvertisements.getList()
            }).catch((error) => {
                if (error.response) {
                    this.message.class = 'error'
                    this.message.text = 'Lỗi xóa quảng cáo: ' + error.response.data.message + '. Vui lòng thữ lại'
                    this.message.icon = 'error'
                    this.$bvModal.show('modal-show-message')
                }
            })
        },
        handleData (data) {
            this.items = data
            this.rows = this.$refs.paginateAdvertisements.rows
        },
        buildTimerShow (period, dates) {
            let html = 'Thời gian: ' + period[0] + '-' + period[1] + ' | '
            dates.forEach((date) => {
                html += date + ','
            })
            return html.substring(0, html.length - 1)
        },
        buildStatus (suspended, dates) {
            let status = ''

            if (suspended) {
                status = 'Tạm ngưng'
            } else {
                const currentDate = moment()
                let before = 0; let after = 0

                dates.forEach((date) => {
                    const convertDate = moment(date, 'YYYY-MM-DD')
                    convertDate.isBefore(currentDate) ? before += 1 : after += 1
                })

                if (before !== 0 && after !== 0) {
                    status = 'Đang chạy'
                } else if (before === 0) {
                    status = 'Mới'
                } else if (after === 0) {
                    status = 'Hết hạn'
                }
            }
            return status
        }
    },
    head () {
        return {
            title: 'Quản lý quảng cáo'
        }
    }
}
</script>
