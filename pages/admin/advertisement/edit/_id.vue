<template>
    <div>
        <advertisementForm :head-title="'Chỉnh sửa quảng cáo'" />
    </div>
</template>

<script>
import advertisementForm from '~/components/advertisement/advertisementFormAdmin'

export default {
    layout: 'admin',
    components: {
        advertisementForm
    },
    head () {
        return {
            title: 'Quản lý quảng cáo - Chỉnh sửa quảng cáo'
        }
    }
}
</script>
