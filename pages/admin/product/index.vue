<template>
    <div class="p-3 fz">
        <div class="row justify-content-between">
            <div class="col-3">
                <label class="text-orange">Quản Lý Sản Phẩm</label>
            </div>

            <div class="col-6">
                <div class="row pr-3">
                    <div class="col pr-0">
                        <mvp-textbox id="linkCopy" ref="linkCopy" />
                    </div>
                    <div class="float-right">
                        <mvp-button icon="search" />
                    </div>
                </div>
            </div>
            <div class="col-3">
                <n-link to="/admin/product/create">
                    <mvp-button icon="add" name="Tạo sản phẩm" />
                </n-link>
            </div>
        </div>

        <div class="row justify-content-center pt-3">
            <div class="col">
                <n-link v-show="listProduct.length>0" to="/admin/product/add">
                    <mvp-button icon="add" color="btn-backend" name="Thêm sản phẩm vào cửa hàng" />
                </n-link>
                <mvp-button
                    v-show="listProductSelected.length > 0"
                    icon="delete"
                    color="backend"
                    name="Xóa sản phẩm"
                    @click.native="confirmDeletes"
                />
            </div>
            <div v-if="total>0" class="col">
                <label class="float-right">{{ total }} Sản Phẩm</label>
            </div>
        </div>

        <div class="row p-3">
            <div v-for="item in listProduct" :key="item.id" class="record-product">
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
                            <span>Ma san pham: {{ item.sku_code }}</span>
                        </div>
                    </div>
                </div>

                <div class="col-3 pl-4">
                    <div class="row">
                        <n-link :to="'/admin/product/edit/'+item.id">
                            <label style="padding-right: 3px">Chỉnh sửa</label>
                            <svg-icon icon="edit" />
                        </n-link>
                    </div>
                    <div class="row" @click="confirmDelete(item)">
                        <label style="padding-right: 50px">Xóa</label>
                        <svg-icon icon="recycle-bin" />
                    </div>
                </div>

                <div class="col-2">
                    <label>Đơn giá: {{ item.selling_price }} đ </label>
                </div>
            </div>

            <m-v-p-paginate
                ref="paginateProduct"
                :api="this.$api.store.getWareHouse"
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
                <mvp-button name="OK" @click.native="deleteProduct()" />
                <mvp-button name="Hủy bỏ" @click.native="closeModalConfirm" />
            </footer>
        </modal>

        <modal-status-reponse :response="resultStatus" />
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
            titleDelete: ''
        }
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
            let params = {}
            if (this.titleDelete.includes('đã chọn')) {
                params = {
                    products: this.listProductSelected
                }
            } else {
                params = {
                    products: [
                        this.itemSeleted
                    ]
                }
            }

            response = await this.$api.store.deleteProduct(params)

            const data = response.data

            if (data.status === ConstantsJS.STR_REQUEST_SUCCESS) {
                this.resultStatus = 'Xóa sản phẩm thành công'

                if (this.titleDelete.includes('đã chọn')) {
                    for (let i = 0; i < this.listProductSelected.length; i++) {
                        this.listProduct.pop(this.listProductSelected[i])
                    }
                } else {
                    this.listProduct.pop(this.itemSeleted)
                }
                this.total = this.listProduct.length
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
        }

    },
    head () {
        return {
            title: 'Quản lý sản phẩm'
        }
    }
}
</script>
