<template>
    <div id="wallet-management">
        <div>
            <p class="head-title">
                Quản lý ví
            </p>
        </div>
        <div class="mt-3">
            <b-tabs v-model="tabIndex" content-class="mt-3">
                <b-tab title="Ví của bạn" active>
                    <p class="title">
                        Số tiền trong ví (VNĐ): <span class="money">{{ Intl.NumberFormat('VND').format(balance) }}</span>
                    </p>
                    <p class="title">
                        Nạp tiền qua thẻ:
                    </p>
                    <div class="pl-3">
                        <div class="radio">
                            <input
                                id="one"
                                v-model="paymentMethodPicked"
                                type="radio"
                                value="INT"
                                @click="getListCardType('INT')"
                            >
                            <label for="one" class="mb-3">Thẻ tín dụng Visa, Master, JCB, Amex</label><br>
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
                        <div class="d-flex mb-3">
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
                            <button type="button" class="btn submit" @click="paymentRequestClick">
                                Nạp tiền
                            </button>
                        </div>
                        <div class="errorMessage mb-3">
                            {{ errors.amount }}
                        </div>
                    </div>
                    <p class="title">
                        Rút Tiền Về Tài Khoản:
                    </p>
                    <div class="pl-3">
                        <div>
                            <b-table striped hover :items="listBankingAccount" :fields="listBankingFields" />
                        </div>
                        <div style="display: flex">
                            <input
                                class="amount"
                                type="number"
                                min="0"
                                maxlength="11"
                                max="10000000"
                                placeholder="Số tiền rút"
                                required
                            >
                            <button type="button" class="btn submit" disabled>
                                Rút tiền
                            </button>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Doanh thu">
                    <div>
                        <b-row v-for="(item, index) in listRevenueData" :key="index">
                            <b-col sm="7">
                                <b-row class="mb-3">
                                    <b-col sm="12">
                                        <b>Mã đơn hàng: </b> {{ item.order_id }}
                                        <div>
                                            + {{ Intl.NumberFormat('VND').format(item.amount) }} VNĐ
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col sm="5">
                                <div>{{ formatDate(item.updated_at) }}</div>
                                <div v-if="item.status === 1">
                                    Thành công
                                </div>
                                <div v-else>
                                    &nbsp;Không thành công
                                </div>
                            </b-col>
                        </b-row>
                        <div v-show="showLoading" class="loading-spinner">
                            <b-spinner variant="primary" label="Spinner" />
                        </div>
                        <m-v-p-paginate
                            ref="paginateOrder"
                            :api="this.$api.payment.getTransactionHistories"
                            param-query="action=REVENUE"
                            @handleData="handleDataRevenue"
                        />
                    </div>
                </b-tab>
                <b-tab title="Chi tiêu">
                    <div>
                        <b-row v-for="(item, index) in listPaymentData" :key="index">
                            <b-col sm="7">
                                <b-row class="mb-3">
                                    <b-col sm="12">
                                        <div v-if="item.object === historyType.advertisement">
                                            <b>Tạo quảng cáo: </b> {{ item.invoice_number }}
                                        </div>
                                        <div v-else>
                                            <b>Khảo sát thị trường: </b> {{ item.order_id }}
                                        </div>
                                        <div>
                                            - {{ Intl.NumberFormat('VND').format(item.amount) }} VNĐ
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col sm="5">
                                <div>{{ formatDate(item.updated_at) }}</div>
                                <div v-if="item.status === 1">
                                    Thành công
                                </div>
                                <div v-else>
                                    &nbsp;Không thành công
                                </div>
                            </b-col>
                        </b-row>
                        <div v-show="showLoading" class="loading-spinner">
                            <b-spinner variant="primary" label="Spinner" />
                        </div>
                        <m-v-p-paginate
                            ref="paginateOrder"
                            :api="this.$api.payment.getTransactionHistories"
                            param-query="action=PAYMENT"
                            @handleData="handleDataPayment"
                        />
                    </div>
                </b-tab>
                <b-tab title="Nạp tiền">
                    <div>
                        <b-row v-for="(item, index) in listTopupData" :key="index">
                            <b-col sm="7">
                                <b-row class="mb-3">
                                    <b-col sm="12">
                                        <b>Nạp tiền: </b> {{ item.invoice_number }}
                                        <div>
                                            + {{ Intl.NumberFormat('VND').format(item.amount) }} VNĐ
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col sm="5">
                                <div>{{ formatDate(item.updated_at) }}</div>
                                <div v-if="item.status === 1">
                                    Thành công
                                </div>
                                <div v-else>
                                    &nbsp;Không thành công
                                </div>
                            </b-col>
                        </b-row>
                        <div v-show="showLoading" class="loading-spinner">
                            <b-spinner variant="primary" label="Spinner" />
                        </div>
                        <m-v-p-paginate
                            ref="paginateOrder"
                            :api="this.$api.payment.getTransactionHistories"
                            param-query="action=TOPUP"
                            @handleData="handleDataTopup"
                        />
                    </div>
                </b-tab>
                <b-tab title="Rút tiền" />
                <b-tab title="Thiết lập thanh toán">
                    <p class="title">
                        Tài Khoản Ngân Hàng
                        <svg-icon
                            icon="fa-plus"
                            grow-by-height="16px"
                            class="ml-3 add-banking-account"
                            @click.native="addBankingAccount"
                        />
                    </p>
                    <div class="pl-3">
                        <div class="row">
                            <div class="col-4 col-sm-3">
                                <label for="banking-name">Tên Ngân Hàng</label>
                            </div>
                            <div class="col">
                                <input
                                    id="banking-name"
                                    v-model="bankingAccountData.bankingName"
                                    class="amount"
                                    type="text"
                                    maxlength="50"
                                    required
                                >
                            </div>
                        </div>
                        <div class="errorMessage mb-3">
                            {{ errors.bankingName }}
                        </div>
                        <div class="row">
                            <div class="col-4 col-sm-3">
                                <label for="banking-branch">Chi Nhánh</label>
                            </div>
                            <div class="col">
                                <input
                                    id="banking-branch"
                                    v-model="bankingAccountData.bankingBranch"
                                    class="amount"
                                    type="text"
                                    maxlength="50"
                                    required
                                >
                            </div>
                        </div>
                        <div class="errorMessage mb-3">
                            {{ errors.bankingBranch }}
                        </div>
                        <div class="row">
                            <div class="col-4 col-sm-3">
                                <label for="account-name">Tên Tài Khoản</label>
                            </div>
                            <div class="col">
                                <input
                                    id="account-name"
                                    v-model="bankingAccountData.accountName"
                                    class="amount"
                                    type="text"
                                    maxlength="50"
                                    required
                                >
                            </div>
                        </div>
                        <div class="errorMessage mb-3">
                            {{ errors.accountName }}
                        </div>
                        <div class="row">
                            <div class="col-4 col-sm-3">
                                <label for="account-number">Số Tài Khoản</label>
                            </div>
                            <div class="col">
                                <input
                                    id="account-number"
                                    v-model="bankingAccountData.accountNumber"
                                    class="amount"
                                    type="text"
                                    maxlength="50"
                                    required
                                >
                            </div>
                        </div>
                        <div class="errorMessage mb-3">
                            {{ errors.accountNumber }}
                        </div>
                    </div>
                    <p class="title">
                        Tài Khoản Ngân Hàng
                    </p>
                    <div class="pl-3">
                        <div
                            v-for="(item, index) in listBankingAccount"
                            :key="index"
                            class="row m-0 bank-account-item"
                        >
                            <div class="col-4">
                                <span class="mr-3">Tên Ngân Hàng</span>
                                <span>{{ item.bank_name }}</span>
                            </div>
                            <div class="col-4">
                                <span class="mr-3">Tên Tài Khoản</span>
                                <span>{{ item.bank_account_name }}</span>
                            </div>
                            <div class="col-3">
                                <span class="mr-3">Số Tài Khoản</span>
                                <span>{{ item.bank_account_number }}</span>
                            </div>
                            <div class="col">
                                <svg-icon
                                    icon="fa-minus"
                                    grow-by-height="16px"
                                    class="ml-3 add-banking-account"
                                    @click.native="deleteBankingAccountClick(item.id, index)"
                                />
                            </div>
                        </div>
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
                            <label :class="[cardTypeSelection === card.code ? 'active': '']" @click="cardTypeSelection = card.code">
                                <img :src="getCardTypeImage(card.logo)" width="200" height="40" :alt="card.code">
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="text-center">
                    <mvp-button name="HOÀN TẤT" color="payment" @click.native="selectCarTypeClick" />
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
        <modal id="modal-delete-confirm" size="sm">
            <div class="modal-payment-method">
                <div>
                    <p>Bạn có chắc chắn muốn xóa tài khoản này?</p>
                </div>
                <div class="text-center">
                    <mvp-button name="ĐỒNG Ý" color="payment" @click.native="deleteBankingAccount" />
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MVPPaginate from '~/components/common/Paginate'
import MvpButton from '~/components/MVPControl/MvpButton'
import Modal from '~/components/modal/Modal.vue'
import svgIcon from '~/components/common/SvgIcon.vue'

