
<template>
    <div>
        <store :head-title="'Chỉnh sửa cửa hàng'" />
    </div>
</template>
<script>
import store from '~/components/Store/Store'
export default {
    layout: 'admin',
    components: {
        store
    },
    data () {
        return { }
    },
    head () {
        return {
            title: 'Chỉnh sửa cửa hàng'
        }
    }
}
</script>
