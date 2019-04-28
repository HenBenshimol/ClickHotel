import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Hotel} from '../shared/models/hotel.model';

@Injectable()
export class HotelsService {

  constructor(private http: HttpClient) { }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>('/api/hotels');
  }

  countHotels(): Observable<number> {
    return this.http.get<number>('/api/hotels/count');
  }

  addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>('/api/hotel', hotel);
  }

  getHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.get<Hotel>(`/api/hotel/${hotel._id}`);
  }

  editHotels(hotel: Hotel): Observable<any> {
    return this.http.put(`/api/hotel/${hotel._id}`, hotel, { responseType: 'text' });
  }

  deleteHotel(hotel: Hotel): Observable<any> {
    return this.http.delete(`/api/hotel/${hotel._id}`, { responseType: 'text' });
  }

  getHotelByName(hotelName: String): Observable<Hotel> {
    return this.http.get<Hotel>(`/api/hotelByName/${hotelName}`);
  }

  

}
