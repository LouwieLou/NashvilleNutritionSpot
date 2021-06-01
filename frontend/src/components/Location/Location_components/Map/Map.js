import React from 'react'
import GoogleMapReact from 'google-map-react'
import './Map.css'
// npm install --save-dev @iconify/react @iconify-icons/el
import { Icon, InlineIcon } from '@iconify/react';
import {Image} from "semantic-ui-react";
import mapMarker from '@iconify-icons/el/map-marker';



const Map = ({ location, zoomLevel }) => (
  <div className="map">
    <h1 className="map-h1">Come Visit!</h1>

    <div className="google-map">
          <figure>
              <Image centered src="/NNN_location.PNG" alt="Google Maps Location of Nashville Nutrition Spot"/>
          </figure>
    </div>
  </div>
)

  const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon={mapMarker} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  )

  export default Map