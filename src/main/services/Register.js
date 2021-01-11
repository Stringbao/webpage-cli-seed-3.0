
class RegisterService{
    static getName(){
        return CONSTANT.SERVICE_NAME.REGISTER;
    }

    constructor(){
        
    }

    validata(model){
        let count = 0;
        let errorKeys = [];
        return new Promise((resolve, reject)=>{
            model.validateEmail();
            model.validateFirstName();
            model.validateLastName();
            model.validatePassword();
            model.validateConfirmPassword();
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
    }

    doRegister(model){
        let params = {
            email:model._email.value,
            firstName:model._firstName.value,
            lastName:model._lastName.value,
            password:model._password.value,
            isSubscriber:model._isSubscriber,
            isRewardsSignup:model._rewardsSignup,
            recaptchaResponse:model._recaptchaResponse,
            returnUrl:flash_fe_core_tool.$util.$cookie.setCookie("fromRegister")
        }
        return API.doRegister(params).then(x=>{
            flash_fe_core_tool.$util.$cookie.setCookie("registerEmail",model._email.value);
            return Promise.resolve(x);
        }).catch(err=>{
            return Promise.reject(err);
        })
    }
}

// $engine.registerService(RegisterService.getName(), new RegisterService());

export default RegisterService;