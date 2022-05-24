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
          <div id="captcha-dom" class="nc-container"></div>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>

        <div class="color-white tc fs-12">
          <a href="#" class="color-white">忘记密码</a> |
          <a href="#" class="color-white">登录</a>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from "vue";
import "./captcha.js";

export default defineComponent({
  name: "LoginView",
  setup(props) {
    const formState = reactive({
      username: "",
      password: "",
    });

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    onMounted(() => {
      var nc_token = [
        "FFFF0N00000000009931",
        (new Date()).getTime(),
        Math.random()
      ].join(":");
      var NC_Opt = {
        renderTo: "#captcha-dom",
        appkey: "FFFF0N00000000009931",
        scene: "nc_login",
        token: nc_token,
        customWidth: 300,
        trans: {"key1":"code0"},
        elementID: ["usernameID"],
        is_Opt: 0,
        language: "cn",
        isEnabled: true,
        timeout: 3000,
        times: 5,
        apimap: {
          // 'analyze':'//a.com/nocaptcha/analyze.jsonp',
          // 'get_captcha': '//b.com/get_captcha/ver3',
          // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3',
          // 'get_img': '//c.com/get_img',
          // 'checkcode': '//d.com/captcha/checkcode.jsonp',
          // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
          // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
          // 'umid_serUrl': 'https://g.com/service/um.json'
        },
        callback: function (data) {
          window.console && console.log(nc_token);
          window.console && console.log(data.csessionid);
          window.console && console.log(data.sig);
        }
      };
      var nc = new noCaptcha(NC_Opt);
      nc.upLang('cn', {
        _startTEXT: "请按住滑块，拖动到最右边",
        _yesTEXT: "验证通过",
        _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
        _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\"点击刷新</a>"
      });
    });

    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>

<style lang="scss">
@import "./style.scss";
</style>
