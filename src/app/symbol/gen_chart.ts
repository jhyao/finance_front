function splitData(rawData) {
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
        var changes = [];
        var record_list = symbol_track.data;
        for (var i = 0; i < record_list.length; i++) {
            categoryData.push(record_list[i][0]);
            changes.push(record_list[i][6]);
            values.push(record_list[i].slice(1, 5));
            volumes.push([i, record_list[i][5], record_list[i][1] > record_list[i][2] ? 1 : -1]);
            prices.push(record_list[i][2]);
        }
        var price_data = {
            symbol: symbol_track.symbol,
            meta_data: record_list,
            categoryData: categoryData,
            values: values,
            prices: prices,
            volumes: volumes,
            changes: changes
        };
        good_data.price_datas.push(price_data);
    });
    return good_data;
}

function genKSerie(price_data) {
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

function genPriceLineSerie(price_data) {
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
                    'price: ' + param.data[0] + '<br/>',
                ].join('');
            }
        }
    }
    return symbol_serie;
}

function genVolumeLineSerie(price_data) {
    let symbol_serie = {
        name: price_data.symbol,
        type: 'line',
        data: price_data.volumes,
        itemStyle: {
            normal: {

            }
        },
        tooltip: {
            formatter: function (param) {
                param = param[0];
                return [
                    'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                    'volume: ' + param.data[0] + '<br/>',
                ].join('');
            }
        }
    }
    return symbol_serie;
}

function genChangeLineSerie(price_data) {
    let symbol_serie = {
        name: price_data.symbol,
        type: 'line',
        data: price_data.changes,
        itemStyle: {
            normal: {

            }
        },
        tooltip: {
            formatter: function (param) {
                param = param[0];
                return [
                    'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                    'Change: ' + param.data[0] + '<br/>',
                ].join('');
            }
        }
    }
    return symbol_serie;
}

function genVolumeBarSerie(price_data) {
    return {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: price_data.volumes
    };
}

function getEmptyOption(ids, data) {
    var upColor = '#00da3c';
    var downColor = '#ec0000';
    var option = {
        backgroundColor: '#fff',
        animation: false,
        legend: {
            left: 'center',
            data: ids
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
                left: '5%',
                right: '5%',
                top: 30,
                height: 300
            },
            {
                left: '5%',
                right: '5%',
                top: 350,
                height: 100
            }
        ],
        xAxis: [
            {
                type: 'category',
                data: data.price_datas[0].categoryData,
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
                data: data.price_datas[0].categoryData,
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
                },
                axisLabel: {
                    inside: true,
                    formatter: '{value}\n'
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
                start: 30,
                end: 70
            }
        ],
        series: []
    };
    return option;
}

function genKOption(data, ids) {

    var legend = data.symbols.filter(item => ids.includes(item));
    var option = getEmptyOption(legend, data);

    for (var i = 0; i < legend.length; i++) {
        let price_data = data.price_datas.filter(item => item.symbol === legend[i])[0];
        if (i === 0) {
            option.series.push(genKSerie(price_data));
            option.series.push(genVolumeBarSerie(price_data));
        } else {
            option.series.push(genPriceLineSerie(price_data));
        }
    }
    return option;
}

function genPriceLineOption(data, ids) {
    var legend = data.symbols.filter(item => ids.includes(item));
    var option = getEmptyOption(legend, data);

    for (var i = 0; i < legend.length; i++) {
        let price_data = data.price_datas.filter(item => item.symbol === legend[i])[0];
        option.series.push(genPriceLineSerie(price_data));
    }
    return option;
}

function genVolumeLineOption(data, ids) {
    var legend = data.symbols.filter(item => ids.includes(item));
    var option = getEmptyOption(legend, data);

    for (var i = 0; i < legend.length; i++) {
        let price_data = data.price_datas.filter(item => item.symbol === legend[i])[0];
        option.series.push(genVolumeLineSerie(price_data));
    }
    return option;
}

function genChangeLineOption(data, ids) {
    var legend = data.symbols.filter(item => ids.includes(item));
    var option = getEmptyOption(legend, data);

    for (var i = 0; i < legend.length; i++) {
        let price_data = data.price_datas.filter(item => item.symbol === legend[i])[0];
        option.series.push(genChangeLineSerie(price_data));
    }
    return option;
}

function genOption(data, ids, type) {
    var option = {};
    switch (type) {
        case 'k':
            option = genKOption(data, ids);
            break;
        case 'p':
            option = genPriceLineOption(data, ids);
            break;
        case 'v':
            option = genVolumeLineOption(data, ids);
            break;
        case 'c':
            option = genChangeLineOption(data, ids);
        default:
            break;
    }
    return option;
}


export {
    splitData,
    genOption
}