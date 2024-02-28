<template>
    <el-row class="supervisory-control">
        <video controls>
            <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
        </video>        
        <el-descriptions title="" :column="1">
                <el-descriptions-item label="设备名称">{{ alarmInfo.deviceName }}</el-descriptions-item>
                <el-descriptions-item label="设备编号">{{ alarmInfo.deviceCode }}</el-descriptions-item>
                <el-descriptions-item label="设备位置">{{ alarmInfo.deviceLocation }}</el-descriptions-item>
            </el-descriptions>
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
}
</script>
<style scoped>
.supervisory-control video {
    width: 100%;
    height: 400px;
}
</style>