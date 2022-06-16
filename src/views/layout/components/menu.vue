<template>
	<a-sub-menu>
		<template #icon>
			<svg-icon
				v-if="menu.meta && menu.meta.icon"
				:iconName="menu.meta && menu.meta.icon"
				className="aside-svg"
			></svg-icon>
		</template>
		<template #title>
			{{ menu.meta && menu.meta.title }}
		</template>
		<!-- 子级 -->
		<template v-if="menu.children.length">
			<template :key="item.path" v-for="item in menu.children">
				<template v-if="!item.hidden">
					<a-menu-item :key="item.path" v-if="!item.children">
						<template #icon>
							<svg-icon
								v-if="item.meta && item.meta.icon"
								:iconName="item.meta && item.meta.icon"
								className="aside-svg"
							></svg-icon>
						</template>
						<router-link :to="item.path">
							{{ item.meta && item.meta.title }}
						</router-link>
					</a-menu-item>

					<Menu v-else :menu="item" :key="item.path" />
				</template>
			</template>
		</template>
	</a-sub-menu>
</template>

<script>
export default {
	props: {
		menu: {
			type: Object,
			default: {}
		}
	},
	setup() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
</style>