<template lang="html">
    <modal id="modal-success" ref="modalSuccess" :size="size" @closeModal="close">
        <div class="modal-success">
            <div class="success-center mb-3">
                <div class="success-icon success-center">
                    <svg-icon icon="check" />
                </div>
            </div>
            <p>{{ msg }}</p>
            <slot />
        </div>
    </modal>
</template>
<script>
import '@/components/common/SvgIcon'
export default {
    props: {
        size: {
            type: String,
            default: 'sm',
            description: 'sm, md , lg, or xl'
        },
        msg: {
            type: String,
            default: ''
        }
    },
    methods: {
        hide () {
            this.$refs.modalSuccess.hide()
        },
        show () {
            this.$refs.modalSuccess.show()
        },
        close (evt) {
            this.$emit('closeModal', evt)
        }
    }
}
</script>
<style lang="scss">
@import '@/assets/scss/_variable';
    .modal-success {
        text-align: center;
    }
    .success-center{
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
</style>
