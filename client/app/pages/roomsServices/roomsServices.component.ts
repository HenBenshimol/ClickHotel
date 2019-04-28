import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastComponent } from '../../shared/toast/toast.component';
import {ServiceService} from '../../services/service.service';
import {Service} from '../../shared/models/service.model';

@Component({
  selector: 'app-roomsServices',
  templateUrl: './roomsServices.component.html',
  styleUrls: ['./roomsServices.component.scss']
})
export class RoomsServicesComponent implements OnInit {

  services: Service[] = [];
  types: String[] = [];
  isLoading = true;
  isEditing = false;

  constructor(private serviceService: ServiceService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getServicesType();
  }

  getServicesByType(type: String) {
    this.serviceService.getServicesByType(type).subscribe(
      data => this.services = data,
      error => console.log(error)
    );
  }

  getServicesType() {
    this.serviceService.getServicesType().subscribe((types) => {
      this.types = types;
      console.log("types " + this.types);
    }, (err) => {
      console.log(err);
    });
  }
}
