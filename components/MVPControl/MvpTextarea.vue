<template>
    <textarea class="mvp-textarea" :value="value" :aria-label="value" :disabled="disabled" :maxlength="maxLength" />
</template>

<script>
export default {
    name: 'MvpTextarea',
    props: {
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        maxLength: {
            type: Number,
            default: 30000
        }
    }
}
</script>

<style type="scss">
    .mvp-textarea{
        padding: 10px;
        border-radius: 3px;
        font-size: 14px;
        border: 1px solid #CBD4DA ;
        width: 100%;
    }
</style>
