import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastComponent } from '../../shared/toast/toast.component';
import {RoomService} from '../../services/room.service';
import {Room} from '../../shared/models/room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  room = new Room();
  rooms: Room[] = [];
  isLoading = true;
  isEditing = false;

  addRoomForm: FormGroup;
  hotelName = new FormControl('', Validators.required);
  roomNum = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  details = new FormControl('', Validators.required);
  availability = false;

  constructor(private roomService: RoomService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getRooms();
    this.addRoomForm = this.formBuilder.group({
      hotelName: this.hotelName,
      roomNum: this.roomNum,
      location: this.location,
      details: this.details,
      availability: this.availability
    });
  }

  getRooms() {
    this.roomService.getRooms().subscribe(
      data => this.rooms = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addRoom() {
    this.roomService.addRoom(this.addRoomForm.value).subscribe(
      res => {
        this.rooms.push(res);
        this.addRoomForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(room: Room) {
    this.isEditing = true;
    this.room = room;
  }

  cancelEditing() {
    this.isEditing = false;
    this.room = new Room();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getRooms();
  }

  editRoom(room: Room) {
    this.roomService.editRoom(room).subscribe(
      () => {
        this.isEditing = false;
        this.room = room;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteRoom(room: Room) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.roomService.deleteRoom(room).subscribe(
        () => {
          const pos = this.rooms.map(elem => elem._id).indexOf(room._id);
          this.rooms.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
