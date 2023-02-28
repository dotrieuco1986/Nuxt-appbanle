<template>
    <button :class="[color?color:'btn-mvp','btn']" :disabled="disabled">
        <svg-icon v-if="icon" class="icon" :icon="icon" has-fill="true" />
        <span v-if="name">{{ name }}</span>
    </button>
</template>

<script>
import SvgIcon from '@/components/common/SvgIcon'

export default {
    name: 'MvpButton',
    components: { SvgIcon },
    props: {
        name: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        }
    },
    methods: {
        getColor () {
            switch (this.color) {

            }
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/_mvpbutton';
</style>
