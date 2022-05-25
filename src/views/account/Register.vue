<template>
	<div class="account">
		<div class="form-wrap">
			<a-form
				ref="formRef"
				name="register"
				:model="formState"
				:rules="rules"
				v-bind="layout"
				@finish="handleFinish"
				@validate="handleValidate"
				@finishFailed="handleFinishFailed"
			>
				<a-form-item name="username">
					<label class="color-white">用户名</label>
					<a-input v-model:value="formState.username" autocomplete="off" />
				</a-form-item>

				<a-form-item name="password">
					<label class="color-white">密码</label>
					<a-input-password
						v-model:value="formState.password"
						autocomplete="off"
					/>
				</a-form-item>

				<a-form-item name="checkPass">
					<label class="color-white">确认密码</label>
					<a-input-password
						v-model:value="formState.checkPass"
						autocomplete="off"
					/>
				</a-form-item>

				<a-form-item name="captcha">
					<label class="color-white">验证码</label>
					<a-row>
						<a-col :span="14">
							<a-input
								size="large"
								v-model:value="formState.captcha"
								autocomplete="off"
							/>
						</a-col>
						<a-col :span="10"
							><a-button type="danger" block>获取验证码</a-button></a-col
						>
					</a-row>
				</a-form-item>

				<a-form-item>
					<Captcha />
				</a-form-item>

				<a-form-item>
					<a-button type="primary" html-type="submit" block>注册</a-button>
				</a-form-item>

				<div class="color-white tc fs-12">
					已有账号点击<router-link to="/login">登录</router-link>
				</div>
			</a-form>
		</div>
	</div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import Captcha from "@/components/Captcha";
import { checkPhone } from "@/utils/verification";

export default defineComponent({
	name: "LoginView",
	components: { Captcha },
	setup(props) {
		const formRef = ref();

		const formState = reactive({
			username: "",
			password: "",
			checkPass: "",
			captcha: ""
		});

		let validateUsername = async (_rule, value) => {
			if (value === "") {
				return Promise.reject("请输入用户名");
			} else {
				if (!checkPhone(value)) {
					return Promise.reject("请输入11位数字手机号");
				}

				return Promise.resolve();
			}
		};

		let validatePass = async (_rule, value) => {
			if (value === "") {
				return Promise.reject("请输入密码");
			} else {
				if (formState.checkPass !== "") {
					formRef.value.validateFields("checkPass");
				}

				return Promise.resolve();
			}
		};

		let validatePass2 = async (_rule, value) => {
			if (value === "") {
				return Promise.reject("请再次输入密码");
			} else if (value !== formState.password) {
				return Promise.reject("两次输入密码不同!");
			} else {
				return Promise.resolve();
			}
		};

		const rules = {
			username: [{ required: true, validator: validateUsername }],
			password: [
				{
					required: true,
					validator: validatePass,
					trigger: "change"
				}
			],
			checkPass: [
				{
					validator: validatePass2,
					trigger: "change"
				}
			],
			captcha: [
				{
					required: true,
					message: "请输入验证码"
				}
			]
		};

		const handleFinish = (values) => {
			console.log(values, formState);
		};

		const handleFinishFailed = (errors) => {
			console.log(errors);
		};

		const resetForm = () => {
			formRef.value.resetFields();
		};

		const handleValidate = (...args) => {
			console.log(args);
		};

		onMounted(() => {});

		return {
			formState,
			formRef,
			rules,
			handleFinish,
			handleFinishFailed,
			resetForm,
			handleValidate
		};
	}
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
