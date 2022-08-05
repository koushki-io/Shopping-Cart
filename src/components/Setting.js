import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { editeAction } from '../redux/action';
import { Modal,Alert } from 'react-bootstrap';
import { valid } from './validet';
import { notify } from './tostify';


 
   const Setting = ({showsetting,setshowsetting}) => {
    const [input, setinput] = useState({
      password:"",
      confirmPassword:"",
    })
    const [touched, settouched] = useState({
      password:false,
      confirmPassword:false,
    })
    const [show, setshow] = useState(false);
    const [loading, setloading] = useState(false);
    const Cpassword=localStorage.getItem('password') ? JSON.parse(localStorage.getItem('password')) : ' '
    const [errors, seterrors] = useState({})
    const dispatch= useDispatch()
     const navigate= useNavigate()
     useEffect(() => {
      seterrors(valid(input,"changepassword"))
    
     }, [input])
     

    const changeHandeler=(e)=>{
      setinput({...input,[e.target.name]:e.target.value})

    }
    const focusHandler=(e)=>{
      settouched({...touched,[e.target.name]:true})

    }


  
  
  
  return (
   
    <>
 
  <div style={{display:"flex",  flexDirection:"column", justifyContent:"center", alignItems:"center",height:"100vh"}}>
  

  


  <Modal
        size="sm"
        show={showsetting}
        onHide={() => setshowsetting(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
          <h2 >Edit</h2>
         
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
  <div  className="col-md-12 m-auto" style={{position:"relative" ,paddingBottom:"15vh"}}>
          <form onSubmit={(e)=>{e.preventDefault()}}>
          <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={changeHandeler}
              onFocus={focusHandler}
              value={input.password}
              type="password" name="password" className="form-control" id="password" placeholder="Password"  />
            </div>
            {errors.password && touched.password && <span style={{color:"red"}}>{errors.password}</span>}
            <div className="form-group">
              <label htmlFor="Confirmpassword">Confirm password</label>
              <input onChange={changeHandeler}
               onFocus={focusHandler}
              value={input.confirmPassword}
              type="password" name="confirmPassword" className="form-control" id="password" placeholder="Password"  />
            </div>
            {errors.confirmPassword && touched.confirmPassword && <span style={{color:"red"}}>{errors.confirmPassword}</span>}



            {loading && <p style={{color:"green"}}>loading...</p>}
           
            <div style={{padding:"20px" , position:"absolute" ,right:"0px"}}>
            
            <button  
            onClick={()=>{
              if (!Object.keys(errors).length) {
              dispatch(editeAction(input.password,notify,setshow,setloading,setshowsetting,setinput,settouched))
                
              }
              else{
                settouched({
                  password:true,
                  confirmPassword:true,
                })
                notify("error","invaild password")
              }
            }}
            
            
            type="submit" className="btn  btn-outline-primary float-right">
              Edite
            </button>

          
          
            
          </div>
 
            </form>
           
          
        </div>


        </Modal.Body>
      </Modal>
  
  
  
    
  
              

       
        
 </div>
        
 
       
    </>
 
   )
}

export default Setting