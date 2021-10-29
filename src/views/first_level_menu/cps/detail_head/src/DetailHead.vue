<template>
  <div class="detail-head">
    <div class="editor">
      <slot name="left"><div></div></slot>
      <slot name="right">
        <div v-if="!isDetail">
          <a-button class="confirm-btn" @click="handlBtn">编辑</a-button>
        </div>
        <div v-if="isDetail">
          <a-button class="cancel-btn" @click="handlBtn">取消</a-button>
          <a-button type="primary" @click="submit">确认</a-button>
        </div>
      </slot>
    </div>
    <div class="buttom"></div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  emits: ["isDetail", "submit"],
  setup(props, { emit }) {
    const isDetail = ref(false);

    const handlBtn = () => {
      isDetail.value = !isDetail.value;
      emit("isDetail");
    };
    const submit = () => {
      emit("submit");
    };
    return { isDetail, handlBtn, submit };
  },
});
</script>

<style scoped>
.editor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  margin-right: 30px;
}
.buttom {
  height: 13px;
  background-color: #f0f2f5;
}
.cancel-btn {
  background: #778ca2;
  color: #fff;
  margin-right: 20px;
}
.confirm-btn {
  background-color: #23bcca;
  color: #fff;
}
</style>
