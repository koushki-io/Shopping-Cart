
import { createStore,combineReducers,applyMiddleware } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from "redux-thunk";
import { ProductReducer } from "./reducer";
import { cartReducer,changeReducer,modloginReducer,loginReducer,signupReducr,addresReducer,orderReducer } from "./reducer";

const reducerc=combineReducers({
  getProduct:ProductReducer,
  getCart:cartReducer,
    getSign:signupReducr,
    getLogin:loginReducer,
    getAddres:addresReducer,
   getOrders:orderReducer,
   getShow:modloginReducer,
   getChange:changeReducer,
  


})

const Data=localStorage.getItem("Login") ? JSON.parse(localStorage.getItem("Login")) :{}
const Cart=localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) :[]
const Adres=localStorage.getItem("Adres") ? JSON.parse(localStorage.getItem("Adres")) :[]
const change=localStorage.getItem("change") ? JSON.parse(localStorage.getItem("change")) :0

const initialState={
   getLogin:{login:Data,loading:false,error:''},
   getCart:Cart,
   getAddres:Adres,
   getChange:change,


  
}
const middleware=[thunk]
export const store = createStore(reducerc,initialState,composeWithDevTools(applyMiddleware(...middleware)))






