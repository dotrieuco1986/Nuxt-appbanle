<template lang="html">
    <div class="loading">
        <div class="lds-ripple">
            <div /><div />
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.loading{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%
}
.lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    div {
        position: absolute;
        border: 4px solid #24B400;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        &:nth-child(2) {
            animation-delay: -0.5s;
        }
    }
}
@keyframes lds-ripple {
    0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
    }
    100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
    }
}
</style>
