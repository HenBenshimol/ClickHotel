import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Room} from '../shared/models/room.model';

@Injectable()
export class RoomService {

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>('/api/Rooms');
  }

  getRoomById(roomId: String): Observable<Room> {
    return this.http.get<Room>(`/api/roomId/${roomId}`);
  }

  countRoom(): Observable<number> {
    return this.http.get<number>('/api/Room/count');
  }

  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>('/api/room', room);
  }

  getRoom(room: Room): Observable<Room> {
    return this.http.get<Room>(`/api/room/${room._id}`);
  }

  editRoom(room: Room): Observable<any> {
    return this.http.put(`/api/room/${room._id}`, room, { responseType: 'text' });
  }

  deleteRoom(room: Room): Observable<any> {
    return this.http.delete(`/api/room/${room._id}`, { responseType: 'text' });
  }

}
