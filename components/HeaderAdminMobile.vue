<template>
    <div id="header-admin-mobile">
        <ul id="user-menu">
            <li class="item">
                <div class="logo flex-column-center">
                    <n-link to="/">
                        <img src="@/assets/image/icon/logo.svg">
                    </n-link>
                    <b-input-group-append id="close-toggle" @click="closeToggleUserMenu">
                        <svg-icon icon="close" has-fill="true" grow-by-height="30px" />
                    </b-input-group-append>
                </div>
            </li>
            <li class="item">
                <template v-if="checkIsLoggedIn == false">
                    <a :href="url">
                        <img src="@/assets/image/icon/profile.svg" class="user-avatar">
                        <span class="font-weight-bold"> Đăng Nhập</span>
                    </a>
                </template>
                <template v-else>
                    <img :src="getAvatar" class="user-avatar">
                    <span class="font-weight-bold">{{ getName }}</span>
                </template>
            </li>
            <li class="item">
                <b-button id="create-sale-point">
                    TẠO KÊNH BÁN
                </b-button>
            </li>
            <li class="item-image">
                <n-link to="/user" prefetch>
                    <img src="@/assets/image/icon/sale.svg" width="15px">
                    <span>Khuyến mãi</span>
                </n-link>
            </li>
            <li class="item-image">
                <n-link to="/user" prefetch>
                    <img src="@/assets/image/icon/analytics.svg" width="15px">
                    <span>Khảo sát thị trường</span>
                </n-link>
            </li>
            <li class="item-image padding-bottom-10">
                <n-link to="/user" prefetch>
                    <img src="@/assets/image/icon/pop-up.svg" width="15px">
                    <span>Tạo quảng cáo</span>
                </n-link>
            </li>
            <li class="item-text-bg">
                <a v-b-toggle.collapse-account-mobile href="#">
                    <span>Tài Khoản Của Tôi</span>
                </a>
                <b-collapse id="collapse-account-mobile" class=" row mt-2">
                    <div class="col-12 padding-top-5 padding-bottom-5">
                        Hồ Sơ
                    </div>
                    <div class="col-12 padding-top-5 padding-bottom-5">
                        Địa Chỉ
                    </div>
                    <div class="col-12 padding-top-5 padding-bottom-5">
                        Đổi Mật Khẩu
                    </div>
                </b-collapse>
                <hr>
            </li>
            <li class="item-text-bg">
                <n-link to="/user/ordermanagement/listorder" prefetch>
                    <span> Đơn Mua Hàng</span>
                </n-link>
                <hr>
            </li>
            <li class="item-text-bg">
                <n-link to="/user/wallet" prefetch>
                    <span>Quản Lý Ví</span>
                </n-link>
                <hr>
            </li>
            <li class="item-text-bg">
                <a v-b-toggle.collapse-alert-mobile href="#" class="w-100">
                    <span>Thông báo</span>
                    <b-badge :pill="true" class="float-right">
                        10
                    </b-badge>
                </a>
                <b-collapse id="collapse-alert-mobile" class=" row mt-2">
                    <div class="col-12 padding-top-5 padding-bottom-5">
                        Cập Nhật Đơn Hàng
                    </div>
                    <div class="col-12 padding-top-5 padding-bottom-5">
                        Khuyến Mãi
                    </div>
                </b-collapse>
                <hr>
            </li>
            <li class="item-text-bg">
                <n-link to="/user/wallet" prefetch>
                    <span>Địa Điểm Yêu Thích</span>
                </n-link>
                <hr>
            </li>
            <li class="item-text-bg padding-bottom-10">
                <n-link to="/user/wallet" prefetch>
                    <span>Quản Lý Quảng Cáo</span>
                </n-link>
            </li>
            <li class="item-text">
                <n-link to="/user" prefetch>
                    <span>Thông tin tài khoản</span>
                </n-link>
                <hr>
            </li>
            <li class="item-text">
                <n-link to="/user" prefetch>
                    <span>Blog</span>
                </n-link>
                <hr>
            </li>
            <li class="item-text">
                <n-link to="/user" prefetch>
                    <span>Đăng xuất</span>
                </n-link>
            </li>
        </ul>
    </div>
</template>
<style lang="scss">
    @import '../assets/scss/_headeradmin-mobile';
</style>
<script>
import { mapGetters } from 'vuex'
import SvgIcon from './common/SvgIcon'
export default {
    name: 'HeaderAdminMobile',
    components: {
        SvgIcon
    },
    data () {
        return {
            url: null
        }
    },
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
        },
        getBalance () {
            return this.loggedInUser ? Intl.NumberFormat('VND').format(this.loggedInUser.profile.balance) : 0
        }
    },
    mounted () {
        this.url = process.env.OAUTH_API + window.location.origin + '/author'
    },
    methods: {
        closeToggleUserMenu () {
            this.$root.$emit('show-hide-user-menu-mobile')
        }
    }
}
</script>
