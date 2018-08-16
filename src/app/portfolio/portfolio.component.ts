import { Component, OnInit } from '@angular/core';
import { Portfolio } from '../models/portfolio';
import { Router } from '../../../node_modules/@angular/router';
import { PortfolioService } from '../portfolio.service';
import { NgbModal, ModalDismissReasons } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { SymbolService } from '../symbol.service';
import { Symbol } from '../models/symbol';
import * as $ from 'jquery';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  portfolios: Portfolio[] = [];
  option_portfolio: Portfolio;
  new_name: string = '';

  constructor(
    private router: Router,
    private portfolioService: PortfolioService,
    private modalService: NgbModal,
    private symbolService: SymbolService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getPortfolio();
    this.symbolService.getSymbols().subscribe(symbols => this.search_symbols = symbols);
    this.checkLogin();
  }

  checkLogin() {
    if (this.loginService.getUser()) {

    } else {
      this.router.navigate(['/login', {redirectTo: '/portfolio'}]);
    }
  }

  closeResult: string;
  open(content, portfolio: Portfolio) {
    this.option_portfolio = portfolio;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  prefix: string = '';
  search_symbols: Symbol[] = [];
  error: string = '';

  showSearch(event: any) {
    this.prefix = event.target.value;
    this.symbolService.getSymbols().subscribe(symbols => {
      this.search_symbols = symbols.filter(symbol => symbol.symbol.startsWith(this.prefix));
    });
  }

  selectSymbol(symbol: Symbol) {
    $('#modal-close-btn').click();
    this.portfolioService.addSymbol(symbol, this.option_portfolio).subscribe(resp => {
      console.log(resp);
      if (resp.status == 'success') {
        this.option_portfolio.symbols.push(symbol);
      } else {
        this.error = 'Add symbol failed';
        alert(this.error);
      }
    });
    this.prefix = '';
  }

  removeSymbol(symbol: Symbol, portfolio: Portfolio) {
    this.portfolioService.deleteSymbol(symbol, portfolio).subscribe(resp => {
      if (resp.status == 'success') {
        portfolio.symbols.splice(portfolio.symbols.indexOf(symbol), 1);
      } else {
        this.error = 'Delete symbol failed';
        alert(this.error);
      }
    });
  }

  private getPortfolio() {
    this.portfolioService.getAllPortfolio().subscribe(portfolios => {
      this.portfolios = portfolios;
    });
  }

  showPortfolio(portfolio: Portfolio) {
    let ids = [];
    portfolio.symbols.forEach(symbol => {
      ids.push(symbol.symbol);
    });
    this.router.navigate(['/symbol', { ids: ids.join('|') }]);
  }

  removePortfolio(portfolio: Portfolio) {
    this.portfolioService.deletePortfolio(portfolio).subscribe(resp => {
      if (resp.error) {
        this.error = 'Delete portfolio failed, ' + resp.error;
        alert(this.error);
      } else {
        this.portfolios.splice(this.portfolios.indexOf(portfolio), 1);
      }
    });
  }

  createPortfolio() {
    if (this.new_name.length == 0) {
      this.error = "Empty portfolio name";
      alert(this.error);
      return;
    }

    if (this.portfolios.filter(item => item.portfolioName === this.new_name).length > 0) {
      this.error = "Portfolio " + this.new_name + " existed.";
      alert(this.error);
      return;
    }
    this.portfolioService.createPortfolio(this.new_name).subscribe(resp => {
      this.portfolios = resp;
      console.log(this.portfolios);
      this.new_name = '';
    })
    
  }

  toCompare(portfolio: Portfolio) {
    var ids = [];
    portfolio.symbols.forEach(symbol => {
      ids.push(symbol.symbol);
    });
    this.router.navigate(['/symbol', {ids: ids.join('|')}]);
  }



}
