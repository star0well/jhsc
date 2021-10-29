<template>
  <div>
    <a-card style="width: 100%">
      <a-form>
        <a-row :gutter="60">
          <template
            v-for="(item, index) in detailConfig.propList"
            :key="item.label"
          >
            <a-col :span="12">
              <a-form-item :label="item.label">
                <a-textarea
                  v-model:value="formState[item.label]"
                  placeholder="请输入"
                  :auto-size="{
                    minRows: 1,
                    maxRows: 2,
                  }"
                /> </a-form-item
            ></a-col>
            <a-col :span="12" v-if="index == 2"> </a-col>
          </template>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { detailConfig } from "../config/config";
export default defineComponent({
  setup() {
    const formState = reactive({
      设备名称: "",
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
    const Handel = () => {
      console.log(formState);
    };
    const request = () => {
      console.log(formState);
    };
    return {
      detailConfig,
      formState,
      Handel,
      request,
    };
  },
});
</script>

<style scoped>
.showInfo {
  background-color: #f1f4fd;
}
</style>
