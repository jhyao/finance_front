import { Injectable } from '@angular/core';
import { Symbol } from './models/symbol';
import { Observable, of } from 'rxjs';
import { HttpSentEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  symbols_url = 'http://172.20.10.12:8080/symbols/allSymbols';

  constructor(private http: HttpClient) { }

  getSymbols(): Observable<Symbol[]> {
    return this.http.get<Symbol[]>(this.symbols_url);
  }

}
