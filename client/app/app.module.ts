// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
// Services
import { UserService } from './services/user.service';
import { GuestService } from './services/guest.service';
import { RoomService } from './services/room.service';
import { HotelsService } from './services/hotels.service';
import { RankingService } from './services/ranking.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
// Components
import { AppComponent } from './app.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { RoomComponent } from './pages/room/room.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './layout/register/register.component';
import { CheckinComponent } from './layout/checkin/checkin.component';
import { CheckoutComponent } from './layout/checkout/checkout.component';
import { LoginComponent } from './layout/login/login.component';
import { LogoutComponent } from './layout/logout/logout.component';
import { ThankyouComponent } from './layout/thankyou/thankyou.component';
import { HotelInfoComponent } from './layout/hotelInfo/hotelInfo.component';
import { HotelHistoryComponent } from './pages/hotelHistory/hotelHistory.component';
import { AccountComponent } from './pages/account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    RoomComponent,
    AboutComponent,
    RegisterComponent,
    CheckinComponent,
    CheckoutComponent,
    LoginComponent,
    LogoutComponent,
    ThankyouComponent,
    HotelInfoComponent,
    HotelHistoryComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ['localhost:3000', 'localhost:4200']
      }
    }),
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    HotelsService,
    RoomService,
    UserService,
    GuestService,
    RankingService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
