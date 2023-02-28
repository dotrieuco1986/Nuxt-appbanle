<template>
    <div v-if="total > maxItemPage" class="sidebar-page">
        <span>{{ $t('components.sidebarpage') }} {{ start }} - {{ end }}<slot /></span>
        <ul>
            <li class="margin-right-10">
                <button @click="previous_click">
                    <svg xmlns="http://www.w3.org/2000/svg" :class="{'enable':start>1}" width="12.358" height="20" viewBox="0 0 12.358 20">
                        <path id="Path_36" data-name="Path 36" d="M17.642,48.907,10,56.549,2.358,48.907,0,51.265l10,10,10-10Z" transform="translate(61.265) rotate(90)" />
                    </svg>
                </button>
            </li>
            <li>
                <button @click="next_click">
                    <svg xmlns="http://www.w3.org/2000/svg" :class="{'enable':end<total}" width="12.358" height="20" viewBox="0 0 12.358 20">
                        <path id="Path_35" data-name="Path 35" d="M17.642,48.907,10,56.549,2.358,48.907,0,51.265l10,10,10-10Z" transform="translate(-48.907 20) rotate(-90)" />
                    </svg>
                </button>
            </li>
        </ul>
    </div>
</template>
<style lang="scss">
    @import "../assets/scss/_variable";
    .sidebar-page{
        background: $light-gray;
        height: 65px;
        padding: 15px 20px ;
        font-size: 14px;
        button{
            border: none !important;
            outline: none !important;
            background: transparent;
            svg{
                fill:$gray;
                &.enable{
                    fill:$extra-dark-gray;
                }
            }
        }
        ul{
            float: right;
            li{
                list-style:none;
                display: inline-block;
            }
        }
    }
</style>
<script>
export default {
    name: 'SidebarPage',
    props: {
        start: {
            type: Number,
            default: 0
        },
        end: {
            type: Number,
            default: 20
        },
        total: {
            type: Number,
            default: 20
        }
    },
    data () {
        return {
            maxItemPage: process.env.MAX_ITEM_PAGE
        }
    },
    // inject: ['showSidebar'],
    // created () {
    //     this.showSidebar()
    // },
    methods: {
        previous_click (evt) {
            if (this.start > 1) {
                this.$emit('previous-event', evt)
            }
        },
        next_click (evt) {
            if (this.end < this.total) {
                this.$emit('next-event', evt)
            }
        }
    }
}
</script>
