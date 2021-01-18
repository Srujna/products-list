import React from "react";import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

import SignIn from "./components/Login";
import Signup from "./components/Signup";
import ProductsList from "./components/ProductsList";
import AddProducts from "./components/AddProducts";
import Profile from "./components/Profile";

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/register">
          <Signup />
        </Route>
        <ProtectedRoute path="/products">
          <ProductsList />
        </ProtectedRoute>
        <ProtectedRoute path="/add-products">
          <AddProducts />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <Route exact path="/">
          <Redirect exact from="/" to="products" />
        </Route>
        <Route path="*">
          <Redirect from="/" to="products" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
