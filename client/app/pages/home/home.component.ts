import { Component, OnInit, ViewChild } from '@angular/core';
import {HotelsService} from '../../services/hotels.service';
import {Hotel} from '../../shared/models/hotel.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('hotelInfoModal') hotelInfoModal;

  hotels: Hotel[];

  constructor(private hotelService: HotelsService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.hotelService.getHotels().subscribe((hotels) => {
      this.hotels = hotels;
    }, (err) => {
      console.log(err);
    });
  }

  getInfo(data){
    console.log(data);
    this.router.navigate(['/generalInfo'], { queryParams: { hotel: data } });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: '', centered: true}).result.then((result) => {
    }, (err) => {

    });
  }

}
