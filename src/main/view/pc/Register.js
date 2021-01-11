
import BaseView from "@model/core/View.js";
import ModelFactory from "@factory/ModelFactory.js";
import Constant from "@constant/index.js";
import Intercept from "@observer/Intercept.js";

export default class RegisterPCView extends BaseView{
    constructor(container){
        super(container);

        this._eventCenter = new RegisterEvent();

        this._el = $(container);

        this._model = new ModelFactory().create(Constant.MODEL_TYPES.REGISTER.TYPE, {});
    }

    interceptList() {
        let arr = [
            {dom:this._emailEl, obj:this._model._email, key:"value"},
            {dom:this._firstNameEl, obj:this._model._firstName, key:"value"},
            {dom:this._lastNameEl, obj:this._model._lastName, key:"value"},
            {dom:this._passwordEl, obj:this._model._password, key:"value"},
            {dom:this._confirmPasswordEl, obj:this._model._confirmPassword,key:"value"},

            {dom:this._emailEl.parents('div.register-input'), obj:this._model._email, key:"errClass", ctype:flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.CLASS},
            {dom:this._firstNameEl.parents('div.register-input'), obj:this._model._firstName, key:"errClass", ctype:flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.CLASS},
            {dom:this._lastNameEl.parents('div.register-input'), obj:this._model._lastName, key:"errClass", ctype:flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.CLASS},
            {dom:$('li[ptag=step1]'), obj:this._model._password.step1, key:"errClass", ctype:flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.CLASS},
            {dom:$('li[ptag=step2]'), obj:this._model._password.step2, key:"errClass", ctype:flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.CLASS},
            {dom:this._confirmPasswordEl.parents('div.register-input'), obj:this._model._confirmPassword, key:"errClass", ctype:flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.CLASS},
        
            {dom:$($(".button-button-structure")[1]), obj:this._model, key:"_isAgreePrivacy", ctype:flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.DISABLED},
            {dom:this._isSubscriberEl, obj:this._model, key:"_isSubscriber", ctype:flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.CHECKED},
            {dom:this._rewardsSignupEl, obj:this._model, key:"_rewardsSignup", ctype:flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.CHECKED},

            {dom:$(".tip_box"), obj:this._model._validateAjax, key:"showError", ctype:flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.SHOW},
            {dom:$(".tip_box .tip_text"), obj:this._model._validateAjax, key:"errorMsg"},
        ];
        arr.forEach(x=>{
            new Intercept({
                doms:x.dom,
                obj:x.obj,
                key:x.key,
                ctype:x.ctype
            }).execute();
        })
    }

    setElements(){
        this._emailEl = this._el.find("#uEmail");
        this._firstNameEl = this._el.find("#uFname");
        this._lastNameEl = this._el.find("#uLname");
        this._passwordEl = this._el.find("#upwd");
        this._confirmPasswordEl = this._el.find("#cpwd");
        this._isSubscriberEl = this._el.find(".subscriber_checkbox");
        this._rewardsSignupEl = this._el.find(".rewardsSignup_checkbox");
        this._isAgreePrivacyEl = this._el.find(".agreePrivacy_checkbox");
    }

    init(){
        this.setElements();
        this.interceptList();
        this.registerEvent();

        this.setUsingStatus();
    }
}

class RegisterEvent{
    //doRegister
    doRegister(sender, data){
        let view = data.view;
        let model = view._model;
        let params = {
            _email:view._emailEl.val(),
            _firstName:view._firstNameEl.val(),
            _lastName:view._lastNameEl.val(),
            _password:view._passwordEl.val(),
            _confirmPassword:view._confirmPasswordEl.val(),
            _isSubscriber:view._isSubscriberEl.get(0).checked,
            _rewardsSignup:view._rewardsSignupEl.get(0).checked,
            _isAgreePrivacy:view._isAgreePrivacyEl.get(0).checked,
            _recaptchaResponse:grecaptcha.getResponse()
        }

        // model.init(params);

        let service = $engine.getService(CONSTANT.SERVICE_NAME.REGISTER);
        debugger
        service.validata(model).then(x=>{
            service.doRegister(model).then(xx=>{
                debugger
            }).catch(err=>{
                debugger
                model._validateAjax.showError = true;
                model._validateAjax.errorMsg = err.msg;
                grecaptcha.reset();
            })
        }).catch(err=>{
            debugger
            grecaptcha.reset();
        })
    }

    accepted(sender, data){
        data.view._model._isAgreePrivacy = sender.checked;
    }

    emailSignup(sender, data){
        data.view._model._isSubscriber = sender.checked;
    }

    rewards(sender, data){        
        data.view._model._rewardsSignup = sender.checked;
    }

    notNone(el){
        $(el).val()?$(el).next(".label").addClass("notnone"):$(el).next(".label").removeClass("notnone");
    }

    blurEmail(sender, data){
        data.view._model.validateEmail();
        this.notNone(sender);
    }

    blurFName(sender, data){
        data.view._model.validateFirstName();
        this.notNone(sender);
    }

    blurLName(sender, data){
        data.view._model.validateLastName();
        this.notNone(sender);
    }

    inputPwd(sender, data){
        data.view._model.validatePassword();
        this.notNone(sender);
    }

    blurCPwd(sender, data){
        data.view._model.validateConfirmPassword();
        this.notNone(sender);
    }

    showPassword(e){
        if( $("#upwd").attr('type') == 'text'){
            $("#upwd").attr('type','password');
            $(e).addClass("tyepIsPsd");
        }else{
            $("#upwd").attr('type','text');
            $(e).removeClass("tyepIsPsd");
        }
    }
    
    showConfirmPassword(e){    
        if( $("#cpwd").attr('type') == 'text'){
            $("#cpwd").attr('type','password');
            $(e).addClass("tyepIsPsd");
        }else{
            $("#cpwd").attr('type','text');
            $(e).removeClass("tyepIsPsd");
        }
    }
}