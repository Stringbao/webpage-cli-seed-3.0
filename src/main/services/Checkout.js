
class CheckoutService{
    constructor(){
        this._name = CONSTANT.TYPES.PAYMENT;
    }

    getMainData(){

    }

    setProgressIndex(index){
        let tmp = flash_fe_core_tool.$customer_events.on("indexChanged");
        tmp.setIndex(index);
    }
}

export default new CheckoutService();