<template>
    <div class="warraper">
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-white shadow">
                <div v-show="toggleMenuSideBar" id="logo-col" class="flex-column-center">
                    <div class="logo">
                        <n-link to="/">
                            <img src="@/assets/image/icon/logo.svg">
                        </n-link>
                    </div>
                    <b-input-group-append id="close-toggle" @click="closeToggleMenu">
                        <svg-icon icon="close" has-fill="true" grow-by-height="30px" />
                    </b-input-group-append>
                </div>
                <div v-show="toggleMenu" id="search-col" class="flex-column-center">
                    <b-input-group class="margin-top-5">
                        <b-input-group-append id="toggle-icon" @click="isToggle">
                            <svg-icon icon="toggle-menu" grow-by-height="40px" />
                        </b-input-group-append>
                        <AutoComplete
                            class="col"
                            :url-autocomplete="urlAutocomplete"
                            :input-text="autocompleteText"
                            :input-style="input_style"
                            :id-textbox="idSearchLinkCSDK"
                            :submit-value="submitValuePlace"
                            :style-spinner="styleSpinner"
                            :place-holder="placeHolderText"
                        />
                        <b-input-group-append>
                            <b-button id="btn-img-filter" class="btn-filter" variant="outline-success">
                                <img id="img-filter" src="@/assets/image/icon/filter.svg">
                            </b-button>
                            <b-button class="btn-search" variant="info" @click="searchText">
                                <img src="@/assets/image/icon/search.svg">
                            </b-button>
                            <b-button id="header-btn-address-mobile">
                                <svg-icon icon="address" has-fill="true" grow-by-height="24px" />
                            </b-button>
                            <ul
                                id="menu-address-mobile"
                                ref="mydropdown"
                                class="dropdown-menu dropdown-menu-right"
                                :class="{show:showAddress}"
                            >
                                <li role="presentation">
                                    <div class="row margin-0">
                                        <b-input-group-append>
                                            <b-form-input id="tb-address-current" v-model="addressCurrent" readonly />
                                            <img src="@/assets/image/icon/target-current.svg" @click="showTargetPopUp">
                                        </b-input-group-append>
                                    </div>
                                </li>
                            </ul>
                        </b-input-group-append>
                    </b-input-group>
                    <ul
                        id="menu-table"
                        ref="mydropdown"
                        class="dropdown-menu dropdown-menu-right"
                        :class="{show:getFilter}"
                    >
                        <li role="presentation">
                            <div class="row margin-0">
                                <div class="radius-text">
                                    BÁN KÍNH
                                </div>
                                <div class="col padding-0">
                                    <div class="row margin-0">
                                        <div id="range-slider" class="col-10">
                                            <SliderRadius ref="SliderRadius" />
                                        </div>
                                        <div class="col-2 target-icon-col">
                                            <img src="@/assets/image/icon/target.svg" class="target-icon" @click="showTargetPopUp">
                                        </div>
                                    </div>
                                    <Modal id="target-popup">
                                        <SearchLocation :is-map-location="true" :address="addressCurrent" />
                                    </Modal>
                                    <Modal id="model-map-popup">
                                        <MapPopupSearch />
                                    </Modal>
                                </div>
                                <div class="menu-tab col-12">
                                    <b-tabs pills card vertical>
                                        <b-tab title="DANH MỤC" disabled />
                                        <b-tab v-for="(tab, tabidx) in listParentCategories" :key="tabidx" :title="tab.name" active>
                                            <b-card-text>
                                                <template v-for="(btn, idx) in listChildCategories">
                                                    <b-button
                                                        v-if="tab.id === btn.parentid"
                                                        :key="idx"
                                                        class="menu-item"
                                                        :pressed.sync="btn.state"
                                                        variant="outline-secondary"
                                                        @click="selectItem(btn.id)"
                                                    >
                                                        {{ btn.name }}
                                                    </b-button>
                                                </template>
                                            </b-card-text>
                                        </b-tab>
                                    </b-tabs>
                                </div>
                                <div class="col-12 padding-0 text-center">
                                    <b-button id="btn-search-filter" variant="blue" @click="searchFilter">
                                        TÌM
                                    </b-button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-show="toggleMenuSideBar" id="user-col">
                    <div v-show="!toggleMenu" id="navbar-supported-content" class="navbar-collapse">
                        <b-button id="header-btn-address" class="btn-address" variant="info">
                            <span><img src="@/assets/image/icon/address.svg"></span>
                            <span class="margin-top-5 margin-left-10">Địa Chỉ...</span>
                        </b-button>
                        <ul
                            id="menu-address"
                            ref="mydropdown"
                            class="dropdown-menu dropdown-menu-right"
                            :class="{show:showAddress}"
                        >
                            <li role="presentation">
                                <div class="row margin-0">
                                    <b-input-group-append>
                                        <b-form-input id="tb-address-current" v-model="addressCurrent" readonly />
                                        <img src="@/assets/image/icon/target-current.svg" @click="showTargetPopUp">
                                    </b-input-group-append>
                                </div>
                            </li>
                        </ul>
                        <ul id="usercol-group-moile" class="nav navbar-nav ml-auto">
                            <li id="group-user-mobile" class="nav-item padding-top-15 padding-bottom-5">
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
                            <li id="balance-mobile" class="nav-item padding-top-5">
                                <div class="float-left">
                                    <span>Số dư : </span>
                                    <span class="text-orange">{{ getBalance }} VNĐ</span>
                                </div>
                            </li>
                            <li class="padding-top-5">
                                <b-button id="create-sale-point" @click="goToCreateBusiness">
                                    TẠO KÊNH BÁN
                                </b-button>
                            </li>
                            <li class="nav-item padding-top-8">
                                <a class="nav-link" href="#">
                                    <img src="@/assets/image/icon/sale.svg">
                                </a>
                                <span id="text-promotion" class="text-mobile"><a href="#">Khuyến Mãi</a></span>
                                <hr>
                            </li>
                            <li class="separate" />
                            <li class="nav-item padding-top-8">
                                <n-link class="nav-link" to="#">
                                    <img src="@/assets/image/icon/analytics.svg" @click.prevent="gotoPage('/marketsurvey')">
                                </n-link>
                                <span class="text-mobile" @click.prevent="gotoPage('/marketsurvey')">
                                    <a href="#">Khảo Sát Thị Trường </a>
                                </span>
                                <hr>
                            </li>
                            <li class="separate" />
                            <li class="nav-item padding-top-8 ">
                                <n-link class="nav-link" to="#">
                                    <img src="@/assets/image/icon/pop-up.svg" @click.prevent="gotoAdvertisement">
                                </n-link>
                                <span id="text-advertisement" class="text-mobile" @click.prevent="gotoAdvertisement"><a href="#">Tạo Quảng Cáo</a></span>
                            </li>
                            <li class="nav-item menu-mobile">
                                <div class="row bg-group-list">
                                    <div class="col-12 text-group-list">
                                        <n-link id="text-manage-ad" class="nav-link" to="/user/ordermanagement/listorder">
                                            Quản lý quảng cáo
                                        </n-link>
                                    </div>
                                    <div class="col-12 text-group-list">
                                        <n-link id="text-order-history" class="nav-link" to="/user/ordermanagement/listorder">
                                            Lịch sử mua hàng
                                        </n-link>
                                    </div>
                                    <div class="col-12 text-group-list">
                                        <n-link id="text-place-save" class="nav-link" to="#">
                                            Địa điểm đã lưu
                                        </n-link>
                                    </div>
                                    <div class="col-12 text-group-list">
                                        <n-link id="text-alert" class="nav-link" to="#">
                                            Thông báo
                                        </n-link>
                                    </div>
                                </div>
                                <div class="row margin-0">
                                    <div id="text-account-info" class="col-12 text-group-user">
                                        Thông tin tài khoản
                                    </div>
                                    <hr>
                                    <div class="col-12 text-group-user">
                                        <n-link id="text-blog" to="#">
                                            Blog
                                        </n-link>
                                    </div>
                                    <hr>
                                    <div class="col-12 text-group-user" @click="logout">
                                        Đăng xuất
                                    </div>
                                </div>
                            </li>
                            <li class="separate" />
                            <li id="group-branch" class="nav-item padding-top-15">
                                <div class="padding-right-0">
                                    <b-dropdown
                                        right
                                        variant="none"
                                        @click="closeDropdownFilterAndAddress"
                                    >
                                        <template slot="button-content">
                                            <img id="group-logo" src="@/assets/image/icon/group.svg" @click="closeDropdownFilterAndAddress">
                                        </template>
                                        <b-dropdown-item id="group-branch-table">
                                            <div class="row">
                                                <div class="col-5 padding-0">
                                                    <p><img src="@/assets/image/icon/goollow_restaurant_icon.png"></p>
                                                    <p>Goollow68</p>
                                                </div>
                                                <div class="col-2 padding-0" />
                                                <div class="col-5 padding-0">
                                                    <p><img src="@/assets/image/icon/housecon_icon.png"></p>
                                                    <p>HouseCon68</p>
                                                </div>
                                                <div class="col-5 padding-0">
                                                    <p><img src="@/assets/image/icon/goollow_icon.png"></p>
                                                    <p>HomeInfo68</p>
                                                </div>
                                                <div class="col-2 padding-0" />
                                                <div class="col-5 padding-0">
                                                    <p><img src="@/assets/image/icon/sale_icon.png"></p>
                                                    <p>Rao Vặt</p>
                                                </div>
                                            </div>
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </li>
                            <li class="separate" />
                            <li id="group-user">
                                <div class="padding-right-0 text-right">
                                    <a v-if="checkIsLoggedIn == false" @click="goToLogin">
                                        <img src="@/assets/image/icon/profile.svg" class="user-avatar">
                                    </a>
                                    <b-dropdown
                                        v-else
                                        id="drop-down-login"
                                        :text="getName"
                                        right
                                        variant="none"
                                        @click="closeDropdownFilterAndAddress"
                                    >
                                        <template slot="button-content">
                                            <img
                                                id="avataruser1"
                                                :src="getAvatar"
                                                class="user-avatar"
                                                @click="closeDropdownFilterAndAddress"
                                            >
                                        </template>
                                        <b-dropdown-item v-if="isAdmin" href="/dashboard">
                                            <i class="fa fa-dashboard item-dsh manager-dashboard" />
                                            <span>Dashboard</span>
                                        </b-dropdown-item>

                                        <b-dropdown-item v-if="!isAdmin" href="#">
                                            <span>Số dư </span>
                                            <span
                                                id="user-balance"
                                                class="text-orange float-right"
                                            >{{ getBalance }} VNĐ</span>
                                        </b-dropdown-item>

                                        <b-dropdown-item v-if="!isAdmin" href="/user/ordermanagement/listorder" class="line-top">
                                            <i class="fa fa-cutlery item-dsh manager-document" />
                                            <span>Quản lý quảng cáo</span>
                                        </b-dropdown-item>

                                        <b-dropdown-item v-if="!isAdmin" href="/user/ordermanagement/listorder" class="line-top">
                                            <span>Lịch sử mua hàng</span>
                                        </b-dropdown-item>

                                        <b-dropdown-item v-if="!isAdmin" href="#" class="line-top">
                                            <i class="fa fa-heart item-dsh manager-save-address" />
                                            <span>Địa điểm đã lưu</span>
                                        </b-dropdown-item>

                                        <b-dropdown-item v-if="!isAdmin" href="#" class="line-top">
                                            <span>Thông báo</span>
                                            <b-badge :pill="true">
                                                10
                                            </b-badge>
                                        </b-dropdown-item>

                                        <b-dropdown-item>
                                            <i class="fa fa-cog item-dsh  manager-acount" />
                                            <span>Thông tin tài khoản</span>
                                        </b-dropdown-item>
                                        <b-dropdown-divider />
                                        <b-dropdown-item v-if="!isAdmin" href="#">
                                            <span class="text-gray">Blog</span>
                                        </b-dropdown-item>
                                        <b-dropdown-divider />
                                        <b-dropdown-item @click="logout">
                                            <span>Đăng xuất</span>
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        <div id="content">
            <!-- Sidebar  -->
            <Map :id-map-name="idMapName" />
            <Nuxt />
            <!-- <v-chat /> -->
            <!-- <b-button id="switch-map-mobile" variant="none" class="flex-column-center flex-row-cente" @click="showMapSwitch">
                <svg-icon v-show="isMapSwitch" icon="checklist" grow-by-height="16px" />
                <span v-show="isMapSwitch">Danh sách</span>
                <svg-icon v-show="!isMapSwitch" id="map-path-icon" icon="map-path" grow-by-height="16px" />
                <span v-show="!isMapSwitch">Bản đồ</span>
            </b-button> -->
        </div>
        <modal-request-login ref="modalRequestLogin" />
    </div>
