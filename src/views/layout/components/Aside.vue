<template>
	<div class="logo" />
	<a-menu
		v-model:openKeys="openKeys"
		v-model:selectedKeys="selectedKeys"
		mode="inline"
		theme="dark"
		:inline-collapsed="collapsed"
	>
		<template v-for="item in routers">
			<template v-if="!item.hidden">
				<a-menu-item :key="item.path" v-if="!item.children">
					<span>{{ item.meta && item.meta.title }}</span>
				</a-menu-item>
				<a-sub-menu :key="item.path" v-else>
					<template #title>{{ item.meta && item.meta.title }}</template>
					<template v-if="item.children.length">
						<a-menu-item :key="child.path" v-for="child in item.children">
							<span>{{ child.meta && child.meta.title }}</span>
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

export default {
	name: "LayoutAside",
	setup() {
		const { options } = useRouter();
		const routers = options.routes;

		const state = reactive({
			collapsed: false,
			selectedKeys: ["/index"],
			openKeys: ["/admin"],
			preOpenKeys: ["/admin"]
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

		return { ...toRefs(state), toggleCollapsed, routers };
	}
};
</script>

<style lang="scss" scoped>
</style>