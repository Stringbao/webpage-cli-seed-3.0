
import BaseView from "@model/core/View.js";
import CheckoutModel from "@model/Checkout.js";
import CheckoutService from "@businessServices/Checkout.js";
import ViewFactory from "@factory/ViewFactory.js";

export default class CheckoutView extends BaseView{
    constructor(){
        super();

        this._shippingView = new ViewFactory().create(CONSTANT.TYPES.SHIPPING, {device:$engine._device});
        this._paymentView = new ViewFactory().create(CONSTANT.TYPES.PAYMENT, {device:$engine._device});
        this._reviewView = new ViewFactory().create(CONSTANT.TYPES.REVIEW, {device:$engine._device});
        this._priceView = new ViewFactory().create(CONSTANT.TYPES.PRICE, {device:$engine._device});
        this._cardIdView = new ViewFactory().create(CONSTANT.TYPES.CARDID, {device:$engine._device});
        this._orderSummaryView = new ViewFactory().create(CONSTANT.TYPES.ORDER_SUMMARY, {device:$engine._device});
        this._placeOrderView = new ViewFactory().create(CONSTANT.TYPES.PLACE_ORDER, {device:$engine._device});
        this._quoteView = new ViewFactory().create(CONSTANT.TYPES.QUOTE, {device:$engine._device});
        this._signUpView = new ViewFactory().create(CONSTANT.TYPES.SIGN_UP, {device:$engine._device});
    }
    
    init(){
        CheckoutService.getMainData().then(x=>{
            // this._model = new CheckoutModel(x);
            // this._model._shipping.init(x.shipping);

            this._shippingView.init(x.shipping);

            this._model._price.init(x.price);
            this._model._cardInfo.init(x.cardId);
        }).catch(err=>{
            
        })
    }
}