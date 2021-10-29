import Vue from "vue";

let dateFormat = function(date, format, isCn) {
	if (date == null || date == '') {
		return null;
	}
	if (!(date instanceof Date)) {
		date = new Date(date);
	}

	let setZero = function(num) {
		if (num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}
	let year = date.getFullYear();
	let month = setZero(date.getMonth() + 1);
	let day = setZero(date.getDate());
	let hours = setZero(date.getHours());
	let minutes = setZero(date.getMinutes());
	let seconds = setZero(date.getSeconds());


	if (isCn) {
		if (!!format && format.trim() == 'YYYY-MM-DD HH:mm:ss') {
			return `${year}年${month}月${day}日 ${hours}时${minutes}分${seconds}秒`
		} else if (!!format && format.trim() == 'YYYY-MM-DD HH:mm') {
			return `${year}年${month}月${day}日 ${hours}时${minutes}分`
		} else {
			return `${year}年${month}月${day}日`
		}
	} else {
		if (!!format && format.trim() == 'YYYY-MM-DD HH:mm:ss') {
			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
		} else if (!!format && format.trim() == 'YYYY-MM-DD HH:mm') {
			return `${year}-${month}-${day} ${hours}:${minutes}`
		} else {
			return `${year}-${month}-${day}`
		}
	}



}


export default dateFormat;


const module = {
	install(Vue) {
		Vue.mixin({
			methods: {
				dateFormat,

			},

		})
	}
}

Vue.use(module);
