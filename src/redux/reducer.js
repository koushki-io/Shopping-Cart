export const ProductReducer=(state={products:[],loading:false,error:''},action)=>{
   switch (action.type) {
       case 'GET-PRODUCTS-REQUEST':
        return {...state,loading:true,error:false}
        case 'GET-PRODUCTS-SUCCES':
        return {...state,products:action.payload,loading:false,error:false}
        case 'GET-PRODUCTS-ERROR':
        return {...state,error:action.payload,loading:false,}                                                                                                                                                                    
        
       default:
        return state
           
   }

}

export const cartReducer=(state=[],action)=>{
   switch (action.type) {
      case 'cart':
         return [...state,action.payload]
         case 'remove':
            return [...state]
         case 'plus':
            return action.payload
            case 'minus':
               return action.payload
               case "CartRemove":
                  return action.payload
      default:
        return state
   }  




}

export const signupReducr=(state={up:[],loading:false,error:''},action)=>{
   switch (action.type) {
      case 'GET-SIGNUP-REQUES':
         return{...state,loading:true ,error:false}
         case "GET-SIGNUP-SUCCES":
            return{...state,up:action.payload,error:false,loading:false}
            case 'GET-SIGNUP-ERORE':
               return{...state,loading:false,error:action.payload}
            case 'GET-LOGOUT':
               return{...state,loading:false,error:''}

               
       
   
      default:
       return state
   }

}


export const loginReducer=(state={login:{},loading:false,error:''},action)=>{
   switch (action.type) {
      case 'GET-LOGIN-REQUEST':
         return{...state,loading:true,error:false}
         case "GET-LOGIN-SUCCES":
            return{...state,loading:false,login:action.payload,error:false}
            case 'GET-LOGIN-ERROR':
               return{...state,loading:false,error:action.payload}
            case 'GET-LOGOUT':
               return {login:{},loading:false,error:''}

       
   
      default:
       return state
   }

}

export const addresReducer=(state={},action)=>{

   switch (action.type) {
      case "Address":
         return action.payload
         
      
   
      default:
       return state
   }

}


export const orderReducer=(state={order:[],loading:false,error:''},action)=>{
   switch (action.type) {
      case 'GET-ORDERS-REQUEST':
         return{...state,loading:true ,error:false}
         case "GET-ORDERS-SUCCES":
            return{...state,loading:false,order:action.payload,error:false}
            case 'GET-ORDERS-ERORE':
               return{...state,loading:false,error:action.payload}
       
   
      default:
       return state
   }

}
export const modloginReducer=(state=false,action)=>{

   switch (action.type) {
      case "true":
         return action.payload
       
      default:
        return  state
   }

}

export const changeReducer=(state=0,action)=>{

   switch (action.type) {
      case "CHANGACTION":
         return action.payload
       
      default:
        return  state
   }

}





