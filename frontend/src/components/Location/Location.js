import React, { Component, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import {Grid, Header} from "semantic-ui-react"
import {Menu} from "semantic-ui-react"
import {Card,Button} from "semantic-ui-react"
import "./Location.css"
import styled, {css} from 'styled-components';
import MapSegment from "./Location_components/Map/Map"


const DirectionsButton = styled.button`
background-color: gray;
color: white;
padding: 5px 15px;
border-radius: 5px;
outline: 0;
text-transform: uppercase;
`

const location = {
    address: 'Nashville Nutrition Spot',
    lat: 36.15071,
    lng: -86.79517,
  } 

function Location(props) {

    return(

    <div className="App" class="ui hidden divider">

        <div className="App" class="ui hidden divider">
        </div>

        <h1 class="ui center aligned header">
                <Header as="h1" size="large" dividing>
                    Location
                </Header>
        </h1>

        <Grid stackable columns={2}>
            <div class="black column">
                <div class="ui center aligned container">
                    <MapSegment location={location} zoomLevel={17} />
                </div>
            </div>
            <div class="column">
                <Grid stackable centered>

                    <Grid.Row>
                        <div class="ui center aligned container">
                                <p class="address">
                                    <h1 class="ui center aligned header">
                                        <p class="address_title">
                                            Address:
                                        </p>
                                    </h1>
                                    <p></p>
                                    <h2 class="ui center aligned header">
                                        1813 Divison St.
                                        <p></p>
                                        Nashville, TN 37203
                                    </h2>
                                    <p>
                                        <Button className="directions_button" 
                                            size="huge"
                                            onClick={(e)=>{
                                            e.preventDefault();
                                            window.open('https://goo.gl/maps/SkVGte8tbDMSSr5K8');
                                            }}>
                                            Get Directions
                                        </Button>      
                                    </p>
                                    <p></p>

                                    <h1 class="ui center aligned header">
                                    <p class="phone_number">
                                        Phone Number:
                                        </p>
                                    </h1>
                                    <h2 class="ui header">
                                    (615) 866-9900
                                    </h2>
                                </p>
                        </div>
                    </Grid.Row>
                    
                    <Grid.Row color={"black"}>
                        <div class="ui center aligned container">
                                <p class="hours">
                                    <h1 class="ui center aligned header">
                                        <p class="address_title">
                                            <p class="hours_title">
                                                Hours:
                                            </p>
                                        </p>
                                    </h1>
                                    <p></p>
                                    <h2 class="ui center aligned header">
                                        <p class="hours_title">
                                            6:00 AM - 6:30 PM Monday-Thursday
                                            <p></p>
                                            6:00 AM - 5:00 PM Friday
                                            <p></p>
                                            8:00 AM - 3:00 PM Saturday
                                            <p></p>
                                            <p></p>
                                            Closed on Sunday
                                        </p>
                                    </h2>
                                    <p></p>
                                </p>
                        </div>
                    </Grid.Row>
                </Grid>
            </div>

        </Grid>

        
        <br></br>


    </div>
    
    )

}

export default withRouter(Location);