<template>
    <div id="discount_box">
        <div>
            <div class="row modal-header uppercaseAll">
                <b>{{ $t('components.Promotions.promotion') }}</b>
            </div>
            <InputTypeOne
                :place-hoder="'Nhập mã voucher của shop'"
            />
            <div class="row discount-selected flex-column-center">
                <span v-if="setApplyPromotionTitle">{{ $t('components.Promotions.choosedPromotion') }}</span>&nbsp;
                <b class="orange">{{ setApplyPromotionTitle }}</b>
            </div>
            <div class="row discount-list">
                <template v-for="promotion in discount">
                    <promotionItem
                        :key="promotion.id"
                        :promo="promotion"
                        @update-check="updateChecked"
                    />
                </template>
            </div>
            <div class="row discount-apply flex-center" @click="applyPromotion">
                <b class="uppercaseFirst">{{ $t('components.Promotions.btnApply') }}</b>
            </div>
        </div>
    </div>
</template>
<script>
/* estlint disable */
import InputTypeOne from '../common/inputTypeOne'
import promotionItem from './PromotionItem'

export default {
    filters: {
        formatNumber (number) {
            return (new Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'VND' }).format(number))
        }
    },
    components: {
        promotionItem,
        InputTypeOne
    },
    props: {
        discount: {
            type: Array,
            default: null
        },
        totalCost: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            applyResult: null
        }
    },
    computed: {
        setApplyPromotionTitle (state) {
            const promoItem = this.discount.find((element) => {
                if (element.type === 1 || element.type === -1) { return element }
            })
            if (promoItem) {
                if (promoItem.format_type === 1) { return 'ưu đãi ' + promoItem.format_value + 'đ' } else { return 'giảm ' + promoItem.format_value + '%' }
            } else {
                return ''
            }
        }
    },
    methods: {
        async getPromo (param) {
            return await this.$api.promotions.getUserPromotions(param)
        },
        prepareApplyPromotion (state) {
            const currPromotion = this.discount.find((element) => { return element.type === 1 || element.type === -1 })
            if (!currPromotion) { return 'Bạn chưa chọn voucher nào' }
            let result = true
            if (currPromotion.format_type === 0) { return result } else {
                const totalCost = this.totalCost
                if (totalCost < currPromotion.condition_value) { result = 'Bạn cần mua thêm sản phẩm để dùng voucher này!' } else {
                    const promoOfShop = [];
                    (async () => {
                        const promises = []
                        promises.push(promoOfShop.push(await this.getPromo(this.shopId)))
                        await Promise.all(promises).then(() => {
                            const avaiablePromotion = promoOfShop.find((ele) => { return ele.id === currPromotion.id })
                            if (avaiablePromotion.enable !== 1) { result = 'Mã voucher đã được áp dụng thành công' }
                        })
                    })()
                }
                return result
            }
        },
        updateAppliedPromotion (state) {
            this.discount.map((promo) => {
                if (promo.type === 1) { promo.type = -1 }
            })
        },
        applyPromotion () {
            this.applyResult = this.prepareApplyPromotion()
            if (this.applyResult === true) { this.updateAppliedPromotion() }
            this.$emit('applyResult', this.applyResult)
        },
        updateChecked (data) {
            if (data.type === 0) {
                this.discount.map((promo) => {
                    promo.type = promo.id === data.id ? 1 : 0
                })
                return
            }
            if (data.type === 1) {
                this.discount.map((promo) => {
                    promo.type = promo.id === data.id ? 0 : 0
                })
                return
            }
            if (data.type === -1) {
                this.discount.map((promo) => {
                    promo.type = promo.id === data.id ? 1 : 0
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/discount';
</style>
