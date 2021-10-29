<template>
  <div class="left-menu">
    <a-menu
      :default-selected-keys="['1']"
      mode="inline"
      theme="dark"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
    >
      <template v-for="item in leftMenuList" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name" @click="toPage(item.name)">
            <template #icon>
              <PieChartOutlined />
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
        <template v-else> </template>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { PieChartOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    PieChartOutlined,
  },
  props: {
    leftMenuList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedKeys: [],
      openKeys: [],
    };
  },
};
</script>
<style lang="scss"></style>
