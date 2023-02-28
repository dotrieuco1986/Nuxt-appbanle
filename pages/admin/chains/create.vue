<template>
    <chain />
</template>
<script>
import chain from '~/components/Store/Chain'
export default {
    layout: 'admin',
    components: {
        chain
    },
    head () {
        return {
            title: 'Tạo chuỗi cửa hàng'
        }
    }
}
</script>
