import BaseView from "@model/core/View.js";
import Address from "@model/subModels/shipping/Address.js";
import ShippingServices from "@businessServices/Shipping.js";

export default class ShippingAddressView extends BaseView{
    constructor(){
        this._model = new Address();

        this._shippingAddressObject = flash_fe_core_tool.$customer_events.on("shipping");
    }

    notice(){

    }

    init(data, shippingModel){
        this._model.init(data);
        shippingModel._shippingAddress = this._model;
        this._shippingAddressObject.setValue(this._model.data);
        ShippingServices.setShippingData(this._model);
    }
}

