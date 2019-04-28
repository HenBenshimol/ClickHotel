import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('loginModal') logonModal;
  @ViewChild('registerModal') registerModal;
  @ViewChild('checkinModal') checkinModal;
  @ViewChild('checkoutModal') checkoutModal;
@ViewChild('roomInfoModal') roomInfoModal;
  @ViewChild('hotelInfoModal') hotelInfoModal;
  
  headerClass: boolean;

  constructor(public auth: AuthService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        this.headerClass = event.url !== '/';
      }
    });
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: '', centered: true}).result.then((result) => {
    }, (err) => {

    });
  }

}
