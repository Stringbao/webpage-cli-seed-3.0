import BaseView from "@model/core/View.js";
import ViewFactory from "@factory/ViewFactory.js";
import Shipping from "@model/subModels/shipping/Shipping.js";

export default class ShippingView extends BaseView{
    constructor(){
        // this._el = $("div.shipping");

        this._shipping = new Shipping();
    }

    init(data){

        this._addressView = new ViewFactory().create(CONSTANT.TYPES.ADDRESS, {device:$engine._device});
        this._deliveryView = new ViewFactory().create(CONSTANT.TYPES.DELIVERY, {device:$engine._device});

        this._addressView.init(data.address, this._shipping);
        this._deliveryView.init(data.delivery, this._shipping);
    }
}

