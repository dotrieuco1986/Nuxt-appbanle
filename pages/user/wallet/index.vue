<template>
    <div id="user-wallet-management">
        <div>
            <p class="head-title">
                Quản lý ví
            </p>
        </div>
        <div class="mt-3">
            <b-tabs v-model="tabIndex" content-class="mt-3">
                <b-tab title="Ví của bạn" active>
                    <p class="title">
                        Số tiền trong ví (VNĐ):
                        <span class="money">{{
                            Intl.NumberFormat("VND").format(balance)
                        }}</span>
                    </p>
                    <p class="title">
                        Nạp tiền qua thẻ:
                    </p>
                    <div class="p-3">
                        <div class="radio">
                            <input
                                id="one"
                                v-model="paymentMethodPicked"
                                type="radio"
                                value="INT"
                                @click="getListCardType('INT')"
                            >
                            <label
                                for="one"
                                class="mb-3"
                            >Thẻ tín dụng Visa, Master, JCB, Amex</label><br>
                            <input
                                id="two"
                                v-model="paymentMethodPicked"
                                type="radio"
                                value="ATM"
                                @click="getListCardType('ATM')"
                            >
                            <label for="two" class="mb-3">Thẻ ATM nội địa</label>
                        </div>
                        <div class="errorMessage mb-3">
                            {{ errors.cardType }}
                        </div>

                        <b-row>
                            <b-col sm="12" md="9" class="py-1">
                                <input
                                    v-model="amount"
                                    class="amount"
                                    type="number"
                                    min="0"
                                    maxlength="11"
                                    max="10000000"
                                    placeholder="Số tiền nạp"
                                    required
                                >
                            </b-col>
                            <b-col sm="12" md="3" class="py-1">
                                <button
                                    type="button"
                                    class="btn submit"
                                    f
                                    @click="paymentRequestClick"
                                >
                                    Nạp tiền
                                </button>
                            </b-col>
                        </b-row>
                        <div class="errorMessage mb-3">
                            {{ errors.amount }}
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Lịch Sử Nạp tiền">
                    <div class="px-4">
                        <b-row
                            v-for="item in listTopupData"
                            :key="item.id"
                            class="wallet-border-bottom py-3"
                        >
                            <b-col sm="12" md="6">
                                <b-row>
                                    <b-col sm="12">
                                        <b>Số Giao Dịch: {{ item.invoice_number }}</b>
                                        <div>
                                            {{ Intl.NumberFormat("VND").format(item.amount) }} VNĐ
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col sm="12" md="6">
                                <b-row>
                                    <b-col cols="8" sm="8" md="12">
                                        {{
                                            formatDate(
                                                item.updated_at ? item.updated_at : item.created_at
                                            )
                                        }}
                                    </b-col>
                                    <b-col cols="4" sm="4" md="12">
                                        {{ item.status === 1? "Thành công": "Không thành công" }}
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <div v-show="showLoading" class="loading-spinner">
                            <b-spinner variant="primary" label="Spinner" />
                        </div>
                        <PaginateResponse
                            ref="paginateOrder"
                            :api="this.$api.payment.getTransactionHistories"
                            param-query="action=TOPUP"
                            @handleData="handleDataTopup"
                        />
                    </div>
                </b-tab>
                <b-tab title="Lịch Sử Chi tiêu">
                    <div class="px-4">
                        <b-row
                            v-for="(item, index) in listPaymentData"
                            :key="index"
                            class="wallet-border-bottom py-3"
                        >
                            <b-col sm="12" md="6">
                                <b-row>
                                    <b-col sm="12">
                                        <b>{{ item.description }}: {{ item.invoice_number }} </b>
                                        <div>
                                            {{ Intl.NumberFormat("VND").format(item.amount) }} VNĐ
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col sm="12" md="6">
                                <b-row>
                                    <b-col cols="8" sm="8" md="12">
                                        {{
                                            formatDate(
                                                item.updated_at ? item.updated_at : item.created_at
                                            )
                                        }}
                                    </b-col>
                                    <b-col cols="4" sm="4" md="12">
                                        {{ item.status === 1? "Thành công": "Không thành công" }}
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <div v-show="showLoading" class="loading-spinner">
                            <b-spinner variant="primary" label="Spinner" />
                        </div>
                        <PaginateResponse
                            ref="paginateOrder"
                            :api="this.$api.payment.getTransactionHistories"
                            param-query="action=PAYMENT"
                            @handleData="handleDataPayment"
                        />
                    </div>
                </b-tab>
                <b-tab title="Điểm Thưởng">
                    <p class="title">
                        <span class="money"> Tổng Điểm: {{ point }}</span>
                    </p>
                    <div class="px-4">
                        <b-row
                            v-for="(item, index) in listPointData"
                            :key="index"
                            class="wallet-border-bottom"
                        >
                            <b-col sm="12" md="6">
                                <b-row class="mb-3">
                                    <b-col sm="12">
                                        <label>Thưởng Mua Hàng</label>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col sm="12" md="6">
                                <b-row>
                                    <b-col cols="6" sm="6" md="12">
                                        <div>+ {{ item.point }}</div>
                                    </b-col>
                                    <b-col cols="6" sm="6" md="12">
                                        {{
                                            formatDate(
                                                item.updated_at ? item.updated_at : item.created_at
                                            )
                                        }}
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <div v-show="showLoading" class="loading-spinner">
                            <b-spinner variant="primary" label="Spinner" />
                        </div>
                        <PaginateResponse
                            ref="paginateOrder"
                            :api="this.$api.payment.pointJson"
                            @handleData="handleDataPoint"
                        />
                    </div>
                </b-tab>
            </b-tabs>
        </div>

        <modal id="modal-card-type">
            <div class="modal-payment-method">
                <p>NGÂN HÀNG</p>
                <div class="collapse-wrap">
                    <ul class="list_cart-2 clearfix">
                        <li v-for="card in cardType" :key="card.id">
                            <label
                                :class="[cardTypeSelection === card.code ? 'active' : '']"
                                @click="cardTypeSelection = card.code"
                            >
                                <img
                                    :src="getCardTypeImage(card.logo)"
                                    width="200"
                                    height="40"
                                    :alt="card.code"
                                >
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="text-center">
                    <mvp-button
                        name="HOÀN TẤT"
                        color="payment"
                        @click.native="selectCarTypeClick"
                    />
                </div>
            </div>
        </modal>
        <modal id="modal-payment-success" size="sm">
            <div class="text-center">
                <div class="payment-success-center mb-3">
                    <div class="payment-success-icon payment-success-center">
                        <svg-icon icon="check" />
                    </div>
                </div>
                <p>Thanh toán thành công</p>
            </div>
        </modal>
        <modal id="modal-payment-failed" size="sm">
            <div class="text-center">
                <div class="payment-success-center mb-3">
                    <div class="payment-success-icon payment-success-center">
                        <svg-icon icon="close" />
                    </div>
                </div>
                <p>Thanh toán không thành công</p>
            </div>
        </modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PaginateResponse from '~/components/common/PaginateResponse'
