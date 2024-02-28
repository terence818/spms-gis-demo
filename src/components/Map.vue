<template>
    <div class="js_map">
        <div class="js_map" id="js_map" />
        <!-- 区域切换 -->
        <AreaCut @areaCut="areaCut" />
        <!-- 2D/3D切换 -->
        <ModeCut @changeMap="changeMap" :MapType="MapType" />
        <!-- 底部banner切换 -->
        <BannerS :areaIdx="areaIdx" :publicKey="publicKey" @bannerSChange="bannerSChangeNew" />
        <!-- 右侧筛选项 -->
        <AbilityMoudle v-if="areaIdx === '1' || areaIdx === '2'" :areaIdx="areaIdx" />
        <!-- 顶部导航 -->
        <AlertS v-if="areaIdx === '1'" :alertSKey="alertSKey" @bannerSChange="bannerSChange" />
        <!-- 主题切换 -->
        <ThemeSwitch @changeTheme="changeTheme" />
        <el-dialog :title="alarmInfo.title" :visible.sync="alarmInfoVisible" width="40%" @closed="alarmInfoHandleClose"
            :close-on-click-modal="false" :close-on-press-escape="false">
            <AlarmInfo v-if="alarmInfoVisible" :alarmInfo="alarmInfo" @viewVideo="viewVideo" />
        </el-dialog>
        <el-dialog :title="'Video monitoring'" :visible.sync="monitorVisible" width="40%" @closed="monitorClose"
            :close-on-click-modal="false" :close-on-press-escape="false">
            <SupervisoryControl v-if="monitorVisible" :alarmInfo="alarmInfo" />
        </el-dialog>
        <el-dialog :title="'Weather and Air Indicator'" :visible.sync="weatherVisible" width="40%" @closed="monitorClose"
            :close-on-click-modal="false" :close-on-press-escape="false">
            <WeatherInfo v-if="weatherVisible" :alarmInfo="alarmInfo" />
        </el-dialog>
    </div>
</template>

