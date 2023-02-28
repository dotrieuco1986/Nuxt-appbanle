<template>
    <label class="checkbox-container">
        <input type="checkbox" class="check-box" :checked="checked">
        <span v-if="name" class="uppercaseFirst">{{ name }}</span>
    </label>
</template>

<script>
export default {
    name: 'MvpCheckbox',
    props: {
        name: {
            type: String,
            default: ''
        },
        checked: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
    @import '../../assets/scss/_checkbox';
</style>
