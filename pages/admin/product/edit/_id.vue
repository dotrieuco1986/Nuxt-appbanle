<template>
    <modify-product :id="$route.params.id" :product="product" :action="action" :business-id="businessId" />
</template>

<script>
import ModifyProduct from '@/components/Product/ModifyProduct'
export default {
    layout: 'admin',
    components: { ModifyProduct },
    async fetch () {
        const response = await this.$api.store.getProduct(this.$route.params.id)
        this.product = response.data
    },
    data () {
        return {
            product: {},
            action: 'update',
            businessId: ''
        }
    },
    mounted () {
        const action = this.$route.query.action
        if (action) {
            this.action = action
        }

        const businessId = this.$route.query.businessId
        if (businessId) {
            this.businessId = businessId
        }
    }
}
</script>
