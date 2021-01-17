
import BaseModel from "@model/core/model.js";
import Shipping from "@model/core/subModels/Shipping.js";
import Payment from "@model/core/subModels/Payment.js";
import Review from "@model/core/subModels/Review.js";
import Price from "@model/core/subModels/Price.js";
import PlaceOrder from "@model/core/subModels/PlaceOrder.js";
import OrderSummary from "@model/core/subModels/OrderSummary.js";
import SignUp from "@model/core/subModels/SignUp.js";
import Quote from "@model/core/subModels/Quote.js";
import CardInfo from "@model/core/subModels/CardInfo.js";

export default class Checkout extends BaseModel{
    constructor(){
        super();

        this._shipping = new Shipping();
        this._payment = new Payment();
        this._review = new Review();
        this._price = new Price();
        this._placeOrder = new PlaceOrder();
        this._orderSummary = new OrderSummary();
        this._signUp = new SignUp();
        this._Quote = new Quote();
        this._cardInfo = new CardInfo();
    }

    init(data = {}){
        
    }
}