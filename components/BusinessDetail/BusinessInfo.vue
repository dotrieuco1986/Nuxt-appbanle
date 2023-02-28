<template>
    <div class="business-info-component">
        <div class="row">
            <div class="col-1">
                <svg-icon :icon="icon" class="icon-info-business" />
            </div>
            <div class="col">
                <span class="info-business">{{ name }}</span>
            </div>
        </div>
    </div>
</template>
<script>

import SvgIcon from '../common/SvgIcon'
export default {
    components: { SvgIcon },
    props: {
        name: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
    .info-business{
        overflow-wrap: anywhere;
    }
</style>
