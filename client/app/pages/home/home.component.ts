import { Component, OnInit } from '@angular/core';
import {HotelsService} from '../../services/hotels.service';
import {Hotel} from '../../shared/models/hotel.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hotels: Hotel[];

  constructor(private hotelService: HotelsService) { }

  ngOnInit() {
    this.hotelService.getHotels().subscribe((hotels) => {
      this.hotels = hotels;
    }, (err) => {
      console.log(err);
    });
  }

}
