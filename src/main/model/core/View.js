
import Constant from "@constant/index.js";

export default class BaseView{
    constructor(model){
        this._el = null;
        this._model = model;

        //0: 准备就绪
        //1: 使用中
        //3: 卸载
        this._status = Constant.VIEW.STATUS.READY;
        //USUALLY: 常规视图
        //POPUP: popup 视图
        this._type = Constant.VIEW.TYPES.USUALLY;
    }

    //设置为就绪状态
    setReadyStatus(){
        this._status = Constant.VIEW.STATUS.READY;
    }

    //设置状态为使用中
    setUsingStatus(){
        this._status = Constant.VIEW.STATUS.USING;
    }

    //设置视图状态为卸载状态
    setUninstallStatu(){
        this._status = Constant.VIEW.STATUS.UNINSTALL;
    }

    render(){
        
    }

    registerEvent(){
        let that = this;
        let eventNams = ["click", "blur", "input"];
        eventNams.forEach(ename=>{
            let tmp = "le" + ename;
            this._el && this._el.find("["+tmp+"]").each((index, item)=>{
                let eventHandlerName = $(item).attr(tmp);
                (function(dom, eventHandlerName){
                    $(dom).off(ename).on(ename, function(){
                        that._eventCenter[eventHandlerName](this, {view:that})
                    });
                })(item, eventHandlerName);
            })
        })
    }
}