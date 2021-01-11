
const Helper = {
    validata(model){
        let count = 0;
        let errorKeys = [];
        return new Promise((resolve, reject)=>{
            this.validateEmail(model);
            this.validateFirstName(model);
            this.validateLastName(model);
            this.validatePassword(model);
            this.validateConfirmPassword(model);
            if(!model._email.validate){
                count++;
                errorKeys.push("_email");
            }
            if(!model._firstName.validate){
                count++;
                errorKeys.push("_firstName");
            }
            if(!model._lastName.validate){
                count++;
                errorKeys.push("_lastName");
            }
            if(!model._password.step1.validate || !model._password.step2.validate){
                count++;
                errorKeys.push("_password");
            }
            if(!model._confirmPassword.validate){
                count++;
                errorKeys.push("_confirmPassword");
            }
            if(!model._recaptchaResponse){
                count++;
                errorKeys.push("_recaptchaResponse");
            }
            if(count>0){
                reject(errorKeys);
            }else{
                resolve();
            }
        })
    },
    validateEmail(model){
        model._email.validate = flash_fe_core_tool.$validate.email(model._email.value);
        model._email.errClass = model._email.validate?"register-input":"register-input errorStatus";
    },
    validateFirstName(model){
        model._firstName.validate = !flash_fe_core_tool.$validate.isEmpty(model._firstName.value);
        model._firstName.errClass = model._firstName.validate?"register-input":"register-input errorStatus";
    },
    validateLastName(model){
        model._lastName.validate = !flash_fe_core_tool.$validate.isEmpty(model._lastName.value);
        model._lastName.errClass = model._lastName.validate?"register-input":"register-input errorStatus";
    },
    validatePassword(model){
        model._password.step1.validate = flash_fe_core_tool.$validate.password.vlength(model._password.value);
        model._password.step2.validate = flash_fe_core_tool.$validate.password.vstr(model._password.value);
        model._password.step1.errClass = model._password.step1.validate?"clearfix correctMsg":"clearfix errortMsg";
        model._password.step2.errClass = model._password.step2.validate?"clearfix correctMsg":"clearfix errortMsg";
    },
    validateConfirmPassword(model){
        model._confirmPassword.validate = model._password.value == model._confirmPassword.value?true:false;
        model._confirmPassword.errClass = model._confirmPassword.validate?"register-input":"register-input errorStatus";
    }
}

export default Helper;