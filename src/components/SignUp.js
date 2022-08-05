import React, { useState } from "react";
import { useEffect } from "react";
import { Alert, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signUpAction } from "../redux/action";
import { valid } from "./validet";
import { notify } from "./tostify";


const SignUp = ({ setsignup, signup, handleShow, handleClose,setsign }) => {

  const [errors, seterrors] = useState({})
  const [input, setinput] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""


  })
  const [touched, settouched] = useState({
    name:false,
    email:false,
    password:false,
    confirmPassword:false


  })

 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { up, loading, error } = useSelector((x) => x.getSign);
  

 const changeHandeler=(e)=>{
  setinput({...input,[e.target.name]:e.target.value})



 }

 const focusHandler=(e)=>{
  settouched({...touched,[e.target.name]:true})
}

 useEffect(()=>{
  seterrors(valid(input,"sign"))

 },[input])




 

  return (
    <div>
      <Modal show={signup} onHide={handleClose} animation={true}>
        <Modal.Body>
          <h2 className="center">Sign up</h2>
          <div style={{ left: "0vw", top: "12vh" }} className="alert-total">

            
           
          </div>

          <div className="col-md-10 m-auto">
            <div onSubmit={(e)=>{e.preventDefault()}}>
              <div className="form-group">
                <label htmlFor="UserName">User name</label>
                <input
                  onChange={changeHandeler}
                  onFocus={focusHandler}
                  type="text"
                  name="name"
                  className="form-control"
                  id="username"
                  aria-describedby="usernameHelp"
                  placeholder="Enter User name"
                  value={input.name}
                />
                { errors.name && touched.name && <span style={{color:"red"}}>{errors.name}</span>}
                <br />

                <label htmlFor="email">Email address</label>
                <input 
                onFocus={focusHandler}
                  onChange={changeHandeler}
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                
                  value={input.email}
                />
                { errors.email && touched.email && <span style={{color:"red"}}>{errors.email}</span>}
                <br />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>

               
                 
               
                <input
                
                
                onFocus={focusHandler}
                  onChange={changeHandeler}
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={input.password}
                  
                />
                { errors.password && touched.password && <span style={{color:"red"}}>{errors.password}</span>}
                <br />

                   
           
               
              </div>
              <div className="form-group">
                <label htmlFor="confirmpassword">Confirm password</label>
                <input 
                onFocus={focusHandler}
                  onChange={changeHandeler}
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  id="confirmpassword"
                  placeholder="Password Again"
                  value={input.confirmPassword}
              
                />
                { errors.confirmPassword && touched.confirmPassword && <span style={{color:"red"}}>{errors.confirmPassword}</span>}

                
              </div>
             


              
            </div>
          </div>
          {loading  && <h4 style={{ color: "green" }}>Loading...</h4>}
          {error && <h4 style={{ color: "red" }}>{error}</h4>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn btn-primry" type="submit"
            variant="primary" 
            onClick={()=>{
            console.log(!Object.keys(errors).length);
              if(!Object.keys(errors).length){
              dispatch(signUpAction(input.name, input.email.trim(), input.password, navigate,setsign,setsignup,notify))
              }else{
                settouched({
                  name:true,
                    email:true,
                     password:true,
                       confirmPassword:true
                })
                notify("error","Invalid information")
              }
            }

          
          
          }

          >
            register
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;
