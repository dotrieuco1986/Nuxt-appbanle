<template>
    <div class="row discount-input input-format-one">
        <input
            :type="type"
            :placeholder="placeHolder"
            :disabled="disableInput"
            :pattern="type==='tel' ? '[0-9]{3}-[0-9]{2}-[0-9]{3}' : ''"
            :maxlength="type==='tel' ? '10' : ''"
            @input="returnValue($event)"
        >
        <p v-if="hasBtnApply" class="btn-apply flex-center" :class="BtnApplyStyle">
            {{ $t('components.Promotions.btnApply') }}
        </p>
    </div>
</template>
<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        hasBtnApply: {
            type: Boolean,
            default: true
        },
        placeHolder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        }
    },
    computed: {
        disableInput () {
            return this.disabled
        },
        BtnApplyStyle () {
            return this.disabled === true ? 'bg-gray' : 'bg-blue'
        }
    },
    methods: {
        returnValue (e) {
            this.$emit('return-value', e.target.value)
        }
    }
}
</script>
<style lang="scss" scope>
@import '~assets/scss/variable';
.input-format-one {
    height: 40px;
    border-radius: $border-radius;
    border: 1px solid $extra-light-blue;
    position:relative;
    input{
        display: flex;
        flex: 1;
        height: inherit;
        font-size: 14px;
        border: none;
        height: 100%;
        border-radius: $border-radius;
        &:focus {
            outline: none;
            color: $dark-gray
        }
    }
    .btn-apply {
        height: inherit;
        border-radius: $border-radius;
        min-width: 110px;
        color: $white;
        font-size: 16px;
        position: absolute;
        top: -1px;
        right: -1px;
        cursor: pointer;
        margin:0 !important; padding:0;
    }
}
</style>
