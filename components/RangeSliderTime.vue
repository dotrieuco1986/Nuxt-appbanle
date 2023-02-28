<template>
    <div
        v-show="isShowRangeOne || isShowRangeTwo || isShowRangeThree"
        id="range-slider-time"
    >
        <br v-show="isShowRangeOne">
        <br v-show="isShowRangeOne">
        <br v-show="isShowRangeOne">
        <div
            v-show="isShowRangeOne"
            class="range-slider-setting row"
        >
            <div class="col p-0">
                <vue-slider
                    ref="rangeSliderOne"
                    v-model="valueOne"
                    :interval="interval"
                    :max="timeMax"
                    :min="timeMin"
                    :tooltip="'always'"
                    :tooltip-formatter="formatterTime"
                />
            </div>
            <div class="col-1 p-0">
                <img src="@/assets/image/icon/icon-close.svg" @click="removeRangeSlider(idRangeSliderOne)">
            </div>
        </div>

        <br v-show="isShowRangeTwo">
        <br v-show="isShowRangeTwo">
        <br v-show="isShowRangeTwo">
        <div
            v-show="isShowRangeTwo"
            class="range-slider-setting row"
        >
            <div class="col p-0">
                <vue-slider
                    ref="rangeSliderTwo"
                    v-model="valueTwo"
                    :interval="interval"
                    :max="timeMax"
                    :min="timeMin"
                    :tooltip="'always'"
                    :tooltip-formatter="formatterTime"
                />
            </div>
            <div class="col-1 p-0">
                <img src="@/assets/image/icon/icon-close.svg" @click="removeRangeSlider(idRangeSliderTwo)">
            </div>
        </div>

        <br v-show="isShowRangeThree">
        <br v-show="isShowRangeThree">
        <br v-show="isShowRangeThree">
        <div
            v-show="isShowRangeThree"
            class="range-slider-setting row"
        >
            <div class="col p-0">
                <vue-slider
                    ref="rangeSliderThree"
                    v-model="valueThree"
                    :interval="interval"
                    :max="timeMax"
                    :min="timeMin"
                    :tooltip="'always'"
                    :tooltip-formatter="formatterTime"
                />
            </div>
            <div class="col-1 p-0">
                <img src="@/assets/image/icon/icon-close.svg" @click="removeRangeSlider(idRangeSliderThree)">
            </div>
        </div>
        <br>
        <span id="error-time" class="color-red clear-error" />
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'

