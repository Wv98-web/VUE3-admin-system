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
					<a-row :gutter="16" align="middle">
						<a-col :span="14">
							<a-input
								size="large"
								v-model:value="formState.captcha"
								autocomplete="off"
							/>
						</a-col>
						<a-col :span="10">
							<a-button
								type="primary"
								block
								:loading="button_loading"
								:disabled="button_disable"
								@click="getCode"
							>
								{{ button_text }}
							</a-button>
						</a-col>
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
import { message } from "ant-design-vue";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import Captcha from "@/components/Captcha";
import { checkPhone, checkPassword, checkCode } from "@/utils/verification";

export default defineComponent({
	name: "LoginView",
	components: { Captcha },
	data() {
		return {};
	},
	setup(props) {
		const formRef = ref();

		const formState = reactive({
			username: "",
			password: "",
			checkPass: "",
			captcha: ""
		});

		const dataItem = reactive({
			button_text: "获取验证码",
			button_loading: false,
			button_disable: false,
			sec: 60,
			timer: null
		});
		const data = toRefs(dataItem);

		let validateUsername = async (_rule, value) => {
			if (!value) {
				return Promise.reject("请输入用户名");
			} else {
				if (!checkPhone(value)) {
					return Promise.reject("请输入11位数字手机号");
				}

				return Promise.resolve();
			}
		};

		let validatePass = async (_rule, value) => {
			if (!value) {
				return Promise.reject("请输入密码");
			} else {
				if (!checkPassword(value)) {
					return Promise.reject("请输入6-20位的，数字+英文");
				}

				if (formState.checkPass !== "") {
					formRef.value.validateFields("checkPass");
				}

				return Promise.resolve();
			}
		};

		let validatePass2 = async (_rule, value) => {
			if (!value) {
				return Promise.reject("请再次输入密码");
			} else if (value !== formState.password) {
				return Promise.reject("两次输入密码不同!");
			} else {
				return Promise.resolve();
			}
		};

		let validateCode = async (_rule, value) => {
			if (!value) {
				return Promise.reject("请输入验证码");
			} else {
				if (!checkCode(value)) {
					return Promise.reject("请输入正确的验证码");
				}

				return Promise.resolve();
			}
		};

		const rules = {
			username: [
				{ required: true, validator: validateUsername, trigger: "change" }
			],
			password: [
				{
					required: true,
					validator: validatePass,
					trigger: "change"
				}
			],
			checkPass: [
				{
					required: true,
					validator: validatePass2,
					trigger: "change"
				}
			],
			captcha: [
				{
					required: true,
					validator: validateCode,
					trigger: "change"
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

		const getCode = () => {
			if (!formState.username) {
				message.error("用户名不能为空");
				return false;
			}

			dataItem.timer && clearInterval(dataItem.timer);
			dataItem.timer = setInterval(() => {
				const s = dataItem.sec--;
				dataItem.button_text = `${s}秒`;
				dataItem.button_disable = true;
				if (s <= 0) {
					clearInterval(dataItem.timer);
					dataItem.button_text = `重新获取`;
					dataItem.button_disable = false;
				}
			}, 1000);
		};

		onMounted(() => {});

		return {
			...data,
			formState,
			formRef,
			rules,
			handleFinish,
			handleFinishFailed,
			resetForm,
			handleValidate,
			getCode
		};
	}
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
