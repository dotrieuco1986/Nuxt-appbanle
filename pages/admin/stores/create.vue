<template>
    <store />
</template>
<script>
import store from '~/components/Store/Store'
export default {
    layout: 'admin',
    components: {
        store
    },
    head () {
        return {
            title: 'Tạo cửa hàng'
        }
    }
}
</script>
