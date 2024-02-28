<template>
    <div class="js_map">
        <div class="js_map" id="js_map" />
        <ModeCut @changeMap="changeMap" :MapType="MapType" />
        <!-- 主题切换 -->
        <ThemeSwitch @changeTheme="changeTheme" />
    </div>
</template>

<script>

import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import data from './json/data'
import ModeCut from "./ModeCut.vue"
import ThemeSwitch from './ThemeSwitch.vue'


export default {
    name: 'HelloWorld',
    components: {
        ModeCut,
        ThemeSwitch
    },
    props: {
        MapType: {
            type: String,
            default: 'Heat'
        }
    },
    data() {
        return {
            map: null,
            heatMapLayer: null,
            pointArr: [...data[0], ...data[1], ...data[2]],
            graphicsLayer: null,
            heatmapRenderer: {
                type: "heatmap",
                colorStops: [
                    { ratio: 0, color: "rgba(0, 255, 150, 0)" },
                    { ratio: 0.6, color: "rgb(250, 250, 0)" },
                    { ratio: 0.85, color: "rgb(250, 150, 0)" },
                    { ratio: 0.95, color: "rgb(255, 50, 0)" },
                ],
                blurRadius: 10,
                maxPixelIntensity: 10,
                minPixelIntensity: 0,
            },
        }
    },
    async mounted() {
        this.initMap('dark-gray')
    },
    methods: {
        initMap(type) {
            const vm = this
            this.map = new Map({
                basemap: type
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
            vm.graphicsLayer = new GraphicsLayer({
                id: 'MyGraphicsLayer'
            })
            vm.pointArr.forEach((ele) => {
                const point = {
                    type: 'point',
                    longitude: ele.longitude,
                    latitude: ele.latitude
                }
                const fillSymbol = {
                    type: 'simple-fill',
                    color: "blue",
                    outline: {  // autocasts as new SimpleLineSymbol()
                        color: [128, 128, 128, 1],
                        width: "3px"
                    }
                }
                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: fillSymbol
                })
                vm.graphicsLayer.add(pointGraphic)
            })
            vm.map.add(vm.graphicsLayer)
            let layer = vm.map.layers.items[0];// GraphicsLayer点类型图层
            if (!layer) return;
            vm.heatMapLayer = new FeatureLayer({
                source: layer.graphics,
                fields: [
                    {
                        name: "MyGraphicsLayer",
                        alias: "MyGraphicsLayer",
                        type: "oid",
                    },
                ],
                objectIdField: "MyGraphicsLayer",
                geometryType: "point",
                renderer: vm.heatmapRenderer
            });
            vm.map.add(vm.heatMapLayer)
        },
        // 区域切换
        areaCut(idx) {
            if (idx === '4') {
                this.$emit('changeMap', idx)
                return
            }
        },
        changeMap() {
            this.$emit('changeMap', '2D')
        },
        changeTheme(type) {
            this.initMap(type)
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
