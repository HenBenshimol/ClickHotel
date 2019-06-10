import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastComponent } from '../../shared/toast/toast.component';
import {ServiceService} from '../../services/service.service';
import {Service} from '../../shared/models/service.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  service = new Service();
  services: Service[] = [];
  isLoading = true;
  isEditing = false;

  addServiceForm: FormGroup;
  name = new FormControl('', Validators.required);
  hotelName = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  openHour = new FormControl('', Validators.required);
  closeHour = new FormControl('', Validators.required);
  needDetails = new FormControl('', Validators.required);
  details = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);

  constructor(private serviceService: ServiceService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getServices();
    this.addServiceForm = this.formBuilder.group({
      name: this.name,
      hotelName: this.hotelName,
      type: this.type,
      openHour: this.openHour,
      closeHour: this.closeHour,
      needDetails: this.needDetails,
      details: this.details,
      price: this.price
    });
  }

  getServices() {
    this.serviceService.getServices().subscribe(
      data => this.services = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addService() {
    this.serviceService.addService(this.addServiceForm.value).subscribe(
      res => {
        this.services.push(res);
        this.addServiceForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(service: Service) {
    this.isEditing = true;
    this.service = service;
  }

  cancelEditing() {
    this.isEditing = false;
    this.service = new Service();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getServices();
  }

  editService(service: Service) {
    this.serviceService.editService(service).subscribe(
      () => {
        this.isEditing = false;
        this.service = service;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteService(service: Service) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.serviceService.deleteService(service).subscribe(
        () => {
          const pos = this.services.map(elem => elem._id).indexOf(service._id);
          this.services.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}
