<template>
    <advertisementForm />
</template>

<script>
import advertisementForm from '~/components/advertisement/advertisementFormAdmin'

export default {
    layout: 'admin',
    components: {
        advertisementForm
    },
    data () {
        return {
            breadcrumbs: [
                {
                    text: 'Quản Lý Quảng Cáo',
                    href: '/admin/advertisement/list'
                },
                {
                    text: 'Tạo Quảng Cáo Mới',
                    active: true
                }
            ]
        }
    },
    head () {
        return {
            title: 'Quản lý quảng cáo - Tạo quảng cáo mới'
        }
    }
}
</script>

<style lang="scss">

</style>
