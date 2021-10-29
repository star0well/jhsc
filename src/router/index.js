import { createRouter, createWebHistory } from "vue-router";
// import db from "@/utils/sessionstorage";
// import request from "@/utils/request";
import store from "@/store/index";

// 静态路由
const constRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
];

// 路由白名单
const whiteList = ["/login"];

const router = createRouter({
  history: createWebHistory("/"),
  scrollBehavior: () => {
    return { top: 0 };
  },
  routes: constRoutes, // `routes: routes` 的缩写
});

// // 解决'NavigationDuplicated'导航重复问题
// router.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

// 动态路由
let asyncRoutes;

let asyncRoutesCopy = [
  // 平台端路由
  {
    name: "firstLevelMenu",
    path: "/firstLevelMenu",
    component: "first_level_menu/deviceDetail",
    meta: { title: "一级菜单", icon: "glygl.png" },
  },

  {
    name: "systemManagement",
    path: "/systemManagement",
    component: "BlankRouterView",
    meta: { title: "系统管理", icon: "glygl.png" },
    children: [
      {
        name: "staff",
        path: "/systemManagement/staff",
        component: "system_management/staff/Staff",
        meta: { title: "员工管理" },
      },
      {
        name: "role",
        path: "/systemManagement/role",
        component: "system_management/role/Role",
        meta: { title: "角色管理" },
      },
    ],
  },
];

// 导航守卫，渲染动态路由
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    // const token = db.get('ACCESS_TOKEN')
    // const user = db.get('USER')
    // todo 没有登录时使用
    const token = [1];
    const user = true;

    const userRouter = get("USER_ROUTER");

    if (token.length && user) {
      if (!asyncRoutes) {
        if (!userRouter) {
          // request.get(`system/menu/${user.username}`).then((res) => {
          //     const permissions = res.data.data.permissions
          //     const btnPermissions = res.data.data.buttonsPermission
          //     store.commit('account/setPermissions', permissions)
          //     store.commit('account/setBtnPermissions', btnPermissions)
          let baseAsyncRouter = [
            {
              path: "/index",
              name: "index",
              component: "Index",
            },
          ];

          // todo 根据自己的数据结构设置默认跳转页
          baseAsyncRouter[0].children = asyncRoutesCopy;

          // baseAsyncRouter[0].children = res.data.data.routes;
          let defaultRedirectPath = getDefaultRedirectPath(baseAsyncRouter);
          let defaultRouter = {
            path: "/",
            redirect: defaultRedirectPath,
          };
          asyncRoutes = [defaultRouter, ...baseAsyncRouter];
          store.commit("account/setRoutes", asyncRoutes);
          save("USER_ROUTER", asyncRoutes);
          go(to, next);
          // })
        } else {
          asyncRoutes = userRouter;
          go(to, next);
        }
      } else {
        next();
      }
    } else {
      if (to.path === "/login") {
        next();
      } else {
        next("/login");
      }
    }
  }
});

router.afterEach(() => {});

function go(to, next) {
  asyncRoutes = filterAsyncRouter(asyncRoutes);
  addAllRoute(asyncRoutes);
  next({ ...to, replace: true });
}

// 动态添加路由
function addAllRoute(routes, parentName) {
  if (routes) {
    routes.filter((itemRoute) => {
      if (parentName) {
        router.addRoute(parentName, itemRoute);
      } else {
        router.addRoute(itemRoute);
      }
      if (itemRoute.children && itemRoute.children.length) {
        addAllRoute(itemRoute.children, itemRoute.name);
      }
      return true;
    });
  }
}

function save(name, data) {
  sessionStorage.setItem(name, JSON.stringify(data));
}

function get(name) {
  return JSON.parse(sessionStorage.getItem(name));
}

function filterAsyncRouter(routes) {
  return routes.filter((route) => {
    const component = route.component;
    if (component) {
      route.component = view(component);
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children);
      }
      return true;
    } else if (route.path == "/") {
      return true;
    }
  });
}

function view(path) {
  // return (resolve) => require([`@/views/${path}.vue`], resolve)
  // return () => import(`@/views/${path}.vue`)
  return () => require.ensure([], (require) => require(`@/views/${path}.vue`));
}

function getDefaultRedirectPath(routes) {
  let defaultRedirectPath = "";
  if (routes[0] && routes[0].children && routes[0].children[0]) {
    defaultRedirectPath = getDefaultRedirectPath(routes[0].children);
  } else {
    defaultRedirectPath = routes[0].path;
  }
  return defaultRedirectPath;
}

export default router;
