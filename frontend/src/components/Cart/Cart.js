// name: Cart.js
// description: Display of the currently added items in the Cart.
// Also allows the customer to enter in their card information and pay.

import { withRouter, Link } from "react-router-dom";

// imports for UI styling
import { Header, List, Button, Icon, Grid, Card} from "semantic-ui-react"
import "./Cart.css"

// React import 
import React from 'react';

// for the Square Payment Page to allow user to pay
import PaymentPage from "../PaymentPage/PaymentPage";

// to update the cart if the user wants to remove items or update quantity.
import { useSelector, useDispatch } from 'react-redux'
import { SUB_QUANTITY, REMOVE_ITEM, ADD_QUANTITY } from "../actions/action-types/cart-actions"

// displays the current Cart of items as well as a payment page to 
// complete the transaction
function Cart(props) {

    // uses redux to collect the items in the cart currently
    // these are stored as JSONS
    const { addedItems } = useSelector(state => ({
        addedItems: state.addedItems
    }))

    // dispatch sends the event handler to update the cart to change an 
    // item quantity or remove an item.
    const dispatch = useDispatch()

    // items in the cart to be displayed
    // styles them for us
    const displayItems = (items) => {
        let display = items.length ?
            // map function is basically a "for each item,"
            (items.map(item => {
                return (
                    
                    /* each item is stored in a box */
                    <div>
                        <br></br>
                        {/* header is item name to distinguish the item */}
                        <Card className="cart-card" key={item.id}>
                            
                            <Card.Content>
                                <Card.Header textAlign="center">
                                    {item.item_name}
                                </Card.Header>
                                <Grid>
                                    <Grid.Column width={12}>
                                    {/*price, and quantity printed as text*/}
                                    <p></p>
                                    <p>Price: ${item.price}</p>
                                    Quantity: {item.quantity} 
                                    </Grid.Column>

                                    <Grid.Column width={4}>
                                    {/* Up/Down arrow to add/remove quantity */}
                                    <div className="up-arrow-icon">
                                        {/* up caret icon ^ */}
                                        <Icon className="caret up up-arrow" size="big" onClick={
                                            () => dispatch({ type: ADD_QUANTITY, id: item.id })}>
                                        </Icon>
                                    </div>
                                    <div className="down-arrow-icon">
                                        {/* down caret icon ^ */}
                                        <Icon className="caret down down-arrow" size="big" onClick={
                                            () => dispatch({ type: SUB_QUANTITY, id: item.id })}>                                            
                                        </Icon>
                                    </div>
                                    </Grid.Column>
                                </Grid>
                            </Card.Content>
                            
                            <Card.Content extra textAlign="center">
                                <a>
                                {/* "Remove from Cart" button */}
                                <Button className="remove-btn" onClick={
                                    () =>
                                        {dispatch({ type: REMOVE_ITEM, id: item.id })}}>Remove
                                </Button>
                                </a>
                            </Card.Content>
                        </Card>

                    </div>
                )})
            ) :

            (
                // if there aren't any items, then just say no items in cart
                <div className="ui hidden divider">
                    <h4 className="no-items">Nothing.</h4>
                </div>
            )

        return (
            <div className="container">
                <div className="cart">
                    <p />
                    <p />
                    {/* header for the order section */}
                    <h2 className="ui center aligned header">You have ordered:</h2>

                    {/* display is either "Nothing" or it's a list of boxes */ }
                    <div className="ui centered cards cart-grid">
                        <Card.Group itemsPerRow={6} stackable centered>
                            {display}
                        </Card.Group>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div>

            {/* displays the Cart stuff on one side */}
            <div>
                {displayItems(addedItems)}
            </div>

            {/* displays the payment page on the other side */}
            <div>
                <PaymentPage />
            </div>

        </div>


    );

}


export default withRouter(Cart);