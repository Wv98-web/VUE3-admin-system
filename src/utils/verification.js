let regPhone =
	/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
let regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
let regMix = /^[A-Za-z0-9]+$/;

/**
 * 手机号验证
 * @param {*} value
 * @returns
 */
export function checkPhone(value) {
	return regPhone.test(value);
}

/**
 * 邮箱验证
 * @param {*} value email
 */
export function checkEmail(value) {
	return regEmail.test(value);
}

/**
 * 数字+字母验证
 * @param {*} value
 */
export function checkMix(value) {
	return regMix.test(value);
}
