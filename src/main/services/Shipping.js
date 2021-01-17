
class ShippingService{
    constructor(){
        this._name = CONSTANT.TYPES.SHIPPING;
    }

    setShippingData(model){
        let tmp = flash_fe_core_tool.$customer_events.on("shippingChanged");
        tmp.setValue(model._data);
    }
}

export default new ShippingService();