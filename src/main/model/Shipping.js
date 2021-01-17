
import BaseModel from "@model/core/Model.js";

export default class Shipping extends BaseModel{
    constructor(){
        this._address = null;
        this._delivery = null;
    }

    init(data = {}){

    }
}