import { Component, OnInit } from '@angular/core';
import { Symbol } from '../models/symbol';

@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.css']
})
export class SymbolComponent implements OnInit {

  symbol: Symbol = { symbolId: 'a', symbolName: 'aaaa' };
  constructor() { }

  ngOnInit() {
  }

}
