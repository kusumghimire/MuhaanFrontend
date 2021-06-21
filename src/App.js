import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import {
  Dashboard,
  MainCategory,
  SubCategory,
  TimeSlot,
  Banner,
  ServiceProvider,
  Orders,
  Review,
  Customers,
  Login,
  ProcessingOrder,
  MakeDecision,
  Reset,
  Logout,
  AddOn,
  Services,
  Zone
} from "./pages";
import AddTutorial from "./pages/Add/add";
import AddTutorialCategory from "./pages/SubCategory/add";
import AddZone from "./pages/Zone/add";
import UpdateMainCategory from "./pages/MainCategory/edit";
import useToken from "./useToken";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <Switch>
        <MainLayout setToken={setToken} token={token}>
          {/* <MainLayout > */}
          <Route path="/add" component={AddTutorial} />
          <Route path="/add-category" component={AddTutorialCategory} />
          <Route path="/add-zone" component={AddZone} />

          <Route path="/" exact component={Dashboard} />
          <Route path="/main-category" component={MainCategory} />
          <Route path="/sub-category" component={SubCategory} />
          <Route path="/add-on" component={AddOn} />
          <Route path="/services" component={Services} />
          <Route path="/zone" component={Zone} />

          <Route path="/time-slot" component={TimeSlot} />
          <Route path="/banner" component={Banner} />
          <Route path="/service-provider" component={ServiceProvider} />
          <Route path="/orders" component={Orders} />
          <Route path="/make-decision" component={MakeDecision} />
          <Route path="/processing-orders" component={ProcessingOrder} />
          <Route path="/review" component={Review} />
          <Route path="/customers" component={Customers} />
          <Route path="/logout" component={Logout} />

          <Route path="/category/update/:id" component={UpdateMainCategory} />
        </MainLayout>
      </Switch>
    </Router>
  );
}

export default App;