import MvpButton from '~/components/MVPControl/MvpButton'
import Modal from '~/components/modal/Modal.vue'
import svgIcon from '~/components/common/SvgIcon.vue'

export default {
    name: 'Wallet',
    layout: 'user',
    components: {
        Modal,
        MvpButton,
        PaginateResponse,
        svgIcon
    },
    data () {
        return {
            tabIndex: 0,
            paymentMethodPicked: '',
            amount: '',
            cardType: [],
            cardTypeSelection: '',
            errors: {
                cardType: null,
                amount: null,
                bankingName: null,
                bankingBranch: null,
                accountName: null,
                accountNumber: null
            },
            listTopupData: [],
            listPaymentData: [],
            listPointData: [],
            showLoading: true,
            balance: 0,
            point: ''
        }
    },
    computed: {
        ...mapGetters({
            checkIsLoggedIn: 'loggedIn',
            loggedInUser: 'user'
        })
    },
    mounted () {
        this.getPaymentStatus()
        this.getBalance()
        this.getPoint()
    },
    methods: {
        async getBalance () {
            const response = await this.$api.payment.getBalance()
            if (response.status === 200 && response.data) {
                this.balance = response.data
            }
        },
        async getPoint () {
            const response = await this.$api.payment.getPoint()
            if (response.status === 200) {
                this.point = response.data
            }
        },
        async getPaymentStatus () {
            if (this.$route.query && this.$route.query.vnp_ResponseCode) {
                const response = await this.$api.payment.checkResultPayment(
                    this.$route.query
                )
                if (response.status === 'OK' && response.data) {
                    if (response.data.status === '00') {
                        this.$bvModal.show('modal-payment-success')
                        this.getBalance()
                    } else {
                        this.$bvModal.show('modal-payment-failed')
                    }
                    this.$router.push({
                        path: '/user/wallet'
                    })
                }
            }
        },
        async paymentRequestClick () {
            let isInvalid = false
            this.errors = []
            if (!this.cardTypeSelection) {
                this.errors.cardType = 'Bạn phải chọn loại thẻ ngân hàng.'
                isInvalid = true
            }

            if (!this.amount) {
                this.errors.amount = 'Bạn phải nhập số tiền.'
                isInvalid = true
            }

            if (!isInvalid) {
                const formData = new FormData()
                formData.append('amount', this.amount)
                formData.append('return-url', window.location.href)
                formData.append('card-type', this.cardTypeSelection)
                formData.append('order-info', 'topup')

                const response = await this.$api.payment.requestPayment(formData)
                if (response.status === 'OK' && response.data) {
                    window.location.href = response.data
                }
            }
        },
        selectCarTypeClick () {
            this.$bvModal.hide('modal-card-type')
        },
        getCardTypeImage (logo) {
            return process.env.SERVER_URL + '/images/card_type/' + logo
        },
        async getListCardType (type) {
            const response = await this.$api.payment.getCardType(type)
            if (
                response.status === 'OK' &&
        response.data &&
        response.data.length > 0
            ) {
                this.cardType = response.data
                this.$bvModal.show('modal-card-type')
            }
        },
        formatDate (data) {
            if (data) {
                const arrDate = data.split(' ')
                return (
                    arrDate[1].split(':')[0] +
          ':' +
          arrDate[1].split(':')[1] +
          ' | ' +
          arrDate[0]
                )
            }
        },
        handleDataTopup (data) {
            this.listTopupData = data
            this.showLoading = false
        },
        handleDataPayment (data) {
            this.listPaymentData = data
            this.showLoading = false
        },
        handleDataPoint (data) {
            this.listPointData = data
            this.showLoading = false
        }
    }
}
</script>

