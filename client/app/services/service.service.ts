import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Service} from '../shared/models/service.model';

@Injectable()
export class ServiceService {

  constructor(private http: HttpClient) { }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>('/api/services');
  }

  getServicesType(): Observable<String[]> {
    return this.http.get<String[]>('/api/servicesType');
  }
  
  getServicesByType(type: String): Observable<Service[]> {
    return this.http.get<Service[]>(`/api/serviceByType/${type}`);
  }

  countServices(): Observable<number> {
    return this.http.get<number>('/api/services/count');
  }

  addService(service: Service): Observable<Service> {
    return this.http.post<Service>('/api/service', service);
  }

  getService(service: Service): Observable<Service> {
    return this.http.get<Service>(`/api/service/${service._id}`);
  }

  editService(service: Service): Observable<any> {
    return this.http.put(`/api/service/${service._id}`, service, { responseType: 'text' });
  }

  deleteService(service: Service): Observable<any> {
    return this.http.delete(`/api/service/${service._id}`, { responseType: 'text' });
  }

}