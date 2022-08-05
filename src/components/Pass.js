
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Modal,Alert } from 'react-bootstrap';
import { notify } from './tostify';

const Pass = ({smShow,setSmShow,setshowsetting}) => {
    const Cpassword=localStorage.getItem('password') ? JSON.parse(localStorage.getItem('password')) : ' '
    const [pass, setpass] = useState('');
   
    const [eye, seteye] = useState(false);
    const dispatch= useDispatch()
     const navigate= useNavigate()
  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",height:"100vh"}}>
   
        <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
          <h4>Change Password</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

     
     <div  className="col-md-10 m-auto">
             <form onSubmit={(e)=>{e.preventDefault()}}>
               <div className="form-group">
                 <label htmlFor="password">Current password</label>
                 
                 <div style={{display:"flex",alignItems:'center'}}>
                 <input  onChange={(e)=>{setpass(e.target.value)}} type={ eye ? "text" : "password"} name="password" className="form-control focus" id="password" placeholder="Password" onFocus={true} required />
               
                 <div className="eye">
              {eye ?  <span 
                      onClick={()=>{
                        seteye((e)=>!e)
                      }} className="fa fa-eye "></span>
                        :
                      <span
                      onClick={()=>{
                        seteye((e)=>!e)
                      }} className="slash fa fa-eye-slash "></span>  }
                     

                    </div>
               </div>
               
               </div>
              
               <div style={{justifyContent:'space-between' ,padding:"20px"}}>
               <button  onClick={()=>{
                {if(pass==Cpassword){
                  setshowsetting(true)
                  setSmShow(false)
                }
                else{
                  notify("error","wrong password")

                }
               }
                   
          
               }} type="submit" className="btn  btn-outline-primary float-right">
               Done
               </button>
             
               
             </div>
    
               </form>
              
             
           </div>

        </Modal.Body>
      </Modal>
        
 </div>
        
  )
}

export default Pass