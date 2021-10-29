<template>
   <div class="table-pagination">
      <div class="left">
         <img class="pre-btn" src="@/assets/images/icons/circle-left.png" @click="pre" />
         <span class="text"> {{pageNum}} / {{total}} </span>
         <img class="next-btn" src="@/assets/images/icons/circle-right.png" @click="next" />
      </div>

      <div class="right">
         <a-input-number v-model="value" :min="1" :max="total"></a-input-number>
         <a-button type="link" @click="setNum(value)">跳转</a-button>
      </div>

   </div>
</template>

<script>
export default {
   props: {
      len: {
         type: Number,
         default: () => {
            return 0;
         }
      },
      size: {
         type: Number,
         default: () => {
            return 10;
         }
      },
      pageNum: {
         type: Number,
         default: () => {
            return 1;
         }
      }
   },
   model: {    //将num转为v-model映射
      prop: 'pageNum',
      event: 'change'
   },
   computed: {
      total() {
         if (this.len && this.len > 0) {
            return parseInt((this.len + this.size - 1) / this.size);
         } else {
            return 1;
         }
      }
   },
   data() {
      return {
         value: undefined,
      }
   },
   methods: {
      pre() {
         // console.log('pre',this.pageNum)
         if (this.pageNum > 1) {
            this.$emit("change", this.pageNum - 1);
         }
      },
      next() {
         // console.log('next',this.pageNum)
         if (this.pageNum < this.total) {
            this.$emit("change", this.pageNum + 1);
         }
      },
      setNum(value) {
         //失去焦点时会自动矫正（可省略该判断）
         let flag = value && value != "" && parseInt(value) != "NaN" && value >= 1 && value <= this.total;
         if (flag) {
            this.$emit("change", value);
            this.value = undefined;
         }
      }
   }

}
</script>


<style lang="scss" scoped>

.table-pagination {
   margin-top: 30px;
   display: flex;
   align-items: center;
   justify-content: flex-end;
   .left {
      .pre-btn,
      .next-btn {
         box-sizing: content-box;
         border: 5px solid transparent;
         width: 20px;
         height: 20px;
      }
      .text {
         padding: 5px;
         font-size: 14px;
      }
   }
   .right {
      margin-left: 20px;
   }
}
</style>


