import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Ranking} from '../shared/models/ranking.model';

@Injectable()
export class RankingService {

  constructor(private http: HttpClient) { }

  checkout(ranking: Ranking): Observable<Ranking> {
    return this.http.post<Ranking>('/api/checkout', ranking);
  }

  getRankings(): Observable<Ranking[]> {
    return this.http.get<Ranking[]>('/api/rankings');
  }

  countRankings(): Observable<number> {
    return this.http.get<number>('/api/rankings/count');
  }

  addRanking(ranking: Ranking): Observable<Ranking> {
    return this.http.post<Ranking>('/api/ranking', ranking);
  }

  getRanking(ranking: Ranking): Observable<Ranking> {
    return this.http.get<Ranking>(`/api/ranking/${ranking._id}`);
  }

  getRankingByDate(checkinDate: Date, checkoutDate: Date): Observable<String[]> {
    return this.http.get<String[]>(`/api/searchHotel/${checkinDate}/${checkoutDate}`);
  }

  editRanking(ranking: Ranking): Observable<any> {
    return this.http.put(`/api/ranking/${ranking._id}`, ranking, { responseType: 'text' });
  }

  deleteRanking(ranking: Ranking): Observable<any> {
    return this.http.delete(`/api/ranking/${ranking._id}`, { responseType: 'text' });
  }

}