<template>
  <div>
    <detail-head>
      <template #left>
        <div>
          <a-select
            v-model:value="value1"
            style="width: 100px"
            @focus="focus"
            @change="handleChange"
            class="select"
            placeholder="选择设备"
          >
            <a-select-option value="jack">设备仪</a-select-option>
            <a-select-option value="lucy">设备仪2</a-select-option>
            <a-select-option value="Yiminghe">设备仪3</a-select-option>
          </a-select>
          <a-input style="width: 200px" placeholder="请输入"></a-input>
          <a-button class="button">
            <template #icon><SearchOutlined /></template>
            搜索
          </a-button>
        </div>
      </template>
      <template #right>
        <a-button class="add-btn">
          <template #icon><FileAddFilled /></template>
          新增
        </a-button>
      </template>
    </detail-head>
    <device-table></device-table>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { SearchOutlined, FileAddFilled } from "@ant-design/icons-vue";

import DeviceTable from "@/components/device_table/index";
import DetailHead from "@/views/first_level_menu/cps/detail_head/src/DetailHead.vue";

export default defineComponent({
  components: {
    DeviceTable,
    DetailHead,
    SearchOutlined,
    FileAddFilled,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.select {
  margin-left: 30px;
}
.button {
  margin-left: 40px;
  color: #fff;
  background-color: #23bcca;
}
.add-btn {
  background-color: #5372e7;
  color: #fff;
}
</style>
