var faker = require('faker');

function getSymbols() {
    var data = [];
    data.push({
        symbolid: 1,
        symbol: 'a',
        companyname: 'Axxfs'
    });
    data.push({
        symbolid: 2,
        symbol: 'b',
        companyname: 'Bsdgfd'
    });
    data.push({
        symbolid: 3,
        symbol: 'c',
        companyname: 'Cittti'
    });
    for (var i = 4; i < 600; i++) {
        let symbol = {
            symbolid: i,
            symbol: faker.random.word("****"),
            companyname: faker.company.companyName(),
        };
        data.push(symbol);
    }
    return data;
}

function login() {
    return {
        username: 'root',
        password: 'root',
        userid: 1
    }
}


function getPrice() {
    var data = {
        error: null,
        result: [
            {
                symbol: 'a',
                data: []
            },
            {
                symbol: 'b',
                data: []
            },
            {
                symbol: 'c',
                data: []
            }
        ]
    };
    for (var i = 0; i < 500; i++) {
        var record = []
        record.push(faker.date.past(2016));
        record.push(faker.random.number({ min: 10, max: 50 }));
        record.push(faker.random.number({ min: 10, max: 50 }));
        record.push(faker.random.number({ min: 10, max: 50 }));
        record.push(faker.random.number({ min: 10, max: 50 }));
        record.push(faker.random.number({ min: 1000000, max: 100000000 }));
        record.push(faker.random.number({ min: -3, max: 3 }));
        data.result[0].data.push(record);
    }
    for (var i = 0; i < 500; i++) {
        var record = []
        record.push(faker.date.past(2016));
        record.push(faker.random.number({ min: 10, max: 50 }));
        record.push(faker.random.number({ min: 10, max: 50 }));
        record.push(faker.random.number({ min: 10, max: 50 }));
        record.push(faker.random.number({ min: 10, max: 50 }));
        record.push(faker.random.number({ min: 1000000, max: 100000000 }));
        record.push(faker.random.number({ min: -3, max: 3 }));
        data.result[1].data.push(record);
    }
    for (var i = 0; i < 500; i++) {
        var record = []
        record.push(faker.date.past(2016));
        record.push(faker.random.number({ min: 10, max: 50 }));
        record.push(faker.random.number({ min: 10, max: 50 }));
        record.push(faker.random.number({ min: 10, max: 50 }));
        record.push(faker.random.number({ min: 10, max: 50 }));
        record.push(faker.random.number({ min: 1000000, max: 100000000 }));
        record.push(faker.random.number({ min: -3, max: 3 }));
        data.result[2].data.push(record);
    }
    return { price: data, symbol: getSymbols(), login: login()};
}




module.exports = getPrice;