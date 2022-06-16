<template>
	<div class="logo">
		<img v-if="!collapsed" :src="logo" alt="logo" />
		<img v-else :src="logo" alt="logo123" />
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
				<!-- 一级菜单 -->
				<a-menu-item :key="item.path" v-if="hasOnlyChildren(item)">
					<template #icon>
						<router-link :to="item.path">
							<svg-icon
								v-if="item.meta && item.meta.icon"
								:iconName="item.meta && item.meta.icon"
								className="aside-svg"
							>
							</svg-icon>
						</router-link>
					</template>
					<router-link :to="item.children[0].path">
						{{ item.children[0].meta && item.children[0].meta.title }}
					</router-link>
				</a-menu-item>

				<!-- 二级菜单 -->
				<a-sub-menu :key="item.path" v-else>
					<template #icon>
						<svg-icon
							v-if="item.meta && item.meta.icon"
							:iconName="item.meta && item.meta.icon"
							className="aside-svg"
						></svg-icon>
					</template>
					<template #title>
						{{ item.meta && item.meta.title }}
					</template>
					<template v-if="item.children.length">
						<template :key="child.path" v-for="child in item.children">
							<a-menu-item :key="child.path" v-if="!child.hidden">
								<template #icon>
									<svg-icon
										v-if="child.meta && child.meta.icon"
										:iconName="child.meta && child.meta.icon"
										className="aside-svg"
									></svg-icon>
								</template>
								<router-link :to="child.path">
									{{ child.meta && child.meta.title }}
								</router-link>
							</a-menu-item>
						</template>
					</template>
				</a-sub-menu>
			</template>
		</template>
	</a-menu>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "LayoutAside",
	props: {
		collapsed: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const { options } = useRouter();
		const routers = options.routes;

		const state = reactive({
			selectedKeys: localStorage.getItem("selectedKeys")
				? [localStorage.getItem("selectedKeys")]
				: ["/index"],
			openKeys: localStorage.getItem("openKeys")
				? JSON.parse(localStorage.getItem("openKeys"))
				: [],
			logo: require("@/assets/goutou.png"),
			logo_min: require("@/assets/goutou.png")
		});

		const selectMenu = ({ item, key, keyPath }) => {
			state.selectedKeys = [key];
			localStorage.setItem("selectedKeys", key);
		};

		const openMenu = (openKeys) => {
			const arr = openKeys;
			state.openKeys = arr;
			localStorage.setItem("openKeys", JSON.stringify(arr));
		};

		const hasOnlyChildren = (data) => {
			if (!data.children) {
				return false;
			}
			const routers = data.children.filter((item) => {
				return item.hidden ? false : true;
			});
			if (routers.length === 1) {
				return true;
			}
			return false;
		};

		return { ...toRefs(state), routers, selectMenu, openMenu, hasOnlyChildren };
	}
});
</script>

<style lang="scss" scoped>
</style>