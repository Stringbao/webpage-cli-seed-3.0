import BaseView from "@model/core/View.js";
import ViewFactory from "@factory/ViewFactory.js";
import Shipping from "@model/Shipping.js";

export default class ShippingView extends BaseView{
    constructor(){
        // this._el = $("div.shipping");

        this._shipping = new Shipping();
    }

    init(data){

        this._shippingAddressView = new ViewFactory().create(CONSTANT.TYPES.ADDRESS, {device:$engine._device});
        this._shippingDeliveryView = new ViewFactory().create(CONSTANT.TYPES.DELIVERY, {device:$engine._device});

        this._shippingAddressView.init(data.address, this._shipping);
        this._shippingDeliveryView.init(data.delivery, this._shipping);
    }
}

