import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import { Map } from "mapbox-gl/dist/mapbox-gl"
import * as mapboxgl from "mapbox-gl/dist/mapbox-gl"

@Component({
  selector: 'neo-guide-poi',
  templateUrl: './guide-poi.component.html',
  styleUrls: ['./guide-poi.component.scss']
})
export class GuidePoiComponent implements OnInit {

  constructor() { }

  //@ViewChild('map') mapElement: ElementRef;
  map: mapboxgl.Map;

  ngOnInit() {
    // [to do: replace with a valid token]
    mapboxgl.accessToken = 'pk.eyJ1IjoicHJhbGluZTQwIiwiYSI6ImNrYmh5aTNqOTBhM2Yyem81NnI3a2hyMzAifQ.-Jq7YUy1fTIbegOvvl-4sA';
    // (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1Ijoia2Vlc2Jvb2ciLCJhIjoiY2ozZnV3OXg1MDAwazJ3bnJqZGZ4dG8waCJ9.6z0OByh7PPnar9WO7PDTFQ';
    this.map = new mapboxgl.Map({
      //container: this.mapElement.nativeElement,
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-77.04, 38.907],
      zoom: 11.15
    });

    this.map.on('load', (ev) => {

      // Add a layer showing the places.
      this.map.addLayer({
      "id": "places",
      "type": "symbol",
      "source": {
      "type": "geojson",
      // Liste de features 
      "data": {
      "type": "FeatureCollection",
      "features": [{
      "type": "Feature",
      "properties": {
        "description": "<strong>Make it Mount Pleasant</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
        "icon": "theatre"
      },
      "geometry": {
      "type": "Point",
      "coordinates": [-77.038659, 38.931567]
      }
      }, {
      "type": "Feature",
      "properties": {
        "description": "<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>",
        "icon": "theatre"
      },
      "geometry": {
      "type": "Point",
      "coordinates": [-77.003168, 38.894651]
      }
      }, {
      "type": "Feature",
      "properties": {
        "description": "<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>",
        "icon": "bar"
        },
      "geometry": {
      "type": "Point",
      "coordinates": [-77.090372, 38.881189]
      }
      }, {
      "type": "Feature",
      "properties": {
        "description": "<strong>Ballston Arts & Crafts Market</strong><p>The Ballston Arts & Crafts Market sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>",
        "icon": "art-gallery"
        },
      "geometry": {
      "type": "Point",
      "coordinates": [-77.111561, 38.882342]
      }
      }, {
      "type": "Feature",
      "properties": {
        "description": "<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>",
        "icon": "bicycle"
        },
      "geometry": {
      "type": "Point",
      "coordinates": [-77.052477, 38.943951]
      }
      }, {
      "type": "Feature",
      "properties": {
      "description": "<strong>Capital Pride Parade</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>",
      "icon": "star"
      },
      "geometry": {
      "type": "Point",
      "coordinates": [-77.043444, 38.909664]
      }
      }, {
      "type": "Feature",
      "properties": {
      "description": "<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>",
      "icon": "music"
      },
      "geometry": {
      "type": "Point",
      "coordinates": [-77.031706, 38.914581]
      }
      }, {
      "type": "Feature",
      "properties": {
      "description": "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>",
      "icon": "music"
      },
      "geometry": {
      "type": "Point",
      "coordinates": [-77.020945, 38.878241]
      }
      }, {
      "type": "Feature",
      "properties": {
      "description": "<strong>Truckeroo</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>",
      "icon": "music"
      },
      "geometry": {
      "type": "Point",
      "coordinates": [-77.007481, 38.876516]
      }
      }]
      }
      },
      "layout": {
      "icon-image": "{icon}-15",
      "icon-allow-overlap": true
      }
      });

      
      // Create a popup, but don't add it to the map yet.
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      this.map.on('mouseenter', 'places', (e) => {
        // Change the cursor style as a UI indicator.
        this.map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
          .setHTML(description)
          .addTo(this.map);
      });

      this.map.on('mouseleave', 'places', (e) => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });


    });//this.map.on('load',

    
  }// ngOnInit() 

}
