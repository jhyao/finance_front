import { Component, OnInit } from '@angular/core';
import { Symbol } from '../models/symbol';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { SymbolService } from '../symbol.service';
import * as echarts from 'echarts';
import * as $ from 'jquery';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PriceService } from '../price.service';
import { splitData, genOption } from './gen_chart';
import { getTT } from './tt';

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

  tt = {
    symbol: '',
    data: [],
    type: 'price'
  }

  filter = {
    fromDate: "2016-01-01",
    toDate: "2016-03-31",
    interval: "1d",
    symbols: this.symbols,
    chartType: 'k'
  };

  myChart: any;
  data: any;

  constructor(
    private route: ActivatedRoute,
    private symbolService: SymbolService,
    private modalService: NgbModal,
    private priceService: PriceService
  ) { }

  closeResult: string;
  open(content) {
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
    this.refreshChart(true);
    this.prefix = '';
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
    this.refreshChart(false);
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
    this.refreshChart(false);
  }

  ngOnInit() {
    var ids = this.route.snapshot.params['ids'];
    if (ids) {
      this.ids = ids.split('|');
    } 
    console.log(this.ids);
    this.symbolService.getSymbols().subscribe(symbols => {
      this.symbolService.saveSymbols(symbols);
      this.symbols = symbols.filter(symbol => this.ids.includes(symbol.symbol));
      this.active_symbols = this.symbols.slice();
      this.search_symbols = this.symbols.slice();
      console.log(this.symbols);
      this.myChart = echarts.init($('#chart').get(0));
      if (this.symbols.length > 0) {
        this.getPrice();
        this.tt.symbol = this.symbols[0].symbol;
      }

    });
  }

  refreshDate() {
    $('#from-date').attr('max', this.filter.toDate);
    $('#to-date').attr('min', this.filter.fromDate);
    this.getPrice();
  }

  refreshInterval() {
    this.getPrice();
  }

  refreshType() {
    this.showChart();
    let tt_type = 'price';
    switch(this.filter.chartType){
      case 'k':
        tt_type = 'price';
        break;
      case 'l':
        tt_type = 'price';
        break;
      case 'v':
        tt_type = 'volume';
        break;
      case 'c':
        tt_type = 'change';
        break;
      default:
        tt_type = 'price';
        break;
    }
    if (tt_type !== this.tt.type) {
      this.tt.type = tt_type;
      this.calculate_tt();
    }
  }

  refreshChart(newdata: boolean) {
    if (newdata) {
      this.getPrice();
    } else {
      this.showChart();
    }
  }

  getPrice() {
    let ids: string[] = [];
    this.symbols.forEach(symbol => {
      ids.push(symbol.symbol);
    });
    console.log(ids);
    this.priceService.getPrices(this.filter.fromDate, this.filter.toDate, ids, this.filter.interval)
      .subscribe(data => { 
        this.data = splitData(data); 
        this.showChart(); 
        this.calculate_tt();
      });
  }
  
  showChart() {
    this.myChart.showLoading();

    var active_ids = [];
    this.active_symbols.forEach(symbol => {
      active_ids.push(symbol.symbol);
    });

    var good_data = this.data;

    var option = genOption(this.data, active_ids, this.filter.chartType);
    console.log(option);

    this.myChart.hideLoading();
    this.myChart.setOption(option, true);
    this.myChart.dispatchAction({
      type: 'brush',
      areas: [
        {
          brushType: 'lineX',
          coordRange: ['2016-06-02', '2016-06-20'],
          xAxisIndex: 0
        }
      ]
    });
  }

  clearChart() {
    this.myChart.setOption({}, true);
  }

  calculate_tt() {
    this.tt.data = getTT(this.data, this.tt.symbol, this.tt.type, 10);
  }
}
