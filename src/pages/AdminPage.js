import Layout from "../components/Layout";
import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Modal, Tab, TabContent, Tabs } from "react-bootstrap";
import { async } from "@firebase/util";
import { toast } from "react-toastify";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getData();
    }
    return () => {
      isMounted = false;
    };
  }, []);
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
    let isMounted = true;
    if (isMounted) {
      getOrdersData();
    }
    return () => {
      isMounted = false;
    };
  }, []);
  async function getOrdersData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "order"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      console.log(ordersArray);
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };
  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);
      handleClose();
      toast.success("Product updated successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product update failed");
      setLoading(false);
    }
  };
  const [orders, setOrders] = useState([]);
  const userid = JSON.parse(localStorage.getItem("currentUser")).user.uid;
  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);
      handleClose();
      toast.success("Product Added successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product Add failed");
      setLoading(false);
    }
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted Successfully");
      getData();
    } catch (error) {
      toast.error("Product deletion Failed");
      setLoading(false);
    }
  };

  const addHandler = () => {
    handleShow();
    setAdd(true);
  };
  return (
    <div>
      <Layout loading={loading}>
        <Tabs
          defaultActiveKey="products"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="products" title="Products">
            <TabContent />
            <div className="d-flex justify-content-between">
              <h1>Product List</h1>
              <button onClick={addHandler}>Add Products</button>
            </div>
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => {
                  return (
                    <tr>
                      <td>
                        {" "}
                        <img
                          src={item.imageURL}
                          height="80"
                          width="80"
                          alt="not found"
                        />{" "}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.Category}</td>
                      <td>{item.price}</td>
                      <td>
                        <FaTrash
                          color="red"
                          size={20}
                          onClick={() => {
                            deleteProduct(item);
                          }}
                        />
                        <FaEdit
                          onClick={() => editHandler(item)}
                          color="blue"
                          size={20}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {add ? "Add a product" : "Edit Product"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {" "}
                <div className="register-form">
                  <input
                    type="text"
                    value={product.name}
                    className="form-control"
                    placeholder="name"
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    value={product.price}
                    className="form-control"
                    placeholder="price"
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={product.imageURL}
                    className="form-control"
                    placeholder="image url"
                    onChange={(e) =>
                      setProduct({ ...product, imageURL: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={product.Category}
                    className="form-control"
                    placeholder="category"
                    onChange={(e) =>
                      setProduct({ ...product, Category: e.target.value })
                    }
                  />
                  <hr />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button>Close</button>
                {add ? (
                  <button onClick={addProduct}>Save</button>
                ) : (
                  <button onClick={updateProduct}>SAVE</button>
                )}
              </Modal.Footer>
            </Modal>
          </Tab>

          <Tab eventKey="orders" title="Orders">
            <TabContent />
            {orders.map((orders) => {
              return (
                <table className="table mt-3 order">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.cartItems.map((item) => {
                      return (
                        <tr>
                          <td>
                            <img src={item.imageURL} height="80" width="80" />
                          </td>

                          <td>{item.name}</td>
                          <td>{item.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              );
            })}
          </Tab>

          <Tab eventKey="contact" title="Contact" disabled></Tab>
        </Tabs>
      </Layout>
    </div>
  );
}

export default AdminPage;
