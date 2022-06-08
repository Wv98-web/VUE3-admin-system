<template>
	<!-- 显示外部传入的svg -->
	<div
		v-if="isExternal"
		:style="styleExternalIcon"
		class="svg-external-icon svg-icon"
		:class="className"
	/>
	<!-- 显示项目内部的svg -->
	<svg v-else class="svg-icon" :class="className" aria-hidden="true">
		<use :xlink:href="'#icon-' + iconName"></use>
		<!-- <use :xlink:href="iconName" /> -->
	</svg>
</template>

<script>
import { isExternal } from "../../utils/verification";

export default {
	name: "SvgIcon",
	props: {
		iconName: {
			type: String,
			// required: true,
			default: ""
		},
		className: {
			type: String,
			default: ""
		}
	}
	// computed: {
	// 	/**
	// 	 * 判断是否为外部图标
	// 	 */
	// 	isExternal() {
	// 		return isExternal(this.iconName);
	// 	},
	// 	/**
	// 	 * 外部图标样式
	// 	 */
	// 	styleExternalIcon() {
	// 		return {
	// 			mask: `url(${this.iconName}) no-repeat 50% 50%`,
	// 			"-webkit-mask": `url(${this.iconName}) no-repeat 50% 50%`
	// 		};
	// 	},
	// 	/**
	// 	 * 项目内图标
	// 	 */
	// 	iconName() {
	// 		return `#icon-${this.iconName}`;
	// 	}
	// }
};
</script>

<style lang="scss">
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	color: #ffffff;
}
.svg-external-icon {
	background-color: currentColor;
	mask-size: cover !important;
	display: inline-block;
}
</style>