import React, { useEffect } from 'react'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import { useNavigate } from "react-router";
import Home from './components/Home'
import Header from './components/Header'
import Product from './components/Product'
import ShoppingCart from './components/ShoppingCart'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Addres from './components/Addres'
import Total from './components/Total'
import Setting from './components/Setting';
import Orders from './components/Orders';
import None from './components/None'
import OrderItem from './components/OrderItem';
import { useSelector } from 'react-redux'
import Pass from './components/Pass';

const App = () => {

  const {login,loading,error}= useSelector(x=>x.getLogin)

 
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='products' element={<Home/>}/>
      <Route path='/' element={<Home/>}/>
      {login.id &&
      <Route path='orders' element={<Orders/>}/>
      
      }
      {login.id &&
      <Route path='orders/:orderId' element={<OrderItem/>}/>
        
      }
    
      <Route path='products/:ProductId' element={<Product/>}/>
      <Route path='products/:ProductId/:cartId' element={<ShoppingCart/>}/>
      <Route path='cart' element={<ShoppingCart/>}/> 
          {login.id &&  
          <Route path='cart/addres' element={<Addres/>}/>
          }
      {login.id  &&
      <Route path='cart/addres/total' element={<Total/>}/>
      
      }
     
      <Route path='*' element={<None/>}/>
      
      

      
    
    </Routes>
    
    </BrowserRouter>
    
    </>
   
  )
}

export default App