import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col,Navbar,Nav} from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DropdownButton,Dropdown } from 'react-bootstrap'
import SignUp from './SignUp';
import Login from './Login';
import { modloginAction,LoginActionlog } from '../redux/action';
import Pass from './Pass';
import Setting from './Setting';
import { notify } from './tostify';




const Header = () => {
   const navigate=useNavigate()
   const [signup, setsignup] = useState(false);
   const [smShow, setSmShow] = useState(false);
   const [showsetting, setshowsetting] = useState(false);
   const [sign, setsign] = useState(0)
  


   const show= useSelector(x=>x.getShow)
   const Cart= useSelector(x=>x.getCart)
   const change= useSelector(x=>x.getChange)
   
   const {login,loading,error,flag}= useSelector(x=>x.getLogin)
   const handleClose = () => setsignup(false);
  const handleShow = () => setsignup(true)
  const dispatch= useDispatch()


 



  


  
   
    

  return (
    <>
 <div className='Header' >
  
   {/* navbar */}
   <Navbar style={{width:"100vw"}} collapseOnSelect expand="md" bg="dark" variant="dark">
    
  <Navbar.Brand  ><img className='brand' src="../images/Shopping.jpg" alt="" /></Navbar.Brand>
  <Navbar.Toggle style={{marginRight:"5%"}} aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse  id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link className='hover'>
      <div className='hom'  onClick={()=>{navigate("/")}}>Home </div>
      </Nav.Link>
      <Nav.Link >
      <div className='cart' onClick={()=>{navigate("cart")}}>
  <i className='fa fa-shopping-cart'></i>
  <div className='parnum'><span className='num'>{change}</span></div>
  </div>
      </Nav.Link>
     

    </Nav>
    <Nav>
      <Nav.Link >{login.id ?  

  <div className='user'>
      
     <Dropdown  >
  <Dropdown.Toggle  outline='nonr' variant="none" id="dropdown-basic">
    <div className='parent-email'>
    <img   src="/images/user.png" alt=""/>
  <div className='email'>{login.email}</div>
    </div>
  

  </Dropdown.Toggle>

  <Dropdown.Menu variant="dark" >
    <Dropdown.Item >
    <p onClick={()=>{
       setSmShow(true)
      }}>setting</p>
    </Dropdown.Item>
    <Dropdown.Item ><p  onClick={()=>{
        navigate('orders')
      }}>orders</p></Dropdown.Item>
    <Dropdown.Item>
    <p onClick={()=>{

      dispatch(LoginActionlog())
        setsign((l)=>l+1)
        
      }}> log out</p>
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
    
    
    
  </div>
  :
  
  <div className='logine'>
    <p  onClick={()=>{
     dispatch(modloginAction(true))
    }}>Login</p>
  
  
    
  </div>
  
  }</Nav.Link>
  
     
    </Nav>
  </Navbar.Collapse>

</Navbar>
 
   {/*End navbar */}


   
   <Login setsignup={setsignup}/>
    <SignUp setsign={setsign} handleShow={handleShow} handleClose={handleClose} signup={signup} setsignup={setsignup}/>
      
  <div style={{position:"fixed"}}>
  <Pass  setshowsetting={setshowsetting} smShow={smShow} setSmShow={setSmShow} />
  <Setting showsetting={showsetting} setshowsetting={setshowsetting}/>
    </div>

    <ToastContainer />
 </div>

  


 </>
  )
}

export default Header