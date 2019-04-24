import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Guest } from '../shared/models/guest.model';

@Injectable()
export class GuestService {

  constructor(private http: HttpClient) { }

  checkin(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>('/api/checkin', guest);
  }

  getGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>('/api/guests');
  }

  getGuestByUserId(userId: String): Observable<Guest[]> {
    return this.http.get<Guest[]>(`/api/hotelHistory/${userId}`);
  }

  getActiveGuest(userId: String): Observable<Guest> {
    return this.http.get<Guest>(`/api/activeGuest/${userId}`);
  }

  countGuests(): Observable<number> {
    return this.http.get<number>('/api/guest/count');
  }

  addGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>('/api/guest', guest);
  }

  getGuest(guest: Guest): Promise<Guest> {
    return this.http.get<Guest>(`/api/guest/${guest._id}`).toPromise();
  }

  editGuest(guest: Guest): Observable<any> {
    return this.http.put(`/api/guest/${guest._id}`, guest, { responseType: 'text' });
  }

  deleteGuest(guest: Guest): Observable<any> {
    return this.http.delete(`/api/guest/${guest._id}`, { responseType: 'text' });
  }

}
