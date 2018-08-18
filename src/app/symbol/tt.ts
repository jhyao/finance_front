function getTTPrice(price_data: any, num=10) {
    if (price_data.tt_price) {
        return price_data.tt_price;
    }
    let meta_data: any[] = price_data.meta_data.slice();
    meta_data.sort((a, b) => {return a[2] - b[2]});
    let tails = meta_data.slice(0, num);
    let tops = meta_data.slice(meta_data.length - num, meta_data.length);
    let result = [];
    for (let i = 0; i < tops.length; i++) {
        result.push([tops[num-i-1][0], tops[num-i-1][2], tails[i][0], tails[i][2]])
    }
    price_data.tt_price = result;
    return result;
}

function getTTVolume(price_data: any, num=10) {
    if (price_data.tt_volume) {
        return price_data.tt_volume;
    }
    let meta_data: any[] = price_data.meta_data.slice();
    meta_data.sort((a, b) => {return a[5] - b[5]});
    let tails = meta_data.slice(0, num);
    let tops = meta_data.slice(meta_data.length - num, meta_data.length);
    let result = [];
    for (let i = 0; i < tops.length; i++) {
        result.push([tops[num-i-1][0], tops[num-i-1][5], tails[i][0], tails[i][5]])
    }
    price_data.tt_volume = result;
    return result;
}

function getTTChange(price_data: any, num=10) {
    if (price_data.tt_change) {
        return price_data.tt_change;
    }
    let meta_data: any[] = price_data.meta_data.slice();
    meta_data.sort((a, b) => {return a[6] - b[6]});
    let tails = meta_data.slice(0, num);
    let tops = meta_data.slice(meta_data.length - num, meta_data.length);
    let result = [];
    for (let i = 0; i < tops.length; i++) {
        result.push([tops[num-i-1][0], tops[num-i-1][6], tails[i][0], tails[i][6]])
    }
    price_data.tt_change = result;
    return result;
}

function getTT(data, symbol, type='price', num=10) {
    let index = data.symbols.indexOf(symbol);
    if (index === -1) {
        return [];
    }
    let price_data = data.price_datas[index];
    switch (type) {
        case 'price':
            return getTTPrice(price_data, num);
        case 'volume':
            return getTTVolume(price_data, num);
        case 'change':
            return getTTChange(price_data, num);
    
        default:
            return [];
    }
}

export {
    getTT
}