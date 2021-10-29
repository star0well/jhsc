<template>
  <div>
    <a-modal
      width="60%"
      v-model:visible="isVisible"
      title="新增"
      centered
      @ok="addBtn"
    >
      <yc-form ref="formRef"></yc-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import YcForm from "@/base-ui/form/index";

export default defineComponent({
  components: {
    YcForm,
  },
  setup() {
    const isVisible = ref(false);
    const formRef = ref();
    const addBtn = () => {
      console.log("提交数据");
      formRef.value.request();
      isVisible.value = false;
    };
    return { isVisible, addBtn, formRef };
  },
});
</script>

<style scoped></style>
