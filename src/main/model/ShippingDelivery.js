import BaseModel from "@model/core/Model.js";

export default class Delivery extends BaseModel{
    constructor(){
        this._deliveryList = [];
    }

    init(data = {}){
        this._deliveryList = data;
    }
}