<template>
	<a-layout id="layout-main">
		<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
			<LayoutAside />
		</a-layout-sider>
		<a-layout>
			<a-layout-header style="background: #fff; padding: 0">
				<LayoutHeader />
			</a-layout-header>
			<a-layout-content
				:style="{
					margin: '24px 16px',
					padding: '24px',
					background: '#fff',
					minHeight: '280px'
				}"
			>
				<LayoutMain />
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script>
import {
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import LayoutAside from "./components/Aside.vue";
import LayoutHeader from "./components/Header.vue";
import LayoutMain from "./components/Main.vue";

export default defineComponent({
	name: "Layout",
	components: {
		LayoutAside,
		LayoutHeader,
		LayoutMain,
		UserOutlined,
		VideoCameraOutlined,
		UploadOutlined,
		MenuUnfoldOutlined,
		MenuFoldOutlined
	},
	setup() {
		return {
			selectedKeys: ref(["1"]),
			collapsed: ref(false)
		};
	}
});
</script>

<style lang="scss">
#layout-main {
	height: 100vh;
}

#layout-main .trigger {
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color 0.3s;
}

#layout-main .trigger:hover {
	color: #1890ff;
}

#layout-main .logo {
	height: 32px;
	background: rgba(255, 255, 255, 0.3);
	margin: 16px;
}

.site-layout .site-layout-background {
	background: #fff;
}
</style>