<template>
    <div>
        <label>{{ value }}m</label>
        <vue-slider
            ref="slider"
            v-model="value"
            :max="2000"
            :min="0"
            :tooltip="tipnone"
        />
    </div>
</template>
<style>
    .vue-slider{
        height: 10px !important;
    }
    .vue-slider-dot{
        width:26px !important;
        height:26px !important;
    }
    .vue-slider-dot-handle{
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #FE7235;
        border: 2px solid #fff;
        box-sizing: border-box;
        /* box-shadow: 0.5px 0.5px 10px 5px rgba(0, 0, 0, 0.3); */
        box-shadow: 0 0 6px rgba(0,0,0,0.3);
        -moz-box-shadow: 0 0 6px rgba(0,0,0,0.3);
        -webkit-box-shadow: 0 0 6px rgba(0,0,0,0.3);
        -o-box-shadow: 0 0 6px rgba(0,0,0,0.3);
    }
    .vue-slider-process{
        background-color:#4AA9C5;
    }
</style>
<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import Constants from '../static/constants'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

export default {
    components: {
        VueSlider
    },
    data () {
        return {
            tipnone: 'none',
            value: Constants.DEFAULT_RADIUS
        }
    }
}
</script>
