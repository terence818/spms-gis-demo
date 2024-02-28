<template>
    <div class="alert-s">
        <div class="banner-item banner-item-all-alerts" @click="alertMethods('all')">
            <div class="banner-item-title">
                {{ alertSKey.allAlerts }}
            </div>
            <div class="banner-item-footer">All Alerts</div>
        </div>
        <div class="banner-item banner-item-major" @click="alertMethods('0')">
            <div class="banner-item-title">
                {{ alertSKey.major }}
            </div>
            <div class="banner-item-footer">Major</div>
        </div>
        <div class="banner-item banner-item-intermediate" @click="alertMethods('1')">
            <div class="banner-item-title">
                {{ alertSKey.intermediate }}
            </div>
            <div class="banner-item-footer">Intermediate</div>
        </div>
        <div class="banner-item banner-item-minor" @click="alertMethods('2')">
            <div class="banner-item-title">
                {{ alertSKey.minor }}
            </div>
            <div class="banner-item-footer">Minor</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['alertSKey'],
    data() {
        return {
            allAlerts: 72,
            major: 10,
            intermediate: 20,
            minor: 42
        }
    },
    methods: {        
        alertMethods(v) {
            this.$emit('bannerSChange', v);
        }
    }
}
</script>

<style scoped>
.alert-s {
    position: fixed;
    left: 50%;
    height: 72px;
    transform: translate(-50%, -800px);
    z-index: 1999;
    display: flex;
}

.banner-item {
    width: 160px;
    height: 72px;
    color: #fff;
}
.banner-item-footer {
    font-size: 14px;
}

.banner-item-title {
    height: 44px;
    line-height: 50px;
    font-size: 28px;
}

.banner-item-all-alerts {
    background-image: url('./images/border-allalerts.png');
    background-size: 100% 100%;
}

.banner-item-major {
    background-image: url('./images/border-major.png');
    background-size: 100% 100%;
}

.banner-item-intermediate {
    background-image: url('./images/border-intermediate.png');
    background-size: 100% 100%;
}

.banner-item-minor {
    background-image: url('./images/border-minor.png');
    background-size: 100% 100%;
}</style>