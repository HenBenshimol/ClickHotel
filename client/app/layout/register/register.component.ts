import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted = false;


  @Input('loginElement') loginElement: HTMLElement;
  @Input('registerModal') registerModal: HTMLElement;
  registerForm: FormGroup;
  fullName = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
    Validators.email
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
   role = new FormControl('', [
    Validators.required
   ]);

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private modalService: NgbModal,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      role: this.role
    });
  }

  setClassUsername() {
    return { 'has-danger': !this.fullName.pristine && !this.fullName.valid };
  }

  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  register() {
    this.submitted =true;

    if (this.registerForm.invalid)
      return;

    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        // this.router.navigate(['/login']);
        this.modalService.dismissAll('');
        this.modalService.open(this.loginElement);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }
}
