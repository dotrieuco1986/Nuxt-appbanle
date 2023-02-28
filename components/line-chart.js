import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    props: ['data', 'options'],
    mounted () {
        this.renderLineChart()
    },
    computed: {
        chartData () {
            return this.data
        }
    },
    methods: {
        renderLineChart () {
            this.renderChart(
                {
                    labels: this.chartData.labels,
                    datasets: [
                        {
                            label: 'Doanh Thu',
                            data: this.chartData.dataDoanhThu,
                            pointBackgroundColor: '#FE7235',
                            pointBorderColor: '#FE7235',
                            borderColor: '#707070',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: 'Đơn Hàng',
                            data: this.chartData.dataDonHang,
                            pointBackgroundColor: '#34B1FF',
                            pointBorderColor: '#34B1FF',
                            borderColor: '#34B1FF',
                            borderWidth: 1,
                            fill: false
                        }
                    ]
                },
                this.options
            )
        }
    },
    watch: {
        data () {
            this.$data._chart.destroy()
            this.renderLineChart()
        }
    }
}
