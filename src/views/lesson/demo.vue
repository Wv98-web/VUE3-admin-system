<!-- https://www.apple.com.cn/home/promos/watch-series-8/images/promo_apple_watch_series_8__ch7rexplmihe_large.jpg -->
<template>
	<div class="list-container">
		<ul class="tab-menu">
			<li
				:class="{active:current == item.value}"
				v-for="item in data.tab_menu"
				:key="item.value"
				@click="changeCurrent(item)"
			>{{item.name}}</li>
		</ul>

		<ul class="good-lists">
			<figure
				v-for="item in data.good_lists"
				:key="item.id"
			>
				<span
					v-if="item.type"
					:style="{'background-color':
					flag[item.type].color}"
				>{{flag[item.type].txt}}</span>
				<img
					:src="item.src"
					:alt="item.title"
				/>
				<figcaption>{{item.title}}</figcaption>
			</figure>
		</ul>
	</div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
	name: 'demo',
	setup() {
		const flag = reactive({
			1: {
				txt: 'hot',
				color: 'red'
			},
			2: {
				txt: 'new',
				color: 'green'
			},
			3: {
				txt: 'no',
				color: 'blue'
			}
		});
		const data = reactive({
			tab_menu: [
				{ name: '手表', value: 'watch' },
				{ name: '手机', value: 'phone' }
			],
			watch: [
				{
					id: '1',
					title: 'watch1',
					src: 'https://www.apple.com.cn/home/promos/watch-series-8/images/promo_apple_watch_series_8__ch7rexplmihe_large.jpg',
					type: '1'
				},
				{
					id: '2',
					title: 'watch2',
					src: 'https://www.apple.com.cn/home/promos/watch-series-8/images/promo_apple_watch_series_8__ch7rexplmihe_large.jpg',
					type: '2'
				},
				{
					id: '3',
					title: 'watch3',
					src: 'https://www.apple.com.cn/home/promos/watch-series-8/images/promo_apple_watch_series_8__ch7rexplmihe_large.jpg',
					type: '3'
				}
			],
			phone: [
				{
					id: '1',
					title: 'phone1',
					src: 'https://www.apple.com.cn/home/promos/watch-series-8/images/promo_apple_watch_series_8__ch7rexplmihe_large.jpg',
					type: '3'
				},
				{
					id: '2',
					title: 'phone2',
					src: 'https://www.apple.com.cn/home/promos/watch-series-8/images/promo_apple_watch_series_8__ch7rexplmihe_large.jpg',
					type: '2'
				}
			],
			good_lists: []
		});
		const current = ref('watch');
		const changeCurrent = (item) => {
			current.value = item.value;
			data.good_lists = data[item.value];
		};

		changeCurrent(data.tab_menu[0]);

		return { data, current, changeCurrent, flag };
	}
};
</script>

<style scoped>
ul {
	list-style: none;
	display: flex;
	justify-content: center;
}

.tab-menu li {
	margin: 0 20px;
	width: 100px;
	height: 20px;
}

.tab-menu li.active {
	background-color: #000;
	color: #fff;
}

.good-lists img {
	width: 200px;
}

.good-lists figure {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0 20px;
	position: relative;
}

.good-lists figure span {
	position: absolute;
	width: 100px;
	height: 20px;
	top: 0;
	right: 0;
}
</style>