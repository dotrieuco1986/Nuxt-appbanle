<template lang="html">
    <div id="dsdsdsd" class="">
        <modal-success id="sss" ref="mdSuccess" :msg="$t('survey.paysuccess')" @closeModal="gotoResult">
            <p v-if="hasSendMail">
                {{ $t('survey.sendmail') }}<strong class="text-orange">{{ email }}</strong>
            </p>
        </modal-success>
    </div>
</template>
<script>
import ModalSuccess from '@/components/modal/ModalSuccess'
export default {
    name: 'SurveySuccess',
    components: {
        ModalSuccess
    },
    props: {

    },
    fetchOnServer: false,
    fetch () {
        this.complete()
    },
    data () {
        return {
            dataOption: [],
            sendmail: false,
            email: '',
            msgError: ''
        }
    },
    computed: {
        getQuery () {
            return this.dataOption
        },
        hasSendMail () {
            if (this.email) {
                return true
            }
            return false
        },
        getError () {
            return this.msgError
        }
    },
    mounted () {
        // this.complete()
    },
    methods: {
        gotoResult () {
            if (this.hasSendMail) {
                this.$router.push({
                    path: '/marketsurvey'
                })
            } else {
                this.$router.push({
                    path: '/find',
                    query: this.getQuery
                })
            }
        },
        async complete () {
            const res = await this.$api.payment.checkResultPayment(this.$route.query)
            if (res.status === 'OK') {
                const comp = await this.$api.survey.updateComplete(res.data.info, res.data.invoice)
                if (comp.status === 'OK') {
                    this.dataOption = {
                        location: comp.data.location,
                        businesstypeid: (comp.data.category ? comp.data.category : '0'),
                        radius: comp.data.radius,
                        survey: comp.data.id
                    }
                    this.email = comp.data.email
                    // console.log(this.email)
                    this.$refs.mdSuccess.show()
                    if (this.email) {
                        this.$api.survey.sendmail(res.data.info)
                    }
                } else {
                    this.msgError = comp.data.message
                }
            }
        }
    }
}
</script>

<style lang="scss">
</style>
