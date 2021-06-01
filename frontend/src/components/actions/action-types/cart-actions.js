// file: cart-actions.js
// purpose: to describe actions that can be done to update the 
// state of the cart.


// These are action "types", which are defined as 
// variables for readability. Essentially, these are used
// to manage the Cart as users add, remove, or add/subtract
// menu items from the Cart.
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SUB_QUANTITY = 'SUB_QUANTITY';
export const ADD_QUANTITY = 'ADD_QUANTITY';

// this is used to fetch the menu by an API request.
// see backend/src/index.js line 127, this is the backend GET
// request that FETCH_MENU uses
export const FETCH_MENU = "FETCH_MENU";