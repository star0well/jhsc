<template>
    <div class="left-menu">
        <a-menu class="left-a-menu" :defaultSelectedKeys="['1']" v-model="selectedKeys" :openKeys.sync="openKeys" mode="inline">
            <template v-for="item in leftMenuList" :key="item.name">
                <a-menu-item v-if="!item.children || item.children.length == 0" class="left-a-menu-item-1" @click="toPage(item.name)" :title="item.meta.title">
                    <i class="left-a-icon-1">
                        <img :src="require('@/assets/images/icons/' + item.meta.icon)" />
                        <!-- <img class="select-img" :src="require('@/assets/images/icons/' + item.meta.selectIcon)" /> -->
                    </i>
                    <span class="left-title-1">{{item.meta.title}}</span>
                </a-menu-item>
                <a-sub-menu v-else class="left-a-sub-menu" :key="item.name">
                    <span slot="title" class="left-a-sub-menu-title">
                        <i class="left-a-icon-1">
                            <img :src="require('@/assets/images/icons/' + item.meta.icon)" />
                            <!-- <img class="select-img" :src="require('@/assets/images/icons/' + item.meta.selectIcon)" /> -->
                        </i>
                        <span class="left-title-1">{{item.meta.title}}</span>
                    </span>
                    <template v-for="item1 in item.children" :key="item1.name">
                        <a-menu-item class="left-a-menu-item-2" @click="toPage(item1.name)">
                            <!-- <i class="left-a-icon-2">
                                <img :src="require('@/assets/images/icons/' + item1.meta.icon)" />
                                <img class="select-img" :src="require('@/assets/images/icons/' + item1.meta.selectIcon)" />
                            </i> -->
                            <span class="left-title-2">{{ item1.meta.title }}</span>
                        </a-menu-item>
                    </template>
                    <a-menu-item class="left-a-menu-item-3" style="pointer-events:none">
                        <!-- <i class="left-a-icon-3">
                            <img :src="require('@/assets/images/icons/' + item.meta.icon)" />
                            <img class="select-img" :src="require('@/assets/images/icons/' + item.meta.selectIcon)" />
                        </i> -->
                        <span class="left-title-3">{{item.meta.title}}</span>
                    </a-menu-item>
                </a-sub-menu>
            </template>
        </a-menu>
    </div>
</template>
<script>

