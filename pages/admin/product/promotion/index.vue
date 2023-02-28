<template>
    <promotion-store :store-id="storeId" :product-id="productId" :enabled="enabled" :selling-price="sellingPrice" />
</template>
<script>
import PromotionStore from '@/components/Promotions/PromotionStore'
export default {
    components: { PromotionStore },
    layout: 'admin',
    data () {
        return {
            storeId: '',
            productId: '',
            enabled: false,
            sellingPrice: ''
        }
    },
    mounted () {
        this.storeId = this.$route.query.storeId
        this.productId = this.$route.query.productId
        this.enabled = this.$route.query.enabled === 'true'
        this.sellingPrice = this.$route.query.sellingPrice
    }
}
</script>

<style scoped>

</style>
