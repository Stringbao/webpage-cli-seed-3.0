
import BaseView from "@model/core/View.js";
import ModelFactory from "@factory/ModelFactory.js";
import Intercept from "@observer/Intercept.js";
import RegisterService from "@businessServices/Register.js";
import Helper from "@helper/Register.js";

export default class RegisterPCView extends BaseView{
    constructor(container){
        super(container);

        this._eventCenter = null;
        this._el = $(container);
        this._model = new ModelFactory().create(CONSTANT.MODEL_TYPES.REGISTER.TYPE, {});
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

        this._eventCenter = new RegisterEvent();
        this.setViewStatus(CONSTANT.VIEW.STATUS.USING);
    }
}

class RegisterEvent{
    doRegister(sender, data){
        let view = data.view;
        let model = view._model;
        Helper.validata(model).then(x=>{
            RegisterService.doRegister(model).then(xx=>{
            }).catch(err=>{
                model.reset();
                model._validateAjax.showError = true;
                model._validateAjax.errorMsg = err.msg;
                grecaptcha.reset();
                $(document).scrollTop(0);
            })
        }).catch(err=>{
            view.destory();
            $(document).scrollTop(0);
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
        Helper.validateEmail(data.view._model);
        this.notNone(sender);
    }

    blurFName(sender, data){
        Helper.validateFirstName(data.view._model);
        this.notNone(sender);
    }

    blurLName(sender, data){
        Helper.validateLastName(data.view._model);
        this.notNone(sender);
    }

    inputPwd(sender, data){
        Helper.validatePassword(data.view._model);
        this.notNone(sender);
    }

    blurCPwd(sender, data){
        Helper.validateConfirmPassword(data.view._model);
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