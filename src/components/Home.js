import axios from 'axios'
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ProductAction } from '../redux/action'

const Home = () => {
 const dispatch= useDispatch()
const navigate= useNavigate()
const {products,loading,error}= useSelector(x=>x.getProduct)
const {login}= useSelector(x=>x.getLogin)





  


 useEffect(() => {
   if(!(products.length)){
     dispatch(ProductAction())  
   }
  
 }, []);

  return (

    <div style={{width:"100%"}}>
      {loading ?  <div style={{display:"flex",background:"#414950", justifyContent:"center",alignItems:"center",height:"100vh", width:"100%" } }> 
    <img style={{width:"200px"}} src="/images/loadin3.gif" alt=""/>
    </div>
    :
    error ? <div style={{display:"flex",background:"#414950", justifyContent:"center",alignItems:"center",textAlign:"center",height:"100vh", width:"100%" } }> 
    <h1 style={{color:"red"}}>{error}</h1>
    </div>
    :
    <div className='parent'>

  
   

     
      

    {products.map((item,index) => {
      return <div 
      onClick={()=>{
        navigate(`products/${item._id.toString()}`)
      }}
      className='box' key={index}>
        <div className="box-image">
        <img src={item.image}  alt="" />
        </div>
       
        <p>{item.name}</p>
        <p> Price :<span style={{color:"green"}}>{item.price} $</span> </p>
      </div>
      
    })}
  </div>



  }
  </div>
    
   
    )
}

export default Home