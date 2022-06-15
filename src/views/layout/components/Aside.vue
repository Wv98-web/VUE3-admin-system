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
				<a-menu-item :key="item.path" v-if="!item.children">
					<router-link :to="item.path">
						<span class="anticon">
							<svg-icon
								v-if="item.meta && item.meta.icon"
								:iconName="item.meta && item.meta.icon"
								className="aside-svg"
							>
							</svg-icon>
						</span>
						<span>{{ item.meta && item.meta.title }}</span>
					</router-link>
				</a-menu-item>
				<a-sub-menu :key="item.path" v-else>
					<template #title>
						<span class="anticon">
							<svg-icon
								v-if="item.meta && item.meta.icon"
								:iconName="item.meta && item.meta.icon"
								className="aside-svg"
							></svg-icon>
						</span>
						<span>
							{{ item.meta && item.meta.title }}
						</span>
					</template>
					<template v-if="item.children.length">
						<a-menu-item :key="child.path" v-for="child in item.children">
							<router-link :to="child.path">
								<span class="anticon">
									<svg-icon
										v-if="child.meta && child.meta.icon"
										:iconName="child.meta && child.meta.icon"
										className="aside-svg"
									></svg-icon>
								</span>
								<span>
									{{ child.meta && child.meta.title }}
								</span>
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

		return { ...toRefs(state), routers, selectMenu, openMenu };
	}
});
</script>

<style lang="scss" scoped>
</style>