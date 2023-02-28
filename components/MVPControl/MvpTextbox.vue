<template>
    <input
        class="mvp-textbox"
        :disabled="disabled"
        :maxlength="maxLength"
        :value="value"
        :type="type"
        :min="min"
        :max="max"
    >
</template>

<script>
export default {
    name: 'MvpTextbox',
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
        },
        type: {
            type: String,
            default: ''
        },
        min: {
            type: Number,
            default: -9999999999999
        },
        max: {
            type: Number,
            default: 9999999999999
        }
    }
}
</script>

<style type="scss">
    .mvp-textbox{
        font-size: 14px !important;
        padding: 10px;
        border-radius: 3px;
        border: 1px solid #CBD4DA ;
        width: 100%;
        height: 38px;
    }
</style>
