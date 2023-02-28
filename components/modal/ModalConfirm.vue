<template lang="html">
    <modal :id="id" :size="size">
        <div class="modal-request-pay">
            <p>{{ description }}</p>
            <button class="btn btn-mvp payment mr-2" @click="okClick">
                {{ okTxt }}
            </button>
            <button class="btn btn-mvp cancel" @click="close">
                {{ okCancel }}
            </button>
        </div>
    </modal>
</template>

<script>
import '~/components/MVPControl/MvpButton'
export default {
    props: {
        id: {
            type: String,
            default: 'modal-payment-request'
        },
        okTxt: {
            type: String,
            default: 'XÓA'
        },
        okCancel: {
            type: String,
            default: 'HỦY'
        },
        size: {
            type: String,
            default: 'md',
            description: 'sm, md , lg, or xl'
        },
        description: {
            type: String,
            default: ''
        },
        idItem: {
            type: String,
            default: ''
        }
    },
    methods: {
        okClick (evt) {
            this.$emit('ok-click', evt)
            this.$bvModal.hide(this.id)
        },
        close (evt) {
            this.$emit('close-click', evt)
            this.$bvModal.hide(this.id)
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

    .payment {
        background-color: $orange;
        color: $white;
        font-weight: bold;
        width: 126px;
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
</style>
