// name: fetchMenu.js
// description: fetches the Menu from the database, so it can be displayed in Menu.js
// The menu items are stored in what is known as a Redux "store". This file
// initializes the "items" part of the Redux store by fetching them from the database.
// When a customer wants to add an item, the website takes it from the Redux store items
// and adds a copy of it to the "addedItems" section of the store. The store persists
// across files, which allows the customer to update the Cart from the Menu page.

// API request client, sends API requests to the backend server
import axios from "axios";

// action to get the menu items from the database to display
import {FETCH_MENU} from "./action-types/cart-actions"

// uses axios to get the menu items from the database
export function fetchMenu() {
    return async function(dispatch) {

      // look at backend/src/index.js at line 127 to see how we query the mySQL database to get the menu items
      // TODO: error handling for this
      // returns a JSON with key menuArr, this contains an array of JSONS. It looks kind of like this:
      // 
      return await axios.get(`${process.env.REACT_APP_API_URL}/get-menu-items`).then(({ data }) => {

        // defined below
        // dispatch means that the data in "payload" will be added to the redux store
        dispatch(setMenuDetails(data));
      });
    };
  }

// sends the into the redux store
// presets the redux store with the items in the menu from the database.
function setMenuDetails(data) {
    return {
      type: FETCH_MENU,
      payload: data.menuArr
    };
}

export default fetchMenu;
