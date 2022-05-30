import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/login",
		name: "login",
		component: () => import("../views/account/LoginView.vue")
	},
	{
		path: "/register",
		name: "Register",
		component: () => import("../views/account/Register.vue")
	},
	{
		path: "/forget",
		name: "Forget",
		component: () => import("../views/account/Forget.vue")
	},
	{
		path: "/index",
		name: "Index",
		component: () => import("../views/layout/Index.vue")
	},
	{
		path: "/newsIndex",
		name: "NewsIndex",
		component: () => import("../views/news/Index.vue")
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
