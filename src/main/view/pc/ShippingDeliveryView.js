import BaseView from "@model/core/View.js";
import Delivery from "@model/subModels/shipping/Delivery.js";

export default class ShippingDeliveryView extends BaseView{
    constructor(){
        this._model = new Delivery();

        this._el = $("div.delivery");
    }

    render(){
        let html = "";
        this._model._data.forEach(x => {
            html += "";
        });

        this._el.html($(html));
    }

    init(data, shippingModel){
        this._model.init(data);
        shippingModel._shippingDelivery = this._model;
        this.render();
    }
}

