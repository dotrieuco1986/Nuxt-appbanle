<template>
    <div class="p-3 fz">
        <div class="row style-header">
            <label class="text-orange">Quản Lý Cửa Hàng > Quản lý Cửa Hàng</label>
        </div>

        <div class="row justify-content-between pt-4 align-center">
            <div class="col">
                <div class="d-flex">
                    <mvp-textbox id="linkCopy" ref="linkCopy" />
                    <mvp-button icon="search" />
                </div>
            </div>

            <div class="col">
                <div class="d-flex">
                    <span class="text-orange" style="padding-right: 10px">Giảm giá tất cả sản phẩm</span>
                    <b-form-checkbox
                        :checked="enabled"
                        name="check-button"
                        switch
                        size="lg"
                        @change="applyPromotionForAll($event)"
                    />
                    <nuxt-link
                        :to="{name: 'admin-product-promotion',query: {storeId: $route.params.id,productId : 'all' ,enabled: true,sellingPrice: 0}}"
                    >
                        <svg-icon icon="config" @click="applyPromotionForAll(true)" />
                    </nuxt-link>
                </div>
            </div>

            <div class="col">
                <b-form-select
                    v-model="status"
                    class="height-40 font-size-14"
                    :options="optionsStatus"
                />
            </div>
        </div>

        <div v-show="listProductSelected.length > 0" class="row justify-content-center pt-3">
            <div class="col">
                <mvp-button icon="delete" color="btn-backend" name="Xóa sản phẩm" @click.native="confirmDeletes" />
            </div>
        </div>

        <div class="row p-3">
            <div v-for="item in listProduct" :key="item.id" class="row record-product">
                <div class="col">
                    <div class="row align-center">
                        <div class="col-1">
                            <mvp-checkbox
                                :checked="checked"
                                @change.native="changeListProductSelected(item,$event.target.checked)"
                            />
                        </div>

                        <div class="col-4">
                            <img
                                class="img-product"
                                :src="imgUrl+ (item.images?item.images[0]: 'no-image.png')"
                                alt="Image"
                            >
                        </div>

                        <div class="col">
                            <label>San Pham: {{ item.name }}</label><br>
                            <span>Ma san pham: {{ item.sku_code }}</span><br>
                            <span>Giá: {{ item.selling_price }}</span>
                        </div>
                    </div>
                </div>

                <div class="col-2">
                    <nuxt-link
                        :to="{name: 'admin-product-edit-id', params:{id: item.id}, query: {action: 'updateProductStore', businessId: $route.params.id}}"
                    >
                        <label>Chỉnh sửa</label>
                        <svg-icon icon="edit" />
                    </nuxt-link>

                    <nuxt-link
                        :to="{name: 'admin-product-promotion',query: {storeId: $route.params.id,productId : item.id ,enabled: true,sellingPrice: item.selling_price}}"
                    >
                        <label style="padding-right: 10px">Giảm giá</label>
                    </nuxt-link>
                </div>

                <div class="col-2">
                    <label>Số lượng: {{ item.quantity }}</label>
                    <label>{{ item.quantity > 0 ? 'Còn hàng' : 'Hết hàng' }} </label>
                </div>
            </div>

            <m-v-p-paginate
                ref="paginateProduct"
                :api="this.$api.store.getProductsStore"
                :param-query="paramGetList"
                @handleData="handleData"
            />
        </div>

        <modal id="modal-confirm-delete">
            <div class="modal-body">
                <p class="d-inline content-center">
                    Bạn có chắc chắn muốn xóa <b>{{ titleDelete }}</b>.
                    <span class="text-red">Không thể khôi phục sau khi xóa</span>
                </p>
            </div>
            <footer class="modal-footer content-center">
                <mvp-button name="OK" @click.native="deleteProduct" />
                <mvp-button name="Hủy bỏ" @click.native="closeModalConfirm" />
            </footer>
        </modal>

        <modal-status-reponse :response="resultStatus" />

        <modal id="modal-off-promotion">
            <div class="modal-body">
                <p class="content-center">
                    Bạn có chắc chắn muốn tắt tính năng giảm giá cho tất cả sản phẩm.
                </p>
            </div>
            <footer class="modal-footer content-center">
                <mvp-button name="OK" @click.native="turnOffPromotion" />
                <mvp-button name="Hủy bỏ" @click.native="closeModalOffPromotion" />
            </footer>
        </modal>
    </div>
