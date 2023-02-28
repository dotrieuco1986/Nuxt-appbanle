<template>
    <div>
        <modal id="modal-request-login" ref="myModal" size="sm" @closeModal="eventClose">
            <div class="modal-request-login">
                <h4>{{ $t('Message.notLogin') }}</h4>
                <mvp-button :name="$t('button.login')" color="login" class="mr-2" @click.native="loginClick" />
                <mvp-button :name="$t('button.register')" color="register" @click.native="loginClick" />
            </div>
        </modal>
    </div>
</template>

<script>
import MvpButton from '../MVPControl/MvpButton'
export default {
    name: 'ModalRequestLogin',
    components: { MvpButton },
    data () {
        return {
            urlRedirect: '',
            actionAfterClose: null
        }
    },
    methods: {
        loginClick () {
            localStorage.setItem('urlRedirect', this.urlRedirect === '' ? window.location.href : this.urlRedirect)
            window.location.href = process.env.OAUTH_API + window.location.origin + '/author'
        },
        setUrlRedirect (url) {
            this.urlRedirect = url
        },
        setActionAfterClose (action) {
            this.actionAfterClose = action
        },
        show () {
            this.$refs.myModal.show()
        },
        hide () {
            this.$refs.myModal.hide()
        },
        eventClose (evt) {
            if (this.actionAfterClose) {
                this.actionAfterClose()
            }
        }
    }
}
</script>

<style lang="scss">
    @import './assets/scss/variable';

    .modal-request-login {
        text-align: center;

        h4 {
            color: red;
            display: block;
            padding-bottom: 10px;
        }

        .register {
            background-color: $blue;
            color: $white;
            font-weight: bold;
            width: 120px;
        }

        .login {
            background-color: $orange;
            color: $white;
            font-weight: bold;
            width: 120px;
        }
    }
</style>
