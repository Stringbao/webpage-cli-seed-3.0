import BaseView from "@model/core/View.js";
import Delivery from "@model/subModels/shipping/Delivery.js";

export default class DeliveryView extends BaseView{
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
        shippingModel._delivery = this._model;
        this._model.init(data);
        this.render();
    }
}

