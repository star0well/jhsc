<template>
  <div class="wrapper">
    <a-card :title="deviceConfig.title" style="width: 100%">
      <template v-for="item in deviceConfig.propList" :key="item.lable">
        <a-form>
          <a-form-item>
            <div class="device-name">{{ item.title }}</div>
            <a-form>
              <a-row :gutter="60">
                <a-col :span="9">
                  <a-form-item label="分析仪量程">
                    <a-input :disabled="isDetail"> </a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="9">
                  <a-form-item label="计量单位">
                    <a-input :disabled="isDetail"> </a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="分析仪原理">
                    <a-textarea
                      :disabled="isDetail"
                      placeholder=""
                      :auto-size="{
                        minRows: 2,
                        maxRows: 5,
                      }"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-form-item>
        </a-form>
      </template>
    </a-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { deviceConfig } from "../config/config";
export default defineComponent({
  props: {
    isDetail: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {
      deviceConfig,
    };
  },
});
</script>

<style scoped></style>
