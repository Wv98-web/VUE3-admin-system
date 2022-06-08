<template>
	<div id="header">
		<a-button type="primary" style="margin-bottom: 16px" @click="handlerButton">
			<MenuUnfoldOutlined v-if="collapsed" />
			<MenuFoldOutlined v-else />
		</a-button>
		<div class="header-menu">
			<a-dropdown>
				<a class="ant-dropdown-link" @click.prevent>
					<a-avatar style="color: #f56a00; background-color: #fde3cf"
						>U</a-avatar
					>
				</a>
				<template #overlay>
					<a-menu>
						<a-menu-item key="0">
							<div class="menu-item">17764473485</div>
						</a-menu-item>
						<a-menu-divider />
						<a-menu-item key="1">
							<div class="menu-item menu-lang">
								<span
									v-for="item in data.lang"
									:key="item.value"
									@click="toggleLang(item.value)"
									:class="{ current: data.lang_current == item.value }"
								>
									{{ item.label }}
								</span>
							</div>
						</a-menu-item>
						<a-menu-divider />
						<a-menu-item key="2">
							<a href="javascript:;">
								<div class="menu-item">{{ $t("header_menu.logout") }}</div>
							</a>
						</a-menu-item>
					</a-menu>
				</template>
			</a-dropdown>
		</div>
	</div>
</template>

<script>
import { reactive, getCurrentInstance } from "vue";
import { useI18n } from "vue-i18n";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";

export default {
	name: "LayoutHeader",
	components: {
		MenuFoldOutlined,
		MenuUnfoldOutlined
	},
	setup() {
		const { locale } = useI18n({ useScope: "global" });
		const { emit } = getCurrentInstance();

		const data = reactive({
			lang: [
				{
					label: "中文",
					value: "cn"
				},
				{
					label: "英文",
					value: "en"
				}
			],
			lang_current: "cn"
		});

		const toggleLang = (lang) => {
			locale.value = lang;
			data.lang_current = lang;
		};

		const handlerButton = () => {
			emit("handlerCollapsed", { collapsed: true });
		};

		return {
			data,
			toggleLang,
			handlerButton
		};
	}
};
</script>

<style lang="scss" scoped>
#header {
	padding: 0 24px;
	height: 64px;
}
.header-menu {
	float: right;
}

.menu-item {
	padding: 5px 20px;
	font-size: 14px;
	color: #333333;
}
.menu-lang {
	color: #aeaeae;
	span {
		margin-right: 10px;
	}
	.current {
		color: #333333;
	}
}
</style>