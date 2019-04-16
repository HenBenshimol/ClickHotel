import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastComponent } from '../../shared/toast/toast.component';
import {HotelsService} from '../../services/hotels.service';
import {Hotel} from '../../shared/models/hotel.model';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hotel = new Hotel();
  hotels: Hotel[] = [];
  isLoading = true;
  isEditing = false;

  addHotelForm: FormGroup;
  name = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  details = new FormControl('', Validators.required);
  image = new FormControl('', Validators.required);

  constructor(private hotelsService: HotelsService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getHotels();
    this.addHotelForm = this.formBuilder.group({
      name: this.name,
      location: this.location,
      details: this.details,
      image: this.image
    });
  }

  getHotels() {
    this.hotelsService.getHotels().subscribe(
      data => this.hotels = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addHotel() {
    this.hotelsService.addHotel(this.addHotelForm.value).subscribe(
      res => {
        this.hotels.push(res);
        this.addHotelForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(hotel: Hotel) {
    this.isEditing = true;
    this.hotel = hotel;
  }

  cancelEditing() {
    this.isEditing = false;
    this.hotel = new Hotel();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getHotels();
  }

  editHotel(hotel: Hotel) {
    this.hotelsService.editHotels(hotel).subscribe(
      () => {
        this.isEditing = false;
        this.hotel = hotel;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteHotel(hotel: Hotel) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.hotelsService.deleteHotel(hotel).subscribe(
        () => {
          const pos = this.hotels.map(elem => elem._id).indexOf(hotel._id);
          this.hotels.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
