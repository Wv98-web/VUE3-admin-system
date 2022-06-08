let regPhone =
	/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
let regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
let regCode = /^[A-Za-z0-9]{6}$/;
let regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;

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
export function checkCode(value) {
	return regCode.test(value);
}

/**
 * 密码验证
 * @param {*} value
 */
export function checkPassword(value) {
	return regPassword.test(value);
}

/**
 * 判断是否为外部资源
 */
export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path);
}
