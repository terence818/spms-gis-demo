<template>
    <div class="ability-moudle">
        <div class="ability-moudle-drop"><img src="./images/ShapeNew.png" alt="" @click="showDetailMethods"></div>
        <div class="ability-moudle-drop-menu-list" v-if="showDetail">
            <div v-for="(v, index) in menuList" :key="index" class="ability-moudle-drop-menu-list-item">
                <div class="ability-moudle-drop-menu-list-item-label">{{ v.label }}:</div>
                <el-row class="ability-moudle-drop-menu-list-item-btn-box" :gutter="10">
                    <el-col v-for="(obj, idx) in v.btns" :key="idx" :span="obj.span" style="margin-bottom: 10px;"><el-button
                            :type="modelKey[v.key] === obj.value ? 'primary' : ''" style="width: 100%;" size="mini" @click="changeBtn(v.key, obj.value)">{{
                                 obj.label }}</el-button></el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['areaIdx'],
    data() {
        return {
            menuListArr: [
                {
                    label: 'Refresh interval', key: 'refreshInterval', btns: [
                        { label: '1min', value: '1', span: 12 },
                        { label: '5min', value: '5', span: 12 },
                    ], type: '1'
                },
                {
                    label: 'Keep Duration', key: 'keepDuration', btns: [
                        { label: '15min', value: '15', span: 12 },
                        { label: '30min', value: '30', span: 12 },
                    ], type: '1'
                },
                {
                    label: 'Top Num', key: 'topNum', btns: [
                        { label: '15min', value: '5', span: 12 },
                        { label: '30min', value: '10', span: 12 },
                    ], type: '2'
                },
                {
                    label: 'Duration', key: 'duration', btns: [
                        { label: 'Last 12 hours', value: '12', span: 24 },
                        { label: '15min', value: '15', span: 12 },
                        { label: '30min', value: '30', span: 12 },
                        { label: '45min', value: '45', span: 12 },
                        { label: '60min', value: '60', span: 12 },
                    ], type: '2'
                },
            ],
            modelKey: {
                refreshInterval: '1',
                keepDuration: '15',
                topNum: '5',
                duration: '12'
            },
            menuList: [],
            showDetail: false
        }
    },
    watch: {
        areaIdx: {
            handler: function (newVal) {
                this.menuList = this.menuListArr.filter(obj => obj.type === newVal)
                this.showDetail = false
            },
            deep: true
        }
    },
    mounted() {
        this.menuList = this.menuListArr.filter(obj => obj.type === '1')
    },
    methods: {
        showDetailMethods() {
            this.showDetail = !this.showDetail
        },
        changeBtn(type, val) {
            this.modelKey[type] = val
        }
    }
}
</script>
<style>
.ability-moudle {
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 1999;
}

.ability-moudle-drop {
    cursor: pointer;
    width: 48px;
    height: 48px;
    background: rgba(5, 39, 80, 0.7);
    position: absolute;
    right: 0;
}

.ability-moudle-drop img {
    width: 24px;
    height: 24px;
    margin-top: 12px;
}

.ability-moudle-drop-menu-list {
    position: absolute;
    top: 60px;
    right: 0;
}

.ability-moudle-drop-menu-list-item {
    display: flex;
    width: 360px;
}

.ability-moudle-drop-menu-list-item-label {
    margin-bottom: 10px;
    height: 28px;
    line-height: 28px;
    width: 160px;
    font-size: 14px;
    color: #fff;
}

.ability-moudle-drop-menu-list-item-btn-box {
    width: 200px;
}
</style>