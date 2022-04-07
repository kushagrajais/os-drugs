import "./App.css";
import Homepage from "./pages/Homepage";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";

import Cartpage from "./pages/Cartpage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./stylesheets/layout.css";
import "./stylesheets/product.css";
import "./stylesheets/authentication.css";
import Productinfo from "./pages/Productinfo";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/AdminPage";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoutes>
                <Homepage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/Productinfo/:productid"
            exact
            element={
              <ProtectedRoutes>
                <Productinfo />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            exact
            element={
              <ProtectedRoutes>
                <Cartpage />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path="/orders"
            exact
            element={
              <ProtectedRoutes>
                <OrderPage />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            exact
            element={
              <ProtectedRoutes>
                <AdminPage />{" "}
              </ProtectedRoutes>
            }
          />
          <Route path="/login" exact element={<Loginpage />} />
          <Route path="/register" exact element={<Registerpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
export const ProtectedRoutes = ({children}) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
