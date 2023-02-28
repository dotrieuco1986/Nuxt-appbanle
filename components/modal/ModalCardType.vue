<template lang="html">
    <modal id="modal-card-type" ref="myModal">
        <div class="modal-card-type">
            <p>
                NGÂN HÀNG
            </p>
            <div class="collapse-wrap">
                <ul class="list_cart-2 clearfix">
                    <li v-for="card in cardTypes" :key="card.id">
                        <label :class="[cardTypeSelection === card.code ? 'active': '']" @click="cardTypeSelection = card.code">
                            <img :src="getCardTypeImage(card.logo)" width="200" height="40" :alt="card.code">
                        </label>
                    </li>
                </ul>
            </div>
            <div class="text-center">
                <button class="btn btn-mvp payment" :disabled="getComplete" @click="paymentRequestClick">
                    HOÀN TẤT
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    props: {
        paymentMethod: {
            type: String,
            default: 'ATM'
        },
        amount: {
            type: Number,
            default: 0
        },
        returnUrl: {
            type: String,
            default: ''
        },
        orderType: {
            type: String,
            default: 'pay',
            description: 'marketsurvey, order ...'
        },
        callBackUpdate: {
            type: Boolean,
            default: false
        }
    },
    async fetch () {
        if (this.paymentMethod) {
            const response = await this.$api.payment.getCardType(this.paymentMethod)
            if (response.status === 'OK' && response.data && response.data.length > 0) {
                this.cardTypes = response.data
            }
        }
    },

    data () {
        return {
            cardTypes: [],
            cardTypeSelection: ''
        }
    },
    computed: {
        getComplete () {
            if (this.cardTypeSelection) {
                return false
            }
            return true
        }
    },
    inject: ['$update'],
    methods: {
        async paymentRequestClick () {
            let orderId = 0
            if (this.callBackUpdate) {
                orderId = await this.$update() // call function update database by parent
            }

            const formData = new FormData()
            formData.append('amount', this.amount)
            formData.append('return-url', this.returnUrl)
            formData.append('card-type', this.cardTypeSelection)
            formData.append('order-info', orderId)
            formData.append('type', this.orderType)
            const response = await this.$api.payment.requestPayment(formData)
            if (response.status === 'OK' && response.data) {
                window.location.href = response.data
            }
        },
        getCardTypeImage (logo) {
            return process.env.SERVER_URL + '/images/card_type/' + logo
        },
        show () {
            this.$refs.myModal.show()
            this.$fetch()
        },
        hide () {
            this.$refs.myModal.hide()
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variable';
.modal-card-type {
    p {
        font-weight: bold;
        font-size: 16px;
        color: $orange;
    }

    label {
        color: $extra-dark-gray;
    }

    .list_cart-2 {
        list-style: none;
        padding: 0;
        box-sizing: inherit;
    }

    .clearfix:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        height: 0;
        clear: both;
    }

    .list_cart-2 li label {
        color: #434a54;
        font-weight: 500;
        padding: 0;
        height: 4.5em;
        border: 1px solid #dcdcdf;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        line-height: 4.5em;
        display: block;
        position: relative;
        margin-bottom: 0;
        -webkit-transition: all .15s ease;
        -o-transition: all .15s ease;
        transition: all .15s ease;
        text-align: center;
        -webkit-box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, .08);
        box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, .08);
    }

    .list_cart-2 li label:hover, .list_cart-2 li label.active {
        border: 2px solid #fe7235;
    }

    .list_cart-2 input {
        border: none;
        color: #fff;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        font-size: 0;
        z-index: 2;
        left: 0;
        outline: 0 !important;
    }

    .list_cart-2 li {
        float: left;
        width: calc((100%) / 5);
        padding: 5px;
    }

    .list_cart-2 img {
        max-width: 100%;
        height: auto;
        text-align: center;
    }
}
</style>
