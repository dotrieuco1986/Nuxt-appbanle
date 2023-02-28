<template>
    <div id="success_content" class="flex-center flex-column">
        <span class="success-icon flex-center">
            <SvgIcon icon="check" grow-by-height="28px" has-fill="false" />
        </span>
        <p class="success-text">
            <b>{{ successText }}</b>
        </p>
    </div>
</template>
<script>
import SvgIcon from './SvgIcon'
export default {
    components: {
        SvgIcon
    },
    props: {
        successText: {
            type: String,
            default: 'Success!'
        }
    }
}
</script>

<style lang="scss">
@import '~assets/scss/_variable';
#success_content{
    padding-top:20px;
    .success-icon{
        width:55px; height:55px;
        border-radius:100%;
        background:$green;
        margin-bottom:15px;
    }
    .success-text{
        font-size:18px;
        text-align:center;
    }
}

</style>
