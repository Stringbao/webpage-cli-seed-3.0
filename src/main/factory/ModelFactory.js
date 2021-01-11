import Register from "@model/Register.js";
import Factory from "./Factory";

export default class PromotionFactory extends Factory {
    constructor(){
        super();
    }
}

PromotionFactory.prototype[CONSTANT.MODEL_TYPES.REGISTER.TYPE] = function(data){
    let _register = new Register();
    _register.init(data);
    return _register;
}