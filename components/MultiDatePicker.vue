<template>
    <div id="multi-date-picker" class="container pr-0 pl-0">
        <div v-if="!idPopup">
            <div v-show="panelShow" class="dp-mask" @click="panelShow = false" />
            <div class="selected-date" @click="panelShow = !panelShow">
                <div v-if="multi" style="display: flex;flex-wrap: wrap;">
                    <div v-for="(item,index) in selected" :key="index" class="sel-values">
                        {{ format(item) }}
                    </div>
                </div>
                <div v-else>
                    {{ selected ? format(selected) : '' }}
                </div>
            </div>
        </div>

        <transition name="smooth">
            <div v-show="alwaysDisplay || panelShow" class="pick-panel" :style="{'position': alwaysDisplay ? 'inherit' : 'absolute'}">
                <div class="dp-header">
                    <div class="btn btn-link last-year" @click="seleYear--" />
                    <div class="btn btn-link last-month" @click="changeMonth(-1)" />
                    <div class="btn btn-link sele-month">
                        <span>{{ seleMonth + 1 }}</span>
                    </div>
                    <div class="btn btn-link sele-year">
                        {{ seleYear }}
                    </div>
                    <div class="btn btn-link next-month" @click="changeMonth(1)" />
                    <div class="btn btn-link next-year" @click="seleYear++" />
                </div>
                <div class="dp-body">
                    <div class="cal-container">
                        <div v-for="day in display.days" :key="day" class="cal-item">
                            {{ day }}
                        </div>
                        <div
                            v-for="(item,index) in renderCalendar"
                            :key="index"
                            class="cal-item"
                            :class="[item.iscur? 'cal-enable' : 'cal-disable', selectIndex(item) >= 0 ? 'cal-select' : '']"
                            @click="toggleSelect(item)"
                        >
                            {{ item.label }}
                        </div>
                    </div>
                </div>
                <div v-show="multi" class="dp-footer">
                    <div v-if="!idPopup" class="btn btn-cancel" @click="cancelSelect">
                        {{ alwaysDisplay ? display.clear : display.cancel }}
                    </div>
                    <div v-if="!alwaysDisplay || idPopup" class="btn btn-ok" @click="submitSelect(selected)">
                        {{ display.ok }}
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'MultiDatePicker',
    props: {
        multi: {
            type: Boolean,
            default: true
        },
        value: {
            type: Array,
            default () {
                return []
            }
        },
        lang: {
            type: String,
            default: 'vn'
        },
        format: {
            type: Function,
            default: date => date.toLocaleDateString('fr-CA')
        },
        alwaysDisplay: {
            type: Boolean,
            default: false
        },
        disp: {
            type: Array,
            default () {
                if (this.lang === 'en') {
                    return ['Sun', 'M', 'T', 'W', 'Th', 'F', 'Sat', 'Year', 'Month', 'Cancel', 'OK', 'Clear']
                } else {
                    return ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'Năm', 'Tháng', 'Hủy', 'HOÀN TẤT', 'Xóa']
                }
            }
        },
        idPopup: {
            type: String,
            default: ''
        },
        submitValue: {
            type: Function
        }
    },
    data () {
        return {
            panelShow: false,
            seleDate: new Date(),
            seleYear: new Date().getFullYear(),
            seleMonth: new Date().getMonth()
        }
    },
    computed: {
        renderCalendar () {
            const firDay = 0 - (new Date(this.seleYear, this.seleMonth, 1).getDay()) + 1
            const res = []
            for (let i = firDay, index = 0; index < 42; i++, index++) {
                const day = new Date(this.seleYear, this.seleMonth, i, 8)
                const calObj = {
                    label: day.getDate(),
                    date: day,
                    iscur: day.getMonth() === this.seleMonth
                }
                res.push(calObj)
            }
            return res
        },
        selected () { return this.value },
        display () {
            let d = this.disp
            if (!d) {
                if (this.lang === 'en') {
                    d = ['Sun', 'M', 'T', 'W', 'Th', 'F', 'Sat', 'Year', 'Month', 'Cancel', 'OK']
                } else {
                    d = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'Năm', 'Tháng', 'Hủy', 'HOÀN TẤT']
                }
            }
            return {
                days: d.slice(0, 7),
                year: d[7],
                month: d[8],
                cancel: d[9],
                ok: d[10],
                clear: d[11]
            }
        }
    },
    methods: {
        selectIndex (item) {
            if (!this.multi || !this.selected) {
                return -1
            }
            for (let i = 0; i < this.selected.length; i++) {
                if (this.selected[i] === this.format(item.date)) {
                    return i
                }
            }
            return -1
        },
        cancelSelect () {
            if (this.multi) {
                this.selected.splice(0, this.selected.length)
            } else {
                this.selected = null
            }
            this.panelShow = false
        },
        toggleSelect (item) {
            if (!this.multi) {
                this.submitSelect(item.date)
            } else {
                const index = this.selectIndex(item)
                if (index < 0) {
                    this.selected.push(this.format(item.date))
                } else {
                    this.selected.splice(index, 1)
                }
            }
        },
        submitSelect (value) {
            // this.$emit('input', value)
            this.panelShow = false
            if (this.idPopup) {
                this.$bvModal.hide(this.idPopup)
            }
            this.submitValue(value)
        },
        changeMonth (num) {
            if (this.seleMonth + num > 11) {
                this.seleMonth = 0
                this.seleYear++
            } else if (this.seleMonth + num < 0) {
                this.seleMonth = 11
                this.seleYear--
            } else {
                this.seleMonth += num
            }
        }
    }
}
</script>

