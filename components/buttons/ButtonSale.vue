<template>
    <button class="btn-sale" @click="handleClick">
        {{ text }}
    </button>
</template>
<style lang="scss">
.btn-sale{
    background: #FE7235;
    border: none;
    color:#fff;
    line-height: 25px;
    position: relative;
    font-size: 16px;
    border-radius: 6px;
    padding: 0px 10px;
    &:focus{
        outline: none;
    }
    &:after,&:before{
        width: 0;
        height: 0;
        border: 4px solid #fff;
        position: absolute;
        content: "";
        border-radius: 50%;
        top: 8px;
    }
    &:after{
        right:-4px;
    }
    &:before{
        left:-4px;
    }
}
</style>
<script>
export default {
    name: 'ButtonSale',
    props: {
        text: {
            type: String,
            default: '',
            description: 'text for button'
        }
    },
    methods: {
        handleClick (evt) {
            this.$emit('click', evt)
        }
    }
}
</script>
