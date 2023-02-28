<template>
    <div id="report-page" class="col-12">
        <b-row class="my-1 head-area">
            <b-col>
                <b-tabs pills content-class="mt-3" @activate-tab="changeStore">
                    <b-tab title="Tất Cả" :active="currentStoreId===strStoreId">
                        <p>I'm the first tab</p>
                    </b-tab>
                    <b-tab
                        v-for="(store, index) in listStores"
                        :key="index"
                        :title="store.name"
                        :active="currentStoreId===store.id"
                    >
                        <p>{{ store.address }}</p>
                    </b-tab>
                </b-tabs>

                <b-button-group>
                    <b-button id="button-prev">
                        <svg-icon icon="chevron-down" grow-by-height="20px" />
                    </b-button>
                    <b-button
                        v-for="(store, index) in listStores"
                        :id="'button-change-store-' + index"
                        :key="index"
                        :class="'button-change-store ' + (index > 4 ? 'd-none' : '') + (index === 0 ? ' button-store-chosed ' : '')"
                        :title="store.name"
                        @click="changeStore"
                    >
                        {{ store.name }}
                    </b-button>
                    <b-button id="button-next">
                        <svg-icon icon="chevron-down" grow-by-height="20px" />
                    </b-button>
                </b-button-group>
            </b-col>
        </b-row>
        <b-row id="order-status-row" class="padding-left-20 padding-right-20">
            <ul>
                <li>
                    Đơn Hàng Chưa Xử Lý: {{ orderNoConfirm }} đơn
                </li>
                <li>
                    Đơn Hàng Hôm Nay: {{ totalOrderToday }} đơn
                </li>
                <li>
                    Doanh Thu Tháng: {{ totalIncomeMonth | formatCurrency }}
                </li>
                <li>
                    Doanh Thu Hôm Nay: {{ totalIncomeToday | formatCurrency }}
                </li>
            </ul>
        </b-row>
        <b-row class="my-1 count-area">
            <b-col>
                <MVPDateRangePicker @updateDateRange="updateDateRange" />
            </b-col>
        </b-row>
        <div id="chart-report">
            <LineChart :data="lineChartData" :options="lineChartOptions" />
        </div>
    </div>
</template>

<style lang="scss">
    @import "../../assets/scss/_report";
</style>
<script>
import moment from 'moment'
import LineChart from '~/components/line-chart'
import MVPDateRangePicker from '~/components/MVPDateRangePicker'

export default {
    layout: 'admin',
    components: {
        LineChart,
        MVPDateRangePicker
    },
    asyncData ({ app, $axios, route, error }) {
        return app.$api.store.getStores().then((storesRes) => {
            const arrStores = storesRes.data.result
            if (arrStores) {
                const arrStoreId = Object.keys(arrStores).map(id => arrStores[id].id)
                const strStoreId = arrStoreId.toString()
                const currentStoreId = route.query.storeid ? route.query.storeid : strStoreId
                const startDate = route.query.startdate ? route.query.startdate : moment().format('YYYY-MM-DD')
                const endDate = route.query.enddate ? route.query.enddate : moment().format('YYYY-MM-DD')
                return Promise.all([
                    app.$api.store.getDataForReportPage(currentStoreId),
                    app.$api.store.getStaticReportPage(currentStoreId, moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'), 'day')
                ]).then((responses) => {
                    const reportDataRes = responses[0].data
                    const staticDataRes = responses[1].data

                    return {
                        listStores: arrStores,
                        arrStoreId,
                        strStoreId,
                        currentStoreId,
                        startDate,
                        endDate,
                        totalOrderToday: reportDataRes.totalOrderToday,
                        orderNoConfirm: reportDataRes.orderNoConfirm,
                        totalIncomeToday: reportDataRes.totalIncomeToday,
                        totalIncomeMonth: reportDataRes.totalIncomeMonth,
                        lineChartData: {
                            labels: staticDataRes.dataset,
                            dataDoanhThu: staticDataRes.dataDoanhThu,
                            dataDonHang: staticDataRes.dataDonHang
                        }
                    }
                })
            }
        })
    },
    data () {
        return {
            listStores: [],
            arrStoreId: [],
            strStoreId: '',
            currentStoreId: '',
            totalIncomeToday: 0,
            totalIncomeMonth: 0,
            orderNoConfirm: 0,
            totalOrderToday: 0,
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
            lineChartData: {
                labels: [],
                dataDoanhThu: [],
                dataDonHang: []
            },
            lineChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'right'
                },
                tooltips: {
                    backgroundColor: '#eb4034'
                },
                scales: {
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Thời gian'
                            },
                            gridLines: {
                                display: false
                            }
                        }
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Giá trị'
                            },
                            gridLines: {
                                display: true
                            }
                        }
                    ]
                }
            }
        }
    },
    watch: {
        $route: 'loadDataReport'
    },
    methods: {
        updateDateRange (value) {
            const startDate = moment(value.startDate).format('YYYY-MM-DD')
            const endDate = moment(value.endDate).format('YYYY-MM-DD')
            this.startDate = startDate
            this.endDate = endDate
            this.$api.store.getStaticReportPage(this.currentStoreId, startDate, endDate, 'day').then((responses) => {
                this.lineChartData = {
                    labels: responses.data.dataset,
                    dataDoanhThu: responses.data.dataDoanhThu,
                    dataDonHang: responses.data.dataDonHang
                }
            })
        },
        changeStore (newTabIndex, prevTabIndex, bvEvt) {
            this.currentStoreId = newTabIndex > 0 ? this.arrStoreId[newTabIndex - 1] : this.strStoreId
            this.$router.push({
                name: 'admin',
                query: {
                    storeid: this.currentStoreId,
                    startdate: this.startDate,
                    enddate: this.endDate
                }
            })
        },
        loadDataReport () {
            const strStoreId = this.$route.query.storeid
            const startDate = this.$route.query.startdate
            const endDate = this.$route.query.enddate
            Promise.all([
                this.$api.store.getDataForReportPage(strStoreId),
                this.$api.store.getStaticReportPage(strStoreId, startDate, endDate, 'day')
            ]).then((responses) => {
                const reportDataRes = responses[0].data
                const staticDataRes = responses[1].data

                this.totalOrderToday = reportDataRes.totalOrderToday
                this.orderNoConfirm = reportDataRes.orderNoConfirm
                this.totalIncomeToday = reportDataRes.totalIncomeToday
                this.totalIncomeMonth = reportDataRes.totalIncomeMonth
                this.lineChartData = {
                    labels: staticDataRes.dataset,
                    dataDoanhThu: staticDataRes.dataDoanhThu,
                    dataDonHang: staticDataRes.dataDonHang
                }
            })
        }
    },
    head () {
        return {
            title: 'Event Listing'
        }
    }
}
</script>
