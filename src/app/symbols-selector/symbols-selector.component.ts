import { Component, OnInit } from '@angular/core';
import { Symbol } from '../models/symbol';

@Component({
  selector: 'app-symbols-selector',
  templateUrl: './symbols-selector.component.html',
  styleUrls: ['./symbols-selector.component.css']
})
export class SymbolsSelectorComponent implements OnInit {

  symbols: Symbol[];

  constructor() { }

  ngOnInit() {
  }

}
