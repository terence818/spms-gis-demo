<template>
    <div class="js_map" id="js_map" >
        <div id="js_map"></div>
        <!-- 2D/3D切换 -->
        <ModeCut @changeMap="changeMap" :MapType="MapType"/>
    </div>
</template>
<script>
import Map from '@arcgis/core/Map'
import SceneView from '@arcgis/core/views/SceneView'
import esriConfig from "@arcgis/core/config";
import ModeCut from "./ModeCut.vue"
export default {
    components: {
        ModeCut
    },
    props: {
        MapType: {
            type: String,
            default: '3D'
        }
    },
    data() {
        return {
            map: null,
            mapView: null,
        }
    },
    mounted() {
        esriConfig.apiKey =
            "AAPK72621c47770b426798758730c48b8adeCpiJMaMF6zlMpNvLuvmd4H_yHgohLv9Jf0AAgDEbdZ1oVfvmLibxDgwZYfPgFIZf";
        this.map = new Map({
            basemap: "hybrid",
            ground: "world-elevation"
        });
        this.mapView = new SceneView({
            container: "js_map",  //将三维地图放进对应div中
            map: this.map,
            center: [110.359291, 1.553504],
            zoom: 12
        });

    },
    methods: {        
        changeMap(idx) {
            this.$emit('changeMap', idx)
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