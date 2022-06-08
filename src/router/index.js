import { createRouter, createWebHashHistory } from "vue-router";

const Layout = () => import("../views/layout/index.vue");

const routes = [
	{
		path: "/login",
		name: "login",
		hidden: true,
		meta: {
			title: "登录"
		},
		component: () => import("../views/account/LoginView.vue")
	},
	{
		path: "/register",
		name: "Register",
		hidden: true,
		meta: {
			title: "注册"
		},
		component: () => import("../views/account/Register.vue")
	},
	{
		path: "/forget",
		name: "Forget",
		hidden: true,
		meta: {
			title: "忘记密码"
		},
		component: () => import("../views/account/Forget.vue")
	},
	{
		path: '/',
		hidden: true
	},
	{
		path: "/index",
		name: "Index",
		meta: {
			title: "首页",
			icon: "logo"
		},
		component: Layout
	},
	{
		path: "/admin",
		name: "Admin",
		meta: {
			title: "管理",
			icon: "logo"
		},
		component: Layout,
		children: [
			{
				path: "/role",
				name: "Role",
				meta: {
					title: "角色管理",
					icon: "logos"
				},
				component: () => import("../views/admin/Role.vue")
			},
			{
				path: "/user",
				name: "User",
				meta: {
					title: "用户管理",
					icon: "logos"
				},
				component: () => import("../views/admin/User.vue")
			}
		]
	},
	{
		path: "/news",
		name: "News",
		meta: {
			title: "信息管理",
			icon: "logo"
		},
		component: Layout,
		children: [
			{
				path: "/message",
				name: "Message",
				meta: {
					title: "信息管理",
					icon: "logos"
				},
				component: () => import("../views/news/Index.vue")
			}
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
