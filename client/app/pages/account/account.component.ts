import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  user: User;
  isLoading = true;

  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private modalService: NgbModal,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).then(
      (data) => {
        this.user = data;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      });
  }

  save(user: User) {
    this.userService.editUser(user).subscribe(
      (res) => {
        this.modalService.dismissAll('');
        this.toast.setMessage('account settings saved!', 'success');
        location.reload();
      },
      error => console.log(error)
    );   
  }

}
