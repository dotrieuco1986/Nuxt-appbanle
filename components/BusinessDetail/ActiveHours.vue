<template>
    <div class="business-info-component">
        <div class="row">
            <div class="col-1">
                <svg-icon :icon="icon" class="icon-info-business" />
            </div>

            <div class="col">
                <div v-for="item in listActiveHours" :key="item.id" class="row">
                    <div class="col-3 pr-0">
                        {{ item.day }}
                    </div>
                    <div class="col">
                        {{ item.time }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SvgIcon from '../common/SvgIcon'
export default {
    name: 'ActiveHours',
    components: { SvgIcon },
    props: {
        activeHours: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            listActiveHours: [],
            timeNow: ''
        }
    },
    created () {
        this.sort(this.activeHours)
    },
    methods: {
        sort (value) {
            value = value + ';T'
            const pattern = /(\d+\w+;\D)|(Đóng cửa;)|(Closed;)|(Mở cửa cả ngày;)|(Open 24 hours;)/g
            const lstConvert = value.match(pattern)

            const lstOpenHours = []
            lstConvert.forEach(function (entry) {
                const n = value.indexOf(entry)

                const valueItem = value.substring(0, n + entry.length - 1)
                lstOpenHours.push(valueItem)
                value = value.replace(valueItem, '')
            })

            let indexStart = -1
            lstOpenHours.forEach(function (item, index) {
                if (item.toLowerCase().includes('chủ nhật') || item.toLowerCase().includes('sunday')) {
                    indexStart = index
                    return false
                }
            })

            if (indexStart !== -1) {
                for (let indexOutput = 0; indexOutput < 7; indexOutput++) {
                    this.addActiveHours(lstOpenHours[indexStart], indexOutput)
                    indexStart = this.getIndexDay(indexStart)
                }
                this.sortActiveHourNow()
            }
        },
        sortActiveHourNow () {
            const lstSort = []
            const item = this.listActiveHours.find(function (element) {
                return element.active === true
            })

            let index = 0
            const indexItemNow = this.listActiveHours.indexOf(item)

            for (let indexAfter = indexItemNow; indexAfter < this.listActiveHours.length; indexAfter++) {
                lstSort[index] = this.listActiveHours[indexAfter]
                index++
            }

            for (let indexBefore = 0; indexBefore < indexItemNow; indexBefore++) {
                lstSort[index] = this.listActiveHours[indexBefore]
                index++
            }

            this.listActiveHours = lstSort
        },
        getTimes (value) {
            let result
            if (value.includes('Đóng cửa') || value.includes('Closed')) {
                result = 'Đóng cửa'
            } else if (
                value.includes('Mở cửa cả ngày') ||
                    value.includes('Open 24 hours')
            ) {
                result = 'Mở cửa cả ngày'
            } else {
                const pattern = /\d(.*?)$/g
                const match = value.match(pattern)
                if (match) {
                    result = match[0]
                }
            }
            return result
        },
        getHoursWithSecond (time) {
            let valueTime = ''
            let isActive = false
            const pattern = /([0-9]+:[0-9]+\w+)|([0-9]+\w*)/g
            const match = time.match(pattern)

            const d = new Date() // current time
            const hours = d.getHours()
            const mins = d.getMinutes()

            if (match) {
                const arrTimes = []
                for (let i = 0; i < match.length; i++) {
                    const valueConvert = this.convertTimeTo24h(match[i])
                    arrTimes.push(valueConvert)

                    valueTime += valueConvert.value
                    if (i % 2 === 0) {
                        valueTime += '-'
                    }
                }

                if (arrTimes[0].hours <= hours && arrTimes[0].mins <= mins &&
                        hours <= arrTimes[1].hours && mins <= arrTimes[1].mins) {
                    isActive = true
                }
            } else {
                valueTime = time
            }

            return {
                value: valueTime,
                active: isActive
            }
        },
        convertTimeTo24h (time) {
            let valueTimes, valueHours, valueMins

            if (time.includes('Đóng cửa') || time.includes('Closed')) {
                valueTimes = 'Đóng cửa'
            } else if (time.includes('Mở cửa cả ngày') || time.includes('Open 24 hours')) {
                valueTimes = 'Mở cửa cả ngày'
            } else if (time.includes('PM')) {
                time = time.replace('PM', '')
                valueHours = parseInt(time.split(':')[0])
                valueHours = valueHours + 12

                valueMins = time.split(':')[1] ? time.split(':')[1] : '00'
                valueTimes = valueHours + ':' + valueMins
            } else {
                time = time.replace('AM', '')
                valueHours = parseInt(time.split(':')[0])

                valueMins = time.split(':')[1] ? time.split(':')[1] : '00'
                valueTimes = valueHours + ':' + valueMins
            }

            return {
                value: valueTimes,
                hours: valueHours,
                mins: valueMins
            }
        },
        addActiveHours (time, index) {
            const numberDay = new Date().getDay() // 0= CN,1= T2;
            const day = [
                {
                    id: 0,
                    vn: 'Chủ nhật',
                    eng: 'Sunday'
                },
                {
                    id: 1,
                    vn: 'Thứ Hai',
                    eng: 'Monday'
                },
                {
                    id: 2,
                    vn: 'Thứ Ba',
                    eng: 'Tuesday'
                },
                {
                    id: 3,
                    vn: 'Thứ Tư',
                    eng: 'Wednesday'
                },
                {
                    id: 4,
                    vn: 'Thứ Năm',
                    eng: 'Thursday'
                },
                {
                    id: 5,
                    vn: 'Thứ Sáu',
                    eng: 'Friday'
                },
                {
                    id: 6,
                    vn: 'Thứ Bảy',
                    eng: 'Saturday'
                }
            ]
            const collection = time.split(';')
            const compareValue = day[index]

            for (let i = 0; i < collection.length; i++) {
                const item = collection[i]

                if (!item) {
                    continue
                }

                const time = this.getTimes(item)
                const openingHours = this.getHoursWithSecond(time)

                if (item.toLowerCase().includes(compareValue.vn.toLowerCase()) || item.toLowerCase().includes(compareValue.eng.toLowerCase())) {
                    this.listActiveHours.push({
                        day: compareValue.vn,
                        time: openingHours.value,
                        active: index === numberDay
                    })
                } else {
                    this.listActiveHours.push({
                        date: '',
                        time: openingHours.value,
                        active: false
                    })
                }
            }
        },
        getIndexDay (index) {
            return (index + 1 > 6) ? (index = 0) : (index += 1)
        }
    }
}
</script>

<style type="scss">
    .pl{
        padding-left: 50px;
    }
</style>
