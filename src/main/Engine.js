
//创建viewModel & Model
//Engine 负责 视图的展示切换，视图调用Services来完成业务逻辑
//在完成这个业务逻辑的时候会创建多个model，也会返回多个model 
//model的目的是体现业务概念（最终形式是体现为业务数据）

//业务全部交给Services去处理，Service去创建Model

//viewModel只有在view层面不好处理的情况下，才会创建viewModel

//services不允许直接调用view

import RegisterService from "@modelServices/Register.js";

export default class Engine{
    constructor(){
        this._servicesMap = {};

        this._currentView = null;
        this._currentPopupViews = [];

        this.registerServices();
    }

    registerService(serviceName, services){
        this._servicesMap[serviceName] = services;
    }

    getService(serviceName){
        return this._servicesMap[serviceName];
    }

    removePopupView(){
        
    }

    popup(view){
        view.init();
        this._currentPopupViews.push(view);
    }

    registerServices(){
        this.registerService(RegisterService.getName(), new RegisterService());
    }

    show(view){
        if(view._status == CONSTANT.VIEW.STATUS.READY){
            view.init();
        }
    }
}