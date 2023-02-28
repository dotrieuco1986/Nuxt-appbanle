<template>
    <div class="btn-qty">
        <div v-if="!hasDetail" class="right border">
            <button class="icon" @click="addQty(-1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                    <g id="Group_991" data-name="Group 991">
                        <path id="Path_1578" data-name="Path 1578" d="M14.055,0A14.055,14.055,0,0,0,0,13.945,14.149,14.149,0,0,0,14.055,28a14,14,0,0,0,0-28Zm7.383,15.586H6.563a1.641,1.641,0,0,1,0-3.281H21.438a1.641,1.641,0,1,1,0,3.281Z" fill="#fe7235" />
                    </g>
                </svg>
            </button>
            <input :value="getQty"></input>
            <button class="icon" @click="addQty(1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                    <g id="Group_992" data-name="Group 992">
                        <path id="Path_1579" data-name="Path 1579" d="M14.055,0A14.055,14.055,0,0,0,0,13.945,14.149,14.149,0,0,0,14.055,28a14,14,0,0,0,0-28Zm7.383,15.586H15.7v5.852a1.641,1.641,0,0,1-3.281,0V15.586H6.563a1.641,1.641,0,0,1,0-3.281h5.852V6.563a1.641,1.641,0,0,1,3.281,0V12.3h5.742a1.641,1.641,0,0,1,0,3.281Z" fill="#fe7235" />
                    </g>
                </svg>
            </button>
        </div>
        <div v-else class="right">
            <button class="icon" @click="handleClick">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                    <g id="Group_992" data-name="Group 992">
                        <path id="Path_1579" data-name="Path 1579" d="M14.055,0A14.055,14.055,0,0,0,0,13.945,14.149,14.149,0,0,0,14.055,28a14,14,0,0,0,0-28Zm7.383,15.586H15.7v5.852a1.641,1.641,0,0,1-3.281,0V15.586H6.563a1.641,1.641,0,0,1,0-3.281h5.852V6.563a1.641,1.641,0,0,1,3.281,0V12.3h5.742a1.641,1.641,0,0,1,0,3.281Z" fill="#fe7235" />
                    </g>
                </svg>
            </button>
        </div>
    </div>
</template>
<script>

export default {
    name: 'ButtonQty',
    components: {
    },
    props: {
        hasDetail: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            default () {
                return {
                }
            }
        }
    },
    data () {
        return {
            qty: 0
        }
    },
    computed: {
        getQty () {
            return this.qty
        }
    },
    methods: {
        addQty (num) {
            if (num === -1 && this.qty > 0) {
                this.qty = this.qty + num
                this.item.qty = Math.abs(num)
                this.$store.dispatch('cart/removeProduct', this.item)
            } else if (num === 1) {
                this.qty = this.qty + num
                this.item.qty = num
                this.$store.dispatch('cart/addProduct', this.item)
            }
        },
        handleClick (evt) {
            this.$emit('showDetail', evt)
        }
    }

}
</script>
<style lang="scss">
    @import "../../assets/scss/_variable";
    .btn-qty{
        .right{
            float: right;
            right:76px;
            height: 30px;
            display: flex;
            flex-direction: row;
            &.border{
                border:1px solid #CBD4DA;
                border-radius: 30px;
            }
            button{
                border: none !important;
                outline: none !important;
                background: transparent;
                height: 28px;
                width: 28px;
                padding: 0;
                &:hover{
                    opacity: 0.8;
                }
            }
            input{
                width: 30px;
                border: none;
                outline: none !important;
                height: 26px;
                padding: 0;
                text-align: center;
            }
        }
    }
@media (max-width:$phone){
    .btn-qty{
        .right{
            height: 27px;
            button{
                height: 25px;
                width: 25px;
                svg{
                    height: 25px;
                    width: 25px;
                }
            }
            input{
                height: 24px;
                font-size: 12px;
            }
        }
    }
}
</style>
