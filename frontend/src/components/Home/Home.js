import React, { Component, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Button, Grid, Image, Popup } from "semantic-ui-react"
import "./Home.css"
import styled, {css} from 'styled-components';

const OrderButton = styled.button`
background-color: gray;
color: white;
padding: 5px 15px;
border-radius: 5px;
outline: 0;
text-transform: uppercase;
`

function Home(props) {

    return(

    <div className="App" className="ui hidden divider">
    
        
        { <h2 className="snippet">
             Nashville Nutrition Spot is your stop for quick, great tasting healthy shakes and loaded teas!
        </h2> }
        
        <div className="orderbutton">
            <Button as={Link} to='/menu' className="order-now" size="massive">
                Order Now!
            </Button>
        </div>

        <h2 className="smoothie_week">
            Featured Drinks Gallery
        </h2>

        <Grid centered columns={3} stackable >
            <Grid.Row columns={3} centered >
                <Grid.Column width={4} centered>
                    <Popup basic size="huge" position="left center" trigger={(
                        <Image src="/Captain_America.jpg" fluid/>)}>
                        <Popup.Content>
                            Captain America
                        </Popup.Content>
                    </Popup>
                </Grid.Column>
                <Grid.Column width={4} centered>
                    <Popup basic size="huge" position="left center" trigger={(
                        <Image src="/banana-pudding.jpg" fluid/>)}>
                        <Popup.Content>
                            Banana Pudding
                        </Popup.Content>
                    </Popup>
                </Grid.Column>
                <Grid.Column width={4} centered>
                    <Popup basic size="huge" position="left center" trigger={(
                        <Image src="/Drink.jpeg" fluid/>)}>
                        <Popup.Content>
                            Blue Raspberry
                        </Popup.Content>
                    </Popup>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3} centered > 
            <Grid.Column width={4} centered>
                    <Popup basic size="huge" position="left center" trigger={(
                        <Image src="/fuzzy-navel.jpg" fluid/>)}>
                        <Popup.Content>
                            Fuzzy Navel
                        </Popup.Content>
                    </Popup>
                </Grid.Column>
                <Grid.Column width={4} centered>
                    <Popup basic size="huge" position="left center" trigger={(
                        <Image src="/hocus-pocus.jpg" fluid/>)}>
                        <Popup.Content>
                            Hocus Pocus
                        </Popup.Content>
                    </Popup>
                </Grid.Column>
                <Grid.Column width={4} centered>
                    <Popup basic size="huge" position="left center" trigger={(
                        <Image src="/perspective-smoothies.jpg" fluid/>)}>
                        <Popup.Content>
                            Perspective Smoothies
                        </Popup.Content>
                    </Popup>                
                    </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3} centered >
                <Grid.Column width={4} centered>
                    <Popup basic size="huge" position="left center" trigger={(
                        <Image src="/watermelon_crawl.jpg" fluid/>)}>
                        <Popup.Content>
                            Watermelon Crawl
                        </Popup.Content>
                    </Popup>
                </Grid.Column>
                <Grid.Column width={4} centered>
                    <Popup basic size="huge" position="left center" trigger={(
                        <Image src="/smoothie-line.jpeg" fluid/>)}>
                        <Popup.Content>
                            Smoothie Line
                        </Popup.Content>
                    </Popup>
                </Grid.Column>
                <Grid.Column width={4} centered>
                    <Popup basic size="huge" position="left center" trigger={(
                        <Image src="/triple-smoothie.jpg" fluid/>)}>
                        <Popup.Content>
                            Triple Smoothie
                        </Popup.Content>
                    </Popup>                
                </Grid.Column>
                
            </Grid.Row>
        </Grid>

        {/* <div class="pictures">
            <figure>
                <img class="captain_america" src="/Captain_America.jpg"/>
                <figcaption className="captain_america_caption">
                    Captain America
                </figcaption>
            </figure>

            <figure>
                <img class="watermelon_crawl" src="/watermelon_crawl.jpg"/>
                <figcaption className="watermelon_crawl_caption">
                    Watermelon Crawl
                </figcaption>
            </figure>
        </div> */}
    
        <div className="App" class="ui horizontal divider">
        </div>

        <div className="App" class="ui hidden divider">
        </div>
      
        <h1 class="Quote">
            "This place is ABSOLUTELY AMAZING! Just go down the menu! You won't be disappointed! Be careful not to become too obsessed."
            <br></br>
        </h1>
    </div>
    
    )

}

export default withRouter(Home);