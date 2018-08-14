import { Component, OnInit } from '@angular/core';
import { Symbol } from '../models/symbol';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { SymbolService } from '../symbol.service';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.css']
})
export class SymbolComponent implements OnInit {
  prefix: string = '';
  search_symbols: Symbol[] = [];

  ids: string[] = [];

  symbols: Symbol[] = [];
  active_symbols: Symbol[] = [];
  constructor(private route: ActivatedRoute, private symbolService: SymbolService, private modalService: NgbModal) { }

  closeResult: string;
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }

  showSearch(event: any) {
    this.prefix = event.target.value;
    this.symbolService.getSymbols().subscribe(symbols => {
      this.search_symbols = symbols.filter(symbol => symbol.symbol.startsWith(this.prefix));
    });
  }

  selectSymbol(symbol: Symbol) {
    $('#modal-close-btn').click();
    this.symbols.push(symbol);
    this.active_symbols.push(symbol);
  }

  ngOnInit() {
    this.ids = this.route.snapshot.paramMap.get('ids').split('|');
    console.log(this.ids);
    this.symbolService.getSymbols().subscribe(symbols => {
      this.symbolService.saveSymbols(symbols);
      this.symbols = symbols.filter(symbol => this.ids.includes(symbol.symbol));
      this.active_symbols = this.symbols.slice();
      console.log(this.symbols);
    }
    )
  }

  remove(symbol: Symbol) {
    console.log('remove');
    if (this.symbols.length == 1) {
      return;
    }
    var index = this.symbols.indexOf(symbol);
    this.symbols.splice(index, 1);
    var active_index = this.active_symbols.indexOf(symbol);
    if (active_index !== -1) {
      this.active_symbols.splice(active_index, 1);
    }
  }

  removeActive(symbol: Symbol) {
    console.log('remove actove');

    let pos = this.active_symbols.indexOf(symbol);
    let id = 'symbol-' + symbol.symbol;
    if (pos == -1) {
      this.active_symbols.push(symbol);
      $('#symbol-' + symbol.symbol).addClass('active');
    } else {
      this.active_symbols.splice(pos, 1);
      $('#symbol-' + symbol.symbol).removeClass('active');
    }
  }

}