export default {
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
.left-menu {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background: #fff !important;
    .left-a-menu {
        width: 100%;
        border-right: none;
        .left-a-menu-item-1 {
            height: 50px;
            margin: 0;
            padding: 0;
            padding-left: 0 !important;
            text-align: left;
            display: flex;
            align-items: center;

            cursor: pointer;
            user-select: none;

            .left-a-icon-1 {
                position: relative;
                width: 16px;
                height: 16px;
                margin: 0 14px 0 26px;
                padding: 0;
                line-height: 50px;

                cursor: pointer;
                user-select: none;

                img {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                }
                .select-img {
                    opacity: 0;
                }
            }
            .left-title-1 {
                font-size: 16px;
                font-family: Microsoft YaHei;
                line-height: 50px;
                cursor: pointer;
                user-select: none;
                color: #33618f;
            }
        }
        .left-a-menu-item-1.ant-menu-item-selected {
            background-color: rgba($color: #61cad7, $alpha: 0.2);
            position: relative;
            .left-title-1 {
                color: #037ccf !important;
            }

            &::before {
                display: block;
                position: absolute;
                left: -2px;
                content: "";
                width: 6px;
                height: 100%;
                background-color: #61cad7;
            }
        }
        .left-a-menu-item-1.ant-menu-item-selected::after {
            border-right: 0;
        }
        .left-a-sub-menu {
            cursor: pointer;
            user-select: none;

            .ant-menu-submenu-title {
                height: 50px;
                margin: 0;
                padding: 0;
                padding-left: 0 !important;
                text-align: left;
                display: flex;
                align-items: center;
                .left-a-sub-menu-title {
                    display: flex;
                    align-items: center;
                    .left-a-icon-1 {
                        position: relative;
                        width: 16px;
                        height: 16px;
                        margin: 0 14px 0 26px;
                        padding: 0;
                        line-height: 50px;

                        cursor: pointer;
                        user-select: none;

                        img {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                        }
                        .select-img {
                            opacity: 0;
                        }
                    }
                    .left-title-1 {
                        font-size: 16px;
                        font-family: Microsoft YaHei;
                        color: rgb(51, 97, 143);
                        cursor: pointer;
                        user-select: none;
                        color: #33618f;
                    }
                }
            }
        }
    }
}
.left-a-menu-item-2.ant-menu-item:not(:last-child),
.left-a-menu-item-3.ant-menu-item:not(:last-child) {
    margin-bottom: 0;
}
.left-a-menu-item-2.ant-menu-item {
    display: flex;
    align-items: center;
    height: 46px;
    margin: 0;
    padding: 0;
    padding-left: 44px !important;
    text-align: left;
    .left-a-icon-2 {
        position: relative;
        width: 14px;
        height: 14px;
        margin: 0;
        padding: 0;
        line-height: 46px;
        img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
        .select-img {
            opacity: 0;
        }
    }
    .left-title-2 {
        margin-left: 14px;
        line-height: 46px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgb(51, 97, 143);

        user-select: none;
        cursor: pointer;
    }
}
.ant-menu-vertical {
    .left-a-menu-item-2.ant-menu-item {
        padding-left: 20px !important;
    }
    .left-a-menu-item-3.ant-menu-item {
        padding-left: 19px !important;
    }
}
.ant-menu-submenu
    .ant-menu-submenu-popup
    .ant-menu-light
    .ant-menu-submenu-placement-rightTop
    .ant-menu-vertical.ant-menu-sub {
    min-width: 130px;
}
.left-a-menu-item-2.ant-menu-item-selected::after {
    border-right: 0;
}
.ant-menu-inline-collapsed {
    .left-a-menu-item-1 {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ant-menu-submenu-title {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .left-title-1 {
        display: inline-block;
        max-width: 0;
        opacity: 0;
    }
}
.left-menu .ant-menu-inline-collapsed .left-a-sub-menu .ant-menu-submenu-title,
.left-menu .ant-menu-inline-collapsed > .left-a-menu-item-1 {
    padding: 0 !important;
    padding-left: 0 !important;
}
.left-menu .ant-menu-inline-collapsed .ant-menu-sub.ant-menu-inline {
    display: none;
}
.left-menu .ant-menu-inline .left-a-menu-item-3 {
    display: none;
}

.ant-menu-vertical.ant-menu-sub.ant-menu-submenu-content {
    position: relative;
    padding-top: 50px;
}

.ant-menu-vertical .left-a-menu-item-3 {
    position: absolute;
    top: 0;
    height: 50px;
    margin: 0;
    padding: 0;
    padding-left: 35px !important;
    text-align: left;
    display: flex;
    align-items: center;
    .left-a-icon-3 {
        position: relative;
        width: 16px;
        height: 16px;
        margin: 0;
        padding: 0;
        line-height: 50px;
        img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
        .select-img {
            opacity: 0;
        }
    }
    .left-title-3 {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgb(51, 97, 143);
        margin-left: 13px;
        line-height: 50px;
    }
}

.ant-tooltip-inner {
    color: rgba(0, 0, 0, 0.6);
    background-color: #fff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.ant-tooltip-arrow::before {
    background-color: #fff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}

.ant-menu-inline .ant-menu-item::after {
    border-right: none;
}

// hover样式
.ant-menu-item:hover .select-img,
.ant-menu-submenu-title:hover .select-img {
    opacity: 1 !important;
}
.ant-menu-item:hover .left-title-1,
.ant-menu-item:hover .left-title-2,
.ant-menu-submenu-title:hover .left-title-1,
.ant-menu-submenu-title:hover .left-title-2 {
    color: rgba(3, 124, 207, 1) !important;
}
.ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,
.ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before {
    background: linear-gradient(to right, #037ccf, #037ccf) !important;
}

// select样式
.ant-menu-item-selected .left-a-icon-1 .select-img,
.ant-menu-item-selected .left-a-icon-2 .select-img,
.ant-menu-submenu-selected .left-a-icon-1 .select-img,
.ant-menu-item-selected ~ .left-a-menu-item-3 .left-a-icon-3 .select-img {
    opacity: 1 !important;
}
.ant-menu-item-selected .left-title-1,
.ant-menu-item-selected .left-title-2 {
    color: #037ccf !important;
    // font-weight: bold !important;
}
.ant-menu-submenu-selected .left-title-1,
.ant-menu-item-selected ~ .left-a-menu-item-3 .left-title-3 {
    color: #037ccf !important;
    font-weight: bold !important;
}
.ant-menu-submenu-selected
    .ant-menu-submenu-title
    .ant-menu-submenu-arrow::after,
.ant-menu-submenu-selected
    .ant-menu-submenu-title
    .ant-menu-submenu-arrow::before {
    background: linear-gradient(to right, #037ccf, #037ccf) !important;
}
</style>