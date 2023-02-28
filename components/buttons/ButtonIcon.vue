<template>
    <button class="btn-icon" :class="{ 'enable': enable }" @click="handleClick">
        <svg
            v-if="iconName=='direct'"
            id="road-sign"
            xmlns="http://www.w3.org/2000/svg"
            width="18.359"
            height="18.359"
            viewBox="0 0 18.359 18.359"
        >
            <rect
                id="Rectangle_34"
                data-name="Rectangle 34"
                width="12.392"
                height="12.392"
                transform="translate(0.266 8.95) rotate(-45)"
            />
            <path id="Path_38" data-name="Path 38" d="M18.173,8.731,9.628.186a.634.634,0,0,0-.9,0L.186,8.731a.634.634,0,0,0,0,.9l8.546,8.546a.634.634,0,0,0,.9,0l8.546-8.546A.634.634,0,0,0,18.173,8.731Zm-8.994,8.1L1.531,9.179,9.18,1.53l7.649,7.649Z" transform="translate(0)" fill="#333" />
            <path id="Path_39" data-name="Path 39" d="M83.185,63.73h-1.8A1.785,1.785,0,0,0,79.6,65.513v3.331a.634.634,0,1,0,1.268,0V65.513A.516.516,0,0,1,81.385,65h1.8l-.525.525a.634.634,0,0,0,.9.9l1.608-1.608a.634.634,0,0,0,0-.9l-1.6-1.6a.634.634,0,0,0-.9.9Z" transform="translate(-72.874 -56.877)" fill="#fff" />
        </svg>
        <svg v-if="iconName=='product'" xmlns="http://www.w3.org/2000/svg" width="18.283" height="16.019" viewBox="0 0 18.283 16.019">
            <g id="cart" transform="translate(0 -34.425)">
                <g id="shopping-basket" transform="translate(0 34.425)">
                    <path id="Path_1580" data-name="Path 1580" d="M13.587,40.3,9.9,34.76a1.035,1.035,0,0,0-.671-.335.763.763,0,0,0-.671.335L4.864,40.3H.839A.792.792,0,0,0,0,41.134v.252l2.1,7.8A1.71,1.71,0,0,0,3.69,50.444h10.9a1.616,1.616,0,0,0,1.593-1.258l2.1-7.8v-.252a.792.792,0,0,0-.839-.839Zm-6.877,0,2.516-3.69,2.516,3.69Zm2.516,6.709A1.677,1.677,0,1,1,10.9,45.328,1.682,1.682,0,0,1,9.226,47.005Z" transform="translate(0 -34.425)" />
                </g>
            </g>
        </svg>
    </button>
</template>
<style lang="scss">
    .btn-icon{
        height: 30px;
        width: 30px;
        padding: 5px;
        background: #EFF3F6;
        border: none;
        border-radius: 50%;
        fill: #707070;
        &:focus{
            outline: none;
        }
        &.enable{
            fill:#fe7235;
        }
    }
</style>
<script>
export default {
    name: 'ButtonIcon',
    props: {
        iconName: {
            type: String,
            default: 'direct',
            description: 'direct | product'
        },
        enable: {
            type: Boolean,
            default: false,
            description: 'change color'
        }
    },
    methods: {
        handleClick (evt) {
            this.$emit('click', evt)
        }
    }
}
</script>
