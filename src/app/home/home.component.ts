import { Component, OnInit } from '@angular/core';
import { SymbolService } from '../symbol.service';
import { Symbol } from '../models/symbol';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private symbolService: SymbolService,
    private router: Router
  ) { }

  all_symbols: Symbol[];
  symbols: Symbol[];
  prefix: string = '';

  ngOnInit() {
    this.getSymbols();
  }
  
  getSymbols() {
    this.symbolService.getSymbols().subscribe(symbols => {this.all_symbols= symbols; this.symbols=this.all_symbols});
  }

  showSearch(event: any) {
    this.prefix = event.target.value;
    this.symbols = this.all_symbols.filter(symbol => symbol.symbolId.startsWith(this.prefix));
  }

  toDetail(symbol: Symbol) {
    this.router.navigate(['/symbol/' + symbol.symbolId])
  }

}
