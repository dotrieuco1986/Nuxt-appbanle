<template v-if="promo.enable">
    <div :id="promo.id" class="discount-item" :class="promoStyle" @click="updatePromotionsStatus">
        <span class="btn-close" @click="updatePromotionsStatus" />
        <b v-if="promo.format_type === 1" class="discount-title">{{ $t('components.Promotions.promoItemFormatType1') }} {{ promo.condition_value|formatNumber }}</b>
        <b v-if="promo.format_type === 0" class="discount-title">{{ $t('components.Promotions.promoItemFormatType2') }} {{ promo.format_value }} % {{ $t('components.Promotions.promoItemForamtType2MaxValue') }} {{ promo.format_max_value|formatNumber }}</b>
        <span class="discount-duration">{{ promo.time_start }} - {{ promo.time_unlimited ==1 ? 'Unlimited' : promo.time_end }}</span>
        <p class="discount-code flex-center">
            <b v-if="promo.format_type === 1">{{ $t('components.Promotions.promoItemDecrease') }} {{ promo.format_value|formatNumber }}</b>
            <b v-if="promo.format_type === 0">{{ $t('components.Promotions.promoItemDecrease') }} {{ promo.format_value }}%</b>
        </p>
    </div>
</template>
<script>
import { mapState } from 'vuex'
// import moment from 'moment'

export default {
    filters: {
        formatNumber (number) {
            return (new Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'VND' }).format(number))
        }
    },
    props: {
        promo: {
            type: Object,
            default: null
        }
    },
    computed: mapState({
        promoStyle () {
            if (this.promo.type === -1) { return 'disabled' } else if (this.promo.type === 1) { return 'actived' } else { return '' }
        }
    }),
    methods: {
        updatePromotionsStatus () {
            this.$emit('update-check', this.promo)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/discount';
</style>
