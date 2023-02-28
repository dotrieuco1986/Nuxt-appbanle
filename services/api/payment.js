export default $axios => ({
    getCardType (param) {
        return $axios.$get('/get-card-type/' + param, null)
    },
    requestPayment (param) {
        return $axios.$post('/request-payment', param)
    },
    checkResultPayment (param) {
        return $axios.$post('/result-payment', param)
    },
    getTransactionHistories (param) {
        return $axios.$get('/transaction-histories/' + param, null)
    },
    createBankingAccount (param) {
        return $axios.$post('/create-banking-account', param)
    },
    getBankingAccount (param) {
        return $axios.$get('/get-banking-account', param)
    },
    deleteBankingAccount (param) {
        return $axios.$delete('/delete-banking-account/' + param, null)
    },
    getBalance (param) {
        return $axios.$get('/get-balance', param)
    },
    getPoint () {
        return $axios.$get('/getpoint')
    },
    pointJson (param) {
        return $axios.$get('/point-json' + param)
    }
})