// import theme
import 'vue-slider-component/theme/default.css'
export default {
    components: {
        VueSlider
    },
    props: {
        // eslint-disable-next-line vue/require-prop-type-constructor,vue/require-default-prop
        timeValue: null,
        // eslint-disable-next-line vue/require-default-prop
        numberRangeSlider: null,
        // eslint-disable-next-line vue/require-default-prop
        valueRealTIme: null,
        // eslint-disable-next-line vue/require-default-prop
        arrDataRangeSlider: null
    },
    data () {
        return {
            errorTime: false,
            loadSucces: false,
            interval: 0.5,
            valueOne: [0, 5],
            valueTwo: [0, 5],
            valueThree: [0, 5],
            timeMin: 0,
            timeMax: 24,
            idRangeSliderOne: 'range-slider-one',
            idRangeSliderTwo: 'range-slider-two',
            idRangeSliderThree: 'range-slider-three',
            isShowRangeOne: false,
            isShowRangeTwo: false,
            isShowRangeThree: false
        }
    },
    computed: {
        // isShowRangeOne () {
        //     return this.arrDataRangeSlider[0].show
        // },
        // isShowRangeTwo () {
        //     return this.arrDataRangeSlider[1].show
        // },
        // isShowRangeThree () {
        //     return this.arrDataRangeSlider[2].show
        // }
    },
    watch: {
        arrDataRangeSlider (val) {
            // alert('change')
            this.initData()
        },
        valueOne (val) {
            this.checkValueOne(val)
        },
        valueTwo (val) {
            this.checkValueTwo(val)
        },
        valueThree (val) {
            this.checkValueThree(val)
        }
    },
    mounted () {
        this.initData()
        this.$root.$on('check-range-slider-show', (id) => {
            this.updateValue(id)
        })
    },
    methods: {
        initData () {
            if (this.arrDataRangeSlider) {
                const _this = this
                this.arrDataRangeSlider.forEach((value) => {
                    if (value.id === _this.idRangeSliderOne) {
                        _this.valueOne = value.data
                        _this.isShowRangeOne = value.show
                    }
                    if (value.id === _this.idRangeSliderTwo) {
                        _this.valueTwo = value.data
                        _this.isShowRangeTwo = value.show
                    }
                    if (value.id === _this.idRangeSliderThree) {
                        _this.valueThree = value.data
                        _this.isShowRangeThree = value.show
                    }
                })
            }
        },
        isOpenFullDay () {
            let sumTime = 0
            if (this.isShowRangeOne) {
                sumTime += this.valueOne[1] - this.valueOne[0]
            }
            if (this.isShowRangeTwo) {
                sumTime += this.valueTwo[1] - this.valueTwo[0]
            }
            if (this.isShowRangeThree) {
                sumTime += this.valueThree[1] - this.valueThree[0]
            }
            if (sumTime === this.timeMax || !(this.isShowRangeOne || this.isShowRangeTwo || this.isShowRangeThree)) {
                this.$root.$emit('open-full-day', true)
            } else {
                this.$root.$emit('open-full-day', false)
            }
        },
        updateValue (id) {
            let rangeStart = 0
            let rangeEnd = 0
            if (id === this.idRangeSliderOne) {
                this.isShowRangeOne = true
                if (this.isShowRangeTwo && this.isShowRangeThree) {
                    rangeEnd = this.valueTwo[0]
                } else {
                    rangeEnd = this.isShowRangeTwo ? this.valueTwo[0] : this.isShowRangeThree ? this.valueThree[0] : 5
                }
                this.valueOne = [rangeStart, rangeEnd]
                this.checkValueOne(this.valueOne)
            } else if (id === this.idRangeSliderTwo) {
                this.isShowRangeTwo = true
                if (this.isShowRangeOne && this.isShowRangeThree) {
                    rangeStart = this.valueOne[1]
                    rangeEnd = this.valueThree[0]
                } else {
                    rangeStart = this.isShowRangeOne ? this.valueOne[1] : 0
                    rangeEnd = this.isShowRangeOne ? this.valueOne[1] + 5 : this.isShowRangeThree ? this.valueThree[0] : 5
                }
                rangeEnd = rangeEnd > 24 ? 24 : rangeEnd
                this.valueTwo = [rangeStart, rangeEnd]
                this.checkValueTwo(this.valueTwo)
            } else if (id === this.idRangeSliderThree) {
                this.isShowRangeThree = true
                if (this.isShowRangeOne && this.isShowRangeTwo) {
                    rangeStart = this.valueTwo[1]
                } else {
                    rangeStart = this.isShowRangeTwo ? this.valueTwo[1] : this.isShowRangeOne ? this.valueOne[1] : 0
                }
                rangeEnd = rangeStart + 5 > 24 ? 24 : rangeStart + 5
                this.valueThree = [rangeStart, rangeEnd]
                this.checkValueThree(this.valueThree)
            }
        },
        checkValueOne (val) {
            let bResult = false
            if (this.isShowRangeOne) {
                if ((this.isShowRangeTwo && val[1] > this.valueTwo[0]) || (this.isShowRangeThree && val[1] > this.valueThree[0])) {
                    bResult = true
                } else {
                    this.isOpenFullDay()
                }
            }
            this.showError(bResult)
            return bResult
        },
        checkValueTwo (val) {
            let bResult = false
            if (this.isShowRangeTwo) {
                if ((this.isShowRangeOne && val[0] < this.valueOne[1]) || (this.isShowRangeThree && val[1] > this.valueThree[0])) {
                    bResult = true
                } else {
                    this.isOpenFullDay()
                }
            }
            this.showError(bResult)
            return bResult
        },
        checkValueThree (val) {
            let bResult = false
            if (this.isShowRangeThree) {
                if ((this.isShowRangeTwo && val[0] < this.valueTwo[1]) || (this.isShowRangeOne && val[0] < this.valueOne[1])) {
                    bResult = true
                } else {
                    this.isOpenFullDay()
                }
            }
            this.showError(bResult)
            return bResult
        },
        removeRangeSlider (e) {
            const thisArrTemp = this.arrDataRangeSlider
            thisArrTemp.forEach((value) => {
                if (e === value.id) {
                    value.show = false
                    if (e === this.idRangeSliderOne) {
                        this.isShowRangeOne = false
                    } else if (e === this.idRangeSliderTwo) {
                        this.isShowRangeTwo = false
                    } else if (e === this.idRangeSliderThree) {
                        this.isShowRangeThree = false
                    }
                }
            })
            this.checkValueOne(this.valueOne)
            this.checkValueTwo(this.valueTwo)
            this.checkValueThree(this.valueThree)
        },
        showError (isShow) {
            if (!isShow) {
                isShow = (this.valueOne[0] === this.valueOne[1]) || (this.valueTwo[0] === this.valueTwo[1]) ||
                    (this.valueThree[0] === this.valueThree[1])
            }

            if (document.getElementById('error-time')) {
                document.getElementById('error-time').innerHTML = isShow ? 'Thời gian chưa thích hợp' : ''
            }
            this.errorTime = isShow
        },
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
                // eslint-disable-next-line no-unused-vars
                realTime = strFormatHor[0] + ':' + strFormatHor[1] * 6
            }
            return realTime
        }
    }
}
</script>

<style lang="scss">
    @import "../assets/scss/rangeslidertime";
</style>
