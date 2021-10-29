<template>
  <div>
    <a-card :title="data.title" style="width: 100%">
      <template v-for="item in data.propList" :key="item.label">
        <a-form>
          <div class="device-name">{{ item.title }}</div>
          <div class="second-titile">标准气体信息</div>
          <a-row :gutter="60">
            <a-col :span="8">
              <a-form-item label="标准气体名称">
                <a-input :disabled="isDetail"></a-input> </a-form-item
            ></a-col>
            <a-col :span="8">
              <a-form-item label="浓度值">
                <a-input :disabled="isDetail"></a-input> </a-form-item
            ></a-col>
            <a-col :span="8">
              <a-form-item label="生产厂商名称">
                <a-input :disabled="isDetail"></a-input> </a-form-item
            ></a-col>
            <a-col :span="24">
              <div class="second-titile">参比方法测试设备</div>
            </a-col>
            <a-col :span="8">
              <a-form-item label="测试设备生产商">
                <a-input :disabled="isDetail"></a-input> </a-form-item
            ></a-col>
            <a-col :span="8">
              <a-form-item label="测试设备型号">
                <a-input :disabled="isDetail"></a-input> </a-form-item
            ></a-col>
            <a-col :span="24">
              <a-form-item label="方法依据">
                <a-textarea
                  placeholder=""
                  :auto-size="{
                    minRows: 2,
                    maxRows: 5,
                  }"
                  :disabled="isDetail"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
    </a-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isDetail: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const data = {
      title: "分析仪校验基本信息",
      propList: [
        { prop: "1011", label: "分析仪量程", title: "颗粒物校验" },
        { prop: "单位1", label: "计量单位", title: "SO2校验" },
        { prop: "TXXXXHH", label: "分析仪原理", title: "NOX校验" },
        { prop: "TXXXXHH", label: "分析仪原理", title: "O2校验" },
        { prop: "TXXXXHH", label: "分析仪原理", title: "烟温校验" },
        { prop: "TXXXXHH", label: "分析仪原理", title: "温度校验" },
      ],
    };
    return {
      data,
    };
  },
});
</script>

<style scoped>
.second-titile {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #778ca2;
}
</style>
