<template>
    <div id="top_nav" :style="{ 'background-image': 'url(../../images/header-bg.png)' }">
        <div class="top-logo-block">
            <img :src="'../../images/fab-logo.png'" class="logo-style">
        </div>
        <div class="top-nav">
            <div class="nav-item">
                ABOUT US
            </div>
            <div class="nav-item">
                TECHNOLOGY
            </div>
            <div class="nav-item">
                PRODUCTS
            </div>
            <div class="nav-item none-border">
                CONTACT US
            </div>
            <div class="nav-item none-border icon-search">
                <img :src="'../../images/search-icon.svg'">
            </div>
        </div>
        <div class="top-nav-phone-number">
            <img class="phone-icon" :src="'../../images/phone-call.svg'">
            <span class="phone-number">0909 123 456</span>
        </div>
    </div>
</template>
<script>
export default
({
    components:
    {
        // shoppingCart,
        // shopCheckout
    },
    data () {
        return {
            shops: null,
            showCheckout: false
        }
    },
    methods: {
        // getShopsData (shops) {
        //     this.shops = shops
        //     this.showCheckout = true
        // },
        // editShoppingCart () {
        //     this.showCheckout = false
        // }
    }
})
</script>
<style lang="scss">
@import '~assets/scss/_variable';
#top_nav{
    width:100%;
    background-color: #dfdfdf;
    background-size: 100% auto;
    background-position: 0 -50%;
    position:absolute;
    left:0; top:140px;
    z-index: 10000;
    .top-logo-block{
        width: 420px;
        height: 135px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 2;
        background: #fff;
        &::before{
            width: 96px;
            height: 159px;
            content: '';
            display: block;
            position: absolute;
            right: -48px;
            bottom: 4px;
            background: #fff;
            border-radius: 100%;
        }
        .logo-style{
            max-width:200px;
            max-height: 119px;
        }
    }
    .top-nav{
        width:100%;
        height:55px;
        background:#31CA31;
        position: absolute;
        bottom:5px;
        padding-left:420px;
        display:flex;
        .nav-item{
            padding:0 40px;
            font-size: 16px;
            color:#fff;
            text-align: center;
            height: 100%;
            display: flex;
            align-items: center;
            position: relative;
            &::before{
                width:1px;
                height:50%;
                content:'';
                display:block;
                background:#fff;
                position:absolute;
                right:0; top:25%;
            }
            &.none-border::before{
                display:none;
            }
            &:nth-child(1){
                padding-left:78px;
            }
            &.icon-search{
                position: absolute;
                right:142px;
                padding:0;
                img{
                    width:26px; height:26px;
                }
            }
        }

    }
    .top-nav-phone-number{
        height:40px;
        font-size: 20px;
        display:flex;
        align-items: center;
        background:#fff;
        border-radius: 40px;
        border:1px solid #31CA31;
        position: absolute;
        right: 142px;
        top: 21px;
        span.phone-number{
            font-size: 20px;
            color:#FD0100;
            text-align: center;
            margin:0 5px 0 18px;
        }
        .phone-icon{
            width:36px; height:36px;
        }
    }

}
</style>
