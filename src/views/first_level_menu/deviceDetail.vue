<template>
  <detail-head @isDetail="handelBtn" @submit="handelSubmit"></detail-head>
  <base-info :isDetail="isDetail" v-model="demo"></base-info>
  <device-info :isDetail="isDetail"></device-info>
  <device-check-info :isDetail="isDetail"></device-check-info>
</template>

<script>
import { defineComponent, ref } from "vue";

import BaseInfo from "./cps/base_info/index";
import DetailHead from "./cps/detail_head/index";
import DeviceInfo from "./cps/device_info/index";
import DeviceCheckInfo from "./cps/device_check_info/index";

export default defineComponent({
  components: {
    DetailHead,
    BaseInfo,
    DeviceInfo,
    DeviceCheckInfo,
  },
  setup() {
    const isDetail = ref(true);
    const pagemodalRef = ref(null);
    const demo = ref({
      设备名称: "测试",
    });
    const handelBtn = () => {
      isDetail.value = !isDetail.value;
    };
    const handelSubmit = () => {
      console.log("确认按钮点击了");
    };
    return { isDetail, handelBtn, handelSubmit, pagemodalRef, demo };
  },
});
</script>

<style>
.ant-input[disabled] {
  color: rgba(0, 0, 0, 0.25);
  background-color: #f5f5f5;
  cursor: auto;
  opacity: 1;
}
</style>
