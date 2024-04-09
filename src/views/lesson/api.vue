<template>
	<header>
		VUE3 API
	</header>
	<section style="padding: 30px">
		<div>
			v-text：<span v-text="text"></span>
		</div>
		<div>
			v-html：<span v-html="html"></span>
		</div>
		<div>
			v-show：<span v-show="compareNum()">{{num}}</span>
		</div>
		<div>
			v-if：<span v-if="flag">{{text}}</span>
			<button @click="changeStatus()">{{ flag ? "隐藏": "显示" }}</button>
		</div>
		<div>
			v-for：
			<ul>
				<li
					v-for="(item, index) in data.arr"
					:key="index"
				>
					{{item.name}}-{{item.age}}-{{index}}
				</li>
			</ul>
			<ul>
				<li
					v-for="(value, key, index) in data.arr[0]"
					:key="index"
				>
					{{key}}-{{value}}-{{index}}
				</li>
			</ul>
		</div>
		<div>
			v-bind：<span v-bind:class="{red: isRed}">红色</span> <br />
			v-on：
			<button
				v-on:click="changeColor()"
				ref="btnDom"
				:data-aa.prop="123"
			>切换颜色</button>
		</div>
		<div>
			v-model：
			<span>{{ select_key }}</span>
			<select v-model="select_key">
				<option value="1">西瓜</option>
				<option value="2">苹果</option>
				<option value="3">香蕉</option>
			</select>
		</div>

		<div>
			typescript
			{{ message }}
		</div>
	</section>
</template>

<script>
import { ref, reactive, onMounted, defineComponent } from 'vue';
export default defineComponent({
	name: 'Lesson',
	setup(props) {
		const text = ref('这是一段文本');
		const html = ref('<span>这是一个dom元素</span>');
		const num = 11;
		const compareNum = () => {
			if (num > 10) {
				return true;
			} else {
				return false;
			}
		};
		const flag = ref(true);
		const changeStatus = () => {
			flag.value = !flag.value;
		};
		const data = reactive({
			arr: [
				{ name: '张三', age: '20' },
				{ name: '李四', age: '23' }
			]
		});
		const isRed = ref(true);
		const changeColor = () => {
			isRed.value = !isRed.value;
		};
		const btnDom = ref(null);
		const select_key = ref('2');

		onMounted(() => {
			console.log(btnDom.value['data-aa'], 'data');
		});

		return {
			text,
			html,
			num,
			compareNum,
			flag,
			changeStatus,
			data,
			isRed,
			changeColor,
			btnDom,
			select_key
		};
	}
});
</script>

<style>
.red {
	color: red;
}
</style>