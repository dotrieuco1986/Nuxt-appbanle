<template>
    <div :style="'width: ' + width + '%'" />
</template>
<script>
export default {
    name: 'Column',
    props: {
        width: {
            type: Number,
            default: 100
        }
    }
}
</script>

<style scoped>

</style>
