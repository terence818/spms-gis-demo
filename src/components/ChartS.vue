<template>
    <div :id="id" :style="{ width: '100%', height: '100px' }"></div>
</template>
<script>
export default {
    props: ['id'],
    data() {
        return {
            option: {
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        show: false
                    },
                    name: this.name
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
                        type: 'bar',
                        showBackground: true,
                        itemStyle: {
                            color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#83bff6' },
                                { offset: 0.5, color: '#188df0' },
                                { offset: 1, color: '#188df0' }
                            ])
                        },
                        emphasis: {
                            itemStyle: {
                                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: '#2378f7' },
                                    { offset: 0.7, color: '#2378f7' },
                                    { offset: 1, color: '#83bff6' }
                                ])
                            }
                        },
                    }
                ]
            }

        }
    },
    mounted() {
        const chartDom = document.getElementById(this.id)
        const chart = this.$echarts.init(chartDom)
        chart.setOption(this.option)
    }
}
</script>