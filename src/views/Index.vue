<template>
  <a-layout class="index-container">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img src="@/assets/images/logo.png" />
      </div>
      <left-menu :leftMenuList="leftMenuList"></left-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        class="content-warpper"
        :style="{ margin: '24px 16px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import LeftMenu from "@/components/LeftMenu.vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
export default {
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LeftMenu,
  },
  watch: {
    soundType(val) {
      let audio = document.getElementById("audio");
      if (audio) {
        if (val == 0) {
          //    audio.src = require("@/assets/music01.mp3");
          this.audioSrc = require("@/assets/music01.mp3");
        } else if (val == 1) {
          //    audio.src = require("@/assets/music02.mp3");
          this.audioSrc = require("@/assets/music02.mp3");
        }
      }
    },
  },
  data() {
    return {
      audioSrc: require("@/assets/music01.mp3"),
      audioEnablePlay: false,

      collapsed: false,
      btnLoading1: false,
      leftMenuList: [],
      modalVisible1: false,
      formDatas1: {},
      formRules1: {
        oldPassword: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur",
            whitespace: true,
          },
          ...this.validatePwd("密码"),
        ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
            whitespace: true,
          },
          ...this.validatePwd("密码"),
        ],
        newPasswordConfirm: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "blur",
            whitespace: true,
          },
          ...this.validatePwd("密码"),
        ],
      },
      realname: undefined,
      ws: undefined,
      isClose: false,
      userType: undefined,
      number: 0,

      isShowSound: false,
      soundType: undefined,
    };
  },
  created() {
    let _this = this;
    let routes = _this.$store.state.account.routes;
    _this.leftMenuList = _this.getMenus(routes, "");
    this.realname = _this.$store.state.account.user.realname;
    this.userType = _this.$store.state.account.user.type;
    this.soundType = _this.$store.state.account.user.sex || 0;

    // if (this.userType == 2) {
    //     // this.getNumberHttp();
    //     // this.getWsHttp();
    //     // this.checkNetwork();

    //     vm.$on("updateNumber", () => {
    //         // this.getNumberHttp();
    //     })
    // }
  },
  mounted() {
    //   async function playAudio() {
    //      let audio = document.getElementById("audio");
    //      try {
    //         await audio.play();
    //      } catch (err) {
    //      }
    //   }
    //   let btn = document.getElementById("audio-btn");
    //   btn.addEventListener("click", playAudio, false);
  },
  methods: {
    showSound() {
      this.isShowSound = true;
    },
    handleSound() {
      let userId = this.$store.state.account.user.userId;
      let sex = this.soundType;

      this.btnLoading1 = true;
      this.$put("/system/user", {
        userId,
        sex,
      })
        .then((res) => {
          this.$message.success("操作成功");
          this.isShowSound = false;
          let user = this.$store.state.account.user;
          user.sex = sex;
          this.$store.commit("account/setUser", user);
        })
        .catch((err) => {
          this.soundType = this.$store.state.account.user.sex;
        })
        .finally((res) => {
          this.btnLoading1 = false;
        });
    },
    goInfo() {
      this.$router.push({
        name: "cdMessage",
      });
    },
    getNumberHttp() {
      // this.$get("/gxdzy/inform/inform-unread", null, true).then(res => {
      //     this.number = res.data.data;
      // })
    },
    checkNetwork() {
      const EventUtil = {
        addHandler: function(element, type, handler) {
          if (element.addEventListener) {
            element.addEventListener(type, handler, false);
          } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
          } else {
            element["on" + type] = handler;
          }
        },
      };
      EventUtil.addHandler(window, "online", (e) => {
        console.log("网络已连接");
        this.isClose = false;
        this.getWsHttp();
      });
      EventUtil.addHandler(window, "offline", (e) => {
        console.log("网络已断开");
        if (this.ws) {
          this.ws.close();
          this.isClose = true;
        }
      });
    },
    getWsHttp() {
      let url = "ws://192.168.0.109:8301/gxdzy/websocket/";
      if (process.env.NODE_ENV != "development") {
        url = "ws://124.70.177.246:8301/gxdzy/websocket/";
      }
      this.$get("/system/user/ws-name").then((res) => {
        // this.connectWs(url + res.data.data);
      });
    },

    connectWs(url) {
      let ws = new WebSocket(url);
      this.ws = ws;
      this.isClose = false;
      ws.onopen = function(evt) {
        console.log("连接成功");
      };

      ws.onmessage = (evt) => {
        console.log("获取数据", evt);
        // let btn = document.getElementById("audio-btn");
        // btn.click();
        this.audioEnablePlay = true;

        setTimeout(() => {
          this.audioEnablePlay = false;
        }, 8000);

        // this.getNumberHttp();
        vm.$emit("updateMsg");
      };

      ws.onerror = function(evt) {
        console.log("连接出错", evt);
      };

      ws.onclose = (evt) => {
        console.log("连接关闭", evt);
        if (!this.isClose) {
          this.connectWs(url);
        }
      };
    },

    // 获取菜单
    getMenus(routes, basePath = "/") {
      let menus = [];
      routes.forEach((route) => {
        let tempObj = {};
        if (route.children) {
          const tempMenus = this.getMenus(route.children, route.path);
          if (tempMenus.length >= 1) {
            tempObj.children = [...tempMenus];
          }
        }
        if (route.name) {
          tempObj.path = route.path;
          tempObj.name = route.name;
          if (route.meta) {
            tempObj.meta = { ...route.meta };
          }
          menus.push(tempObj);
        }
      });
      if (menus[0].name == "index") {
        menus = menus[0].children;
      }
      return menus;
    },

    // 展开/收缩左侧菜单
    toggleCollapsed() {
      let _this = this;
      _this.collapsed = !_this.collapsed;
    },

    // 修改密码
    changePassword() {
      let _this = this;
      // 先清空对象
      _this.formDatas1 = {};
      // 再清空校验对象
      if (_this.$refs.ruleForm1) {
        _this.$refs.ruleForm1.clearValidate();
      }
      _this.modalVisible1 = true;
    },

    // 确定修改
    handleOkEdit() {
      let _this = this;
      _this.$refs.ruleForm1.validate((valid) => {
        if (valid) {
          let paramsTmp = { ..._this.formDatas1 };
          paramsTmp.oldPassword = md5(paramsTmp.oldPassword);
          paramsTmp.newPassword = md5(paramsTmp.newPassword);
          paramsTmp.newPasswordConfirm = md5(paramsTmp.newPasswordConfirm);
          if (paramsTmp.newPassword !== paramsTmp.newPasswordConfirm) {
            _this.$message.error("两次输入新密码不一致");
            return;
          }
          _this.btnLoading1 = true;
          let params = { password: paramsTmp.oldPassword };
          _this
            .$get("/system/user/password/check", params)
            .then((res) => {
              if (res.data) {
                _this.updatePassword(paramsTmp.newPassword);
              } else {
                _this.$message.error("原密码错误");
                _this.btnLoading1 = false;
              }
            })
            .catch((err) => {
              console.log(err);
              _this.btnLoading1 = false;
            });
        } else {
          return false;
        }
      });
    },

    // 修改密码
    updatePassword(newPassword) {
      let _this = this;
      let params = { password: newPassword };
      _this
        .$put("/system/user/password", params)
        .then((res) => {
          _this.$message.success("修改成功");
          _this.modalVisible1 = false;
          _this.loginOut();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          _this.btnLoading1 = false;
        });
    },

    // 取消修改
    handleCancelEdit() {
      let _this = this;
      _this.modalVisible1 = false;
    },

    // 退出登录
    loginOut() {
      db.clear();
      // 需要重新加载清空动态路由缓存
      location.reload();
    },
  },
};
</script>
<style lang="scss">
.index-container {
  height: 100%;

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
  .index-header {
    height: 70px;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding: 0;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.8); /*no*/
    .index-logo {
      margin-left: 34px;
      width: 206px;
      height: 30px;
      line-height: 30px;
      font-size: 0;
    }
    .index-assist-menu {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 56px;

      .ant-divider,
      .ant-divider-vertical {
        margin: 0 12px;
      }
      .index-avatar {
        width: 28px;
        height: 28px;
        margin-right: 10px;
        display: flex;
      }
      .index-username {
        color: #636363;
        font-size: 20px;
      }
      .index-message {
        width: 15px;
        height: 16px;
        display: flex;
        .ant-badge-count {
          top: -4px;
          min-width: 12px;
          height: 12px;
          padding: 0;
          color: #fff;
          font-size: 10px;
          line-height: 12px;
          text-align: center;
          background: #f5222d;
          border-radius: 6px;
          box-shadow: 0 0 0 1px #fff;
          padding-left: 3px;
          padding-right: 3px;
        }

        cursor: pointer;
      }
      .index-reset-password {
        display: flex;
        width: 16px;
        height: 16px;
        img {
          cursor: pointer;
        }
      }
      .index-login-out {
        display: flex;
        width: 18px;
        height: 18px;
        img {
          cursor: pointer;
        }
      }
      .index-user {
        margin: 0 54px 0 14px;
        .index-user-name {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgb(255, 255, 255);
        }
        .index-user-name:hover {
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
  .index-left-menu {
    flex: 0 0 240px !important;
    width: 240px !important;
    max-width: 240px !important;
    min-width: 240px !important;
    background: #f6f6f9;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16); /*no*/
  }
  .index-left-menu-collapsed {
    flex: 0 0 70px !important;
    width: 70px !important;
    max-width: 70px !important;
    min-width: 70px !important;
    background: #f6f6f9;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  }
  .index-trigger {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .index-trigger-line {
      flex: 1;
      height: 0px;
      border: 1px solid rgb(197, 208, 215);
    }
    .index-trigger-btn {
      width: 24px;
      height: 24px;
      border: none;
      .index-trigger-icon {
        width: 24px;
        height: 24px;
        vertical-align: initial;
      }
    }
  }
}
// #components-layout-demo-custom-trigger .trigger {
//     font-size: 18px;
//     line-height: 64px;
//     padding: 0 24px;
//     cursor: pointer;
//     transition: color 0.3s;
// }

// #components-layout-demo-custom-trigger .trigger:hover {
//     color: #1890ff;
// }

// #components-layout-demo-custom-trigger

// .site-layout .site-layout-background {
//     background: #fff;
// }
</style>