export default {
    name: 'Index',
    layout: 'admin',
    components: {
        Modal,
        MvpButton,
        MVPPaginate,
        svgIcon
    },
    data () {
        return {
            tabIndex: 0,
            paymentMethodPicked: '',
            amount: '',
            listBankingFields: [
                {
                    key: 'bank_name',
                    label: 'Tên ngân hàng',
                    sortable: true
                },
                {
                    key: 'bank_account_name',
                    label: 'Tên tài khoản',
                    sortable: true
                },
                {
                    key: 'bank_account_number',
                    label: 'Số tài khoản',
                    sortable: true
                }
            ],
            listBankingItems: [
                { bank_code: 'Tên ngân hàng', bank_name: 'Nguyen Van B', bank_number: '123456789' },
                { bank_code: 'Tên ngân hàng', bank_name: 'Nguyen Van B', bank_number: '123456789' },
                { bank_code: 'Tên ngân hàng', bank_name: 'Nguyen Van B', bank_number: '123456789' }
            ],
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
            bankingAccountData: {
                bankingName: '',
                bankingBranch: '',
                accountName: '',
                accountNumber: ''
            },
            listBankingAccount: null,
            actionId: 0,
            listTopupData: [],
            listPaymentData: [],
            listRevenueData: [],
            showLoading: true,
            balance: 0,
            historyType: {
                order: 'order',
                topup: 'topup',
                marketSurvey: 'marketsurvey',
                advertisement: 'advertisement'
            }
        }
    },
    computed: {
        ...mapGetters({
            checkIsLoggedIn: 'loggedIn',
            loggedInUser: 'user'
        })
    },
    watch: {
    },
    mounted () {
        this.getPaymentStatus()
        this.getBankingAccount()
        this.getBalance()
    },
    methods: {
        async getBalance () {
            const response = await this.$api.payment.getBalance()
            if (response.status === 200 && response.data) {
                this.balance = response.data
            }
        },
        editBankingAccountClick (id, index) {
            const data = this.listBankingAccount[index]
            this.bankingAccountData.accountNumber = data.bank_account_number
            this.bankingAccountData.accountName = data.bank_account_name
            this.bankingAccountData.bankingBranch = data.bank_branch
            this.bankingAccountData.bankingName = data.bank_name
        },
        async deleteBankingAccount () {
            const _this = this
            this.$bvModal.hide('modal-delete-confirm')
            const response = await this.$api.payment.deleteBankingAccount(this.actionId[0])
            if (response.status === 200 && response.data) {
                _this.listBankingAccount.splice(_this.actionId[1], 1)
            }
        },
        deleteBankingAccountClick (id, index) {
            this.actionId = [id, index]
            this.$bvModal.show('modal-delete-confirm')
        },
        async getBankingAccount () {
            const response = await this.$api.payment.getBankingAccount()
            if (response.status === 200 && response.data) {
                this.listBankingAccount = response.data
            }
        },
        async addBankingAccount () {
            let isInvalid = false
            this.errors = []
            if (!this.bankingAccountData.bankingName) {
                this.errors.bankingName = 'Hãy nhập tên ngân hàng.'
                isInvalid = true
            }
            if (!this.bankingAccountData.bankingBranch) {
                this.errors.bankingBranch = 'Hãy nhập chi nhánh.'
                isInvalid = true
            }
            if (!this.bankingAccountData.accountName) {
                this.errors.accountName = 'Hãy nhập tên tài khoản.'
                isInvalid = true
            }
            if (!this.bankingAccountData.accountNumber) {
                this.errors.accountNumber = 'Hãy nhập số tài khoản.'
                isInvalid = true
            }

            if (!isInvalid) {
                const formData = new FormData()
                formData.append('bank_name', this.bankingAccountData.bankingName)
                formData.append('bank_branch', this.bankingAccountData.bankingBranch)
                formData.append('account_name', this.bankingAccountData.accountName)
                formData.append('account_number', this.bankingAccountData.accountNumber)

                const response = await this.$api.payment.createBankingAccount(formData)
                if (response.status === 200 && response.data) {
                    this.bankingAccountData = {
                        bankingName: '',
                        bankingBranch: '',
                        accountName: '',
                        accountNumber: ''
                    }
                    this.listBankingAccount.push(response.data)
                }
            }
        },
        async getPaymentStatus () {
            if (this.$route.query && this.$route.query.vnp_ResponseCode) {
                const response = await this.$api.payment.checkResultPayment(this.$route.query)
                if (response.status === 'OK' && response.data) {
                    if (response.data.status === '00') {
                        this.$bvModal.show('modal-payment-success')
                        this.getBalance()
                    } else {
                        this.$bvModal.show('modal-payment-failed')
                    }
                    this.$router.push({
                        path: '/admin/wallet'
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
                formData.append('type', 'topup')

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
            if (response.status === 'OK' && response.data && response.data.length > 0) {
                this.cardType = response.data
                this.$bvModal.show('modal-card-type')
            }
        },
        goToPageDetail (data) {
            if (this.showLoading) { return }
            this.$router.push({
                path: 'orderdetail',
                query: {
                    detail: data
                }
            })
        },
        formatDate (data) {
            if (data) {
                const arrDate = data.split(' ')
                return arrDate[1].split(':')[0] + ':' + arrDate[1].split(':')[1] + ' | ' + arrDate[0]
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
        handleDataRevenue (data) {
            this.listRevenueData = data
            this.showLoading = false
        }
    }
}
</script>

<style lang="scss">
    @import "../../../assets/scss/variable";
    #wallet-management {
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
            background-color: #F7F5F5;
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
            width: 100px;
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
</style>
