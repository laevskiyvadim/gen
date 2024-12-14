import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DoctorView from "@/views/DoctorsView.vue";
import NursesView from "@/views/NursesView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/doctors",
    name: "doctors",
    component: DoctorView,
  },
  {
    path: "/nurses",
    name: "nurses",
    component: NursesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
