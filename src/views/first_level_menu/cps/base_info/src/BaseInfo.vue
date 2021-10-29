<template>
  <div>
    <a-card :title="detailConfig.title" style="width: 100%">
      <a-form>
        <a-row :gutter="60">
          <template v-for="item in detailConfig.propList" :key="item.label">
            <a-col :span="8">
              <a-form-item :label="item.label">
                <a-textarea
                  :value="modelValue[item.label]"
                  @change="handleValue($event)"
                  :disabled="isDetail"
                  :placeholder="item.prop"
                  :auto-size="{
                    minRows: 1,
                    maxRows: 5,
                  }"
                /> </a-form-item
            ></a-col>
          </template>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { detailConfig } from "../config/config";
export default defineComponent({
  props: {
    isDetail: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: Object,
      requied: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const formState = ref({
      设备名称: "1",
      企业名称: "",
      设备编号: "",
      气态污染物CEMS设备生产商: "",
      气态污染物CEMS设备规格型号: "",
      颗粒物CEMS设备生产商: "",
      颗粒物CEMS设备规格型号: "",
      安装地点: "",
      维护管理单位: "",
      开始使用时间: "",
      负责人: "",
      负责人电话: "",
    });
    const handleValue = ($event) => {
      console.log($event.target.value);
      emit("update:modelValue", { 设备名称: $event.target.value });
    };
    return {
      detailConfig,
      formState,
      handleValue,
    };
  },
});
</script>

<style scoped>
.showInfo {
  background-color: #f1f4fd;
}
</style>
