<template>
    <div id="change_payment_method">
        <div class="row modal-header">
            <b class="uppercaseAll">phương thức thanh toán</b>
        </div>
        <div class="row payment-list">
            <p v-for="item in payment" :key="item.typeId" class="border-bottom flex-column-center">
                <input
                    :id="item.typeName"
                    v-model="paymentMethodId"
                    :value="item.typeId"
                    type="radio"
                    name="paymentMethod"
                    :checked="item.status==1"
                >
                <label :for="item.typeName" class="text-extra-dark-gray">{{ item.value }}</label>
            </p>
            <p class="flex-center">
                <button
                    class="btn-apply bg-orange text-white flex-center"
                    @click="updateChecked"
                >
                    Hoàn tất
                </button>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        payment: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            paymentMethodId: null
        }
    },
    methods: {
        updateChecked () {
            this.$emit('update-payment-method', this.paymentMethodId)
            if (this.paymentMethodId === 2 || this.paymentMethodId === 3) {
                this.$bvModal.show('modal-card-type')
            }
            this.$bvModal.hide('modal_choose_payment_method')
        }
    }
}
</script>
<style lang="scss">
@import '~assets/scss/discount';
</style>
