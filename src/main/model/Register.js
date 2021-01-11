
import BaseModel from "@model/core/model.js";

export default class Register extends BaseModel{
    constructor(){
        super();
        
        this._email = {
            value:"",
            validate:false,
            errClass:""
        };
        this._firstName = {
            value:"",
            validate:false,
            errClass:""
        };
        this._lastName = {
            value:"",
            validate:false,
            errClass:""
        };
        this._password = {
            value:"",
            step1:{
                validate:false,
                errClass:""
            },
            step2:{
                validate:false,
                errClass:""
            }
        };
        this._confirmPassword = {
            value:"",
            validate:false,
            errClass:""
        };
        this._isSubscriber = false;
        this._isAgreePrivacy = false;
        this._rewardsSignup = false;
        this._recaptchaResponse = "";

        this._validateAjax = {
            showError:false,
            errorMsg:""
        };
    }

    validateEmail(){
        this._email.validate = flash_fe_core_tool.$validate.email(this._email.value);
        this._email.errClass = this._email.validate?"register-input":"register-input errorStatus";
    }

    validateFirstName(){
        this._firstName.validate = !flash_fe_core_tool.$validate.isEmpty(this._firstName.value);
        this._firstName.errClass = this._firstName.validate?"register-input":"register-input errorStatus";
    }

    validateLastName(){
        this._lastName.validate = !flash_fe_core_tool.$validate.isEmpty(this._lastName.value);
        this._lastName.errClass = this._lastName.validate?"register-input":"register-input errorStatus";
    }

    validatePassword(){
        this._password.step1.validate = flash_fe_core_tool.$validate.password.vlength(this._password.value);
        this._password.step2.validate = flash_fe_core_tool.$validate.password.vstr(this._password.value);
        this._password.step1.errClass = this._password.step1.validate?"clearfix correctMsg":"clearfix errortMsg";
        this._password.step2.errClass = this._password.step2.validate?"clearfix correctMsg":"clearfix errortMsg";
    }

    validateConfirmPassword(){
        this._confirmPassword.validate = this._password.value == this._confirmPassword.value?true:false;
        this._confirmPassword.errClass = this._confirmPassword.validate?"register-input":"register-input errorStatus";
    }

    init(data = {}){
        this._email.value = data._email;
        this._firstName.value = data._firstName;
        this._lastName.value = data._lastName;
        this._password.value = data._password;
        this._confirmPassword.value = data._confirmPassword;
        this._isSubscriber = data._isSubscriber;
        this._isAgreePrivacy = data._isAgreePrivacy;
        this._rewardsSignup = data._rewardsSignup;
    }
}