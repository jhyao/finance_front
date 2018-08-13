var faker = require('faker');

function getPrice() {
    var data = {
        error: null,
        result: [
            {
                symbol: 'a',
                open: [],
                close: [],
                high: [],
                low: [],
                volume: [],
                time: [] 
            }
        ]
    };
    for (var i = 0; i < 1000; i++){
        data.result[0].open.push(faker.random.number({min: 10, max: 50}));
        data.result[0].close.push(faker.random.number({min: 10, max: 50}));
        data.result[0].high.push(faker.random.number({min: 10, max: 50}));
        data.result[0].low.push(faker.random.number({min: 10, max: 50}));
        data.result[0].volume.push(faker.random.number({min: 1000000, max: 100000000}));
        data.result[0].time.push(faker.date.past(2016));
    }
    return {price: data};
}




module.exports = getPrice;