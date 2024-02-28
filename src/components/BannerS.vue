<template>
    <div class="banner-s">
        <div :class="{ 'banner-item': true, 'banner-item-choose': bannersChoose[v.type][v.key] }"
            v-for="(v, index) in banners" :key="index" @click="bannersMethods(v)">
            <div class="banner-item-title">
                <div class="banner-item-title-val">{{ v.value }}</div>
                <div class="banner-item-title-img"><img :src="v.url" alt=""></div>
            </div>
            <div class="banner-item-footer">{{ v.label }}</div>
        </div>
    </div>
</template>
<script>
import CCTV from './images/icon/cctv.png'
import Crowd from './images/icon/crowd.png'
import Fire from './images/icon/fire.png'
import Flame from './images/icon/flame.png'
import FacialBlacklist from './images/icon/FacialBlacklist.png'
import Flood from './images/icon/flood.png'
import ManualReporting from './images/icon/manualReporting.png'
import TrafficCongestion from './images/icon/trafficCongestion.png'
import VehicleBlacklist from './images/icon/vehicleBlacklist.png'
import WeatherWarning from './images/icon/weatherWarning.png'
export default {
    props: ['areaIdx', 'publicKey'],
    data() {
        return {
            bannersArr: [
                { value: 0, key: 'CCTV', label: 'CCTV', url: CCTV, type: '1' },
                { value: 0, key: 'Talikhidmat', label: 'Talikhidmat', url: ManualReporting, type: '1' },
                { value: 0, key: 'Crowd', label: 'Crowd', url: Crowd, type: '1' },
                { value: 0, key: 'FacialRecognition', label: 'Facial Recognition', url: FacialBlacklist, type: '1' },
                { value: 0, key: 'HeavyTraffic', label: 'Heavy Traffic', url: TrafficCongestion, type: '1' },
                { value: 0, key: 'VehicleRecognition', label: 'Vehicle Recognition', url: VehicleBlacklist, type: '1' },
                { value: 0, key: 'Fire', label: 'Fire', url: Fire, type: '1' },
                { value: 0, key: 'Wheather', label: 'Wheather', url: WeatherWarning, type: '1' },
                { value: 0, key: 'Crowd', label: 'Crowd', url: Crowd, type: '2' },
                { value: 0, key: 'FacialRecognition', label: 'Facial Recognition', url: FacialBlacklist, type: '2' },
                { value: 0, key: 'VehicleRecognition', label: 'Vehicle Recognition', url: VehicleBlacklist, type: '2' },
                { value: 0, key: 'Fire', label: 'Fire', url: Fire, type: '2' },
                { value: 0, key: 'Wheather', label: 'Wheather', url: WeatherWarning, type: '2' },
                { value: 0, key: 'SecurityCamera', label: 'Security Camera', url: Flame, type: "3" },
                { value: 0, key: 'WeatherCamera', label: 'Weather Camera', url: CCTV, type: "3" },
                { value: 0, key: 'WeatherLight', label: 'Weather Light', url: Flood, type: "3" },
            ],
            bannersChoose: {
                '1': {
                    CCTV: true,
                    Talikhidmat: true,
                    Crowd: true,
                    FacialRecognition: true,
                    HeavyTraffic: true,
                    VehicleRecognition: true,
                    Fire: true,
                    Wheather: true
                },
                '2': {
                    Crowd: true,
                    FacialRecognition: true,
                    VehicleRecognition: true,
                    Fire: true,
                    Wheather: true
                },
                '3': {
                    SecurityCamera: true,
                    WeatherCamera: true,
                    WeatherLight: true,
                }
            },
            banners: []
        }
    },
    mounted() {
        const vm = this
        this.banners = this.bannersArr.filter(obj => obj.type === '1')
        this.$nextTick(() => {
            vm.banners.forEach((obj) => {
                obj.value = vm.publicKey[obj.key]
            })
        })
    },
    watch: {
        areaIdx: {
            handler: function (newVal) {
                this.banners = this.bannersArr.filter(obj => obj.type === newVal)
                this.$nextTick(() => {
                    this.banners.forEach((obj) => {
                        obj.value = this.publicKey[obj.key]
                    })
                })
            },
            deep: true
        }
    },
    methods: {
        bannersMethods(v) {
            this.bannersChoose[v.type][v.key] = !this.bannersChoose[v.type][v.key]
            // this.$emit('bannerSChange', this.bannersChoose);            
            this.$emit('bannerSChange', {obj: v.key, bool: this.bannersChoose[v.type][v.key]});
        }
    }
}
</script>
<style scoped>
.banner-s {
    position: fixed;
    left: 50%;
    height: 100px;
    transform: translate(-50%, -160px);
    z-index: 1999;
    display: flex;
}

.banner-item {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin: 0 10px;
    background: #103252;
    font-size: 14px;
    color: #fff;
    text-align: left;
    padding: 10px;
}

.banner-item-title {
    display: flex;
}

.banner-item-title-val {
    width: 76px;
    height: 50px;
}

.banner-item-title-img img {
    height: 24px;
    width: 24px;
}

.banner-item-footer {
    height: 30px;
    display: table-cell;
    vertical-align: bottom;
}

.banner-item-choose {
    background: #409EFF !important;
}
</style>