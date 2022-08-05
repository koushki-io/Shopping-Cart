import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Alert } from 'react-bootstrap';

import { addresAction } from "../redux/action";


const Addres = () => {
  const [adres, setadres] = useState("");
  const [city, setcity] = useState("");
  const [alert1, setalert1] = useState(false);
  const [postalCod, setpostalCod] = useState("");
  const [phone, setphone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAddres = useSelector((x) => x.getAddres);
  
  
  
  useEffect(() => {
    setadres(getAddres.address && getAddres.address)
    setcity(getAddres.city && getAddres.city)
    setpostalCod(getAddres.postalCode && getAddres.postalCode)
    setphone(getAddres.phone && getAddres.phone)
     
  }, []);
  return (
    <div className="parent-adres"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection:"column",
        
      }}
    >
      <h1 className="addres" >Address</h1>
     <div style={{position:"fixed" ,top:"10vh"} }>
     <Alert p variant="danger" show={alert1} onClose={()=>{setalert1(false)}} dismissible>
        <p>{alert1}</p>
        
      </Alert>
     </div>
     

      <div className=" box-adres col-md-6 m-auto">
        <form onSubmit={(e)=>{e.preventDefault()}} style={{position:"relative"}}>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input 
            minLength={3}
            maxLength={40}
             value={city && city}
             required
             onChange={(e) => {
               setcity(e.target.value);
             }}
            type="text"  className="form-control input"   placeholder="Enter city"  />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input value={adres && adres}
            maxLength={40}
            minLength={10}
          
          onChange={(e) => {
              
            setadres(e.target.value)
          }} type="text"  className="form-control input"  placeholder="Enter address" required />
          </div>


          <div className="form-group">
            <label htmlFor="postalCode">PostalCode</label>
            <input 
     
            maxLength={15}
           
            value={postalCod && postalCod}
            onChange={(e) => {
              {if(e.target.value.length < 15){
                setpostalCod(e.target.value);
              }}
              
            }}type="number" name="postalCode" className="form-control input"  aria-describedby="postalCodeHelp" placeholder="Enter postalCode"  required />
          </div>


          <div className="form-group" style={{paddingBottom:"30px"}}>
            <label htmlFor="phone">Phone</label>
            <input
             required
            minLength={5}
            maxLength={13}
           
              value={phone && phone}
              onChange={(e) => {
                {if(e.target.value.length < 14){
                  setphone(e.target.value.toString());
                }}
               
              }}
            
            type="number" name="phone" className="form-control input"  aria-describedby="phoneHelp" placeholder="0912XXXXXXX" />
          </div>



          <div style={{  position:"absolute" ,right:"0px"}}>
            <button  onClick={()=>{
             { if(phone.length>6){
              dispatch(addresAction(adres, city, postalCod, phone))
  
                navigate("total");
              
           } 
           else{
             setalert1("Phone length <  6")

             setTimeout(() => {
              setalert1(false)
             }, 3000);
           }
            
            }
                
       
            }} type="submit" className="btn  btn-outline-secondary float-right">
              Next
            </button>
          
            
          </div>

          
         

          

        
        </form>
      </div>

      
    </div>
  );
};

export default Addres;

// "address": "",
// "city": "",
// "postalCode": "",
// "phone": "
