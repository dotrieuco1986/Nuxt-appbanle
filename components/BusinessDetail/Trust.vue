<template>
    <div class="row trust-component">
        <div :class="[small==='true'?'col-8 pr-0':'col-12']">
            <div class="trust">
                <div :class="[reliability > MIN_REL ? 'active' : '','item left']" />
                <div v-for="index in MAX_REL - 2" :key="index" :class="[reliability > index ? 'active' : '','item']" />
                <div :class="[reliability === MAX_REL ? 'active' : '','item right']" />
            </div>
        </div>
        <div :class="[small==='true'?'col-4 pl-0':'col-12']">
            <span class="float-right">{{ reliability }}/10 Mức uy tín</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Trust',
    props: {
        reliability: {
            type: Number,
            required: true
        },
        small: {
            type: String,
            default: 'false'
        }
    },
    data () {
        return {
            MIN_REL: 0,
            MAX_REL: 10
        }
    }
}
</script>

<style lang="scss">
    @import '../../assets/scss/_trust';
</style>
