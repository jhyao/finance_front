import { Injectable } from '@angular/core';
import { Symbol } from './models/symbol';
import { Observable, of } from 'rxjs';
import { HttpSentEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { config } from './config';
@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  symbols_url = config.api_url + config.symbol_api;
  symbols: Symbol[] = [];

  constructor(private http: HttpClient) { 
  }

  getSymbols(): Observable<Symbol[]> {
    if(this.symbols.length > 0) {
      return of(this.symbols);
    }
    return this.http.get<Symbol[]>(this.symbols_url);
  }

  saveSymbols(symbols: Symbol[]) {
    this.symbols = symbols;
  }
}
