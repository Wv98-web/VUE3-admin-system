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
		path: "/",
		hidden: true
	},
	{
		path: "/index",
		name: "Index",
		meta: {
			title: "首页",
			icon: "logo"
		},
		component: Layout,
		children: [
			{
				path: "/index",
				name: "Index",
				meta: {
					title: "首页",
					icon: "logo"
				},
				component: () => import("../views/home/HomeView.vue")
			}
		]
	},
	{
		path: "/lesson",
		name: "Lesson",
		meta: {
			title: "课程学习",
			icon: "logo"
		},
		component: Layout,
		children: [
			{
				path: "/api",
				name: "api",
				meta: {
					title: "api",
					icon: "logo"
				},
				component: () => import("../views/lesson/api.vue")
			},
			{
				path: "/demo",
				name: "demo",
				meta: {
					title: "demo",
					icon: "logo"
				},
				component: () => import("../views/lesson/demo.vue")
			}
		]
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
				component: () => import("../views/admin/Role.vue"),
				children: [
					{
						path: "/aaa",
						name: "aaa",
						meta: {
							title: "aaa",
							icon: "logos"
						},
						component: () => import("../views/admin/Role.vue")
					},
					{
						path: "/bbb",
						name: "bbb",
						meta: {
							title: "bbb",
							icon: "logos"
						},
						component: () => import("../views/admin/User.vue")
					}
				]
			},
			{
				path: "/user",
				name: "User",
				meta: {
					title: "用户管理",
					icon: "logos"
				},
				component: () => import("../views/admin/User.vue")
			},
			{
				path: "/user",
				name: "User",
				hidden: true,
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
				path: "/news",
				name: "News",
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
