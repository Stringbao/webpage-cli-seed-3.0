import Factory from "./Factory";

//如果 PC mobile  tablet公用一套view，只需在声明的时候指向一个view即可

/*********************  PC *********************************/
import CheckoutPC from "@vpc/Checkout.js";

/*********************  Wap *********************************/
import CheckoutMobile from "@vmobile/mCheckout.js";

/********************* tablet *********************************/
import CheckoutTablet from "@vtablet/tCheckout.js";

const createViewByType = (pcType, mobileType, tabletType, data) => {
    let obj = new pcType();
    switch(data.device){
        case flash_fe_core_tool.$CONSTANT.TERMINAL.MOBILE:
            obj = new mobileType();
            break;
        case flash_fe_core_tool.$CONSTANT.TERMINAL.TABLET:
            obj = new tabletType();
            break;
    }
    return obj;
}

export default class ViewFactory extends Factory{
    constructor(){
        super();
    }
}

ViewFactory.prototype[CONSTANT.TYPES.CHECKOUT] = (data)=>{
    return createViewByType(CheckoutPC, CheckoutMobile, CheckoutTablet, data);
}