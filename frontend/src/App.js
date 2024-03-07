import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { isUserLoggedIn, getInitialData } from "./actions";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Employee from "./containers/Employee";
import Inventory from "./containers/Inventory";
import Purchases from "./containers/Purchases";
import Reports from "./containers/Reports";
//import PrivateRoute from "./HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import Category from "./containers/Category";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //checking user logging and getting initial data
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, []);

  return (
    <div>
      <Routes>
      <Route path="/"  element={<Home></Home>} />
       
        <Route path="/products"  element={<Products></Products>} />
        <Route path="/orders" element={<Orders></Orders>} />
        <Route path="/categories" element={<Category></Category>} />
        <Route path="/employee" element={<Employee></Employee>} />
        <Route path="/reports" element={<Reports></Reports>} />
        <Route path="/inventory" element={<Inventory></Inventory>} />
        <Route path="/purchases" element={<Purchases></Purchases>} />


        <Route path="/signin" element={<Signin></Signin>} />
        <Route path="/signup" element={<Signup></Signup>} />

        
      </Routes>
    </div>
  );
}

export default App;



