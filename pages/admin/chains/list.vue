<template>
    <div id="chains" class="col-12">
        <b-row class="my-1 head-area">
            <b-col sm="2">
                <label class="label-title">Quản Lý Chuỗi Cửa Hàng</label>
            </b-col>
            <b-col sm="6">
                <b-form inline>
                    <b-form-input v-model="inputInfoSearch" type="text" class="search-form" placeholder="Tìm chuỗi cửa hàng" />
                    <b-button type="submit" class="btn-search">
                        <svgIcon icon="search" has-fill="false" />
                    </b-button>
                </b-form>
            </b-col>
            <b-col sm="4">
                <n-link to="/admin/chains/create" class="btn btn-add-store">
                    + Tạo Chuỗi Cửa Hàng
                </n-link>
            </b-col>
        </b-row>
        <b-row class="my-1 count-area">
            <b-col sm="12">
                <h2 class="item">
                    {{ rows }} chuỗi cửa hàng
                </h2>
            </b-col>
        </b-row>
        <div id="list-stores">
            <b-row v-for="(item, index) in items" :key="index" class="my-1 item-store">
                <b-col class="d-none d-sm-block" sm="1" />
                <b-col sm="10">
                    <img class="img-signboard" :src="imgUrl + item.logo" :alt="item.name">
                    <div class="information">
                        <b-row>
                            <b-col sm="9" class="col-12 basic-info">
                                <b class="orange">Chuỗi Cửa Hàng: {{ item.name }} </b>
                            </b-col>
                            <b-col sm="3" class="col-6">
                                <b-row>
                                    <b-col>
                                        Chỉnh sửa
                                    </b-col>
                                    <b-col>
                                        <nuxt-link :to="'/admin/chains/edit/' + item.id">
                                            <svgIcon icon="pencil-alt" has-fill="false" />
                                        </nuxt-link>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        Xóa chuỗi
                                    </b-col>
                                    <b-col>
                                        <span class="cursor-pointer" @click="handleDelete(item.id)">
                                            <svgIcon icon="trash-icon" has-fill="false" />
                                        </span>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col class="d-none d-sm-block" sm="1" />
            </b-row>
        </div>
        <MVPPaginate ref="paginateChains" :api="this.$api.store.getChains" :param-query="paramGetList" @handleData="handleData" />
        <modal-confirm
            id="modal-delete-store"
            :description="'Bạn có chắc chắn muốn xóa?'"
            :ok-txt="'Đồng ý'"
            :ok-cancel="'Hủy bỏ'"
            @ok-click="okDelete"
        />
        <modal-show-message id="modal-show-message" :msg="message.text" :class-defined="message.class" :icon="message.icon" />
    </div>
</template>
<style lang="scss">
    @import "../../../assets/scss/_variable";
    @import "../../../assets/scss/_stores";
    @import "../../../assets/scss/_paginate";
</style>
<script>
import ModalConfirm from '@/components/modal/ModalConfirm'
import ModalShowMessage from '@/components/modal/ModalShowMessage'
import MVPPaginate from '~/components/common/Paginate'
import svgIcon from '~/components/common/SvgIcon.vue'
export default {
    layout: 'admin',
    components: {
        svgIcon,
        MVPPaginate,
        ModalConfirm,
        ModalShowMessage
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
            this.$refs.paginateChains.currentPage = 1
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
                this.$bvModal.show('modal-delete-store')
                this.idItem = id
            }
        },
        okDelete () {
            this.$api.store.deleteStoreChain(this.idItem).then((res) => {
                this.message.class = 'success'
                this.message.text = 'Xóa cửa hàng thành công'
                this.message.icon = 'check'
                this.$bvModal.show('modal-show-message')
                this.$refs.paginateChains.getList()
            }).catch((error) => {
                if (error.response) {
                    this.message.class = 'error'
                    this.message.text = 'Lỗi xóa cửa hàng: ' + error.response.data.message + '. Vui lòng thữ lại'
                    this.message.icon = 'error'
                    this.$bvModal.show('modal-show-message')
                }
            })
        },
        handleData (data) {
            if (data === 'Connection Failure') {
                this.$refs.paginateChains.getList()
            } else {
                this.items = data
                this.rows = this.$refs.paginateChains.rows
            }
        }
    },
    head () {
        return {
            title: 'Quản lý cửa hàng'
        }
    }
}
</script>
