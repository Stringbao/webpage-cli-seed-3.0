import BaseModel from "@model/core/Model.js";

export default class ShippingDelivery extends BaseModel{
    constructor(){
        this._deliveryList = [];
    }

    init(data = {}){
        this._deliveryList = data;
    }
}