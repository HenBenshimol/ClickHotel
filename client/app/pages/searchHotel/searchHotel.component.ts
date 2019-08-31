import { Component, OnInit, ViewChild } from '@angular/core';
import {HotelsService} from '../../services/hotels.service';
import {Hotel} from '../../shared/models/hotel.model';
import {Ranking} from '../../shared/models/ranking.model';
import {RankingService} from '../../services/ranking.service';
import { Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { hostViewClassName } from '@angular/compiler';

@Component({
  selector: 'app-searchHotel',
  templateUrl: './searchHotel.component.html',
  styleUrls: ['./searchHotel.component.scss']
})
export class SearchHotelComponent implements OnInit {

  ranking: String[];
  hotels: Hotel[];
  searchForm: FormGroup;
  numRanks = new FormControl('', []);
  avgRate = new FormControl('', []);
  checkinDate = new FormControl('', []);
  checkoutDate = new FormControl('', []);

  checkin = new Date();
  checkout= new Date();
  count = 0;
  avg = 0;
  ranks = [];

  constructor(private hotelService: HotelsService,
              private rankingService: RankingService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.hotelService.getHotels().subscribe((hotels) => {
      this.hotels = hotels;
    }, (err) => {
      console.log(err);
    });

    this.searchForm = this.formBuilder.group({
      numRanks: this.numRanks,
      avgRate: this.avgRate,
      checkinDate: this.checkinDate,
      checkoutDate: this.checkoutDate
    });
  }

  search(){
    this.avg = this.searchForm.value.avgRate || 0;
    this.count = this.searchForm.value.numRanks || 0;
    this.checkin = this.searchForm.value.checkinDate || null;
    this.checkout = this.searchForm.value.checkoutDate || null;

    if(this.avg != 0 || this.count != 0 || this.checkin != null || this.checkout != null)
    {
      // if null, set checkin defult - 1999
      if(this.checkin == null)
      {
        this.checkin = (new Date("1999-01-01"));
      }

      // if null, set checkout defult - today
      if(this.checkout == null)
      {
        this.checkout = new Date();
      }

      // get Search
      this.rankingService.getRankingByDate(this.checkin, this.checkout).subscribe((ranks) => {
        this.ranks = ranks;
        this.hotels = [];
        this.ranks.forEach(element => {
          if((element.count >= this.count) && ((element.total/element.count) >= this.avg)){
            this.hotelService.getHotelByName(element._id.hotelName).subscribe((hotel) => {
              this.hotels.push(hotel);
            }, (err) => {
              console.log(err);
            });
          }
        });  
      }, (err) => {
        console.log(err);
      });
    }  
  }
}
