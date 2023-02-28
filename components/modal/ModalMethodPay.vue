<template lang="html">
    <div>
        <modal id="modal-method-pay" ref="myModal" size="md">
            <div class="modal-method-pay">
                <p>
                    PHƯƠNG THỨC THANH TOÁN
                </p>
                <div class="radio">
                    <template v-if="defaultPayment">
                        <input
                            id="three"
                            class="fl-left"
                            name="check_md"
                            type="radio"
                            :value="defaultPayment.value"
                        >
                        <label for="three">{{ defaultPayment.description }}</label>
                        <div class="border-bottom mt-2 mb-2" />
                    </template>
                    <input
                        id="one"
                        class="fl-left"
                        name="check_md"
                        type="radio"
                        value="INT"
                        @change="change"
                    >
                    <label for="one">Thẻ tín dung Visa, Master, JCB, Amex</label>
                    <div class="border-bottom mt-2 mb-2" />
                    <input
                        id="two"
                        class="fl-left"
                        name="check_md"
                        type="radio"
                        value="ATM"
                        @change="change"
                    >
                    <label for="two">Thẻ ATM nội địa</label>
                    <div class="border-bottom mt-2 mb-2" />
                </div>
                <div class="text-center">
                    <button class="btn btn-mvp payment" :disabled="getComplete" @click="payment">
                        HOÀN TẤT
                    </button>
                </div>
            </div>
        </modal>
        <modal-card-type
            ref="modalCardType"
            :amount="amount"
            :return-url="returnUrl"
            :order-type="orderType"
            :payment-method="getpayMethod"
            :call-back-update="callBackUpdate"
        />
    </div>
</template>

<script>
export default {
    props: {
        amount: {
            type: Number,
            default: 0
        },
        returnUrl: {
            type: String,
            default: ''
        },
        orderType: {
            type: String,
            default: ''
        },
        callBackUpdate: {
            type: Boolean,
            default: false
        },
        defaultPayment: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            paymentMethod: '',
            disabledComplete: true
        }
    },
    computed: {
        getpayMethod () {
            return this.paymentMethod
        },
        getComplete () {
            return this.disabledComplete
        }
    },
    methods: {
        change (evt) {
            this.paymentMethod = evt.target.value
            this.disabledComplete = false
        },
        payment () {
            this.$refs.modalCardType.show()
            this.hide()
        },
        show () {
            this.$refs.myModal.show()
        },
        hide () {
            this.$refs.myModal.hide()
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variable';
@import '@/assets/scss/_checkbox';
.modal-method-pay {
    p {
        font-weight: bold;
        font-size: 16px;
        color: $orange;
    }

    label {
        color: $extra-dark-gray;
    }
}
</style>
