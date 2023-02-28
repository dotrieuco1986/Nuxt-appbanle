<template>
    <div class="container pr-0 pl-0 calenda">
        <date-range-picker
            ref="picker"
            v-model="dateRange"
            :locale-data="localeData"
            :ranges="rangesData"
            @update="updateValues"
        >
            <template v-slot:input="picker" style="min-width: 350px;">
                {{ picker.startDate | date }} - {{ picker.endDate | date }}
            </template>
        </date-range-picker>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'MVPDateRangePicker',
    data () {
        return {
            dateRange: {
                startDate: moment(),
                endDate: moment()
            },
            localeData: {
                direction: 'ltr',
                format: 'dd/mm/yyyy',
                separator: ' - ',
                applyLabel: this.$t('components.DateRangePicker.applyLabel'),
                cancelLabel: this.$t('components.DateRangePicker.cancelLabel'),
                weekLabel: this.$t('components.DateRangePicker.weekLabel'),
                customRangeLabel: this.$t('components.DateRangePicker.customRangeLabel'),
                daysOfWeek: [
                    this.$t('components.DateRangePicker.sunday'),
                    this.$t('components.DateRangePicker.monday'),
                    this.$t('components.DateRangePicker.tuesday'),
                    this.$t('components.DateRangePicker.wednesday'),
                    this.$t('components.DateRangePicker.thusday'),
                    this.$t('components.DateRangePicker.friday'),
                    this.$t('components.DateRangePicker.satuday')
                ],
                monthNames: [
                    this.$t('components.DateRangePicker.jan'),
                    this.$t('components.DateRangePicker.feb'),
                    this.$t('components.DateRangePicker.mar'),
                    this.$t('components.DateRangePicker.apr'),
                    this.$t('components.DateRangePicker.may'),
                    this.$t('components.DateRangePicker.jun'),
                    this.$t('components.DateRangePicker.jul'),
                    this.$t('components.DateRangePicker.aug'),
                    this.$t('components.DateRangePicker.sep'),
                    this.$t('components.DateRangePicker.oct'),
                    this.$t('components.DateRangePicker.nov'),
                    this.$t('components.DateRangePicker.dec')
                ],
                firstDay: 0
            },
            rangesData: {
                'Hôm nay': [moment().toDate(), moment().toDate()],
                'Hôm qua': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
                'Tháng này': [moment().startOf('month').toDate(), moment().endOf('month').toDate()],
                'Tháng trước': [moment().subtract(1, 'month').startOf('month').toDate(), moment().subtract(1, 'month').endOf('month').toDate()],
                'Năm nay': [moment().startOf('year').toDate(), moment().endOf('year').toDate()]
            }
        }
    },
    computed: {

    },
    methods: {
        updateValues (value) {
            this.$emit('updateDateRange', value)
        }
    }
}
</script>

<style scoped>
</style>
