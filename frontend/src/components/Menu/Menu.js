// name: Menu.js
// description: Display available menu items, with buttons for each
// that allow you to "add it to cart". If clicked, the cart
// will contain the menu item you added and you have the option
// to check out.

// imports, React and routing
import React, {useState} from "react";
import { withRouter } from "react-router-dom";

// UI styling
// https://react.semantic-ui.com/
// using Semantic UI to style components
import { Card, Accordion, Header} from "semantic-ui-react";
import "./Menu.css"

// styling for a menu item card for each menu item
import MenuCard from "./MenuCard";

// functionality for actually adding the item to cart
import { useSelector, useDispatch } from 'react-redux'
import { ADD_TO_CART } from '../actions/action-types/cart-actions'



// Menu() function displays the Menu items
function Menu(props) {

    // for redux state updates
    // this allows the "add to cart" functionality work
    // basically, if the button "add to cart" is pressed, the
    // dispatch will update the store to reflect that the
    // item was added.
    const dispatch = useDispatch()

    // sets the menu items to "state" so they can easily be accessed
    const items = useSelector(items => items.items)

    const [state, setState] = useState({activeIndex: 0})

    function handleClick(e, titleProps) {
        const {index} = titleProps
        const {activeIndex} = state
        const newIndex = activeIndex === index ? -1 : index
        setState({ activeIndex: newIndex })
    }

    const { activeIndex } = state

    // UI that is returned to the browser
    return (
        

        // The styling must be wrapped in a "div" element
        <div>
        
            <div>
                <div className="ui hidden divider" />
                <div className="ui hidden divider" />
                <div className="ui hidden divider" />
    
            </div>
            <Header as="h1" size="large" className="ui center aligned header menu-header">
                Order Today!
            </Header>
            <Accordion fluid styled>
                    <Accordion.Title 
                        active={activeIndex === 0}
                        content="Loaded Teas"
                        className="menu-title"
                        index={0}
                        onClick={handleClick}
                    />
                    <Accordion.Content
                        active={activeIndex===0}
                        content={(
                            <div>
                        
                            {/* Subsection for loaded tea items */}
                        
                            {/* Subheader description for teas */}
                            <h3 className="ui center aligned header">
                                200mg caffeine, 4 carbs, 24 calories, 0 sugar
                            </h3>
                            <h3 className="ui center aligned header">
                                Energy, Hunger Control, Mental Focus, Vitamins A, B, C, & E,
                                Calorie Burner, Immunity Booster
                            </h3>
                        
                            {/* displays tea items, fetches the array and filters it to only include teas*/}
                            <div className="ui centered cards">
                                <Card.Group itemsPerRow={6} stackable centered>
                                    {items && items.filter(item => item.category === "tea").map((item, i) => (
                        
                                        /* for each item, creates a card using the MenuCard.js component */
                                        /* card contains the name, description, and the price */
                                        <MenuCard key={i} name={item.item_name} description={item.description} price={item.price}
                        
                                            /* if the "Add To Cart" button is pressed, the cart is updated.
                                            The dispatcher sends the "ADD" action to the event handler
                                            This also sends the item id, which allows the event handler to 
                                            add the item name, description and price as an item to the cart. */
                                            handleAdd={() => dispatch({ type: ADD_TO_CART, id: item.id })} />
                                    ))}
                                </Card.Group>
                            </div>
                            </div>
                        )} />

                
                    <Accordion.Title
                            active={activeIndex === 1}
                            content="Shakes"
                            className="menu-title"
                            index={1}
                            onClick={handleClick}
                    />
                    <Accordion.Content
                        active={activeIndex === 1}
                        content={(
                            <div>
                            {/* Subsection for Meal Replacements, same as teas */}


                            {/* Subheader */}
                            <h3 className="ui center aligned header">
                                24-27 grams of protein, 5-10 grams of sugar,
                                10-14 net carbs, 200-250 calories
                            </h3>

                            {/* Menu Item card display */}
                            <div className="ui centered cards">
                                <Card.Group itemsPerRow={6} stackable centered>
                                    {items && items.filter(item => item.category === "shake").map((item, i) => (
                                        <MenuCard key={i} name={item.item_name} description={item.description} price={item.price} 
                                            /* if the "Add To Cart" button is pressed, the cart is updated.
                                            The dispatcher sends the "ADD" action to the event handler
                                            This also sends the item id, which allows the event handler to 
                                            add the item name, description and price as an item to the cart. */
                                            handleAdd={() => {
                                                dispatch({ type: ADD_TO_CART, id: item.id });
                                        }} />
                                    ))}
                                </Card.Group>
                            </div> 
                            </div>
                            )} />
                    <Accordion.Title
                        active={activeIndex === 2}
                        content="Beauty"
                        className="menu-title"
                        index={2}
                        onClick={handleClick}
                    />
                    <Accordion.Content
                        active={activeIndex === 2}
                        content={(
                        <div>
                            {/* Subsection for Beauty Line */}


                            {/* Subheaders */}
                            <h3 className="ui center aligned header">
                                115mg caffeine, 4 carbs, 45 calories, 0 sugar
                            </h3>
                            <h3 className="ui center aligned header">
                                Energy, Hunger Control, Mental Cocus, Calorie Burner,
                                Immunity Booster, Biotin/Collagen, Vitamins A, B, C, & E
                            </h3>

                            {/* Displays the subsection Menu Item cards */}
                            <div className="ui centered cards">
                                <Card.Group itemsPerRow={6} stackable centered>
                                    {items && items.filter(item => item.category === "beauty").map((item, i) => (
                                        <MenuCard key={i} name={item.item_name} description={item.description} price={item.price}
                                            handleAdd={() => dispatch({ type: ADD_TO_CART, id: item.id })} />
                                    ))}
                                </Card.Group>
                            </div> 
                        </div> )} />

                
                <Accordion.Title
                    active={activeIndex === 3}
                    content="Specialty"
                    className="menu-title"
                    index={3}
                    onClick={handleClick}
                />
                <Accordion.Content
                    active={activeIndex===3}
                    content={(
                        <div>
                        {/* Subsection for specialty Menu Items */}


                        {/* Subheaders */}
                        <h3 className="ui center aligned header">
                            115mg caffeine (1/2 caff), 200 mg caffeine (full caff),
                            9 carbs, 105 calories, 0 sugar
                        </h3>
                        <h3 className="ui center aligned header">
                            Energy, Hunger Control, Mental Focus, Calorie Burner,
                            Biotin/Collagen, Vitamins A, B, C, & E, 17 grams of Protein
                        </h3>

                        {/* Subsection Item Card Display */}
                        <div className="ui centered cards">
                            <Card.Group itemsPerRow={6} stackable centered>
                                {items && items.filter(item => item.category === "specialty").map((item, i) => (
                                    <MenuCard key={i} name={item.item_name} description={item.description} price={item.price}
                                        handleAdd={() => dispatch({ type: ADD_TO_CART, id: item.id })} />
                                ))}
                            </Card.Group>
                        </div>
                        </div>
                )} 
                />

                <Accordion.Title
                    active={activeIndex === 4}
                    content="Donut Holes"
                    className="menu-title"
                    index={4}
                    onClick={handleClick}
                />
                <Accordion.Content
                    active={activeIndex === 4}
                    content={(
                        <div>
                        {/* Subsection for specialty Donut Holes */}

                        {/* Subheaders */}
                        <h3 className="ui center aligned header">
                            Fat Burner and Hunger Control
                        </h3>

                        {/* Subsection Item Card Display */}
                        <div className="ui centered">
                            <Card.Group itemsPerRow={6} stackable centered>
                                {items && items.filter(item => item.category === "donut").map((item, i) => (
                                    <MenuCard key={i} name={item.item_name} description={item.description} price={item.price}
                                        handleclick={() => dispatch({ type: ADD_TO_CART, id: item.id })} />
                                ))}
                            </Card.Group>
                        </div>
                        </div>
                    )} 
                />

            
            </Accordion>

        </div>

    )
}


export default withRouter(Menu);
