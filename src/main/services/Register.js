
class RegisterService{
    constructor(){
        this._name = CONSTANT.SERVICE_NAME.REGISTER;
    }

    getName(){
        return this._name;
    }

    resetRegister(model){
        model.reset();
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

export default new RegisterService();