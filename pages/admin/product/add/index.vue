<template>
    <div class="p-4">
        <div class="d-flow-root">
            <list-check-box ref="listProduct" name="Sản phẩm" :data="products" type="product" />
            <span class="text-red float-right">{{ productsError }}</span>
        </div>
        <div class="d-flow-root">
            <list-check-box ref="listStore" name="Chọn cửa hàng" :data="stores" type="store" />
            <span class="text-red float-right">{{ storesError }}</span>
        </div>

        <div class="form-group row">
            <div class="col-6 text-right">
                <n-link to="/admin/store/product">
                    <mvp-button name="Hủy bỏ" />
                </n-link>
            </div>
            <div class="col-6 text-left">
                <mvp-button name="Hoàn tất" @click.native="addProduct2Store" />
            </div>
        </div>

        <modal-status-reponse :response="resultStatus" />
    </div>
</template>

<script>
import ListCheckBox from '@/components/MVPControl/ListCheckBox'
import MvpButton from '@/components/MVPControl/MvpButton'
import ModalStatusReponse from '@/components/modal/ModalStatusReponse'

export default {
    components: { ModalStatusReponse, MvpButton, ListCheckBox },
    layout: 'admin',
    async fetch () {
        let response = await this.$api.store.getAllWareHouse()
        this.products = response.data

        response = await this.$api.store.getStores('?page=0')
        this.stores = response.data
    },
    data () {
        return {
            stores: [],
            products: [],
            storesError: '',
            productsError: '',
            resultStatus: ''
        }
    },
    methods: {
        async addProduct2Store () {
            const selectedProducts = this.$refs.listProduct.selected
            const selectedStores = this.$refs.listStore.selected

            if (selectedProducts.length === 0) {
                this.productsError = 'Chưa chọn sản phẩm'
                return
            } else {
                this.productsError = ''
            }

            if (selectedStores.length === 0) {
                this.storesError = 'Chưa chọn cửa hàng'
                return
            } else {
                this.productsError = ''
            }

            const param = {
                products: selectedProducts,
                stores: selectedStores
            }

            await this.$api.store.addProduct2Store(param)
            this.resultStatus = 'Thêm sản phẩm thành công'
        }
    }
}
</script>

<style scoped>
.d-flow-root{
    display: flow-root;
}
</style>
