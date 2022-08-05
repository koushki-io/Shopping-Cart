import axios from "axios";
import { Alert,Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { CartAction, changeAction } from "../redux/action";
import { notify } from "./tostify";




const Product = () => {

  
  const dispatch = useDispatch();
  const [error, seterror] = useState("");
  const { ProductId } = useParams();
  const navigate = useNavigate();
  const [product, setproduct] = useState({});
  const DataProc = async () => {
    try {
      const { data } = await axios.get(
        `/api/products/${ProductId}`
      );
      setproduct(data);
    } catch (error) {
      seterror(error.message);
    }
  };
  

  useEffect(() => {
    DataProc();
  }, []);
  return (
    <div  style={{background: "#414950",display:"flex",flexDirection:"column" , justifyContent:"center",alignItems:"center",height:"120vh",width:"100%"} }> 



      {error ? (
        <h1 style={{color:"red"}}>{error}</h1>
      ) : product._id ? (
        <div className="product ">
         
          <div className="img">
          <img src={product.image} alt="" />
          </div>
      

          <div className="product-item">
          <p style={{fontWeight:"600"}}> <span className="span"> Product : </span> {product.name}</p>
          <p style={{fontWeight:"600"}}> <span className="span">Brand : </span> {product.brand}</p>
         
          <p className="disc">{product.description}</p>
           <p  style={{color:"green"}}> <span className="span">Count In Stock</span>  : <span style={{color:"#cc3131",fontWeight:"600"}}>{product.countInStock} </span>  </p> 
           <p  style={{color:"green"}}> <span className="span">Price </span> : <span style={{color:"#cc3131",fontWeight:"600"}}>{product.price} $</span>  </p> 


          </div>
          
        

         

              <div className="add">
              {product.countInStock ? (
            <button className="btn btn-outline-secondary  "
              onClick={() => {
                
                dispatch(
                  CartAction({
                    product: product._id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    countInStock: product.countInStock - 1,
                    qty: 1,
                  },notify)
                  
                )
                dispatch(changeAction())
              }}
            >
              Add to cart
            </button>
          ) : (
            <p style={{ color: "red" }}>unavailable</p>
          )}

              </div>
        </div>
      ) : (
        <img style={{width:"200px"}} src="/images/loadin3.gif" alt=""/>
      )}

         
          
   
         

    </div>
  );
};

export default Product;
