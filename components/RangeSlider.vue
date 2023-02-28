<template>
    <div id="rangle-slider" class="row range-slider-setting" :style="sliderStyle">
        <div class="col p-0">
            <vue-slider
                v-model="valueData"
                :max="timeMax"
                :min="timeMin"
                :interval="interval"
                tooltip="always"
                :tooltip-formatter="formatterTime"
            />
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

export default {
    name: 'RangeSlider',
    components: {
        VueSlider
    },
    props: {
        interval: {
            type: Number,
            default: 0.5
        },
        idForm: {
            type: String,
            default: ''
        },
        sliderStyle: {
            type: String,
            default: ''
        },
        dataInit: {
            type: Array,
            default: () => [6, 12]
        }
    },
    data () {
        return {
            valueData: [6, 12],
            timeMin: 0,
            timeMax: 24
        }
    },
    watch: {
        valueData (val) {
            this.$root.$emit('update_banner_data_change', { bannerType: this.idForm })
        },
        dataInit (val) {
            this.valueData = [this.timeStringToFloat(val[0]), this.timeStringToFloat(val[1])]
        }
    },
    mounted () {
        this.$root.$on('update_banner_data', (data) => {
            if (data.bannerType === this.idForm) {
                if (data.timeInDay.length > 0) {
                    this.valueData = data.timeInDay
                } else {
                    this.valueData = [6, 12]
                }
            }
        })
    },
    methods: {
        formatterTime (e) {
            const strFormatHor = e.toString().split('.')
            let realTime = '00:00'
            if (strFormatHor.length === 1) {
                if (strFormatHor[0] === '24') {
                    realTime = '23:59'
                } else {
                    realTime = strFormatHor[0] + ':00'
                }
            } else if (strFormatHor.length === 2) {
                realTime = strFormatHor[0] + ':' + strFormatHor[1] * 6
            }
            return realTime
        },
        timeStringToFloat (time) {
            if (Number.isInteger(time)) {
                return 0
            }
            const hoursMinutes = time.split(/[.:]/)
            const hours = parseInt(hoursMinutes[0], 10)
            const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0
            return hours + minutes / 60
        }
    }
}
</script>

<style lang="scss">
    @import './assets/scss/variable';

    #rangle-slider {
        margin: 0;

        img {
            margin-left: 50%;
            width: 24px;
        }

        /* dot style */
        .vue-slider-dot-handle {
            cursor: pointer;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background-color: $orange;
            box-sizing: border-box;
            border: 3px solid $white;
        }

        .vue-slider-dot-handle-focus {
            box-shadow: unset;
        }

        .vue-slider-rail {
            height: 10px;
            background-color: #EFF3F6
        }

        .vue-slider-process {
            background-color: $blue;
            border-radius: 50px;
        }

        .vue-slider-dot {
            top: unset !important;
        }

        .vue-slider-dot-tooltip-inner {
            border-color: $blue;
            background-color: $blue;
        }
    }
    input[type=range] {
        margin-top: 5px;
        -webkit-appearance: none;
        display: block;
        width: 100%;
        background: $white;
        border: 1px solid $white;
        height: 10px;
        border-radius: 5px;
        background-image: -webkit-gradient(linear, 20% 0%, 20% 100%, color-stop(0%, $blue), color-stop(100%, $blue));
        background-image: -webkit-linear-gradient(left, $blue 0%,$blue 100%);
        background-image: -moz-linear-gradient(left, $blue 0%, $blue 100%);
        background-image: -o-linear-gradient(to right, $blue 0%,$blue 100%);
        background-image: linear-gradient(to right, $blue 0%,$blue 100%);
        background-repeat: no-repeat;

        &:focus {
            outline: none;

            &::-webkit-slider-runnable-track {
                background: transparent;
            }

            &::-ms-fill-lower {
                background: transparent;
            }

            &::-ms-fill-upper {
                background: transparent;
            }
        }

        &::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            box-shadow: none;
            background: transparent;
            border-radius: 5px;
            border: none;
        }

        &::-webkit-slider-thumb {
            box-shadow: none;
            border: 3px solid $white;
            height: 30px;
            width: 30px;
            border-radius: 50px;
            background: $orange;
            cursor: pointer;
            -webkit-appearance: none;
            margin-top: -13px;
        }

        &::-moz-range-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            box-shadow: none;
            background: transparent;
            border-radius: 0;
            border: none;
        }

        &::-moz-range-thumb {
            box-shadow: none;
            border: 4px solid #ADD8E6;
            height: 16px;
            width: 16px;
            border-radius: 2px;
            background: #ffffff;
            cursor: pointer;
        }

        &::-ms-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: transparent;
            border-color: transparent;
            color: transparent;
        }

        &::-ms-fill-lower {
            background: transparent;
            border: none;
            border-radius: 5px;
            box-shadow: none;
        }

        &::-ms-thumb {
            box-shadow: none;
            border: 4px solid #ADD8E6;
            height: 16px;
            width: 16px;
            border-radius: 2px;
            background: #ffffff;
            cursor: pointer;
        }
    }
</style>
