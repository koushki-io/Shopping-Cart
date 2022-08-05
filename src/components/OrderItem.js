import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const OrderItem = () => {
   const {orderId} =useParams()
    const {login} =useSelector(x=>x.getLogin)
    const [order, setorder] = useState({});
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);


    
    useEffect(() => {
      getOrder()
     }, []);
     
     
  
    
   const getOrder=async()=>{
    seterror(false)
    setloading(true)
       try {
            const {data}=await axios.get(`http://5.161.141.215:5000/api/orders/${orderId}`,{ headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${login.token}`,
              }})
              setloading(false)
              seterror(false)
              setorder(data)
       } catch (error) {
        seterror(error.message);
        setloading(false)
           
       }
   }
   console.log(order);

   
  return (

   <div style={{width:"100%"}}>


       {error ? <div style={{display:"flex",background:"#414950", justifyContent:"center",alignItems:"center",textAlign:"center",height:"100vh", width:"100%" } }> 
    <h1 style={{color:"red"}}>{error}</h1>
    </div>
    :
    loading &&  <div style={{display:"flex",background:"#414950", justifyContent:"center",alignItems:"center",height:"100vh", width:"100%" } }> 
    <img style={{width:"200px"}} src="/images/loadin3.gif" alt=""/>
    </div>
    }



   {order.itemsPrice  &&  
   
      
   <div className='totalParent' style={{minHeight:"85vh"}}>
        
        <div className='total-item' style={{display:"flex"}}>
        

      

        <div className='shop shop-total'>
          
           {order.orderItems.map((item,index)=>{
            return <div className='item-cart' key={index}>
              
              <div style={{marginLeft:"20px"}} className="discription disc-total">
            <img src={item.image}  alt="" />
              <p style={{fontSize:"11px"}}>{item.name}</p>
            </div>

            <div style={{display:"flex"}}>
                  <p>Count </p> <span style={{margin:"0 5px"}}>:</span>
               <p style={{fontWeight:"600", color:"green"}}> {item.qty}</p>
            </div>
          

              <p   style={{color:"red",marginRight:"20px",fontWeight:"700"}}>{(item.price * item.qty).toFixed(2)} $</p>
           

            </div>
          
        })}
        </div>
       

        <div className='ADres'>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}</p>
            <p>{order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.phone}</p>
            
        </div>
    

        </div>


        <div className='User-Login'>
          <p>{order.user.name}</p>
          <p>{order.user.email}</p>
          
       
          <p style={{color:"red"}}>Total price: {order.itemsPrice} $ </p>
        

        


        </div>
      

   
    </div>
     

   }


   
   
   </div>
  )
}

export default OrderItem


// GET  /api/orders/id  (token)