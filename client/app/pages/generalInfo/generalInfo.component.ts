import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {HotelsService} from '../../services/hotels.service';
import {Hotel} from '../../shared/models/hotel.model';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';

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
  lat: number;
  lng: number;

  constructor(private auth: AuthService,
              public mapsApiLoader: MapsAPILoader,
              private hotelService: HotelsService,
              private route: ActivatedRoute,
              private router: Router,
              public toast: ToastComponent) { 
              }

  ngOnInit() {
    this.route.queryParams.subscribe((params ) => {
      this.hotelName = params['hotel'];
      this.hotelService.getHotelByName(this.hotelName).subscribe((hotel) => {
        this.hotel = hotel;
        this.lat = this.hotel.lat;
        this.lng = this.hotel.lng;
      }, (err) => {
        console.log(err);
      }); 
    });                                                                    
  }
}
