<template>
    <div id="stores" class="col-12">
        <b-row class="my-1 head-area">
            <b-col sm="2">
                <label class="label-title">Quản Lý Cửa Hàng</label>
            </b-col>
            <b-col sm="6">
                <b-form inline>
                    <b-form-input v-model="inputInfoSearch" type="text" class="search-form" placeholder="Tìm cửa hàng" />
                    <b-button type="submit" class="btn-search">
                        <svgIcon icon="search" has-fill="false" />
                    </b-button>
                </b-form>
            </b-col>
            <b-col sm="4">
                <n-link to="/admin/stores/create" class="btn btn-add-store">
                    + Thêm Cửa Hàng
                </n-link>
            </b-col>
        </b-row>
        <b-row class="my-1 count-area">
            <b-col sm="12">
                <h2 class="item">
                    {{ rows }} cửa hàng
                </h2>
            </b-col>
        </b-row>
        <div id="list-stores">
            <b-row v-for="(item, index) in items" :key="index" class="my-1 item-store">
                <b-col class="d-none d-sm-block" sm="1" />
                <b-col sm="10">
                    <img class="img-signboard" :src="imgUrl + item.signboard_photo" :alt="item.signboard_name">
                    <div class="information">
                        <b-row>
                            <b-col sm="6" class="col-12 basic-info">
                                <b>Cửa hàng:</b> {{ item.name }}
                                <nuxt-link v-show="item.active" :to="'/store/' + item.id">
                                    <svgIcon icon="pin-orange-icon" has-fill="false" />
                                </nuxt-link>
                                <br>
                                Chuyên kinh doanh: {{ item.type }} <br>
                                Địa chỉ: {{ item.address }}
                            </b-col>
                            <b-col sm="3" class="col-6">
                                <b-row>
                                    <b-col>
                                        Chỉnh sửa
                                    </b-col>
                                    <b-col>
                                        <nuxt-link :to="'/admin/stores/edit/' + item.id">
                                            <svgIcon icon="pencil-alt" has-fill="false" />
                                        </nuxt-link>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        Copy
                                    </b-col>
                                    <b-col>
                                        <span class="cursor-pointer" @click="handleCopy(item.id)">
                                            <svgIcon icon="clone" has-fill="false" />
                                        </span>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        Xóa
                                    </b-col>
                                    <b-col>
                                        <span class="cursor-pointer" @click="handleDelete(item.id)">
                                            <svgIcon icon="trash-icon" has-fill="false" />
                                        </span>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col sm="3" class="col-6">
                                <b-row>
                                    <b-col />
                                </b-row>
                                <b-row>
                                    <b-col>
                                        Kích hoạt
                                    </b-col>
                                    <b-col>
                                        <b-form-checkbox v-model="item.active" name="check-button" switch size="sm" @change="changeStatus(item)" />
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        <nuxt-link
                                            :to="{name: 'admin-stores-products-id' ,params: {id: item.id},query:{enabled:item.promotion.discount_enabled}}"
                                            class="link-to-products"
                                        >
                                            Sản phẩm
                                        </nuxt-link>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col class="d-none d-sm-block" sm="1" />
            </b-row>
        </div>
        <MVPPaginate
            v-show="items !== null && items.length < rows"
            ref="paginateStores"
            :api="this.$api.store.getStores"
            :param-query="paramGetList"
            @handleData="handleData"
        />
        <modal-confirm
            id="modal-delete-store"
            :description="'Bạn có chắc chắn muốn xóa?'"
            :ok-txt="'Đồng ý'"
            :ok-cancel="'Hủy bỏ'"
            @ok-click="okDelete"
        />
        <modal-confirm
            id="modal-copy-store"
            :description="'Bạn có chắc chắn muốn copy của hàng này?'"
            :ok-txt="'Đồng ý'"
            :ok-cancel="'Hủy bỏ'"
            @ok-click="okCopy"
        />
        <modal-show-message
            id="modal-show-message"
            :msg="message.text"
            :class-defined="message.class"
            :icon="message.icon"
        />
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
import MVPPaginate from '~/components/common/Paginate'
import svgIcon from '~/components/common/SvgIcon.vue'

export default {
    layout: 'admin',
    components: {
        MVPPaginate,
        ModalConfirm,
        ModalShowMessage,
        svgIcon
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
            this.$refs.paginateStores.currentPage = 1
            if (!val) {
                this.inputInfoSearch = null
            }
            this.paramQuery = 'query=' + this.inputInfoSearch
        }
    },
    mounted () {
    },
    methods: {
        changeStatus (item) {
            const formData = new FormData()
            formData.append('id', item.id)
            formData.append('active', !item.active)
            this.$api.store.createBusiness(formData).then((res) => {
                this.message.class = 'success'
                this.message.text = 'Cập nhật trạng thái thành công'
                this.message.icon = 'check'
                this.$bvModal.show('modal-show-message')
            })
        },
        handleCopy (id) {
            if (id) {
                this.$bvModal.show('modal-copy-store')
                this.idItem = id
            }
        },
        okCopy () {
            this.$api.store.copyStore(this.idItem).then((res) => {
                this.message.class = 'success'
                this.message.text = 'Copy cửa hàng thành công'
                this.message.icon = 'check'
                this.$bvModal.show('modal-show-message')
                this.$refs.paginateStores.getList()
            }).catch((error) => {
                if (error.response) {
                    this.message.class = 'error'
                    this.message.text = 'Lỗi copy cửa hàng: ' + error.response.data.message + '. Vui lòng thữ lại'
                    this.message.icon = 'error'
                    this.$bvModal.show('modal-show-message')
                }
            })
        },
        handleDelete (id) {
            if (id) {
                this.$bvModal.show('modal-delete-store')
                this.idItem = id
            }
        },
        okDelete () {
            this.$api.store.deleteStore(this.idItem).then((res) => {
                this.message.class = 'success'
                this.message.text = 'Xóa cửa hàng thành công'
                this.message.icon = 'check'
                this.$bvModal.show('modal-show-message')
                this.$refs.paginateStores.getList()
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
                this.$refs.paginateStores.getList()
            } else {
                this.items = data
                this.rows = this.$refs.paginateStores.rows
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
