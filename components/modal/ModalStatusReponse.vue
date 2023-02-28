<template>
    <modal id="modal-response">
        <div class="modal-body">
            <p class="content-center">
                {{ response }}.
            </p>
        </div>
        <footer class="modal-footer content-center">
            <mvp-button name="OK" @click.native="closeModal" />
        </footer>
    </modal>
</template>

<script>
import Modal from '@/components/modal/Modal'
import MvpButton from '@/components/MVPControl/MvpButton'
export default {
    name: 'ModalStatusReponse',
    components: { MvpButton, Modal },
    props: {
        response: {
            type: String,
            default: ''
        }
    },
    watch: {
        response (newVal, oldVal) {
            if (newVal) {
                this.$bvModal.show('modal-response')
            }
        }
    },
    methods: {
        closeModal () {
            this.$bvModal.hide('modal-response')
        }
    }
}
</script>