<style lang="scss">
@import "../../../assets/scss/variable";
#user-wallet-management {
  .head-title {
    color: $orange;
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
  }

  .nav-tabs .nav-link {
    border-top-left-radius: 13px;
    border-top-right-radius: 13px;
    min-width: 120px;
    text-align: center;
    background-color: #f7f5f5;
    margin-right: 5px;
  }

  .nav-tabs .nav-link.active {
    background-color: $orange;
    color: $white;
  }

  p.title {
    font-weight: bold;
  }

  .money {
    color: $orange;
  }

  .amount {
    height: 40px;
    font-size: inherit;
  }

  .submit {
    color: $white;
    background-color: $orange;
    width: 100%;
  }

  label {
    color: $extra-dark-gray;
    font-weight: inherit;
  }

  input:focus {
    border: inherit;
  }

  .add-banking-account {
    margin-left: 10px;
    cursor: pointer;
  }

  .bank-account-item {
    margin-bottom: 2rem;
    height: 40px;
    align-items: center;
    flex-flow: nowrap;
  }

  .bank-account-item:hover {
    background-color: $light-gray;
  }
}

.modal-payment-method {
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
    -webkit-transition: all 0.15s ease;
    -o-transition: all 0.15s ease;
    transition: all 0.15s ease;
    text-align: center;
    -webkit-box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.08);
    box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.08);
  }

  .list_cart-2 li label:hover,
  .list_cart-2 li label.active {
    border: 2px solid #fe7235;
  }

  .list_cart-2 input {
    border: none;
    /*background: url(../images/trans.png);*/
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

  b {
    color: #fe7235;
  }
}

.payment {
  background-color: $orange;
  color: $white;
  font-weight: bold;
  width: 126px;
}

.payment-success-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-success-icon {
  width: 55px;
  height: 55px;
  background-color: $green;
  border-radius: 50%;
  font-size: 30px;
}

.wallet-border-bottom {
  border-bottom: 1px solid #ced4da;
}
@media only screen and (max-width: $phone){
    .nav-tabs{
        width:100%;
        overflow:hidden;
        background:#EFF3F6;
        display:flex;
        flex-wrap: unset;
        flex-direction: row;
        justify-content: space-around;
        .nav-item{
            height:100%;
            padding: 20px 0;
            .nav-link{
                width:77px;
                height:67px;
                min-width:unset !important;
                float:left;
                border-radius:7px !important;
                background:-webkit-linear-gradient(bottom, #E8E8E8, #fff);
                box-shadow:0px 0px 6px 3px rgba(0,0,0,0.1);
                font-size: 12px;
                text-align:center;
                margin-right:25px;
                display:flex;
                justify-content: center;
                align-items: center;
                margin: 0;
                padding: 0;
                border: none !important;
                &.active{
                    background:#FE7235;
                    color:#fff;
                }
            }
        }

    }
}
</style>
