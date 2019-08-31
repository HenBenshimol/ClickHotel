import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {GuestService} from '../../services/guest.service';

import {HotelsService} from '../../services/hotels.service';
import {Hotel} from '../../shared/models/hotel.model';

import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';

import { from } from 'rxjs';
import { GoogleMap } from '@agm/core/services/google-maps-types';

//declare var google: any;
declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-generalInfo',
  templateUrl: './generalInfo.component.html',
  styleUrls: ['./generalInfo.component.scss']
})

export class GeneralInfoComponent implements OnInit {

  @ViewChild(AgmMap)
  map: AgmMap;

  hotelName: string;
  hotel = new Hotel();
  geocoder: any;
  public hotelMarker: Marker;
  public hotelLocation: Location;
  lat: number;
  lng: number;

  constructor(private auth: AuthService,
              public mapsApiLoader: MapsAPILoader,
              private hotelService: HotelsService,
              private route: ActivatedRoute,
              private router: Router,
              public toast: ToastComponent) { 
                  this.mapsApiLoader.load().then(() => {
                  this.geocoder = new google.maps.Geocoder();
                });
              }

  ngOnInit() {
    this.route.queryParams.subscribe((params ) => {
      this.hotelName = params['hotel'];
      this.hotelService.getHotelByName(this.hotelName).subscribe((hotel) => {
        this.hotel = hotel;

        this.hotelMarker = null;
        this.hotelLocation = null;
      this.lat = 32.314528;
      this.lng = 34.862023;
        
      this.findLocation(hotel.location, hotel.name);
      }, (err) => {
      console.log(err);
    });   
  });                                                                    
  }
          
            
      findLocation(address, label = new String()) {
        console.info("placing marker on: " + address);
        if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
        this.geocoder.geocode({
          'address': address
        }, (results, status) => {
          console.log(results);
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0].geometry.location) {
              this.hotelLocation.lat = results[0].geometry.location.lat();
              this.hotelLocation.lng = results[0].geometry.location.lng();
              this.hotelLocation.marker.lat = results[0].geometry.location.lat();
              this.hotelLocation.marker.lng = results[0].geometry.location.lng();
              this.hotelLocation.marker.draggable = true;
              this.hotelLocation.viewport = results[0].geometry.viewport;
    
              this.hotelMarker = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
                draggable: false,
                label: label.toString()
              };
              
              this.map.triggerResize(false);
            }
          } else {
            alert("Sorry, this search produced no results.");
          }
        }
        )
      }
    
  }
