<template>
    <button class="btn-number d-flex justify-content-between" :class="{ 'active': active }" @click="handleClick">
        <span>{{ text }}</span>
        <span class="number">{{ number }}</span>
    </button>
</template>
<style lang="scss">
.btn-number{
    border: 1px solid #CBD4DA;
    border-radius: 30px;
    height: 30px;
    min-width: 87px;
    padding: 0px;
    flex-direction: row;
    &:focus{
        outline: none;
    }
    &.active{
        background: #FE7235;
        span{
            color:#fff;
        }
    }
    span{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 7px;
        color:#707070;
        font-size: 14px;
        ~.number{
            background: #4AA9C5;
            float: right;
            border-radius: 50%;
            height: 28px;
            width: 28px;
            color:#fff;
            font-size: 12px;
            padding: 0px;
        }
    }

}

</style>
<script>
export default {
    name: 'ButtonNumber',
    components: {
    },
    props: {
        text: {
            type: String,
            default: '',
            description: 'text for button'
        },
        number: {
            type: Number,
            default: 0,
            description: 'text for button'
        },
        active: {
            type: Boolean,
            default: false,
            description: 'text for button'
        }
    },
    data () {
        return {
        }
    },
    methods: {
        handleClick (evt) {
            this.$emit('click', evt)
        }
    }

}
</script>
