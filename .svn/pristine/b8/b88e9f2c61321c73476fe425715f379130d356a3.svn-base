let checkSpace = (rule, value, callback) => {
   let reg = /\s/;
   let len = value.toString().split(reg).length;
   if (len > 1) {
      callback("不支持空白");
   } else {
      callback();
   }
}

let checkChinese = (rule, value, callback) => {
   let reg = /[\u4e00-\u9fa5]/;
   if (reg.test(value)) {
      callback("不支持中文");
   } else {
      callback();
   }
}

let checkPhone = (rule, value, callback) => {
   let reg = /^1[3456789]\d{9}$/;
   if (!(reg.test(value))) {
      callback("手机号码格式有误");
   } else {
      callback();
   }
}

let checkLinePhone = (rule, value, callback) => {
   let reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
   if (!(reg.test(value))) {
      callback("固定电话格式有误");
   } else {
      callback();
   }
}

let checkLinePhoneAndPhone = (rule, value, callback) => {
   let reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
   let reg2 = /^1[3456789]\d{9}$/;
   if (!(reg.test(value)) && !(reg2.test(value))) {
      callback("号码格式有误");
   } else {
      callback();
   }
}

let checkEmail = (rule, value, callback) => {
   let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
   if (!(reg.test(value))) {
      callback("邮箱格式有误");
   } else {
      callback();
   }
}

function setNumber(config) {
   let checkNumber = (rule, value, callback) => {
      if (value == 0) {
         return callback(new Error(`不能为0`))
      }
      if(config.max==0){
         return callback(new Error(`上限为0`))
      }
      if (!config) {
         return callback();
      }
      if (config.min != undefined  && value < config.min) {
         callback(new Error(`范围：${config.min}~${config.max}`))
      }
      if (config.max != undefined && value > config.max) {
         callback(new Error(`范围：${config.min}~${config.max}`))
      }
      return callback();
   }
   return checkNumber;
}




let validateInput = (config) => {
   if (!config || typeof config == "string") {
      let name = config || '';
      return [
         { required: true, whitespace: true, message: `${name}非空`, trigger: 'blur' },
         // { max: 20, message: '长度上限为20' },
         { validator: checkSpace }
      ]
   } else {
      console.error('validateInput参数错误');
      return [];

   }

}


let validatePwd = (config) => {
   if (!config || typeof config == "string") {
      let name = config || '';
      return [
         { required: true, whitespace: true, message: `${name}非空`, trigger: 'blur' },
         // { max: 20, message: '长度上限为20' },
         { validator: checkSpace },
         { validator: checkChinese },
      ]
   } else {
      console.error('validateInput参数错误');
      return [];

   }

}

let validateTextarea = (config) => {
   if (!config || typeof config == "string") {
      let name = config || '';
      return [
         { required: true, whitespace: true, message: `${name}非空`, trigger: 'blur' },
         // { max: 500, message: '长度上限为500' },
      ]
   } else {
      console.error('validateTextarea参数错误');
      return [];
   }
}

let validateOther = (config) => {
   if (!config || typeof config == "string") {
      let name = config || '';
      return [
         { required: true, message: `${name}非空` },
      ]
   } else {
      console.error('validateSelect参数错误');
      return [];
   }
}

let validateNumber = (config) => {
   if (!config || typeof config == "string") {
      let name = config || '';
      return [
         { required: true, message: `${name}非空` },
         { validator: setNumber(config) },
      ]
   } else if (typeof config == "object") {
      let name = config.name;
      return [
         { required: true, message: `${name}非空` },
         { validator: setNumber(config) },
      ]
   } else {
      console.error('validateSelect参数错误');
      return [];
   }
}


let validatePhone = (config) => {
   return [
      ...validateInput(config),
      { validator: checkLinePhoneAndPhone, trigger: 'blur' }
   ]

}

let validateLinePhone = (config) => {
   return [
      ...validateInput(config),
      { validator: checkLinePhone, trigger: 'blur' }
   ]

}

let validateEmail = (config) => {
   return [
      ...validateInput(config),
      { validator: checkEmail, trigger: 'blur' }
   ]

}

const validate = {
   checkSpace, checkPhone, checkLinePhone,
   validateInput, validateTextarea, validateOther,
   validatePhone, validateLinePhone, validateEmail, validatePwd, validateNumber
}

export default {
   install(app, options) {
      app.mixin({
         methods: {
            ...validate,
            clearValidate(name) {
               if (this.$refs[name]) {
                  this.$refs[name].clearValidate();
               }
            }
         },
         computed: {
            $empty() {
               return '';
            },
         }

      })
   }
}