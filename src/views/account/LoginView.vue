<template>
	<div class="account">
		<div class="form-wrap">
			<a-form
				:model="formState"
				name="login"
				@finish="onFinish"
				@finishFailed="onFinishFailed"
			>
				<a-form-item
					name="username"
					:rules="[{ required: true, message: 'Please input your username!' }]"
				>
					<label class="color-white">用户名</label>
					<a-input v-model:value="formState.username" />
				</a-form-item>

				<a-form-item
					name="password"
					:rules="[{ required: true, message: 'Please input your password!' }]"
				>
					<label class="color-white">密码</label>
					<a-input-password v-model:value="formState.password" />
				</a-form-item>

				<a-form-item>
					<Captcha />
				</a-form-item>

				<a-form-item>
					<a-button type="primary" html-type="submit" block>登录</a-button>
				</a-form-item>

				<div class="color-white tc fs-12">
					<router-link to="/forget" class="color-white">忘记密码</router-link> |
					<router-link to="/register" class="color-white">注册</router-link>
				</div>
			</a-form>
		</div>
	</div>
</template>

<script>
import { defineComponent, onMounted, reactive } from "vue";
import Captcha from "../../components/Captcha";

export default defineComponent({
	name: "LoginView",
	components: { Captcha },
	setup(props) {
		const formState = reactive({
			username: "",
			password: ""
		});

		const onFinish = (values) => {
			console.log("Success:", values);
		};

		const onFinishFailed = (errorInfo) => {
			console.log("Failed:", errorInfo);
		};

		onMounted(() => {});

		return {
			formState,
			onFinish,
			onFinishFailed
		};
	}
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
