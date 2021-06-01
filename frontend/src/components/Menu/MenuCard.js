// name: MenuCard.js
// description: Styles the MenuCard, which represents each
// individual item on the Menu.

import {React, useState} from "react";
import { withRouter } from "react-router-dom";
import { Card, Button } from "semantic-ui-react"

// Takes in the information of name/price/description, 
// returns a styled card
function MenuCard(props) {

    // reads in the necessary attributes from the parent class
    const { name, description, price, handleAdd} = props

    const [state, setState] = useState({active: 0})

    function activateButton() {
        setState((prevState) => ({ active: prevState.active += 1 }))
    }
    // styling of the menu card
    // using Semantic UI
    // https://react.semantic-ui.com/
    return (
        
        <div className="card-item">
            {/* Returning a Semantic UI Card element*/}
            <Card {...props}>
                
                {/* Displaying the name, description, and price*/}
                <Card.Content style={{ textAlign: 'center' }}>
                    <Card.Header className='item-name'>{name}</Card.Header>
                    <Card.Meta className='item-description three'>{description}</Card.Meta>
                    <Card.Meta className="item-description">${price}</Card.Meta>
                </Card.Content>
                
                {/* Styling the "Add to Cart" button as a Semantic Button */}
                <Card.Content extra className="add-button">
                    <Button onClick={() => {handleAdd(); activateButton();}} className="add-to-cart" active={state.active}
                    color={state.active? "green": null}>
                        {state.active? "Added!" : "Add to Cart"}
                    </Button>
                </Card.Content>
            
            </Card>
        </div>
    )

}

// allowing this to be imported in the Menu and used for each item.
export default withRouter(MenuCard);