<template>
    <div class="theme-switch">
        <el-dropdown @command="changeDropdown">
            <span class="el-dropdown-link">T</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="dark-gray">dark-gray</el-dropdown-item>
                <el-dropdown-item command="gray">gray</el-dropdown-item>
                <el-dropdown-item command="hybrid">hybrid</el-dropdown-item>
                <el-dropdown-item command="oceans">oceans</el-dropdown-item>
                <el-dropdown-item command="osm">osm</el-dropdown-item>
                <el-dropdown-item command="satellite">satellite</el-dropdown-item>
                <el-dropdown-item command="streets-navigation-vector">streets-navigation-vector</el-dropdown-item>
                <el-dropdown-item command="streets-night-vector">streets-night-vector</el-dropdown-item>
                <el-dropdown-item command="streets-relief-vector">streets-relief-vector</el-dropdown-item>
                <el-dropdown-item command="streets-vector">streets-vector</el-dropdown-item>
                <el-dropdown-item command="terrain">terrain</el-dropdown-item>
                <el-dropdown-item command="topo">topo</el-dropdown-item>
                <el-dropdown-item command="topo-vector">topo-vector</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
    export default{
        data() {
            return{}
        },
        methods: {
            changeDropdown(type) {
                this.$emit('changeTheme', type)
            }
        }
    }
</script>
<style scoped>
.theme-switch {
    width: 32px;
    height: 32px;
    background: #242424;
    position: fixed;
    right: 30px;
    bottom: 91px;
    border-bottom: 1px solid #adadad4d;
    cursor: pointer;
    z-index: 1999;
    box-shadow: 0 1px 2px #0000004d
}
.theme-switch:hover {
    background-color: #303030;
}

.el-dropdown-link {
    line-height: 32px;
    color: #adadad;
    font-size: 16px;
}

.el-dropdown-link:hover {
    color: #ededed;
}
</style>
<style>
.el-dropdown-menu {
    background: rgba(5, 39, 80, 0.9) !important;
    border: none !important;
}
.el-dropdown-menu__item {
    color: #fff !important;
}
.el-dropdown-menu__item:hover {
    background: #0264D8 !important;
}
.popper__arrow::after {
    border-top-color: rgba(5, 39, 80, 0.9) !important;
}
</style>