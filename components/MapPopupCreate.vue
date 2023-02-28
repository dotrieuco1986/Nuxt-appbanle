<template>
    <div v-if="show" id="map-popup-create">
        <p class="title">
            Bạn có thể tạo kênh bán hàng, bảng hiệu trên bất kỳ điểm nào trên bản đồ.
        </p>
        <div v-show="link">
            <div class="border-bottom-1" />
            <br>
            <button :class="classButton" @click="closePopup">
                TẠO KÊNH BÁN
            </button>
        </div>
        <modal-request-login ref="modalRequestLogin" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ModalRequestLogin from '../components/modal/ModalRequestLogin'

export default {
    name: 'MapPopupCreate',
    components: {
        ModalRequestLogin
    },
    props: {
        newPoint: {
            type: Array,
            default: null
        },
        titleButton: {
            type: String,
            default: 'Tạo'
        },
        link: {
            type: String,
            default: ''
        },
        classButton: {
            type: String,
            default: 'btn btn-primary btn-primary-orange'
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters({
            checkIsLoggedIn: 'loggedIn',
            loggedInUser: 'user'
        })
    },
    methods: {
        closePopup () {
            if (this.loggedInUser) {
                this.$root.$emit('close-popup')
                this.$router.push({
                    path: this.link,
                    params: {
                    }
                })
            } else {
                this.$refs.modalRequestLogin.show()
            }
        }
    }
}
</script>

<style lang="scss">
    $extra-light-blue: #CBD4DA;
    $orange: #FE7235;
    $blue:#4AA9C5;
    .leaflet-popup-content {
        margin: 0;
        padding: 15px;

        #map-popup-create {
            color: #333333;
            text-align: center;

            .border-bottom-1 {
                border-bottom: solid 1px $extra-light-blue;
            }

            .title {
                text-align: center;
                font-size: 16px;
                margin-top: 10px;
            }

            .btn-primary-orange {
                background-color: $orange;
                border: 1px solid $orange;
            }

            .btn-primary-blue {
                background-color: $blue;
                border: 1px solid $blue;
            }
        }
    }
</style>
