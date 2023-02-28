<template>
    <div id="admin-page" class="warraper">
        <header-admin :btn-link="'/user'" :btn-name="'Người Mua Hàng'" />
        <div id="content" class="row margin-0">
            <div id="menu-left" class="col-md-3">
                <ul id="admin-menu">
                    <li class="item">
                        <nuxt-link to="/admin/wallet">
                            <img src="~/static/images/icons/ad-wallet.svg">
                            <span> Quản Lý Ví</span>
                        </nuxt-link>
                    </li>
                    <li class="item">
                        <nuxt-link to="/admin/stores/list">
                            <img src="~/static/images/icons/ad-store.svg">
                            <span> Quản Lý Cửa Hàng</span>
                        </nuxt-link>
                    </li>
                    <li class="item">
                        <nuxt-link to="/admin/chains/list">
                            <img src="~/static/images/icons/ad-liststore.svg">
                            <span> Quản Lý Chuỗi Cửa Hàng</span>
                        </nuxt-link>
                    </li>
                    <li class="item">
                        <nuxt-link to="/admin/ordermanagement/listorder">
                            <img src="~/static/images/icons/ad-order.svg">
                            Quản Lý Đơn Hàng
                        </nuxt-link>
                    </li>
                    <li class="item">
                        <nuxt-link to="/admin/advertisement">
                            <img src="~/static/images/icons/ad-advertisement.svg">
                            Quản Lý Quảng Cáo
                        </nuxt-link>
                    </li>
                    <li class="item">
                        <nuxt-link to="/admin/product">
                            <img src="~/static/images/icons/ad-product.svg">
                            Quản Lý Sản Phẩm
                        </nuxt-link>
                    </li>
                    <li class="item">
                        <nuxt-link to="#" class="text-disable">
                            <img src="~/static/images/icons/ad-warehouse.svg">
                            Quản Lý Kho
                        </nuxt-link>
                    </li>
                    <li class="item">
                        <nuxt-link to="#" class="text-disable">
                            <img src="~/static/images/icons/ad-staff.svg">
                            Quản Lý Nhân Viên
                        </nuxt-link>
                    </li>
                    <li class="item">
                        <nuxt-link to="/admin/promotion">
                            <img src="~/static/images/icons/ad-promotion.svg">
                            Quản Lý Khuyến Mãi
                        </nuxt-link>
                    </li>
                    <li class="item">
                        <nuxt-link to="/">
                            <img src="~/static/images/icons/ad-report.svg">
                            Báo Cáo
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="col-md-9">
                <Nuxt />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '../assets/scss/_admin';
    @import '../assets/scss/_bootstrapcustom';
</style>

<script>
import { mapGetters } from 'vuex'
import HeaderAdmin from '../components/HeaderAdmin'

export default {
    name: 'AdminLayout',
    middleware: 'authenticated',
    components: { HeaderAdmin },
    computed: {
        ...mapGetters({
            checkIsLoggedIn: 'loggedIn',
            loggedInUser: 'user'
        })
    }
}
</script>
