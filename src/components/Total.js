import axios from 'axios'
import { Alert } from 'react-bootstrap'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { plusAction,minusAction,RemoveAction ,changeAction,changeActionRemove,CartActionRemove} from '../redux/action'
import { notify } from './tostify'



const Total = () => {


const navigate= useNavigate()
    const Cart= useSelector(x=>x.getCart)
    const getAddres= useSelector(x=>x.getAddres)
    const {login} = useSelector((x) => x.getLogin);
    const [num, setnum] = useState(0);
    const [alert, setalert] = useState(false);
    const dispatch= useDispatch()
   const Total=Cart.map((item)=>{
       return item.price * item.qty
   })
   const end=Total.reduce((a, b) => {
       return a + b
       
   });

   const request=async()=>{
       try {
           const {data}=await axios.post('http://5.161.141.215:5000/api/orders', {
            orderItems: Cart,
            shippingAddress: getAddres,
           paymentMethod: " ",
            itemsPrice: end.toFixed(),
            shippingPrice: "0.00",
            totalPrice: end.toFixed()
              
         
            },{ headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${login.token}`,
            }} )

           setalert(true)
           localStorage.removeItem("change")
           localStorage.removeItem("Cart")
          
            notify("success","Order successful")
            dispatch(changeActionRemove())
            dispatch(CartActionRemove())
            localStorage.removeItem("Cart")
            localStorage.removeItem("change")
            navigate('/')
         
          
       } 
       catch (error) {
         console.log(error.message);
         notify("error",error.message)
           
       }

   }
  
    
  return (
      <>
    <div className='totalParent'>
      <button 
      onClick={()=>{
        navigate("/cart")
      }}
      className="back">
        Back to cart
      </button>
        
        <div className='total-item' style={{display:"flex"}}>
        

        {/* Shopping */}

        <div className='shop '> {Cart.map((item,index)=>{
            return <div className='item-cart' key={index}>
              
            <div style={{marginLeft:"20px"}} className="discription disc-total">
            <img src={item.image}  alt="" />
              <p style={{fontSize:"11px"}}>{item.name}</p>
            </div>

            <div style={{display:"flex"}}>
                  <p>Count </p> <span style={{margin:"0 5px"}}>:</span>
               <p style={{fontWeight:"600", color:"green"}}> {item.qty}</p>
            </div>
          

              <p   style={{color:"#cc3131",marginRight:"20px",fontWeight:"700"}}>{Total[index].toFixed(2)} $</p>
           

            </div>
          
        })}
        </div>
        {/* Shopping */}

        {/* Address */}

        <div className='ADres'>
            <p>{getAddres.address}</p>
            <p>{getAddres.city}</p>
            <p>{getAddres.postalCode}</p>
            <p>{getAddres.phone}</p>
            
        </div>
        {/* Address */}

        </div>


        <div className='User-Login'>
          <p>{login.name}</p>
          <p>{login.email}</p>
           {/* Toyal */}
       
          <p style={{color:"#cc3131"}}>Total price: {end.toFixed(2)} $ </p>
        

        {/* Toyal */}


        </div>

      



        <button className='End-button' onClick={()=>{
           request()
        }}>Don</button>



    </div>
     

        
    </>
  )
}

export default Total