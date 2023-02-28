<template>
    <div class="sidebar">
        <b-sidebar
            :id="id"
            v-slot:default="{ hide }"
            title="Sidebar"
            no-header
            no-slide
            shadow
            :right="right"
            :visible="visible"
            no-close-on-route-change
            @shown="showSidebar"
            @hidden="hideSidebar"
        >
            <i v-if="!noBtnClose" class="close-sidebar" @click="hide">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23.999" viewBox="0 0 24 23.999">
                    <g id="close" transform="translate(0 -0.005)">
                        <g id="Group_18" data-name="Group 18" transform="translate(0 0.005)">
                            <path id="Path_26" data-name="Path 26" d="M20.489,3.516a12,12,0,1,0,0,16.979A12.019,12.019,0,0,0,20.489,3.516ZM16.952,15.542a1,1,0,1,1-1.415,1.415L12,13.419,8.465,16.956A1,1,0,1,1,7.05,15.541L10.586,12,7.049,8.468A1,1,0,0,1,8.464,7.053L12,10.59l3.537-3.537a1,1,0,1,1,1.415,1.415L13.415,12Z" transform="translate(0 -0.005)" fill="#a5a5a5" />
                        </g>
                    </g>
                </svg>
            </i>
            <b-button
                v-if="!right"
                id="btn-open-close"
                v-b-toggle="id"
                class="shadow z1001 hide-mobile"
            >
                <svg v-if="!active" xmlns="http://www.w3.org/2000/svg" width="12.358" height="20" viewBox="0 0 12.358 20">
                    <path id="Path_1552" data-name="Path 1552" d="M17.642,48.907,10,56.549,2.358,48.907,0,51.265l10,10,10-10Z" transform="translate(-48.907 20) rotate(-90)" fill="#707070" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="12.358" height="20" viewBox="0 0 12.358 20">
                    <path id="Path_37" data-name="Path 37" d="M17.642,48.907,10,56.549,2.358,48.907,0,51.265l10,10,10-10Z" transform="translate(61.265) rotate(90)" fill="#707070" />
                </svg>
            </b-button>
            <ButtonCart v-show="showCart && !showDlpdf" />
            <a v-if="showDlpdf" class="no-border shadow btn-dlpdf hide-mobile" @click="download">
                <span class="bg">
                    DOWNLOAD PDF
                </span>
            </a>
            <slot />
        </b-sidebar>
        <b-button v-show="visibleMapSwitch" id="switch-map-mobile" v-b-toggle="id" class="flex-column-center flex-row-cente" @click="isMapSwitch = !isMapSwitch">
            <svg-icon v-show="isMapSwitch" icon="checklist" grow-by-height="16px" />
            <span v-show="isMapSwitch">Danh sách</span>
            <svg-icon v-show="!isMapSwitch" id="map-path-icon" icon="map-path" grow-by-height="16px" />
            <span v-show="!isMapSwitch">Bản đồ</span>
        </b-button>
    </div>
</template>
<script>
import '@/components/buttons/ButtonCart'
export default {
    name: 'SideBar',
    components: {

    },
    props: {
        id: {
            type: String,
            default: 'sidebar-1',
            description: 'id of component'
        },
        width: {
            type: String,
            default: '350px',
            description: 'width of side bar'
        },
        noBtnClose: {
            type: Boolean,
            default: false,
            description: 'default is show'
        },
        right: {
            type: Boolean,
            default: false,
            description: 'default is show left'
        },
        showCart: {
            type: Boolean,
            default: false,
            description: 'show button cart'
        },
        visible: {
            type: Boolean,
            default: true,
            description: 'show sidebar'
        },
        showDlpdf: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            marginButton: this.width,
            active: true,
            closeSidebar: true,
            isMapSwitch: true,
            visibleMapSwitch: true
        }
    },
    computed: {
        dlPdf () {
            return '/api/survey/dlpdf/' + this.showDlpdf
        }
    },
    mounted () {
        this.$root.$on('show-hide-map-switch', (val) => {
            this.visibleMapSwitch = val
        })

        this.visibleMapSwitch = this.enableSwitchMapAndInfo()
    },
    methods: {
        showSidebar () {
            this.marginButton = this.width
            this.active = true
        },
        hideSidebar (evt) {
            this.marginButton = '0px'
            this.active = false
            this.$emit('closeSidebar', evt)
        },
        download () {
            window.location.href = '/api/survey/dlpdf/' + this.showDlpdf
        },
        enableSwitchMapAndInfo () {
            const route = this.$route.name
            let display = true
            if (route === 'shoppingCart' || route === 'store-products-businessid') {
                display = false
            }

            return display
        }
    }

}
</script>
<style lang="scss">
@import "@/assets/scss/_variable";
.sidebar{
    .b-sidebar{
        top: 80px;
        height: calc( 100% - 80px);
        width: 30%;
    }
    .b-sidebar>.b-sidebar-body{
        overflow: visible;
        position: absolute;
        width: 100%;
        background:#fff;
    }
    #btn-open-close{
        position: absolute;
        top: 30px;
        left: 100%;
        background: #fff !important;
        border: none;
        padding: 8px 4px ;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        height: 50px;
        width: 33px;
    }

    button{
        .close{
            border-radius: 50%;
            background: #b0b0b0;
        }
    }
    .close-sidebar{
        position: absolute;
        right: 10px;
        top: 5px;
        fill:#b0b0b0;
        z-index: 1;
    }
    .btn-cart{
        position: absolute;
        top: 105px;
        left: 100%;
    }
    .z1001{
        z-index: 1001;
    }
    .btn-dlpdf{
        background: $white;
        padding: 10px;
        position: absolute;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        z-index: 1001;
        border: none !important;
        outline: none !important;
        top:105px;
        left: 100%;
        width: 146px;
        .bg{
            background: $orange;
            padding: 10px;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            cursor: pointer;
        }
    }
}
@media (max-width:$lg-desktop){
    .sidebar{
        .b-sidebar{
            top: 80px;
            height: calc( 100% - 80px);
            width: 30%;
        }
    }
}
@media (max-width:$desktop){
    .sidebar{
        .b-sidebar{
            top: 80px;
            height: calc( 100% - 80px);
            width: 35%;
        }
    }
}
@media (max-width:$tablet){
    .sidebar{
        .b-sidebar{
            top: 60px;
            height: calc( 100% - 60px);
            width: 50%;
        }
    }
}
@media (max-width:$phone){
    .sidebar{
        .b-sidebar{
            top: 60px;
            height: calc( 100% - 60px);
            width: 100%;
        }
        .btn-cart{
            right: 0px;
            left: auto;
            top: 181px;
        }
    }
    .hide-mobile{
        display: none;
    }
}
</style>
