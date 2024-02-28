<template>
    <div class="area-cut">
        <div class="area-cut-drop" @mouseover="mouseOver" @mouseout="mouseOut"><img src="./images/Shape.png" alt=""></div>
        <div class="area-cut-drop-menu" v-if="showFlag" @mouseover="mouseOver" @mouseout="mouseOut">
            <div :class="{ 'area-cut-drop-menu-item': true, 'area-cut-drop-menu-item-cut': cutInx === v.value }"
                v-for="(v) in area" :key="v.value" @click="cutItem(v.value)">{{ v.label }}</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showFlag: false,
            area: [
                { label: 'Real-Time Alert', value: '1' },
                { label: 'Top Alert', value: '2' },
                { label: 'Weather and Air Indicator', value: '3' },
                { label: 'Heavy Traffic', value: '4' },
            ],
            timer: null,
            cutInx: '1'
        }
    },
    methods: {
        mouseOver() {
            this.showFlag = true
            clearTimeout(this.timer)
        },
        mouseOut() {
            this.timer = setTimeout(() => {
                this.showFlag = false
            }, 1000)
        },
        cutItem(idx) {
            this.cutInx = idx
            this.$emit('areaCut', idx);
            this.timer = setTimeout(() => {
                this.showFlag = false
            }, 300)
        }
    }
}
</script>
<style scoped>
.area-cut {
    position: fixed;
    top: 30px;
    left: 30px;
    z-index: 1999;
    display: flex;
}

.area-cut-drop {
    cursor: pointer;
    width: 48px;
    height: 48px;
    background: rgba(5, 39, 80, 0.7);
}

.area-cut-drop img {
    width: 24px;
    height: 24px;
    margin-top: 12px;
}

.area-cut-drop-menu {
    width: 240px;
    margin-left: 10px;
    background: #052750;
    border-radius: 10px;
    padding: 10px 0;
}

.area-cut-drop-menu-item {
    height: 36px;
    margin: 10px 20px;
    width: calc(100% - 40px);
    background: rgba(5, 39, 80, 0.7);
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.3);
    line-height: 36px;
    color: rgba(255, 255, 255, 0.75);
    font-size: 14px;
    cursor: pointer;
}

.area-cut-drop-menu-item-cut {
    background: #0264D8;
}
</style>