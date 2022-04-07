import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { async } from "@firebase/util";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";

function Cartpage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let tmp = 0;
    cartItems.forEach((cartItem) => {
      tmp = parseInt(tmp) + parseInt(cartItem.price);
    });
    setTotalAmount(tmp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const deleteFromCart = (products) => {
    dispatch({ type: "DELETE FROM CART", payload: products });
  };

  const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      pinCode,
      phoneNumber,
    };
    console.log(addressInfo);

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };
    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, "order"), orderInfo);
      setLoading(false);
      toast.success("Order placed successfully");
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error("Order failed");
    }
  };

  return (
    <div>
      <Layout loading={loading} />
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
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
                <td>{item.price}</td>
                <td>
                  <FaTrash onClick={() => deleteFromCart(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end ">
        <h1 className="total-amount"> Total Amount = {totalAmount} Rs/- </h1>
      </div>
      <div className="d-flex justify-content-end mt-3 ">
        <button onClick={handleShow}>ORDER</button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="register-form">
            <h2>Register</h2>
            <hr />

            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <textarea
              className="form-control"
              rows={3}
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="PinCode"
              value={pinCode}
              onChange={(e) => {
                setPinCode(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />

            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={placeOrder}>Place Order</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cartpage;
