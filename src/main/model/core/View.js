export default class BaseView{
    constructor(){
        this._el = null;

        //是否启用当前视图
        this._enabled = true;

        //0: 隐藏
        //1: 显示
        //2: 卸载
        this._status = CONSTANT.VIEW.STATUS.SHOW;
        //USUALLY: 常规视图
        //POPUP: popup 视图
        this._type = CONSTANT.VIEW.TYPES.USUALLY;
    }

    //设置视图状态
    //CONSTANT.VIEW.STATUS.READY;
    //CONSTANT.VIEW.STATUS.USING;
    //CONSTANT.VIEW.STATUS.UNINSTALL;
    setViewStatus(status){
        this._status = status;
    }

    show(){
        this._el && this._el.show();
    }

    hide(){
        this._el && this._el.hide();
    }

    destory(){
        this.unRegisterEvent();
        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(x=>{
            this[x] = null;
        })
        for(let i in this){
            this[i] = null;
        }
    }

    render(){
        
    }

    eventBus(registerContainer, callback){
        let eventNams = ["click", "blur", "input", "change"];
        let temp = registerContainer?registerContainer:this._el;
        eventNams.forEach(eventName=>{
            let tmp = "le" + eventName;
            temp && temp.find("["+tmp+"]").each((index, item)=>{
                let eventHandlerName = $(item).attr(tmp);
                (function(dom, eventHandlerName){
                    callback && callback(dom, eventName, eventHandlerName);
                })(item, eventHandlerName);
            })
        })
    }

    unRegisterEvent(registerContainer){
        this.eventBus(registerContainer, (dom, eventName)=>{
            $(dom).off(eventName);
        })
    }

    registerEvent(registerContainer){
        let that = this;
        this.eventBus(registerContainer, (dom, eventName, eventHandlerName)=>{
            console.log($(dom), that);
            $(dom).off(eventName).on(eventName, function(){
                that._eventCenter[eventHandlerName](this, {view:that})
            });
        })
    }
}

const Helper = {
    createExistAttribute(dom){
        $(dom).attr("data-dom-exist-id",UTIL.$idSeed.newId());
    },
    checkeExistAttribute(dom){
        return $(dom).attr("data-dom-exist-id") === undefined?false:true;
    }
}