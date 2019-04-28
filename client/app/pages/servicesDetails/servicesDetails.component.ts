import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastComponent } from '../../shared/toast/toast.component';
import {ServiceService} from '../../services/service.service';
import {Service} from '../../shared/models/service.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-servicesDetails',
  templateUrl: './servicesDetails.component.html',
  styleUrls: ['./servicesDetails.component.scss']
})
export class ServicesDetailsComponent implements OnInit {

  @Input('orderElement') orderElement: HTMLElement;
  
  servicesDet: Service[] = [];
  type: String;
  isLoading = true;
  isEditing = false;

  constructor(private serviceService: ServiceService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private router: Router,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
      console.log("dit type" + this.type);
    });
    
    this.getServicesByType(this.type);
  }

  getServicesByType(type: String) {
    this.serviceService.getServicesByType(type).subscribe(
      data => this.servicesDet = data,
      error => console.log(error)
    );
  }

  order(service: Service) {
    this.router.navigate(['/order'], { queryParams: { serviceId: service._id, service: service } });
  }
}
