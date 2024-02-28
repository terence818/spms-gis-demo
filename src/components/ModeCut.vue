<template>
    <div class="mode-cut">
        <div v-if="MapType === '3D'" :class="{ 'mode-cut-item': true }" @click="modeCut(0)">2D</div>
        <div v-if="MapType === 'Heat'" :class="{ 'mode-cut-item': true }" @click="modeCut(1)">EX</div>
        <div v-if="MapType === '2D'" :class="{ 'mode-cut-item': true, 'mode-cut-item-three': true }" @click="modeCut(1)">3D</div>
    </div>
</template>
<script>
export default {
    props: {
        MapType: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            cutIdx: 0
        }
    },
    methods: {
        modeCut(idx) {
            this.$emit('changeMap', idx)
        }
    }
}
</script>
<style>
.mode-cut {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 1999;
}

.mode-cut-item {
    height: 48px;
    width: 48px;
    text-align: center;
    line-height: 48px;
    background: rgba(5, 39, 80, 0.7);
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
}

.mode-cut-item-three {
    margin-top: 10px;
}

.mode-cut-item-cut {
    background: #0264D8;
}
</style>