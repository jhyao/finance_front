import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Portfolio } from './models/portfolio';
import { config } from './config';
import { Observable, of } from 'rxjs';
import { HttpSentEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Symbol } from './models/symbol';
import { ObserveOnMessage } from '../../node_modules/rxjs/internal/operators/observeOn';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  url = config.api_url + config.all_portfolio;
  add_symbol_url = config.api_url + config.add_symbol_to_portfolio;
  delete_symbol_url = config.api_url + config.delete_symbol_from_portfolio;
  delete_portfolio_url = config.api_url + config.delete_portfolio;
  create_portfolio_url = config.api_url + config.create_portfolio;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllPortfolio(): Observable<Portfolio[]> {
    var user = this.loginService.getUser();
    if (!user || !user.userid) {
      return of([]);
    }
    let params = {
      id: user.userid.toString()
    }
    return this.http.get<any>(this.url, { params: params });
  }

  addSymbol(symbol: Symbol, portfolio: Portfolio): Observable<any> {
    let body = {
      portfolioid :portfolio.portfolioId,
			symbolid :symbol.symbolid
    }
    // let option = {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }
    // return this.http.post(this.add_symbol_url, body, option);
    return this.http.post(this.add_symbol_url, body);
  }

  deleteSymbol(symbol: Symbol, portfolio: Portfolio): Observable<any> {
    let body = {
      portfolioid :portfolio.portfolioId,
			symbolid :symbol.symbolid
    }
    return this.http.post<any>(this.delete_symbol_url, body);
  }

  deletePortfolio(portfolio: Portfolio): Observable<any>{
    let body = {
      "portfolioid":portfolio.portfolioId,
			"userid":this.loginService.getUser().userid
    }
    return this.http.post<any>(this.delete_portfolio_url, body);
  }

  createPortfolio(name: string): Observable<any> {
    let body = {
      "userid": this.loginService.getUser().userid,
			"portfolioname": name
    }
    return this.http.post<any>(this.create_portfolio_url, body);
  }




}
