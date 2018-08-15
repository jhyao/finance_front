import { Component, OnInit } from '@angular/core';
import { Portfolio } from '../models/portfolio';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  portfolios: Portfolio[] = [
    {
      portfolioid: 1,
      portfolioname: 'hello',
      createdate: 'xxx',
      userid: 1,
      symbols: [
        {
          symbolid: 1,
          symbol: 'a',
          companyname: 'aaasdfafsfdsddddddddddddddddddddddddddddddddddddddddddddddddd'
        },
        {
          symbolid: 2,
          symbol: 'b',
          companyname: 'bbb'
        },
        {
          symbolid: 3,
          symbol: 'c',
          companyname: 'ccc'
        },
      ]
    },
    {
      portfolioid: 2,
      portfolioname: 'great',
      createdate: 'xxx',
      userid: 1,
      symbols: [
        {
          symbolid: 1,
          symbol: 'a',
          companyname: 'aaa'
        },
        {
          symbolid: 2,
          symbol: 'b',
          companyname: 'bbb'
        },
        {
          symbolid: 3,
          symbol: 'c',
          companyname: 'ccc'
        },
      ]
    }
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  showPortfolio(portfolio: Portfolio) {
    let ids = [];
    portfolio.symbols.forEach(symbol => {
      ids.push(symbol.symbol);
    });
    this.router.navigate(['/symbol', {ids: ids.join('|')}]);
  }

}
