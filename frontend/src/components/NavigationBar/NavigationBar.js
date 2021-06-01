import React, { Component, useState } from "react";
import {Menu, Image, Label} from "semantic-ui-react"

import { withRouter, Link } from "react-router-dom";
import "./NavigationBar.css"
import { useSelector, useDispatch } from 'react-redux'


// This function creates the menu bar seen on our website on every page of it
function NavigationBar(props) {

    // uses redux to collect the items in the cart currently
    // these are stored as JSONS
    const { quantity } = useSelector(state => ({
        quantity: state.quantity
    }))
    
    return (
    
        
        <div className="ui center aligned container">
            {/*beginning with a div}, ui compact menu are semantic built in styles*/}

    
           {/* makes the logo able to be shown in the top menu*/}
            <div className="ui compact menu">
    

            {/*creates the menu to be a large*/} 
            <Menu size='large' stackable>

                {/* The options at the top of the page menu*/}
                <Menu.Item className="logo-border" as={Link}  to='/'>
                    <Image src="/nns-logo.svg" size="small"/>
                </Menu.Item>

                <Menu.Item as={Link} to='/about-us'>
                    About Us
                </Menu.Item>

                <Menu.Item as={Link} to='/location'>
                    Location
                </Menu.Item>

                <Menu.Item as={Link} to='/menu'>
                    Menu
                </Menu.Item>

                <Menu.Item as={Link} to='/cart'>

                    <Label color='teal' floating size="large">
                        {quantity}
                    </Label>
                    Cart
                </Menu.Item>

            </Menu>
            </div>
            
        </div>
        

    )
}

export default withRouter(NavigationBar);
