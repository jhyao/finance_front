import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpSentEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  price_data_url = config.api_url + 'price';

  constructor(
    private http: HttpClient
  ) { }

  getPrices(dateFrom: string, dateTo: string, symbols: string[], interval: string): Observable<any>{
    let params = {
      from_date: dateFrom,
      to_date: dateTo,
      symbol: symbols.join('|'),
      interval: interval
    }
    return this.http.get<any>(this.price_data_url, {params: params});
  }
}
