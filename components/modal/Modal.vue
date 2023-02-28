<template>
    <b-modal
        :id="id"
        v-slot:default="{ close}"
        ref="cmodal"
        :size="size"
        modal-header="no"
        modal-class="custom"
        hide-footer
        hide-header
        centered
        @hidden="eventClose"
    >
        <button v-if="!hideClose" class="btnclose" @click="close()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23.998" viewBox="0 0 24 23.998">
                <path id="Path_1614" data-name="Path 1614" d="M14.643,12.015l8.973-8.974a1.315,1.315,0,0,0,0-1.856L22.83.4a1.316,1.316,0,0,0-1.857,0L12,9.372,3.027.4A1.315,1.315,0,0,0,1.171.4l-.787.786a1.314,1.314,0,0,0,0,1.856l8.973,8.974L.384,20.988a1.316,1.316,0,0,0,0,1.857l.787.786a1.315,1.315,0,0,0,1.856,0L12,14.658l8.973,8.973a1.3,1.3,0,0,0,.928.383h0a1.3,1.3,0,0,0,.928-.383l.786-.786a1.316,1.316,0,0,0,0-1.856Z" transform="translate(0 -0.016)" fill="#fff" />
            </svg>
        </button>
        <slot />
    </b-modal>
</template>
<script>
export default {
    name: 'Modal',
    props: {
        size: {
            type: String,
            default: 'md',
            description: 'sm, md , lg, or xl'
        },
        id: {
            type: String,
            default: 'myModal'
        },
        showModal: {
            type: Boolean,
            default: false
        },
        hideClose: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        eventClose (evt) {
            this.$emit('closeModal', evt)
        },
        show () {
            this.$refs.cmodal.show()
        },
        hide () {
            this.$refs.cmodal.hide()
        }

    }
}
</script>
<style lang="scss">
    .modal {
        &.custom{
            .modal-backdrop{
                background-color: #333;
                opacity: 0.5;
            }
            .btnclose {
                border: none;
                background: transparent;
                position: absolute;
                top: -32px;
                right: -14px;
                z-index: 2000;
                opacity: 1;
                outline: none!important;
            }
            .btnclose:hover,
            .btnclose:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }
        }

        .content-center{
            display: flex;
            justify-content: center;
            font-size: 16px;
            font-weight: bold;
        }
    }
</style>
