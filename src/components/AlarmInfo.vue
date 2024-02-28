<template>
    <el-row class="alarm-info-container">
        <el-col :span="12">
            <el-descriptions title="" :column="1">
                <el-descriptions-item label="Alarm ID">{{ alarmInfo.alarmId }}</el-descriptions-item>
                <el-descriptions-item label="Creat time">{{ alarmInfo.creatTime }}</el-descriptions-item>
                <el-descriptions-item label="Camera ID">{{ alarmInfo.cameraID }}</el-descriptions-item>
                <el-descriptions-item label="Alarm location">{{ alarmInfo.alarmLocation }}</el-descriptions-item>
                <el-descriptions-item label="Severity Level">{{ alarmInfo.severityLevel }}</el-descriptions-item>
                <el-descriptions-item label="Status">{{ alarmInfo.status }}</el-descriptions-item>
            </el-descriptions>
        </el-col>
        <el-col :span="12">
            <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </el-col>
        <el-col :span="24">
            <el-button size="small" @click="jumpToSupervisory">实时监控</el-button>
            <el-button size="small" @click="jumpToSupervisory" type="primary">录像</el-button>
        </el-col>
    </el-row>
</template>
<script>
export default {
    props: {
        alarmInfo: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            monitorVisible: false
        }
    },
    methods: {
        jumpToSupervisory() {
            this.$emit('viewVideo');
        }
    }
}
</script>