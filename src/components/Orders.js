import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { orderAction } from '../redux/action'


const Orders = () => {
    const dispatch=useDispatch()
   const {order,loading,error} =useSelector(x=>x.getOrders)
   const navigate= useNavigate()
   console.log(loading);
 
    

    useEffect(() => {
        dispatch(orderAction())
    }, []);
  
  return (
      <div style={{width:"100%"}}>
     
     {error ? <div style={{display:"flex",background:"#414950", justifyContent:"center",alignItems:"center",textAlign:"center",height:"100vh", width:"100%" } }> 
    <h1 style={{color:"red"}}>{error}</h1>
    </div>
    :
    loading ?  <div style={{display:"flex",background:"#414950", justifyContent:"center",alignItems:"center",height:"100vh", width:"100%" } }> 
    <img style={{width:"200px"}} src="/images/loadin3.gif" alt=""/>
    </div>

    :
    <div className='parent order'>

 

    {
    !order.length ?  <h1 style={{color:"red" ,width:"100%"}}>You have not placed any orders yet</h1> :
    order.map((item,index)=>{
        return <div onClick={()=>{
          navigate(item._id.toString())
        }}  key={index} className="box" style={{padding:"0px"}}>
            <p style={{fontSize:"20px", fontWeight:"700",paddingTop:"10px"}}> {index + 1}</p>
            <p style={{fontSize:"14px", fontWeight:"700", color:"green"}}>Order date : {item.createdAt}</p>
            <p style={{color:"#96989a"}}>Number of products : {item.orderItems.length}</p>
            <p style={{color:"#96989a"}}> Total price : {item.itemsPrice} $</p>
          
        </div>
    })}

     
        
    
</div>
  }

     


     
</div>
  )
}

export default Orders