export default class BaseView{
    constructor(model){
        this._el = null;
        this._model = model;

        //0: 准备就绪
        //1: 使用中
        //3: 卸载
        this._status = CONSTANT.VIEW.STATUS.READY;
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

    eventBus(callback){
        let eventNams = ["click", "blur", "input"];
        eventNams.forEach(ename=>{
            let tmp = "le" + ename;
            this._el && this._el.find("["+tmp+"]").each((index, item)=>{
                let eventHandlerName = $(item).attr(tmp);
                (function(dom, eventHandlerName){
                    callback && callback(dom, ename, eventHandlerName);
                })(item, eventHandlerName);
            })
        })
    }

    unRegisterEvent(){
        this.eventBus((dom, ename, eventHandlerName)=>{
            $(dom).off(ename);
        })
    }

    registerEvent(){
        let that = this;
        this.eventBus((dom, ename, eventHandlerName)=>{
            $(dom).off(ename).on(ename, function(){
                that._eventCenter[eventHandlerName](this, {view:that})
            });
        })
    }
}