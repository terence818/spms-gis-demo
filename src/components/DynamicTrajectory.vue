<template>
    <div class="js_map">
        <div class="js_map" id="js_map" />
    </div>
</template>

<script>
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Polyline from '@arcgis/core/geometry/Polyline'
// import AreaCut from "./AreaCut.vue"
// import ModeCut from "./ModeCut.vue"
// import BannerS from "./BannerS.vue"
// import AbilityMoudle from './AbilityMoudle.vue'
// import AlertS from './AlertS.vue'
// import AlarmInfo from './AlarmInfo.vue'
// import SupervisoryControl from './SupervisoryControl.vue'
// import ThemeSwitch from "./ThemeSwitch.vue"
import data from './json/data'
import others from './images/others.png'


export default {
    name: 'HelloWorld',
    components: {
        // AreaCut,
        // ModeCut,
        // BannerS,
        // AbilityMoudle,
        // AlertS,
        // AlarmInfo,
        // SupervisoryControl,
        // ThemeSwitch
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
            pointArr: [],
            areaIdx: '1',
            alarmInfoVisible: false,
            alarmInfo: {},
            monitorVisible: false,

        }
    },
    created() {
        this.pointArr = [data[1][0], data[1][9]]
    },
    async mounted() {
        const vm = this
        this.map = new Map({
            basemap: 'dark-gray'
        })
        this.mapView = new MapView({
            container: "js_map",
            map: vm.map,
            // extent: {//初始化范围
            //     xmin: 99.298390123,
            //     ymin: 32.192839123,
            //     xmax: 125.2983901923,
            //     ymax: 50.281973892,
            // },
            zoom: 8,
            //中心点坐标
            center:  [114.0579, 51.0447]
        })
        this.addMarker()
        this.addLine()
    },
    methods: {
        addMarker() {
            const points = [];
            [[113, 50], [114, 51]].forEach(item => {
                points.push(new Graphic({
                    geometry: {
                        type: 'point',
                        longitude: item[0],
                        latitude: item[1],
                    },
                    symbol: {
                        type: 'picture-marker',
                        url: others,
                        width: 24,
                        height: 24,
                        angle: 0,
                    }
                }))
            })
            this.mapView.graphics.addMany(points)
        },
        addLine() {
            // 创建图形图层
            var graphicsLayer = new GraphicsLayer();
            this.map.add(graphicsLayer);
            // const path = this.pointArr.map((obj) => {
            //     return [obj.longitude, obj.latitude]
            // })
            var polyline = new Polyline({
                paths: [[[113, 50], [114, 51]]],
            });
            var lineSymbol = {
                type: "simple-line",
                color: [226, 119, 40],
                width: 4,
            };
            var lineGraphic = new Graphic({
                geometry: polyline,
                symbol: lineSymbol,
            });
            graphicsLayer.add(lineGraphic);
            var carSymbol = {
                type: "picture-marker",
                url: others,
                width: "32px",
                height: "32px",
            };
            var carGraphic = new Graphic({
                geometry: polyline.extent.center,
                symbol: carSymbol,
            });
            graphicsLayer.add(carGraphic);
            // var animation = null;
            var animationSpeed = 2000;
            function animate() {
                var length = polyline.paths[0].length;
                var currentIndex = 0;
                function move() {
                    // 更新汽车位置
                    carGraphic.geometry = polyline.getPoint(currentIndex);
                    // 当前位置索引增加
                    currentIndex++;
                    // 如果到达终点，则重置索引
                    if (currentIndex >= length) {
                        currentIndex = 0;
                    }
                    // 重新计时
                    setTimeout(move, animationSpeed);
                }
                move();
            }
            this.mapView.when(function () {
                animate();
            });
            // this.mapView.graphics.add(polylineGraphic)
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
