import { Component, OnInit, Input } from '@angular/core';
import * as echarts from 'echarts';
import * as $ from 'jquery';
import { PriceService } from '../price.service';
import { Symbol } from '../models/symbol';
import { take } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() symbols: Symbol[];
  filter = {
    fromDate: "2016-01-01",
    toDate: "2016-03-31",
    interval: "1d",
    symbols: [],
    chartType: 'k'
  };

  myChart: any;
  data: any;


  constructor(private priceService: PriceService) { }

  ngOnInit() {
    this.myChart = echarts.init($('#chart').get(0));
    this.getPrice();
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
  }

  getPrice() {
    this.priceService.getPrices(this.filter.fromDate, this.filter.toDate, this.filter.symbols, this.filter.interval)
      .subscribe(data => { this.data = this.splitData(data); this.showChart(); });
  }

  splitData(rawData) {
    var good_data = {
      symbols: [],
      price_datas: []
    }
    rawData.result.forEach(symbol_track => {
      good_data.symbols.push(symbol_track.symbol);

      var categoryData = [];
      var values = [];
      var volumes = [];
      var prices = [];
      var record_list = symbol_track.data;
      for (var i = 0; i < record_list.length; i++) {
        categoryData.push(record_list[i].splice(0, 1)[0]);
        values.push(record_list[i]);
        volumes.push([i, record_list[i][4], record_list[i][0] > record_list[i][1] ? 1 : -1]);
        prices.push(record_list[i][2]);
      }
      var price_data = {
        symbol: symbol_track.symbol,
        categoryData: categoryData,
        values: values,
        prices: prices,
        volumes: volumes
      };
      good_data.price_datas.push(price_data);
    });
    return good_data;
  }

  genKSerie(price_data: any) {
    let upColor = '#00da3c';
    let downColor = '#ec0000';
    let symbol_serie = {
      name: price_data.symbol,
      type: 'candlestick',
      data: price_data.values,
      itemStyle: {
        normal: {
          color: upColor,
          color0: downColor,
          borderColor: null,
          borderColor0: null
        }
      },
      tooltip: {
        formatter: function (param) {
          param = param[0];
          return [
            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
            'Open: ' + param.data[0] + '<br/>',
            'Close: ' + param.data[1] + '<br/>',
            'Lowest: ' + param.data[2] + '<br/>',
            'Highest: ' + param.data[3] + '<br/>'
          ].join('');
        }
      }
    }
    return symbol_serie;
  }

  genLSerie(price_data: any) {
    let symbol_serie = {
      name: price_data.symbol,
      type: 'line',
      data: price_data.prices,
      itemStyle: {
        normal: {

        }
      },
      tooltip: {
        formatter: function (param) {
          param = param[0];
          return [
            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
            'Open: ' + param.data[0] + '<br/>',
            'Close: ' + param.data[1] + '<br/>',
            'Lowest: ' + param.data[2] + '<br/>',
            'Highest: ' + param.data[3] + '<br/>'
          ].join('');
        }
      }
    }
    return symbol_serie;
  }

  genVolumeSerie(price_data: any) {
    return {
      name: 'Volume',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: price_data.volumes
    };
  }

  showChart() {
    this.myChart.showLoading();

    var upColor = '#00da3c';
    var downColor = '#ec0000';
    var good_data = this.data;

    var option = {
      backgroundColor: '#fff',
      animation: false,
      legend: {
        left: 'center',
        data: good_data.symbols
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000'
        },
        position: function (pos, params, el, elRect, size) {
          var obj = { top: 10 };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
          return obj;
        }
        // extraCssText: 'width: 170px'
      },
      axisPointer: {
        link: { xAxisIndex: 'all' },
        label: {
          backgroundColor: '#777'
        }
      },
      visualMap: {
        show: false,
        seriesIndex: 1,
        dimension: 2,
        pieces: [{
          value: 1,
          color: downColor
        }, {
          value: -1,
          color: upColor
        }]
      },
      grid: [
        {
          left: '10%',
          right: '8%',
          height: '50%'
        },
        {
          left: '10%',
          right: '8%',
          top: '63%',
          height: '16%'
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: good_data.price_datas[0].categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100
          }
        },
        {
          type: 'category',
          gridIndex: 1,
          data: good_data.price_datas[0].categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true
          }
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 98,
          end: 100
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'slider',
          top: '85%',
          start: 98,
          end: 100
        }
      ],
      series: []
    };
    for (var i = 0; i < this.data.symbols.length; i++) {
      let price_data = this.data.price_datas[i];
      if (i === 0) {
        if (this.filter.chartType === 'k') {
          let symbol_serie = this.genKSerie(price_data);
          option.series.push(symbol_serie);
        } else {
          let symbol_serie = this.genLSerie(price_data);
          option.series.push(symbol_serie);
        }
        let volume_serie = this.genVolumeSerie(price_data);
        option.series.push(volume_serie);
      } else {
        let symbol_serie = this.genLSerie(price_data);
        option.series.push(symbol_serie);
      }
    }
    this.myChart.hideLoading();
    this.myChart.setOption(option);
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

}
