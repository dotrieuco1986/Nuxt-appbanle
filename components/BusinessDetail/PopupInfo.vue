<template lang="html">
    <div v-if="info" :id="info.id" class="popup-info">
        <img :src="info.thumb">
        <h4>{{ info.title }}</h4>
        <p>
            {{ info.address }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'PopupInfo',
    props: {
        info: {
            type: Object,
            default () {
                return {
                    id: '',
                    thumb: '',
                    title: '',
                    address: ''
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .popup-info{
        width: 200px;
        overflow: hidden;
        margin: 0;
        display: block;
        background: #fff;
        img{
            height: 100px;
            width: 200px;
        }
        h4{
            font-size: 16px;
            padding: 10px 0;
            margin: 0px;
        }
        p{
            margin: 0px;
        }
    }
</style>
