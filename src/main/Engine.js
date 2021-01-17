
//创建viewModel & Model
//Engine 负责 视图的展示切换，视图调用Services来完成业务逻辑
//在完成这个业务逻辑的时候会创建多个model，也会返回多个model 
//model的目的是体现业务概念（最终形式是体现为业务数据）

//业务全部交给Services去处理，Service去创建Model

//viewModel只有在view层面不好处理的情况下，才会创建viewModel

//services不允许直接调用view

import ViewFactory from "@factory/ViewFactory.js";

class Engine{
    constructor(){
        this._device = -1;

        this._currentMainView = null;
        
        window.$engine = this;
    }

    popup(view){
        view.init();
    }

    show(view){
        if(view._status == CONSTANT.VIEW.STATUS.SHOW){
            this._currentMainView = view;
            view.init();
        }
    }

    init(device){
        this._device = device;
        this._currentMainView = new ViewFactory().create(CONSTANT.TYPES.CHECKOUT, {device:this._device});
        this.show(this._currentMainView);
    }
}

export default new Engine();