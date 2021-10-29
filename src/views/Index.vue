<template>
  <a-layout class="index-container">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img src="@/assets/images/logo.png" />
      </div>
      <left-menu :leftMenuList="leftMenuList"></left-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        class="content-warpper"
        :style="{ margin: '24px 16px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import LeftMenu from "@/components/LeftMenu.vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LeftMenu,
  },
  data() {
    return {
      collapsed: true,
      leftMenuList: [{ name: "设备管理详情", title: "详情" }],
    };
  },
};
</script>
<style lang="scss"></style>