</template>

<script>

import SvgIcon from '@/components/common/SvgIcon'
import MVPPaginate from '@/components/common/Paginate'
import ConstantsJS from 'static/constants'
import ModalStatusReponse from '@/components/modal/ModalStatusReponse'
import Modal from '@/components/modal/Modal'
import MvpTextbox from '~/components/MVPControl/MvpTextbox'
import MvpButton from '~/components/MVPControl/MvpButton'
import MvpCheckbox from '~/components/MVPControl/MvpCheckbox'

export default {
    layout: 'admin',
    components: {
        Modal,
        ModalStatusReponse,
        MVPPaginate,
        SvgIcon,
        MvpCheckbox,
        MvpButton,
        MvpTextbox
    },
    data () {
        return {
            data: [],
            listProduct: [],
            imgUrl: process.env.SERVER_IMAGE_URL,
            checked: false,
            resultStatus: '',
            total: 0,
            listProductSelected: [],
            itemSeleted: null,
            titleDelete: '',
            Statuss: [
                'Còn hàng', 'Tạm khóa', 'Đang ẩn', 'Hết hàng'
            ],
            status: '',
            enabled: false
        }
    },
    computed: {
        optionsStatus () {
            const list = []
            this.Statuss.forEach(function (item) {
                list.push({
                    value: item,
                    text: item
                })
            })

            return list
        },
        paramGetList () {
            return this.$route.params.id + '/'
        }
    },
    mounted () {
        this.enabled = this.$route.query.enabled === 'true'
    },
    methods: {
        handleData (data) {
            this.listProduct = data
            this.total = data.length
        },
        confirmDelete (item) {
            this.itemSeleted = item
            this.titleDelete = 'sản phẩm ' + item.name
            this.$bvModal.show('modal-confirm-delete')
        },
        confirmDeletes () {
            this.titleDelete = this.listProductSelected.length + ' sản phẩm đã chọn'
            this.$bvModal.show('modal-confirm-delete')
        },
        async deleteProduct () {
            this.$bvModal.hide('modal-confirm-delete')

            let response = null
            const params = {
                store: this.$route.params.id,
                products: this.listProductSelected
            }

            response = await this.$api.store.deleteProductsStore(params)

            const data = response.data

            if (data.status === ConstantsJS.STR_REQUEST_SUCCESS) {
                this.resultStatus = 'Xóa sản phẩm thành công'

                for (let i = 0; i < this.listProductSelected.length; i++) {
                    this.listProduct.pop(this.listProductSelected[i])
                }
                this.total = this.listProduct.length
                this.listProductSelected = []
            } else {
                this.resultStatus = 'Xóa sản phẩm thất bại, ' + data.message
            }
        },
        closeModalConfirm () {
            this.$bvModal.hide('modal-confirm-delete')
        },
        changeListProductSelected (item, isCheck) {
            if (isCheck) {
                this.listProductSelected.push(item)
            } else {
                this.listProductSelected.pop(item)
            }
        },
        confirmOffPromotionAll () {
            this.$bvModal.show('modal-off-promotion')
        },
        closeModalOffPromotion () {
            this.$bvModal.hide('modal-off-promotion')
        },
        applyPromotionForAll (status) {
            if (status) {
                this.gotoPromotion('all', 0)
            } else {
                this.$bvModal.show('modal-off-promotion')
            }
        },
        gotoPromotion (id, sellPrice) {
            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.PROMOTION_PRODUCT,
                query: {
                    storeId: this.$route.params.id,
                    productId: id,
                    enabled: true,
                    sellingPrice: sellPrice
                }
            })
        },
        async turnOffPromotion () {
            await this.$api.store.turnOffPromotion(this.$route.params.id)
            this.$bvModal.hide('modal-off-promotion')
        }
    },
    head () {
        return {
            title: 'Quản lý sản phẩm của cửa hàng'
        }
    }
}
</script>
