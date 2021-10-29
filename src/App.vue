<template>
    <div id="app" ref="app">
        <a-config-provider :locale="locale">
            <router-view :class="{'global-table-empty':$store.state.globalValues.showSpin}"></router-view>
        </a-config-provider>
        <div v-show="$store.state.globalValues.showSpin" class="global-mask-loading-container">
            <a-spin class="global-mask-loading" />
        </div>
    </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
    name: 'App',
    components: {},
    data() {
        return {
            locale: zhCN
        };
    },
}
</script>
<style lang='scss'>
@import "@/assets/css/common.scss";
</style>