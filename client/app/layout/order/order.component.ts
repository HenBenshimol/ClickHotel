import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { ServiceService } from '../../services/service.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Service } from 'client/app/shared/models/service.model';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  submitted = false;

  @Input('orderModal') orderModal: HTMLElement;
  orderForm: FormGroup;
  hotelName = this.auth.currentGuest.hotelName;
  roomId = this.auth.currentGuest.roomId;
  userId = this.auth.currentUser._id;
  serviceId: String;
  service: Service;
  date = new FormControl('', [
    Validators.required
  ]);
  startHour = new FormControl('', [
    Validators.required
  ]);
  details = new FormControl('', [
    Validators.required
  ]);

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              public toast: ToastComponent,
              private serviceService: ServiceService,
              private orderService: OrderService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.serviceId = params['serviceId'];
    });

    this.route.queryParams.subscribe(params => {
      this.service = params['service'];
    });
    

    this.orderForm = this.formBuilder.group({
      hotelName: this.hotelName,
      roomId: this.roomId,
      userId: this.userId,
      serviceId: this.serviceId,
      date: this.date,
      startHour: this.startHour,
      details: this.details
    });
  }

  order() {
    this.submitted =true;

    if (this.orderForm.invalid)
      return;

    this.orderService.addOrder(this.orderForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully order!', 'success');
        this.modalService.dismissAll('');
      },
      error => this.toast.setMessage('error', 'danger')
    );
  }
}
