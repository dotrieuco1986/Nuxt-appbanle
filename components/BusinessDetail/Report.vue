<template>
    <div class="">
        <h5>BÁO CÁO</h5>

        <div class="record">
            <mvp-checkbox
                :checked="status"
                name="Cửa hàng không tồn tại"
                @change.native="status = $event.target.checked, disabled = !disabled, disabled?note=noteReport:note=''"
            />
        </div>
        <div class="record">
            <span>Thông tin thêm</span>
            <mvp-textbox :max-length="300" :disabled="status===false" :value="note" @input.native="note = $event.target.value" />
            <div class="col">
                <span class="float-right">{{ note.length }}/300</span>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col">
                <mvp-button :disabled="disabled" name="GỬI" style="width: 100%" @click.native="doReport" />
            </div>
        </div>

        <modal-status-reponse :response="resultDelete" />
    </div>
</template>

<script>
import ModalStatusReponse from '@/components/modal/ModalStatusReponse'
import MvpTextbox from '../MVPControl/MvpTextbox'
import MvpButton from '../MVPControl/MvpButton'
import MvpCheckbox from '../MVPControl/MvpCheckbox'
export default {
    name: 'Report',
    components: { ModalStatusReponse, MvpCheckbox, MvpButton, MvpTextbox },
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        photos: {
            type: Array,
            default: null
        },
        geometry: {
            type: Object,
            default: null
        },
        statusReport: {
            type: Boolean,
            default: false
        },
        noteReport: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            resultDelete: '',
            status: this.statusReport,
            note: this.noteReport,
            disabled: true
        }
    },
    methods: {
        doReport () {
            const formData = new FormData()
            formData.append('id', this.id)
            formData.append('code_thua_id', '')
            formData.append('businessName', this.name)
            formData.append('typeName', this.type)
            formData.append('reason', this.note)
            formData.append('address', this.address)
            formData.append('deleteStatus', this.status)

            this.report(formData)
        },
        async report (formData) {
            const response = await this.$api.store.report(formData)

            if (response) {
                this.resultDelete = 'Báo cáo thành công'
            } else {
                this.resultDelete = 'Báo cáo thất bại'
            }
        }
    }
}
</script>

<style scoped>

</style>
