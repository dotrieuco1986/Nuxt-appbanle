<template>
    <div id="user-page" class="warraper">
        <header-admin :btn-link="'/admin'" :btn-name="'Người Bán Hàng'" />
        <div id="content" class="row margin-0">
            <div id="menu-left" class="col-md-3">
                <ul id="user-menu">
                    <li class="padding-bottom-15 padding-top-10">
                        <b-avatar class="user-avatar" :src="getAvatar" />
                        {{ getName }}
                    </li>
                    <li class="item">
                        <a v-b-toggle.collapse-account href="#">
                            <img src="@/assets/admin-image/icon/human.svg" width="15px">
                            <span>Tài Khoản Của Tôi</span>
                        </a>
                        <b-collapse id="collapse-account" class="mt-2">
                            <p>
                                <nuxt-link to="#">
                                    Hồ Sơ
                                </nuxt-link>
                            </p>
                            <p>
                                <nuxt-link to="#">
                                    Địa Chỉ
                                </nuxt-link>
                            </p>
                            <p>
                                <nuxt-link to="#">
                                    Đổi Mật Khẩu
                                </nuxt-link>
                            </p>
                        </b-collapse>
                    </li>
                    <li class="item">
                        <n-link to="/user/ordermanagement/listorder" prefetch>
                            <img src="@/assets/admin-image/icon/order.svg" width="15px">
                            <span> Đơn Mua Hàng</span>
                        </n-link>
                    </li>
                    <li class="item">
                        <n-link to="/user/wallet" prefetch>
                            <img src="@/assets/admin-image/icon/voucher.svg" width="15px">
                            <span>Quản Lý Ví</span>
                        </n-link>
                    </li>
                    <li class="item">
                        <a v-b-toggle.collapse-alert href="#">
                            <img src="@/assets/admin-image/icon/notification.svg" width="15px">
                            <span>Thông Báo</span>
                        </a>
                        <b-collapse id="collapse-alert" class="mt-2">
                            <p>
                                <nuxt-link to="#">
                                    Cập Nhật Đơn Hàng
                                </nuxt-link>
                            </p>
                            <p>
                                <nuxt-link to="#">
                                    Khuyến Mãi
                                </nuxt-link>
                            </p>
                        </b-collapse>
                    </li>
                    <li class="item">
                        <n-link to="/user" prefetch>
                            <img src="@/assets/admin-image/icon/ad-love.svg" width="15px">
                            <span>Địa Điểm Yêu Thích</span>
                        </n-link>
                    </li>
                    <li class="item">
                        <n-link to="/user" prefetch>
                            <img src="@/assets/admin-image/icon/ad-advertisement.svg" width="15px">
                            <span>Quản Lý Quảng Cáo

                            </span>
                        </n-link>
                    </li>
                </ul>
            </div>
            <div id="content-page">
                <Nuxt />
            </div>
        </div>
        <Modal id="model-map-popup">
            <MapPopupSearch :has-event="hasEvent" />
        </Modal>
    </div>
</template>

<style lang="scss">
    @import '../assets/scss/_user';
    @import '../assets/scss/_bootstrapcustom';
</style>

<script>
import { mapGetters } from 'vuex'
import HeaderAdmin from '../components/HeaderAdmin'
import Modal from '../components/modal/Modal'
import MapPopupSearch from '../components/MapPopupSearch'
export default {
    name: 'UserLayout',
    components: { MapPopupSearch, Modal, HeaderAdmin },
    computed: {
        ...mapGetters({
            checkIsLoggedIn: 'loggedIn',
            loggedInUser: 'user'
        }),
        getName () {
            return this.loggedInUser ? this.loggedInUser.info.name : ' '
        },
        getAvatar () {
            return process.env.SERVER_URL + (this.loggedInUser ? this.loggedInUser.profile.avatar : '/images/useruser.png')
        }
    },
    data () {
        return {
            map: null,
            src_avatar: null,
            isLoggedIn: true,
            name: null,
            role: null,
            isAdmin: false,
            balance_user: 0,
            listPLCSKD: [],
            loaiCSKD: [],
            targetCoordinates: null,
            input_style: 'border-radius: 15px; padding-right: 35px !important;',
            autocompleteText: '',
            client_add_business: {
                isAddBusiness: false,
                urlRedirect: ''
            },
            hasEvent: true
        }
    },
    mounted () {
        this.$root.$on('model-map-popup', () => {
            this.showMap()
        })
    },
    methods: {
        showMap () {
            this.$bvModal.hide('target-popup')
            this.$bvModal.show('model-map-popup')
        }
    }
}
</script>
