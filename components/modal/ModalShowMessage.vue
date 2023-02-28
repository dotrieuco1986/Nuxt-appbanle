<template lang="html">
    <modal :id="id" :size="size">
        <div class="modal-show-message">
            <div class="center mb-3">
                <div :class="classDefined + '-icon center'">
                    <svg-icon :icon="icon" />
                </div>
            </div>
            <p class="center">
                {{ msg }}
            </p>
            <button class="btn btn-mvp cancel" @click="close">
                {{ okCancel }}
            </button>
        </div>
    </modal>
</template>
<script>
import '@/components/common/SvgIcon'
export default {
    props: {
        id: {
            type: String,
            default: 'modal-show-message'
        },
        size: {
            type: String,
            default: 'sm',
            description: 'sm, md, lg, or xl'
        },
        msg: {
            type: String,
            default: ''
        },
        classDefined: {
            type: String,
            default: 'error'
        },
        okCancel: {
            type: String,
            default: 'Đóng'
        },
        icon: {
            type: String,
            default: 'check'
        }
    },
    methods: {
        close (evt) {
            this.$emit('close-click', evt)
            this.$bvModal.hide(this.id)
        }
    }
}
</script>
<style lang="scss">
@import '@/assets/scss/_variable';
    .modal-show-message {
        text-align: center;
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .success-icon {
        width: 55px;
        height: 55px;
        background-color: $green;
        border-radius: 50%;
        font-size: 30px;
    }
    .error-icon {
        width: 55px;
        height: 55px;
        background-color: $red;
        border-radius: 50%;
        font-size: 30px;
    }
    .cancel {
        background-color: $gray;
        color: $white;
        font-weight: bold;
        width: 126px;
    }
</style>
