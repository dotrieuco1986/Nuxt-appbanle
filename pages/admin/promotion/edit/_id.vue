<template>
    <div>
        <EditPromotion />
    </div>
</template>
<script>
import EditPromotion from '../../../../components/Promotions/Edit'
export default {
    layout: 'admin',
    components: {
        EditPromotion
    },
    head () {
        return {
            title: 'Chỉn sửa khuyến mãi'
        }
    }
}
</script>
