import React, { Component, useState } from "react";
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react'
import { withRouter, Link } from "react-router-dom";
import "./AboutUs.css"

function AboutUs(props) {

    return (
    
    <div class="ui hidden divider">

        <div className="App" class="ui hidden divider">
        </div>

    
            <h1 class="ui center aligned header">
             <Header as="h1" size="large">
                    Our Story
                </Header>
                <div class="ui divider"></div>
                <div class="ui text container">
                    <div class="sub header">
                        <figure>
                            <img class="ui medium left floated image" src="/Owners.png" alt=""/>
                        </figure>
                        
                        <div class="our_storytext">
                            Founded in October 2020, Nashville Nutrition Spot aims to serve the best loaded teas and 
                            nutritional shakes. Raven and Andrew (as well as their little one) cannot wait to help you optimize your personal fitness goals.
                            Founded in October 2020, Nashville Nutrition Spot aims to serve the best loaded teas and 
                            nutritional shakes. Raven and Andrew (as well as their little one) cannot wait to help you optimize your personal fitness goals.
                            Founded in October 2020, Nashville Nutrition Spot aims to serve the best loaded teas and 
                            nutritional shakes. Raven and Andrew (as well as their little one) cannot wait to help you optimize your personal fitness goals.
                        </div> 
                    </div>
                </div>
                
            </h1>






    </div>

    )
}

export default withRouter(AboutUs);