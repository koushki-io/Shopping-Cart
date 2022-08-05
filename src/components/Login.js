import React,{useState,useEffect} from 'react'
import { modloginAction } from '../redux/action';
import { valid } from './validet';
import { Alert,Modal,Button } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../redux/action';
import { notify } from './tostify';
const Login = ({setsignup}) => {
  const {login,loading,error}= useSelector(x=>x.getLogin)
  const show= useSelector(x=>x.getShow)
  const [errors, seterrors] = useState({})
  const [input, setinput] = useState({
    email:"",
    password:"",
  })
  const [touched, settouched] = useState({
    name:false,
    email:false,
    password:false,
    confirmPassword:false


  })


  
  

  const [eye, seteye] = useState(false);
  const dispatch= useDispatch()
   const navigate= useNavigate()
   const changeHandeler=(e)=>{
    setinput({...input,[e.target.name]:e.target.value})
   }
   useEffect(() => {
 
   seterrors(valid(input,"login"))
   
   }, [input])


   const focusHandler=(e)=>{
    settouched({...touched,[e.target.name]:true})
  }
  

   
   
  return (
   
   <>
    <Modal show={show} onHide={()=>{ dispatch(modloginAction(false))}} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
              
 <div>
  <h2 className='center' >Login</h2>
   
    
 <div style={{paddingLeft:"5vw"}} className="col-md-10 m-auto">
         <form  onSubmit={(e)=>{e.preventDefault()}}>
           <div className="form-group">
             <label htmlFor="email">Email address</label>
             <div style={{display:"flex",alignItems:'center'}}>
             <input 
             style={{color:errors.email ? "red": "green" }}
          onFocus={focusHandler}
             onChange={changeHandeler}
             value={input.email}
             type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
           <div className="eye"></div>
            </div>
            { errors.email && touched.email && <span style={{color:"red"}}>{errors.email}</span>}
           </div>
           <div className="form-group">
             <label htmlFor="password">Password</label>
            <div style={{display:"flex",alignItems:'center'}}>
              
            <input 
            onFocus={focusHandler}
             onChange={changeHandeler} 
             value={input.password} 
            type={ eye ? "text" : "password"} name="password" className="form-control" id="password" placeholder="Password" />

            <div className="eye">
              {eye ?  <span 
                      onClick={()=>{
                        seteye((e)=>!e)
                      }} className="fa fa-eye"></span>
                        :
                      <span
                      onClick={()=>{
                        seteye((e)=>!e)
                      }} className="  slash fa fa-eye-slash "></span>  }
                     

                    </div>
            </div>
            { errors.password && touched.password && <span style={{color:"red"}}>{errors.password}</span>}
           
           
           </div>
           <div className="form-check">
            
           </div>
           
         {error && <h4 style={{color:"red"}}>{error}</h4>}
         {loading && <h4 style={{color:"green"}}>loading...</h4>}
         

           </form>
          
         
       </div>
       
</div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{
         
            dispatch(modloginAction(false))
          }}>
            Close
          </Button>
          <Button variant="primary"
          
          onClick={()=>{

            if (!Object.keys(errors).length) {
              dispatch(LoginAction(input.email,input.password ,navigate,notify))
            }else{
              settouched({
                name:true,
                  email:true,
                   password:true,
                     confirmPassword:true
              })
              notify("error","Invalid information")
            }
            
               
      
           }}
           
           >
           Login
          </Button>
          <a onClick={()=>{
             dispatch(modloginAction(false))
            setsignup(true)
          }} 
          
          className='siggn'>Sign up</a>
        </Modal.Footer>
      </Modal> 

       

      
   </>

  )
}

export default Login