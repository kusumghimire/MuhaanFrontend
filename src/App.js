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
  CancelledOrder,
  CompletedOrder,
  MakeDecision,
  Reset,
  Logout,
  AddOn,
  Services,
  Zone,
} from "./pages";
import AddTutorial from "./pages/Add/add";
import AddTutorialCategory from "./pages/SubCategory/add";
import AddOnListAdd from "./pages/AddOn/add";
import AddOnEdit from "./pages/AddOn/edit";
import AddZone from "./pages/Zone/add";
import AddServices from "./pages/Services1/add";
import EditServices from "./pages/Services1/edit";
import AddServiceProvider from "./pages/ServiceProvider/add";
import UpdateMainCategory from "./pages/MainCategory/edit";
import UpdateZone from "./pages/Zone/edit";
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
          <Route exact  path="/add" component={AddTutorial} />
          <Route exact path="/add-category" component={AddTutorialCategory} />
          <Route exact path="/zone/add" component={AddZone} />

          <Route exact path="/"  component={Dashboard} />
          <Route exact path="/main-category" component={MainCategory} />
          <Route exact path="/sub-category" component={SubCategory} />

          <Route exact path="/add-on" component={AddOn} />
          <Route exact path="/add-on/addlist" component={AddOnListAdd} />
          <Route exact path="/add-on/update/:id" component={AddOnEdit} />

          <Route exact path="/services" component={Services} />
          <Route exact path="/services/add" component={AddServices} />
          <Route exact path="/services/update/:id/" component={EditServices} />

          <Route exact path="/zone" component={Zone} />

          <Route exact path="/time-slot" component={TimeSlot} />
          <Route exact path="/banner" component={Banner} />
          <Route exact path="/service-provider" component={ServiceProvider} />
          <Route exact path="/service-provider/add" component={AddServiceProvider} />

          <Route exact path="/orders" component={Orders} />
          <Route exact path="/make-decision" component={MakeDecision} />
          <Route exact path="/processing-orders" component={ProcessingOrder} />
          <Route exact path="/cancelled-orders" component={CancelledOrder} />
          <Route exact path="/completed-orders" component={CompletedOrder} />

          <Route exact path="/review" component={Review} />
          <Route exact path="/customers" component={Customers} />
          <Route exact path="/logout" component={Logout} />

          <Route exact path="/category/update/:id" component={UpdateMainCategory} />
          <Route exact path="/zone/update/:id" component={UpdateZone} />
        </MainLayout>
      </Switch>
    </Router>
  );
}

export default App;
