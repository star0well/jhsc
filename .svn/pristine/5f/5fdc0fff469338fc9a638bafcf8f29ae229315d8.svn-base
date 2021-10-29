<template>
  <div class="special-select">
    <div class="select-container">
      <a-select show-search option-filter-prop="children" :placeholder="placeholder" v-model="selectId" :disabled="disabled">
        <template slot="suffixIcon">
          <img style="width:12px;height:12px;" src="@/assets/images/icons/xia.png" alt="">
        </template>
        <a-select-option v-for="(item) in dataList" :key="item[fieldId]" :value="item[fieldId]">{{item[fieldName]}}</a-select-option>
      </a-select>
      <a-button v-show="!notShowBtn" class="add-btn" type="primary" @click="addItem" :class="{'z-disabled-btn':disabled}">添加</a-button>
    </div>
    <div class="show-list" :class="{'z-disabled':disabled}">
      <div class="show-item" v-for="item in showList" :key="item[fieldId]">
        <span>{{item[fieldName]}}</span>
        <img class="icon-delete" src="@/assets/images/icons/cha.png" @click="removeItem(item)" />
      </div>
    </div>
    <div class="cover" v-show="disabled"></div>
  </div>
</template>


<script>
export default {
  props: ["dataList", "showList", "fieldId", "fieldName", "disabled", "notShowBtn"],
  watch: {
    showList: {
      deep: true,
      handler(newV, oldV) {
        if (this.dataList && this.dataList.length > 0) {
          this.selectId = this.dataList[0][this.fieldId];
        }
      }
    },


  },
  computed: {
    placeholder() {
      if (this.dataList && this.dataList.length > 0) {
        return "请选择";
      } else {
        return "暂无选项";
      }
    }
  },
  data() {
    return {
      selectId: undefined,
    };
  },
  mounted() {

  },
  methods: {
    removeItem(item) {
      let index = 0;

      for (let i = 0; i < this.showList.length; i++) {
        if (this.showList[i][this.fieldId] == item[this.fieldId]) {
          index = i;
          break;
        }
      }

      let arr = this.showList.splice(index, 1);
      this.dataList.push(arr[0]);


      this.$emit("change", this.showList);
    },
    addItem() {
      if (this.dataList.length == 0) {
        return;
      }

      if (!this.selectId || this.selectId == "") {
        this.$message.error("请先选择");
        return;
      }

      let index = 0;
      for (let i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i][this.fieldId] == this.selectId) {
          index = i;
          break;
        }
      }

      let arr = this.dataList.splice(index, 1);
      this.showList.push(arr[0]);



      if (this.dataList.length > 0) {
        this.selectId = this.dataList[0][this.fieldId];
      } else {
        this.selectId = undefined;
      }


      this.$emit("change", this.showList);
    }
  }
};
</script>

<style lang="scss" scoped>
.special-select::v-deep {
  margin-top: -40px; /*no*/
  text-align: left;
  position: relative;
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    cursor: no-drop;
  }

  .select-container {
    width: 33%;
    .ant-select {
      width: 70.83333333%;
      margin-left: 29.16666667%;
    }
    .add-btn {
      position: absolute;
      left: 484px;
      top: 4px; /*no*/
      margin-left: 20px;/*no*/
      user-select: none;
      cursor: pointer;
    }
    .ant-btn-primary {
      background: #61cad7;
      border-color: #61cad7;
    }
    .ant-btn-primary:active {
      opacity: 0.5;
    }
  }
  .show-list {
    margin-top: 10px;/*no*/
    margin-bottom: 10px;/*no*/
    padding: 0px 10px;/*no*/
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #B1B1C0;/*no*/
    border-radius: 3px;/*no*/
    min-height: 70px;/*no*/
    .show-item {
      display: inline-block;
      height: 26px;/*no*/
      line-height: 26px;/*no*/
      padding: 0 12px;/*no*/
      border-radius: 5px;/*no*/
      font-size: 16px;/*no*/
      background: rgba(97, 202, 215, 0.15);
      color: rgba(0, 0, 0, 0.6);
      position: relative;
      margin-right: 20px;/*no*/
      margin-bottom: 10px;/*no*/
      margin-top: 10px;/*no*/
      display: flex;
      align-items: center;
      .icon-delete {
        width: 12px;/*no*/
        height: 12px;/*no*/
        margin-left: 20px;/*no*/
        cursor: pointer;
        user-select: none;
      }
    }
  }

  .z-disabled {
    color: rgba(0, 0, 0, 0.25);
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 1;
  }
  .z-disabled-btn {
    opacity: 0.6;
  }
}
</style>


