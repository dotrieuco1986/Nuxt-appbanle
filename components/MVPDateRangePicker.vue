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
                'H??m nay': [moment().toDate(), moment().toDate()],
                'H??m qua': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
                'Th??ng n??y': [moment().startOf('month').toDate(), moment().endOf('month').toDate()],
                'Th??ng tr?????c': [moment().subtract(1, 'month').startOf('month').toDate(), moment().subtract(1, 'month').endOf('month').toDate()],
                'N??m nay': [moment().startOf('year').toDate(), moment().endOf('year').toDate()]
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
