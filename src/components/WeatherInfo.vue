<template>
    <div class="weather-info">
        <el-divider />
        <!-- 天气 -->
        <div class="weather-info-today">
            <div class="weather-info-today-icon"><img src="./images/weather.png" alt=""></div>
            <div class="weather-info-today-num">18-Good</div>
        </div>
        <el-divider />
        <!-- echarts -->
        <div>
            <div class="weather-info-label">updated 3 minutes age (Jan 26，2024 2:30 PM)</div>
            <Charts id="id-one" name="PM2.5"/>
            <Charts id="id-two" name="PM10"/>
        </div>
        <el-divider />
        <!-- past 12 months api -->
        <div class="weather-info-label">past 12 months api</div>
        <el-divider />
        <!-- click for more information -->
        <div class="weather-info-label">Click for more information</div>
        <el-divider />
        <!-- 来源 -->
        <div class="weather-info-label">Source Save Dnipro, Station savednipro_4202(savednipro.org/)</div>
    </div>
</template>
<script>
import Charts from './ChartS.vue'

export default {
    components: {
        Charts
    },
    data() {
        return {}
    }
}
</script>
<style scoped>
.weather-info-today {
    height: 100px;
    background-color: rgb(107, 107, 245);
    display: flex;
}
.weather-info-today-icon img{
    flex: 1;
    height: 80px;
    width: 80px;
    margin: 10px;
}
.weather-info-today-num {
    flex: 1;
    font-size: 40px;
    text-align: right;
    line-height: 100px;
    color: #fff;
    padding-right: 10px;
}
.weather-info-label {
    font-size: 20px;
    font-weight: 900;
}
</style>