<style lang="scss">
    @import './assets/scss/_variable.scss';

    #multi-date-picker {
        .dp-mask{
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
        }
        .selected-date{
            cursor: pointer;
            min-height: 28px;
            padding: 3px 10px;
            border-radius: 3px;
            border: 1px solid rgb(191, 203, 217);
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            min-width: 195px;
        }
        .pick-panel{
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #48576a;
            border: 1px solid #d1dbe5;
            box-shadow: 0 2px 6px #ccc;
            background: #fff;
            border-radius: 2px;
            line-height: 20px;
            margin: 5px 0;
            z-index: 10;
        }

        .last-year:before{content: "<<"}
        .last-month:before{content: "<"}
        .next-month:before{content: ">"}
        .next-year:before{content: ">>"}
        .btn{cursor: pointer; padding: 3px; margin: 0 8px;}

        .btn-link:hover{
            color: #61C3FF
        }
        .dp-header{
            display: flex;
        }
        .dp-footer{
            width: 90%;
            display: flex;
            justify-content: center;
            padding: 8px;
            margin: 8px;
            border-top: 1px solid #daa
        }

        .cal-container{
            width: calc(7*34px);
            display: flex;
            flex-wrap: wrap
        }

        .cal-item{
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 1px;
        }
        .cal-enable{
            cursor: pointer;
        }
        .cal-enable:hover{
            background-color: #E4E8F1;
        }
        .cal-disable{
            color: #d4d8d1;
            cursor: default
        }
        .cal-select{
            background-color: $blue !important;
            color: $white;
        }

        .btn-ok{
            color: $white;
            font-weight: bold;
            font-size: 1rem;
            background-color: $orange;
            width: 100px;
        }
        .sel-values{
            background-color: rgba(32,160,255,.1);
            border-color: rgba(32,160,255,.2);
            color: #20a0ff;
            height: 24px;
            line-height: 24px;
            box-sizing: border-box;
            font-size: 12px;
            margin: 3px;
            padding: 0 5px;
            border-radius: 3px;
        }
        .smooth-enter-active {
            transition: all .5s ease-in-out;
        }
        .smooth-leave-active {
            transition: all .5s ease-in-out;
        }
        .smooth-enter, .smooth-leave-to {
            transform: translateY(-10px);
            opacity: 0;
        }
    }

</style>