</template>

<style lang="scss">
    @import '../assets/scss/_variable';
    @import '../assets/scss/_goollow68';
    @import '../assets/scss/_bootstrapcustom';
    @import '../assets/scss/_rangeslider';
    body {
        position: relative;
        width: 100%;
        min-height: 100%;
    }

    html {
        height: 100%;
    }
</style>

<script>
import { mapGetters } from 'vuex'
import { ConstantsJS } from 'static/constants'
import Map from '../components/Map'
import AutoComplete from '../components/AutoComplete'
import SearchLocation from '../components/SearchLocation'
import MapPopupSearch from '../components/MapPopupSearch'
import SliderRadius from '../components/SliderRadius'
import SvgIcon from '../components/common/SvgIcon'
import Modal from '../components/modal/Modal'
import ModalRequestLogin from '../components/modal/ModalRequestLogin'
export default {
    name: 'App',
    components: {
        ModalRequestLogin,
        Modal,
        MapPopupSearch,
        Map,
        AutoComplete,
        SearchLocation,
        SliderRadius,
        SvgIcon
    },
    async fetch () {
        const result = await this.$api.store.getCategories()
        const listCategoriesData = result.data
        for (let index = 0; index < listCategoriesData.length; ++index) {
            if (listCategoriesData[index].parent_id) {
                const objdata = { id: listCategoriesData[index].id, name: listCategoriesData[index].name, parentid: listCategoriesData[index].parent_id, state: false }
                this.listChildCategories.push(objdata)
            } else {
                this.listParentCategories.push(listCategoriesData[index])
            }
        }
    },
    data () {
        return {
            url: null,
            map: null,
            isAdmin: false,
            listParentCategories: [],
            listChildCategories: [],
            isFilter: false,
            isAddressShow: false,
            input_style: 'border-radius: 0px; padding-right: 35px !important; min-width:70%',
            autocompleteText: 'Tim san pham danh muc ',
            urlAutocomplete: 'stores/autocomplete',
            idSearchLinkCSDK: 'search-link-cskd',
            styleSpinner: 'color: gray !important;',
            placeHolderText: 'Tìm sản phẩm, danh mục hay thương hiệu mong muốn ...',
            valueFilter: null,
            bussinessIdFilter: 0,
            currentPointFilter: null,
            idMapName: 'map-home',
            addressCurrent: '',
            toggleMenu: true,
            toggleMenuSideBar: false,
            isMapSwitch: true
        }
    },
    computed: {
        ...mapGetters({
            checkIsLoggedIn: 'loggedIn',
            loggedInUser: 'user'
        }),
        btnStates () {
            return this.buttons.map(btn => btn.state)
        },
        showAddress () {
            return this.isAddressShow
        },
        getFilter () {
            return this.isFilter
        },
        getName () {
            return this.loggedInUser ? this.loggedInUser.info.name : ' '
        },
        getAvatar () {
            return process.env.SERVER_URL + (this.loggedInUser ? this.loggedInUser.profile.avatar : '/images/useruser.png')
        },
        getUserID () {
            return this.loggedInUser ? this.loggedInUser.info.id : 0
        },
        getBalance () {
            return this.loggedInUser ? Intl.NumberFormat('VND').format(this.loggedInUser.profile.balance) : 0
        },
        showMenuToggle () {
            return this.toggleMenuSideBar
        }

    },
    watch: {
        $route: 'updateLocationCurrent'
    },
    mounted () {
        const mthis = this

        if (this.$route.query && this.$route.query.error && this.$route.query.error === ConstantsJS.STR_UNAUTHORIZED) {
            if (this.$route.query.redirect_uri) {
                this.$refs.modalRequestLogin.setUrlRedirect(process.env.APP_URL + this.$route.query.redirect_uri)
            }
            this.$refs.modalRequestLogin.setActionAfterClose(function () {
                mthis.$refs.modalRequestLogin.setActionAfterClose(null)
                mthis.$router.push('/')
            })
            this.$refs.modalRequestLogin.show()
            return false
        }

        this.$root.$on('model-map-popup', () => {
            this.showMap()
        })
        this.url = process.env.OAUTH_API + window.location.origin + '/author'

        // if (this.checkIsLoggedIn) {
        //     this.$chat.init(this.getUserID, 'user')
        // }

        this.updateLocationCurrent()

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            mthis.closeEvent(event)
        }

        window.onresize = function (event) {
            mthis.detectOrientationChange()
        }

        document.onreadystatechange = () => {
            if (document.readyState === 'complete') {
                this.detectOrientationChange()
            }
        }
    },
    methods: {
        closeMenuMobile () {
            this.toggleMenu = true
            this.toggleMenuSideBar = false
        },
        goToLogin () {
            localStorage.setItem('urlRedirect', window.location.href)
            window.location.href = this.url
        },
        showMapSwitch () {
            if (this.isMapSwitch) {
                this.isMapSwitch = false
            } else {
                this.isMapSwitch = true
            }
        },
        detectOrientationChange () {
            const width = window.innerWidth
            if (width > 768) {
                this.toggleMenu = true
                this.toggleMenuSideBar = true
            } else {
                this.toggleMenu = true
                this.toggleMenuSideBar = false
            }
        },
        isToggle () {
            if (this.toggleMenu) {
                this.$root.$emit('show-hide-map-switch', false)
                this.toggleMenu = false
                this.toggleMenuSideBar = true
            } else {
                this.$root.$emit('show-hide-map-switch', true)
                this.toggleMenu = true
                this.toggleMenuSideBar = false
            }
        },
        closeToggleMenu () {
            this.$root.$emit('show-hide-map-switch', true)
            this.toggleMenu = true
            this.toggleMenuSideBar = false
        },
        gotoAdvertisement () {
            if (this.loggedInUser) {
                this.$router.push({
                    path: '/advertisement'
                })
            } else {
                this.$refs.modalRequestLogin.show()
            }
        },
        gotoPage (path) {
            if (this.loggedInUser) {
                this.$router.push({
                    path
                })
            } else {
                this.$refs.modalRequestLogin.show()
            }
        },
        closeFilterAndPopUp () {
            this.isFilter = false
            this.$bvModal.hide('target-popup')
            this.$bvModal.hide('model-map-popup')
        },
        closeDropdownFilterAndAddress () {
            this.isFilter = false
            this.isAddressShow = false
        },
        showMap () {
            this.$bvModal.hide('target-popup')
            this.$bvModal.show('model-map-popup')
        },
        goToCreateBusiness () {
            this.detectOrientationChange()
            if (this.loggedInUser) {
                if (location.pathname !== '/createbusiness') {
                    this.$router.push({
                        path: '/createbusiness?location=',
                        params: {
                        }
                    })
                }
            } else {
                this.$refs.modalRequestLogin.show()
            }
        },
        showTargetPopUp () {
            this.$bvModal.show('target-popup')
        },
        showFilter () {
            if (this.isFilter === true) {
                this.isFilter = false
                this.$root.$emit('show-hide-map-switch', true)
            } else {
                this.isFilter = true
                this.$root.$emit('show-hide-map-switch', false)
            }
        },
        showAddressView () {
            if (this.isAddressShow === true) {
                this.isAddressShow = false
            } else {
                this.isAddressShow = true
            }
        },
        logout () {
            this.$cookies.remove('auth')
            this.$store.commit('setAuth', null)
            location.reload()
        },
        searchText () {
            const texts = document.getElementById('search-link-cskd').value
            if (this.currentPointFilter) {
                this.pushLink(0, texts, this.currentPointFilter.lat, this.currentPointFilter.lng)
            }
        },
        searchFilter () {
            if (this.currentPointFilter) {
                this.pushLink(this.bussinessIdFilter, this.valueFilter, this.currentPointFilter.lat, this.currentPointFilter.lng)
            }
        },
        submitValuePlace (event, data) {
            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.STORE,
                params: {
                    id: data.id
                }
            })
        },
        selectItem (value) {
            for (let i = 0; i < this.listChildCategories.length; i++) {
                if (this.listChildCategories[i].id === value) {
                    this.listChildCategories[i].state = true
                    this.valueFilter = this.listChildCategories[i].name
                    this.bussinessIdFilter = this.listChildCategories[i].id
                } else {
                    this.listChildCategories[i].state = false
                }
            }
        },
        pushLink (bussinessId, value, lat, lng) {
            this.$router.push({
                name: 'find',
                query: {
                    businesstypeid: bussinessId,
                    location: lat + ',' + lng,
                    radius: this.$refs.SliderRadius.value,
                    text: value
                }
            })
        },
        updateLocationCurrent () {
            this.isFilter = false
            this.detectOrientationChange()
            if (this.$route.name === 'index') {
                if (this.$route.query.updatelat && this.$route.query.updatelng) {
                    this.closeFilterAndPopUp()
                    const dataArr = { lat: this.$route.query.updatelat, lng: this.$route.query.updatelng }
                    this.currentPointFilter = dataArr
                    const location = [this.currentPointFilter.lat, this.currentPointFilter.lng]
                    this.getInfoByLocation(location, false)
                } else {
                    this.$router.push({
                        name: 'landing'
                    })
                }
            } else if (this.$route.name === 'find') {
                if (this.$route.query.location) {
                    const value = this.$route.query.location
                    const location = value.split(',')
                    const dataArr = { lat: location[0], lng: location[1] }
                    this.currentPointFilter = dataArr
                    this.getInfoByLocation(location, true)
                }
            } else {
                this.$store.dispatch('address/getAddress')
                const myGoollow68Location = this.$store.state.address.myGoollow68Location
                if (myGoollow68Location) {
                    const dataArr = { lat: myGoollow68Location.lat, lng: myGoollow68Location.lng }
                    this.currentPointFilter = dataArr
                    this.addressCurrent = myGoollow68Location.address
                    const location = [this.currentPointFilter.lat, this.currentPointFilter.lng]
                    this.getInfoByLocation(location, true)
                } else {
                    this.$router.push({
                        name: 'landing'
                    })
                }
            }
        },
        async getInfoByLocation (value, hasMarker) {
            const response = await this.$api.map.getGeocode(value)
            if (response) {
                this.addressCurrent = response[3]
                const dataMarker = {
                    name: this.idMapName,
                    data: this.currentPointFilter
                }

                if (hasMarker === false) {
                    this.$root.$emit('create-maker-on-map', dataMarker)
                }

                const myGoollow68LocationData = { lat: this.currentPointFilter.lat, lng: this.currentPointFilter.lng, address: this.addressCurrent }
                this.$store.dispatch('address/setAddress', myGoollow68LocationData)
            }
        },
        closeEvent (event) {
            const target = event.target || event.currentTarget
            const domMenuTable = document.getElementById('menu-table')
            const domBtnImgFilter = document.getElementById('btn-img-filter')
            const domBtnSearchFilter = document.getElementById('btn-search-filter')

            const domMenuAddress = document.getElementById('menu-address')
            const domBtnAddress = document.getElementById('header-btn-address')
            const domBtnAddressMobile = document.getElementById('header-btn-address-mobile')

            const domTextPro = document.getElementById('text-promotion')
            const domTextSurvey = document.getElementById('text-survey')
            const domTextAdvertisement = document.getElementById('text-advertisement')
            const domTextMangeAdvertisement = document.getElementById('text-manage-ad')
            const domTextAccountInfo = document.getElementById('text-account-info')
            const domTextHistoryOrder = document.getElementById('text-history-order')
            const domTextPlaceSave = document.getElementById('text-place-save')
            const domTextBlog = document.getElementById('text-blog')
            const domTextAlert = document.getElementById('text-alert')

            if (domBtnSearchFilter != null && domBtnSearchFilter.contains(target)) {
                this.isFilter = false
            } else if (domMenuTable != null && domMenuTable.contains(target)) {
                this.isFilter = true
                this.isAddressShow = false
            } else if (domBtnImgFilter != null && domBtnImgFilter.contains(target)) {
                this.isAddressShow = false
                this.showFilter()
            } else if (domMenuAddress != null && domMenuAddress.contains(target)) {
                this.isAddressShow = true
                this.isFilter = false
            } else if (domBtnAddress != null && domBtnAddress.contains(target)) {
                this.isFilter = false
                this.showAddressView()
            } else if (domBtnAddressMobile != null && domBtnAddressMobile.contains(target)) {
                this.isFilter = false
                this.showAddressView()
            } else if (domTextPro != null && domTextPro.contains(target)) {
                this.closeMenuMobile()
            } else if (domTextSurvey != null && domTextSurvey.contains(target)) {
                this.closeMenuMobile()
            } else if (domTextAdvertisement != null && domTextAdvertisement.contains(target)) {
                this.closeMenuMobile()
            } else if (domTextMangeAdvertisement != null && domTextMangeAdvertisement.contains(target)) {
                this.closeMenuMobile()
            } else if (domTextAccountInfo != null && domTextAccountInfo.contains(target)) {
                this.closeMenuMobile()
            } else if (domTextHistoryOrder != null && domTextHistoryOrder.contains(target)) {
                this.closeMenuMobile()
            } else if (domTextPlaceSave != null && domTextPlaceSave.contains(target)) {
                this.closeMenuMobile()
            } else if (domTextBlog != null && domTextBlog.contains(target)) {
                this.closeMenuMobile()
            } else if (domTextAlert != null && domTextAlert.contains(target)) {
                this.closeMenuMobile()
            } else {
                this.isFilter = false
                this.isAddressShow = false
            }
        }
    }
}
</script>
