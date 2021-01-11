
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

    init(data = {}){
        this._email.value = data._email;
        this._firstName.value = data._firstName;
        this._lastName.value = data._lastName;
        this._password.value = data._password;
        this._confirmPassword.value = data._confirmPassword;
        this._isSubscriber = data._isSubscriber;
        this._rewardsSignup = data._rewardsSignup;
        this._validateAjax.showError = false;
        this._validateAjax.errorMsg = "";
    }
}