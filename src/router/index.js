import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/main",
  },

  {
    path: "/main",
    name: "main",
    component: () => import("@/views/Index.vue"),
  },
];
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
