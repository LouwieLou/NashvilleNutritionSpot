// name: cartReducer.js
// purpose: a "event handler" for redux store actions. Essentially, when a user
// decides to add to their cart, remove items, etc. the event is dispatched to
// this file, and then the redux store (the Cart) is updated based on what the user
// wants.

// import the various actions that we have defined in the cart-actions file
// these are "types", but really just strings. Each action type will elicit a different response from
// the cartReducer function
import { ADD_TO_CART, REMOVE_ITEM, ADD_QUANTITY, SUB_QUANTITY, FETCH_MENU } from '../actions/action-types/cart-actions'


// initialize state with empty items, empty "addedItems" - this is what the user adds to the cart
// then total is the total price of the "addedItems"
// each "addedItem" will have a quantity attached to it as well.
export const initialState = {
    items: [],
    addedItems: [],
    total: 0,
    quantity: 0
}

// this is the "dispatcher" function that handles "actions" that 
// are fired in.
// when a user wants to add an item to cart, the redux store
// generates an "action" of type ADD_CART, and then the ADD_CART
// part of this if/else branch is taken.
export const cartReducer = (state = initialState, action) => {

    // FETCH_MENU sends in a fetched list of menu items from the database
    // all this does is set the "items" part of the state to what is returned
    // from the database
    if (action.type === FETCH_MENU) {
        return {
            items: action.payload,
            addedItems: [],
            total: 0,
            quantity: 0
        }
    }

    // adds an item from "state.items" to "state.addedItems"
    if (action.type === ADD_TO_CART) {

        // find the item that you want to add
        let addedItem = state.items.find(item => item.id === action.id)

        //check if the action id exists in the addedItems already
        let existed_item = state.addedItems.find(item => action.id === item.id)

        // if the item exists, just add quantity 1 to it
        if (existed_item) {
            addedItem.quantity += 1
            return {
                ...state,
                // updating the total with the added Quantity price
                total: state.total + addedItem.price,
                quantity: state.quantity + 1
            }
        } 
        // if the item doesn't exist, enter it into addedItems with quantity 1
        else {
            addedItem.quantity = 1;

            //calculating the total price with the added item
            let newTotal = state.total + addedItem.price

            return {
                ...state,
                // adding the addedItem in
                addedItems: [...state.addedItems, addedItem],
                total: newTotal,
                quantity: state.quantity + 1
            }

        }

    // removes an item from "state.addedItems"
    } else if (action.type === REMOVE_ITEM) {
        // find the item needing to be removed in "state.addedItems"
        let itemToRemove = state.addedItems.find(item => item.id === action.id)

        // remove the item if it is in the state.addedItems array
        let new_items = state.addedItems.filter(item => action.id !== item.id)
        
        let item_removed = state.addedItems.find(item => action.id === item.id)

        //calculating the total price with the removed item
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)

        // return the updated state with the item removed
        return {
            ...state,
            addedItems: new_items,
            total: newTotal,
            quantity: state.quantity - item_removed.quantity
        }
    } 
    
    // adds 1 more of the item that is currently in cart
    else if (action.type === ADD_QUANTITY) {

        // find the item in the cart that needs a quantity to be added
        let addedItem = state.addedItems.find(item => item.id === action.id)

        // increment the quantity of the item 
        addedItem.quantity += 1

        // update the price
        let newTotal = state.total + addedItem.price

        // return updated state
        return {
            ...state,
            total: newTotal,
            quantity: state.quantity + 1
        }
    } 
    // same concept as ADD_QUANTITY, but removing 1 
    else if (action.type === SUB_QUANTITY) {

        // item to remove quantity 1 from
        let addedItem = state.addedItems.find(item => item.id === action.id)

        //if the qt == 1 and we want to subtract 1 then it should be removed
        if (addedItem.quantity === 1) {
            // removing item
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.price
            // returning cart with removed item
            return {
                ...state,
                addedItems: new_items,
                total: newTotal,
                quantity: state.quantity - 1
            }
        } 
        // subtracting 1, then returning cart
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal,
                quantity: state.quantity - 1
            }
        }
    }

    // if the action is of none of the types above, then just return the state
    // undefined action will give you a no-op
    else {
        return state
    }

}