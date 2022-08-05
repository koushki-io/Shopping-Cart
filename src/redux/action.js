
import axios from "axios"


export const ProductAction=()=>async(dispatch,getstate)=>{
  dispatch({type:'GET-PRODUCTS-REQUEST'})
  
            try {
              const {data}=await axios.get('/api/products/')
              
         
             
              dispatch({type:'GET-PRODUCTS-SUCCES', payload:[...data]})

            } catch (error) {
              console.log(error.message);
              dispatch({type:'GET-PRODUCTS-ERROR', payload:error.message})

              
            }          
          
}
 export const RemoveAction=(index)=>(dispatch,getstate)=>{
   const remove =getstate().getCart
   remove.splice(index,1)
   dispatch({type:"remove", payload:remove})
   localStorage.setItem("Cart",JSON.stringify(getstate().getCart))
  
 }

export const  CartAction=(product,notify)=>(dispatch,getstate)=>{
 const myarry=getstate().getCart
 const res=myarry.find(item=>item.product===product.product)
 const mamam ={...res}
 if(!(product.product===mamam.product)){
  dispatch({type:'cart' , payload:product})
  localStorage.setItem("Cart",JSON.stringify(getstate().getCart))

 }else{
  notify("error","Available in cart")
 }

 
;

}
export const CartActionRemove=()=>(dispatch,getstate)=>{
  localStorage.removeItem("Cart")
  const remove =getstate().getCart
   remove.splice(0,remove.length)
  dispatch({type:"CartRemove",payload:remove})
  console.log(remove);
}

  export const plusAction=(index)=>(dispatch,getstate)=>{
    const qty =getstate().getCart
    const countInStock =getstate().getCart[index].countInStock
    const number=getstate().getCart[index].qty
      
    if(countInStock>0){
      qty[index].countInStock = qty[index].countInStock -1
      qty[index].qty = qty[index].qty + 1
      dispatch({type:"plus",payload:qty})
      localStorage.setItem("Cart",JSON.stringify(getstate().getCart))
    }

  }

  export const minusAction=(index)=>(dispatch,getstate)=>{
    const qty =getstate().getCart
    const countInStock =getstate().getCart[index].countInStock
    
    const number=getstate().getCart[index].qty
    
    if(number>1){
      qty[index].countInStock = qty[index].countInStock + 1
      qty[index].qty = qty[index].qty - 1
      dispatch({type:"minus",payload:qty})
      localStorage.setItem("Cart",JSON.stringify(getstate().getCart))
     
    }else if(number==1){
      const remove =getstate().getCart
      remove.splice(index,1)
      dispatch({type:"remove", payload:remove})
      localStorage.setItem("Cart",JSON.stringify(getstate().getCart))
      
    }

  }
  export const signUpAction=(name,email,pass,navigate,setsign,setsignup,notify)=>async(dispatch)=>{

    dispatch({type:'GET-SIGNUP-REQUES'})
    try {
    const {data}=await axios.post(`/api/users`,{name:name,email:email,password:pass})
    console.log(data);
    console.log(name,email,pass);
    notify("success","signup is successFully")
    dispatch({type:"GET-LOGIN-SUCCES", payload:data})

    localStorage.setItem("Login",JSON.stringify(data))
      localStorage.setItem("password",JSON.stringify(pass))
    setsign((l)=>l+1)
    
      navigate('/')
      setsignup(false)
      
    
   

    } catch (error) {
            if(error.request.status===400){

              dispatch({type:"GET-SIGNUP-ERORE", payload:"Email already registered"})
            }else{
              dispatch({type:"GET-SIGNUP-ERORE", payload:error.message})

            }
      
      
      
    }
            
    


  }

  export const LoginAction=(email,pass,navigate,notify)=>async(dispatch)=>{
    dispatch({type:"GET-LOGIN-REQUEST"})
   
   
    try {
      const {data}=await axios.post(`api/users/login`,{email:email,password:pass})
      dispatch({type:"GET-LOGIN-SUCCES", payload:data})
      localStorage.setItem("Login",JSON.stringify(data))
      localStorage.setItem("password",JSON.stringify(pass))
      dispatch(modloginAction(false))
      notify("success","Login is successFully")
      navigate('/')
      
 

    
      
    } catch (error) {

      if(error.request.status===401){

        dispatch({type:"GET-LOGIN-ERROR", payload:"Invalid email or password"})
      }else{
        dispatch({type:"GET-LOGIN-ERROR", payload:error.message})

      }
    }

  }


  export const addresAction=(adres,city,postalCod,phone)=>(dispatch)=>{
      const Address={address:adres,city:city,postalCode:postalCod,phone:phone}
      localStorage.setItem("Adres",JSON.stringify(Address))
     
    dispatch({type:"Address",payload:Address})

  }

export  const editeAction=(pass,notify,setshow,setloading,setshowsetting,setinput,settouched)=>async(dispatch,getstate)=>{
  const {login}=getstate().getLogin
  dispatch({type:"GET-LOGIN-REQUEST"})
  setloading(true)
  try {
    const {data}=await axios.put(`/api/users/profile`,{name:login.name ,email:login.email,password:pass},{ headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${login.token}`,
    }} )

    dispatch({type:"GET-LOGIN-SUCCES", payload:data})
    setloading(false)
    localStorage.setItem("password",JSON.stringify(pass))
      localStorage.setItem("Login",JSON.stringify(data))
      setshow(false)
      setinput({
        password:"",
        confirmPassword:"",
      })
      settouched({
        password:false,
        confirmPassword:false,
      })
        notify("success","successFully") 
      setshowsetting(false)
     
      
      
    
   
    
  } catch (error) {
    dispatch({type:"GET-LOGIN-ERROR", payload:error.message})
    setshow(error.message)
    notify("error",error.message)
    setshow(false)
    setloading(false)

    
  }

}

export const orderAction=()=>async(dispatch,getstate)=>{
  
  const {login}=getstate().getLogin
  dispatch({type:'GET-ORDERS-REQUEST'})
            try {
              const {data}=await axios.get('/api/orders/myorders',{ headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${login.token}`,
              }})
            
              localStorage.setItem("orders",JSON.stringify(data))
         
             
              dispatch({type:'GET-ORDERS-SUCCES', payload:[...data]})

            } catch (error) {
              console.log(error.message);
              dispatch({type:'GET-ORDERS-ERORE', payload:error.message})
              

              
            }          
          
}
export const modloginAction=(bol)=>(dispatch)=>{
  dispatch({type:"true",payload:bol})

}
export const changeAction=()=>(dispatch,getstate)=>{
  const change=getstate().getCart
const state= change.length && change.map((item)=>item.qty).reduce((a,b)=> a + b) 
localStorage.setItem("change",JSON.stringify(state))
dispatch({type:"CHANGACTION",payload:state})

}
export const changeActionRemove=()=>(dispatch,getstate)=>{
  
localStorage.removeItem("change")
dispatch({type:"CHANGACTION",payload:0})

}




export const LoginActionlog=(navigate)=>async(dispatch)=>{
  localStorage.removeItem("Login")
  localStorage.removeItem("password")
  
  dispatch({type:"GET-LOGOUT"})
       
 
    

   
 
  }



