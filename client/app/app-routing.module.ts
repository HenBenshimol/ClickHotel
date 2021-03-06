// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Services
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
// Components
import { HotelsComponent } from './pages/hotels/hotels.component';
import { RoomComponent } from './pages/room/room.component';
import { ServiceComponent } from './pages/service/service.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './layout/register/register.component';
import { CheckinComponent } from './layout/checkin/checkin.component';
import { CheckoutComponent } from './layout/checkout/checkout.component';
import { LoginComponent } from './layout/login/login.component';
import { LogoutComponent } from './layout/logout/logout.component';
import { HotelHistoryComponent } from './pages/hotelHistory/hotelHistory.component';
import { AccountComponent } from './pages/account/account.component';
import { HelpComponent } from './layout/help/help.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { RoomInfoComponent } from './layout/roomInfo/roomInfo.component';
import { HotelInfoComponent } from './layout/hotelInfo/hotelInfo.component';
import { RoomsServicesComponent } from './pages/roomsServices/roomsServices.component';
import { ServicesDetailsComponent } from './pages/servicesDetails/servicesDetails.component';
import { OrderComponent } from './layout/order/order.component';
import { GuestAnalyticsComponent } from './pages/guestAnalytics/guestAnalytics.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GeneralInfoComponent } from './pages/generalInfo/generalInfo.component';
import { SearchHotelComponent } from './pages/searchHotel/searchHotel.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'hotels', component: HotelsComponent, canActivate: [AuthGuardLogin] },
  { path: 'guestAnalytics', component: GuestAnalyticsComponent, canActivate: [AuthGuardLogin] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardLogin] },
  { path: 'generalInfo', component: GeneralInfoComponent },
  { path: 'searchHotel', component:  SearchHotelComponent},
  { path: 'room', component: RoomComponent, canActivate: [AuthGuardLogin] },
  { path: 'service', component: ServiceComponent, canActivate: [AuthGuardLogin] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'checkin', component: CheckinComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'roomInfo', component: RoomInfoComponent },
  { path: 'hotelInfo', component: HotelInfoComponent },
  { path: 'order', component: OrderComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'hotelHistory', component: HotelHistoryComponent, canActivate: [AuthGuardLogin] },
  { path: 'roomsServices', component: RoomsServicesComponent, canActivate: [AuthGuardLogin] },
  { path: 'servicesDetails', component: ServicesDetailsComponent, canActivate: [AuthGuardLogin] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'help', component: HelpComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
