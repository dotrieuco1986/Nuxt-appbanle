<template lang="html">
    <div>
        <modal id="modal-request-pay" ref="ModalrequestPay" size="md">
            <div class="modal-request-pay">
                <p>{{ description }}</p>
                <p class="money">
                    {{ totalAmount | formatNumber }}
                </p>
                <button class="btn btn-mvp payment mr-2" @click="okClick">
                    {{ okTxt }}
                </button>
                <button class="btn btn-mvp cancel" @click="close">
                    {{ okCancel }}
                </button>
            </div>
        </modal>
        <modal-method-pay
            ref="ModalMethodPay"
            :amount="totalAmount"
            :return-url="returnUrl"
            :order-type="orderType"
            :call-back-update="callBackUpdate"
        />
    </div>
</template>

<script>
import '@/components/MVPControl/MvpButton'
export default {
    filters: {
        formatNumber (number) {
            return (new Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'VND' }).format(number))
        }
    },
    props: {
        okTxt: {
            type: String,
            default: 'THANH TOÁN'
        },
        okCancel: {
            type: String,
            default: 'HỦY'
        },
        totalAmount: {
            type: Number,
            default: 0
        },
        description: {
            type: String,
            default: ''
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
        }
    },
    methods: {
        okClick (evt) {
            this.$refs.ModalMethodPay.show()
            this.$refs.ModalrequestPay.hide()
        },
        show () {
            this.$refs.ModalrequestPay.show()
        },
        close (evt) {
            this.$emit('close-click', evt)
            this.$refs.ModalrequestPay.hide()
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variable';
.modal-request-pay {
    text-align: center;

    .money {
        color: $orange;
        font-size: 30px;
        font-weight: bold;
    }

    .cancel {
        background-color: $gray;
        color: $white;
        font-weight: bold;
        width: 126px;
    }

    .payment-success-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .payment-success-icon {
        width: 55px;
        height: 55px;
        background-color: $green;
        border-radius: 50%;
        font-size: 30px;
    }
}
.payment {
    background-color: $orange;
    color: $white;
    font-weight: bold;
    width: 126px;
}
</style>
