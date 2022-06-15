<template>
	<!-- 显示项目内部的svg -->
	<svg class="svg-icon" :class="className" aria-hidden="true">
		<use :xlink:href="'#icon-' + iconName"></use>
		<!-- <use :xlink:href="iconName" /> -->
	</svg>
</template>

<script>
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