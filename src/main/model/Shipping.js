
import BaseModel from "@model/core/Model.js";

export default class Shipping extends BaseModel{
    constructor(){
        this._shippingAddress = null;
        this._shippingDelivery = null;
    }

    init(data = {}){

    }
}