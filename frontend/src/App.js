// name: App.js
// description: Main page of the React App, contains each component.
// Maps out the routes, so localhost:3000/menu displays Menu.js

// import react, and routing (so links can load JS pages)
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components of the web app (Menu, Cart, Navigation Bar)
import Menu from "./components/Menu/Menu";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Cart from "./components/Cart/Cart";
import AboutUs from "./components/AboutUs/AboutUs"
import Home from "./components/Home/Home"
import Location from "./components/Location/Location"

// UI Styling
import './App.css';

// redux store, this is used to add to and update the cart
// also used to fetch and store the list of menu items
import { useSelector, useDispatch } from "react-redux"
import { fetchMenu } from "./components/actions/fetchMenu"

// returns the react App as a whole, composed of the various components
function App() {

  // this is to allow us to fetch the data and store it in redux store
  // aka the cart/menu storage 
  const dispatch = useDispatch()
  const state = useSelector(state => state.items.menuArr)

  // fetches the data to populate the menu, fetches all menu items from DB
  if (!state) {
    dispatch(fetchMenu())
  }

  return (
    <Router>
      
    <div className="ui hidden divider"> </div>

    <NavigationBar />

    <Switch>

    <Route exact path={"/"}
              render={props => (
                <Home />
              )}
      />
    
    <Route exact path={"/about-us"}
              render={props => (
                <AboutUs />
              )}
      />

    <Route exact path={"/location"}
              render={props=> (
                <Location />
              )
              }
      />

    
    <Route exact path={"/menu"}
              render={props => (
                <Menu />
              )}
      />

      <Route exact path={"/cart"}
        render={props=> (
          <Cart />
        )
        }
      />

    </Switch>
    </Router>
  );
}

export default App;
