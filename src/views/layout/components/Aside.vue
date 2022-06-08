<template>
	<div class="logo">
		<img :src="logo" alt="logo" />
	</div>
	<a-menu
		v-model:openKeys="openKeys"
		v-model:selectedKeys="selectedKeys"
		mode="inline"
		theme="dark"
		:inline-collapsed="collapsed"
		@click="selectMenu"
		@openChange="openMenu"
	>
		<template v-for="item in routers">
			<template v-if="!item.hidden">
				<a-menu-item :key="item.path" v-if="!item.children">
					<router-link :to="item.path">
						<svg-icon
							v-if="item.meta && item.meta.icon"
							:iconName="item.meta && item.meta.icon"
							className="aside-svg"
						></svg-icon>
						{{ item.meta && item.meta.title }}
					</router-link>
				</a-menu-item>
				<a-sub-menu :key="item.path" v-else>
					<template #title>
						<svg-icon
							v-if="item.meta && item.meta.icon"
							:iconName="item.meta && item.meta.icon"
							className="aside-svg"
						></svg-icon>
						{{ item.meta && item.meta.title }}</template
					>
					<template v-if="item.children.length">
						<a-menu-item :key="child.path" v-for="child in item.children">
							<router-link :to="child.path">
								<svg-icon
									v-if="child.meta && child.meta.icon"
									:iconName="child.meta && child.meta.icon"
									className="aside-svg"
								></svg-icon>
								{{ child.meta && child.meta.title }}
							</router-link>
						</a-menu-item>
					</template>
				</a-sub-menu>
			</template>
		</template>
	</a-menu>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
	name: "LayoutAside",
	setup() {
		const { options } = useRouter();
		const routers = options.routes;

		const state = reactive({
			collapsed: false,
			selectedKeys: localStorage.getItem("selectedKeys")
				? [localStorage.getItem("selectedKeys")]
				: ["/index"],
			openKeys: localStorage.getItem("openKeys")
				? [localStorage.getItem("openKeys")]
				: [],
			preOpenKeys: ["/admin"],
			logo: require("@/assets/goutou.png")
		});
		watch(
			() => state.openKeys,
			(_val, oldVal) => {
				state.preOpenKeys = oldVal;
			}
		);

		const toggleCollapsed = () => {
			state.collapsed = !state.collapsed;
			state.openKeys = state.collapsed ? [] : state.preOpenKeys;
		};

		const selectMenu = ({ item, key, keyPath }) => {
			state.selectedKeys = [key];
			localStorage.setItem("selectedKeys", key);
		};

		const openMenu = (openKeys) => {
			state.openKeys = openKeys;
			localStorage.setItem("openKeys", openKeys);
		};

		return { ...toRefs(state), toggleCollapsed, routers, selectMenu, openMenu };
	}
});
</script>

<style lang="scss" scoped>
</style>