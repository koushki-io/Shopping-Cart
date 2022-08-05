import { type } from '@testing-library/user-event/dist/type'
import { Alert,Button } from 'react-bootstrap'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { plusAction, minusAction, RemoveAction, modloginAction,changeAction } from '../redux/action'






const ShoppingCart = () => {
  
 const Cart= useSelector(x=>x.getCart)
 const {products}= useSelector(x=>x.getProduct)
 const {login,loading,error}= useSelector(x=>x.getLogin)
 const dispatch =useDispatch()
 const [num, setnum] = useState(0);
const navigate= useNavigate()


 
  return (
    
    <div className='parent-box'>
    <div className='shopping-box'>
    {Cart.length>0 ?   <div>
        {Cart.map((item,index)=>{
            return <div className='item-cart' key={index}>
              <div onClick={()=>{dispatch(RemoveAction(index))
              dispatch(changeAction())
              }} className=" btn btn-outline-secondary remove  ">
                <i className='fa fa-remove'></i>
              </div>
            <div className="discription">
            <img src={item.image}  alt="" />
              <p style={{fontWeight:"600"}}>{item.name}</p>
             
            
            
             
            </div>
            <div>
              <p className='M-price' style={{fontSize:"16px",fontWeight:"600"}}> Pric : <span style={{color:"green"}}>{(item.price * item.qty).toFixed(2)} $ </span> </p>
             
            </div>
            <p style={{color:"#cc3131", fontWeight:"700"}}>{item.countInStock}</p>

             <div className="count">
               <button 
               onClick={()=>{
                dispatch( minusAction(index))
                setnum(item.qty)
                dispatch(changeAction())
               }}
              ><i className='fa fa-minus'></i></button>
               <span>{item.qty}</span>
               <button 
               onClick={()=>{
                dispatch(plusAction(index))
                setnum(item.qty)
                dispatch(changeAction())
               
              }}
               ><i className='fa fa-plus'></i></button>
             </div>
            

            </div>
          
        })}

      
    </div>   : <div>
      <h1 style={{color:"red"}}>Do you want to buy something</h1> 
      <button
      className='btn btn-outline-secondary'
      onClick={()=>{
        navigate("/")
      }}>back to shop</button>
    </div>
      
       }


   
    

    {Cart.length ? <button className='btn next btn-outline-secondary'
                        onClick={()=>{
                          login.id ?
                          navigate('addres')
                          :
                          dispatch(modloginAction(true))
                        }}
       
                    >next</button> : <p></p> }



 
    </div>


    

     


    </div>
  )
}

export default ShoppingCart