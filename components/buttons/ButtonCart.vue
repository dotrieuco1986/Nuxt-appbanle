<template>
    <button v-if="cartNumber > 0" class="no-border shadow btn-cart" @click="handleClick">
        <span class="bg">
            <svg xmlns="http://www.w3.org/2000/svg" width="39.822" height="35" viewBox="0 0 39.822 35">
                <g id="supermarket" transform="translate(0 0)">
                    <path id="Path_1549" data-name="Path 1549" d="M12.911,23.333H33.989a1.163,1.163,0,0,0,1.121-.846L39.777,6.154a1.165,1.165,0,0,0-1.121-1.487H10.218L9.384.914A1.167,1.167,0,0,0,8.244,0H1.167a1.167,1.167,0,1,0,0,2.333H7.308l4.213,18.958A3.5,3.5,0,0,0,12.911,28H33.989a1.167,1.167,0,1,0,0-2.333H12.911a1.167,1.167,0,1,1,0-2.333Zm0,0" transform="translate(0 0)" fill="#fff" />
                    <path id="Path_1550" data-name="Path 1550" d="M151,363.5a3.5,3.5,0,1,0,3.5-3.5A3.5,3.5,0,0,0,151,363.5Zm0,0" transform="translate(-139.256 -332.004)" fill="#fff" />
                    <path id="Path_1551" data-name="Path 1551" d="M362,363.5a3.5,3.5,0,1,0,3.5-3.5A3.5,3.5,0,0,0,362,363.5Zm0,0" transform="translate(-333.849 -332.004)" fill="#fff" />
                </g>
            </svg>
        </span>
        <strong class="qty">{{ cartNumber }} </strong>
    </button>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'ButtonCart',
    components: {
    },
    data () {
        return {
            map: ''
        }
    },
    computed: mapState({
        cartNumber: state => state.cart.cartNumber
    }),
    mounted () {
        this.$store.dispatch('cart/getCart')
    },
    methods: {
        handleClick (evt) {
            this.$router.push({
                path: '/shoppingcart'
            })
        }
    }

}
</script>
<style lang="scss">
    @import "@/assets/scss/_variable";
    .btn-cart{
        background: $white;
        padding: 10px;
        position: relative;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        height: 90px;
        width: 90px;
        z-index: 1001;
        border: none !important;
        outline: none !important;
        .bg{
            background: $orange;
            padding: 5px;
            border-radius: 4px;
            height: 70px;
            width: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .qty{
            position: absolute;
            top:2px;
            right:2px;
            border-radius: 50%;
            height: 28px;
            width: 28px;
            background: $blue;
            color:$white;
            padding: 5px;
            line-height: 20px;
            text-align: center;
        }
    }
    @media (max-width:$phone){
        .btn-cart{
            height: 65px;
            width: 65px;
            border-radius:4px;
            padding: 7px;
            .bg{
                height: 50px;
                width: 50px;
                svg{
                    width: 27px;
                }
            }
            .qty{
                height: 25px;
                width: 25px;
                line-height: 15px;
                font-size: 10px;
            }
        }
    }
</style>
