import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { fireproducts} from "../fireproducts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";


function Homepage() {
  const [products, setProducts] = useState([]);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [filterType, setFilterType] = useState('');

  const navigate = useNavigate();
  
useEffect(() => {
  let isMounted = true;
  if(isMounted)
  {
    getData();
  };
  return ()=>{
    isMounted=false;
  };
}, []);

  /* async function adddata() {
     try {
       await addDoc(collection(fireDB, "users"), { name: "ready", age: 28 });
     } catch (error) {
       console.log(error);
     }
     } */ 
   async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
       setLoading(false);
      });
      setProducts(productsArray);

      // console.log(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  });
  const addToCart = (products) => {
    dispatch({ type: "ADD TO CART", payload: products});
  };
 /* function addProductsData() {
   fireproducts.map(async (product)=>{
     try {
         await addDoc(collection(fireDB, "products"), product);
       } catch (error) {
         console.log(error);
       }
     });
   } */
  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="d-flex w-50">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            className="form-control"
            placeholder="search items"
          />
          <select
            name=""
            id=""
            className="form-control mt-3"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="Injection">Injection</option>
            <option value="Ointment">Ointment</option>
            <option value="Syrup">Syrup</option>
            <option value="Tablets">Tablets</option>
            <option value="Capsule">Capsule</option>
          </select>
        </div>
        <div className="row">
          { products
            .filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.Category.includes(filterType))
            .map((products) => {
              return (
                <div className="col-md-4">
                  <div className="product m-2 p-1 text-center position-relative">
                    <div className="product-content">
                      <p>
                        <b>{products.name}</b>
                      </p>

                      <div className="text-center">
                        <img
                          src={products.imageURL}
                          alt="not found"
                          className="product-img"
                        />
                      </div>
                    </div>
                    <div className="product-actions">
                      <h2>{products.price} RS/-</h2>
                      <div
                        className="d-flex"
                        onClick={() => addToCart(products)}
                      >
                        <button>ADD TO CART</button>
                        <button
                          className="mx-2"
                          onClick={() => {
                            navigate(`/Productinfo/${products.id} `);
                          }}
                        >
                          VIEW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
    </Layout>
  );
}

export default Homepage;
