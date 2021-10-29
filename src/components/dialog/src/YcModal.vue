<template>
  <div>
    <a-modal
      width="60%"
      v-model:visible="isVisible"
      title="新增"
      centered
      @ok="addBtn"
    >
      <slot name="form"></slot>
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
    const isVisible = ref(false); //外部引用通过ref 更改 ->pagemodalRef.value.isVisible = true;
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
