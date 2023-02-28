
<template>
    <div>
        <chain :head-title="'Chỉnh Sửa Chuỗi Cửa Hàng'" />
    </div>
</template>
<script>
import chain from '~/components/Store/Chain'
export default {
    layout: 'admin',
    components: {
        chain
    },
    data () {
        return {}
    },
    mounted () {
    },
    head () {
        return {
            title: 'Chỉnh sửa chuỗi cửa hàng'
        }
    }
}
</script>
