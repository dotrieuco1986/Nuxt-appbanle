<template>
    <header id="header-admin" class="w-100 bg-white box-shadow">
        <div id="admin-logo-col" class="flex-column-center">
            <div class="logo">
                <nuxt-link to="/">
                    <img src="@/assets/admin-image/icon/logo.svg">
                </nuxt-link>
            </div>
            <b-input-group id="header-menu-mobile" class="flex-column-center">
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
                                        <SearchLocation :is-map-location="true" :address="addressCurrent" :event-map-pop-up-name="eventMapPopUpName" />
                                    </Modal>
                                    <Modal id="header-admin-model-map-popup">
                                        <MapPopupSearch />
                                    </Modal>
                                </div>
                                <div class="menu-tab">
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
                                    <b-button id="btn-search-filter" variant="none" @click="searchFilter">
                                        TÌM
                                    </b-button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </b-input-group-append>
            </b-input-group>
        </div>
        <div id="admin-menu-col" class="flex-column-center">
            <ul id="ul-admin-menu-col">
                <li class="nav-item padding-top-5">
                    <b-button id="create-sale-point" :href="btnLink">
                        {{ btnName }}
                    </b-button>
                </li>
                <li class="nav-item separate" />
                <li class="nav-item padding-top-3">
                    <a class="nav-link" href="#">
                        <img src="@/assets/admin-image/icon/group.svg">
                    </a>
                </li>
                <li class="nav-item separate" />
                <li class="nav-item active padding-top-3">
                    <a class="nav-link" href="#">
                        <img src="@/assets/admin-image/icon/bell.svg">
                    </a>
                </li>
                <li class="nav-item padding-top-3 ">
                    <a class="nav-link" href="#">
                        <img src="@/assets/admin-image/icon/chat.svg">
                    </a>
                </li>
                <li class="nav-item padding-top-3 ">
                    <a class="nav-link" href="#">
                        <img src="@/assets/admin-image/icon/user.svg">
                    </a>
                </li>
                <li class="nav-item padding-top-3 ">
                    <a class="nav-link" href="#">
                        <img src="@/assets/admin-image/icon/cart.svg">
                    </a>
                </li>
            </ul>
        </div>
        <div id="empty-menu-col" class="p-0" />
        <header-admin-mobile v-show="toggleMenuSideBar" />
    </header>
</template>
<style lang="scss">
    @import '../assets/scss/_headeradmin';
</style>
<script>
import { mapGetters } from 'vuex'
import { ConstantsJS } from '../static/constants'
import SvgIcon from './common/SvgIcon'
import HeaderAdminMobile from './HeaderAdminMobile'
import SearchLocation from './SearchLocation'
import MapPopupSearch from './MapPopupSearch'
export default {
    name: 'HeaderAdmin',
    components: { HeaderAdminMobile, SvgIcon, SearchLocation, MapPopupSearch },
    props: {
        btnName: {
            type: String,
            default: ''
        },
        btnLink: {
            type: String,
            default: ''
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
            map: null,
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
            eventMapPopUpName: 'header-admin-model-map-popup'
        }
    },
    mounted () {
        this.$store.dispatch('address/getAddress')
        const myGoollow68Location = this.$store.state.address.myGoollow68Location
        if (myGoollow68Location) {
            this.addressCurrent = myGoollow68Location.address
            const dataArr = { lat: myGoollow68Location.lat, lng: myGoollow68Location.lng }
            this.currentPointFilter = dataArr
        }

        this.$root.$on(this.eventMapPopUpName, () => {
            this.showMap()
        })

        this.$root.$on('show-hide-user-menu-mobile', () => {
            this.closeMenuMobile()
        })

        const mthis = this
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
        detectOrientationChange () {
            const width = window.outerWidth
            if (width > 1023) {
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
        gotoAdvertisement () {
            if (this.loggedInUser) {
                this.$router.push({
                    path: '/advertisement'
                })
            } else {
                this.$refs.modalRequestLogin.show()
            }
        },
        showMap () {
            this.$bvModal.hide('target-popup')
            this.$bvModal.show('header-admin-model-map-popup')
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
