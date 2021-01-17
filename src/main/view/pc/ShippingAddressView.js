import BaseView from "@model/core/View.js";
import Address from "@model/subModels/shipping/Address.js";
import ShippingServices from "@businessServices/Shipping.js";

export default class ShippingAddressView extends BaseView{
    constructor(){
        this._model = new Address();
    }

    init(data, shippingModel){
        shippingModel._shippingAddress = this._model;
        this._model.init(data);
        ShippingServices.setShippingData(this._model);
    }
}

