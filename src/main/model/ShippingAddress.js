import BaseModel from "@model/core/Model.js";

export default class Address extends BaseModel{
    constructor(){
        this._data = null;
    }

    notice(){
        
    }

    init(data){
        this._data = data;
        this.notice();
    }
}

