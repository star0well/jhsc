<template>
    <div class="left-menu">
        <a-menu :default-selected-keys="['1']" mode="inline" theme="dark" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys">
            <template v-for="item in leftMenuList" :key="item.name">
                <template v-if="!item.children">
                    <a-menu-item :key="item.name" @click="toPage(item.name)">
                        <template #icon>
                            <PieChartOutlined />
                        </template>
                        {{ item.meta.title }}
                    </a-menu-item>
                </template>
                <template v-else>
                    <sub-menu :menu-info="item" :key="item.name" />
                </template>
            </template>
        </a-menu>
    </div>
</template>
<script>
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
} from '@ant-design/icons-vue';
const SubMenu = {
    name: 'SubMenu',
    props: {
        menuInfo: {
            type: Object,
            default: () => ({}),
        },
    },
    template: `
    <a-sub-menu :key="menuInfo.name">
      <template #icon><MailOutlined /></template>
      <template #title>{{ menuInfo.meta.title }}</template>
      <template v-for="item in menuInfo.children" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name" @click="toPage(item.name)">
            <template #icon>
              <PieChartOutlined />
            </template>
            {{ item.meta.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.name" />
        </template>
      </template>
    </a-sub-menu>
  `,
    components: {
        PieChartOutlined,
        MailOutlined,
    },
    methods: {
        // 点击菜单跳转页面
        toPage: function (routeName) {
            this.$router.push({ name: routeName });
        },
    },
};
export default {
    components: {
        'sub-menu': SubMenu,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        PieChartOutlined,
    },
    props: {
        leftMenuList: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedKeys: [],
            openKeys: [],
        };
    },
    watch: {
        $route(to) {
            this.selectedKeys = [to.name];
            let tempArr = to.path.split('/');
            if (tempArr[1]) {
                this.openKeys = [tempArr[1]];
            }
        },
    },
    methods: {
        // 点击左侧菜单
        clickLeftMenu: function (event) {

        },
        // 点击菜单跳转页面
        toPage: function (routeName) {
            this.$router.push({ name: routeName });
        },
    },
    mounted() {
        this.selectedKeys = [this.$route.name];
        let tempArr = this.$route.path.split('/');
        if (tempArr[1]) {
            this.openKeys = [tempArr[1]];
        }
    },
};
</script>
<style lang="scss">
</style>