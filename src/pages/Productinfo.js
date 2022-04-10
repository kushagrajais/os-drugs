import React, { useState , useEffect, useRef} from 'react';
import Layout from '../components/Layout';
import { getDoc   , doc} from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

function Productinfo() {
  const [product, setProduct] = useState();
  const params= useParams();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  
  useEffect(() => {
    getData();
  }, [])
    async function getData() {
      try {
        const productTemp = await getDoc(doc(fireDB, "products",params.productid));
        const productsArray = [];
        setProduct(productTemp.data());
  
        // console.log(productsArray);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    });
    const addToCart = (products) => {
      dispatch({ type: "ADD TO CART", payload: products});
    };
    
  
  return (
    <div>
      <Layout/>
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-md-8">

        
    {product && (
      <div>
        <div className='justify-content-center'>
        <h1>

        <p><b>{product.name}</b></p>
        </h1>
        </div>
        <img src={product.imageURL} alt="" className='product-info-img'/>
      <hr />
      <div className='des'>
      <h2><b>Description</b></h2>
      <p>{product.description}</p>
      </div>
      <div className="d-flex justify-content-end my-3">
        <button onClick={()=>addToCart(product)}>ADD TO CART</button>

      </div>
      </div>
       )}
    </div>
    </div>
      </div>
      
      </div>
      );
}

export default Productinfo