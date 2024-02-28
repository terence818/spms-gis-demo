<template>
    <div id="app">
        <Map v-if="MapType === '2D'" :MapType="MapType" @changeMap="changeMap"/>
        <DimensionalMap v-if="MapType === '3D'" :MapType="MapType"  @changeMap="changeMap"/>
        <HotMap v-if="MapType === 'Heat'" :MapType="MapType" @changeMap="changeMap"/>
    </div>
</template>

<script>
import Map from './components/Map.vue'
import HotMap from './components/HotMap.vue'
import DimensionalMap from './components/DimensionalMap.vue'

export default {
    name: 'App',
    components: {
        Map,
        HotMap,
        DimensionalMap
    },
    data() {
        return {
            MapType: '2D'
        }
    },
    methods: {
        changeMap(type) {
            if (type === 1) {
                this.MapType = '3D'
            } else if (type === '4') {
                this.MapType = 'Heat'
                console.log(this.MapType)
            } else {
                this.MapType = '2D'
            }
        }
    }
}
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    width: 100%;
}
</style>