<script>
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView" // GraphicsLayer
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
// import Point from "@arcgis/core/geometry/Point"
import AreaCut from "./AreaCut.vue"
import ModeCut from "./ModeCut.vue"
import BannerS from "./BannerS.vue"
import AbilityMoudle from './AbilityMoudle.vue'
import AlertS from './AlertS.vue'
import AlarmInfo from './AlarmInfo.vue'
import SupervisoryControl from './SupervisoryControl.vue'
import WeatherInfo from './WeatherInfo.vue'
import ThemeSwitch from "./ThemeSwitch.vue"
import data from './json/data'
import CCTV from './images/icon/cctv.png'
export default {
    name: 'HelloWorld',
    components: {
        AreaCut,
        ModeCut,
        BannerS,
        AbilityMoudle,
        AlertS,
        AlarmInfo,
        SupervisoryControl,
        ThemeSwitch,
        WeatherInfo
    },
    props: {
        MapType: {
            type: String,
            default: '2D'
        }
    },
    data() {
        return {
            map: null,
            mapView: null,
            graphicsLayer: null,
            pointArr: [],
            areaIdx: '1',
            alarmInfoVisible: false,
            alarmInfo: {},
            monitorVisible: false,
            weatherVisible: false,
            realTimeKey: {
                CCTV: 0,
                Talikhidmat: 0,
                Crowd: 0,
                FacialRecognition: 0,
                HeavyTraffic: 0,
                VehicleRecognition: 0,
                Fire: 0,
                Wheather: 0
            },
            topAlertKey: {
                Crowd: 0,
                FacialRecognition: 0,
                VehicleRecognition: 0,
                Fire: 0,
                Wheather: 0
            },
            weatherKey: {
                SecurityCamera: 0,
                WeatherCamera: 0,
                WeatherLight: 0
            },
            publicKey: {},
            alertSKey: {
                allAlerts: 0,
                major: 0,
                intermediate: 0,
                minor: 0
            },
            markerChoose: {
                CCTV: true,
                Talikhidmat: true,
                Crowd: true,
                FacialRecognition: true,
                HeavyTraffic: true,
                VehicleRecognition: true,
                Fire: true,
                Wheather: true,
                SecurityCamera: true,
                WeatherCamera: true,
                WeatherLight: true,
            },
            pointArrNew: []
        }
    },
    async mounted() {
        const vm = this
        this.pointArr = data[Number(vm.areaIdx) - 1]
        for (let item in vm.realTimeKey) {
            vm.realTimeKey[item] = vm.pointArr.filter(obj => item === obj.type).length
        }
        vm.publicKey = vm.realTimeKey
        vm.alertSKey.allAlerts = vm.pointArr.length
        vm.alertSKey.major = vm.pointArr.filter(obj => obj.severityLevel === 0).length
        vm.alertSKey.intermediate = vm.pointArr.filter(obj => obj.severityLevel === 1).length
        vm.alertSKey.minor = vm.pointArr.filter(obj => obj.severityLevel === 2).length
        this.map = new Map({
            basemap: 'dark-gray'
        })
        this.mapView = new MapView({
            container: "js_map",
            map: vm.map,
            extent: {//初始化范围
                xmin: 99.298390123,
                ymin: 32.192839123,
                xmax: 125.2983901923,
                ymax: 50.281973892,
            },
            zoom: 10,
            //中心点坐标
            center: [110.359291, 1.553504]
        })
        this.graphicsLayer = new GraphicsLayer()
        this.addMarker()
        // this.addLine()
        this.mapView.on('click', (e) => {
            this.mapView.hitTest(e).then(({ results }) => {
                if (results?.length) {
                    const {
                        graphic: {
                            geometry,
                        }
                    } = results[0] // 如果用重叠要素的话可能有多个返回，咱只拿第一个
                    if (geometry) {
                        vm.alarmInfo = vm.pointArr.find(item => item.longitude === geometry.longitude && item.latitude === geometry.latitude)
                        if (vm.areaIdx === '3') {
                            vm.weatherVisible = true
                        } else {
                            if (vm.alarmInfo.icon !== CCTV) {
                                vm.alarmInfoVisible = true
                            } else {
                                vm.monitorVisible = true
                            }
                        }
                    }
                } else {
                    console.log(e)
                }
            })
        })
    },
    methods: {
        addMarker() {
            const points = []
            this.pointArr.forEach(item => {
                if (!this.markerChoose[item.type]) {
                    return
                }
                points.push(new Graphic({
                    geometry: {
                        type: 'point',
                        longitude: item.longitude,
                        latitude: item.latitude,
                    },
                    symbol: {
                        type: 'picture-marker',
                        url: item.icon,
                        width: 24,
                        height: 24,
                    },
                    attributes: {
                        type: item.type
                    }
                }))
            })
            this.pointArrNew = this.mapView.graphics.addMany(points).items
        },
        addLine() {
            const path = this.pointArr.map((obj) => {
                return [obj.longitude, obj.latitude]
            })
            const polylineGraphic = new Graphic({
                geometry: {
                    type: "polyline",
                    paths: path
                },
                symbol: {
                    type: "simple-line",
                    color: [226, 119, 40],
                    width: 4
                }
            })
            this.mapView.graphics.add(polylineGraphic)
        },
        resetMap() {
            this.mapView.goTo({
                center: [110.359291, 1.553504],
                zoom: 10
            })
        },
        // 区域切换
        areaCut(idx) {
            if (idx === '4') {
                this.$emit('changeMap', idx)
                return
            }
            const vm = this
            this.areaIdx = idx
            this.pointArr = data[Number(this.areaIdx) - 1]
            switch (vm.areaIdx) {
                case '1':
                    for (let item in vm.realTimeKey) {
                        vm.realTimeKey[item] = vm.pointArr.filter(obj => item === obj.type).length
                    }
                    vm.publicKey = vm.realTimeKey
                    break;
                case '2':
                    for (let item in vm.topAlertKey) {
                        vm.topAlertKey[item] = vm.pointArr.filter(obj => item === obj.type).length
                    }
                    vm.publicKey = vm.topAlertKey
                    break;
                case '3':
                    for (let item in vm.weatherKey) {
                        vm.weatherKey[item] = vm.pointArr.filter(obj => item === obj.type).length
                    }
                    vm.publicKey = vm.weatherKey
                    break;
                default:
                    break;
            }
            this.clearMarker()
            setTimeout(() => {
                this.resetMap()
                vm.addMarker()
            }, 1000)
        },
        clearMarker() {
            this.mapView.graphics.removeAll()
        },
        bannerSChange(obj) {
            const vm = this
            this.clearMarker()
            if (obj === 'all') {
                if (this.pointArr.length === 0) {
                    this.pointArr = data[Number(vm.areaIdx) - 1]
                } else {
                    this.pointArr = []
                }
            }
            if (obj === '0') {
                if (this.pointArr.findIndex(item => item.severityLevel === 0) === -1) {
                    // this.pointArr = data[Number(vm.areaIdx) - 1].filter(item => item.severityLevel !== 0)
                } else {
                    this.pointArr = this.pointArr.filter((item) => item.severityLevel !== 0)
                }
            }
            if (obj === '1') {
                if (this.pointArr.findIndex(item => item.severityLevel === 1) === -1) {
                    // this.pointArr = data[Number(vm.areaIdx) - 1].filter(item => item.severityLevel !== 1)
                } else {
                    this.pointArr = this.pointArr.filter((item) => item.severityLevel !== 1)
                }
            }
            if (obj === '2') {
                if (this.pointArr.findIndex(item => item.severityLevel === 2) === -1) {
                    // this.pointArr = data[Number(vm.areaIdx) - 1].filter(item => item.severityLevel !== 2)
                } else {
                    this.pointArr = this.pointArr.filter((item) => item.severityLevel !== 2)
                }
            }
            if (typeof obj === 'object') {
                vm.markerChoose = obj[this.areaIdx]
            }
            setTimeout(() => {
                this.resetMap()
                vm.addMarker()
            }, 1000)
        },
        bannerSChangeNew(obj) {
            this.pointArrNew.forEach((item) => {
                if (item.attributes.type === obj.obj) {
                    item.visible = !item.visible
                }
            })
        },
        changeMap(idx) {
            this.$emit('changeMap', idx)
        },
        alarmInfoHandleClose() {
            this.alarmInfoVisible = false
        },
        monitorClose() {
            this.monitorVisible = false
        },
        changeTheme(type) {
            this.mapView.map.basemap = type
        },
        viewVideo() {
            this.monitorVisible = true
        }
    }
}
</script>

<style scoped>
.js_map {
    height: 100%;
    width: 100%;
}
</style>
<style>
.esri-zoom {
    position: fixed !important;
    bottom: 20px !important;
    right: 30px !important;
}
</style>
