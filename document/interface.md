* price data
url: 'api/price

method: GET

params:
{
    from_date = 20160101,
    to_date = 20160331,
    interval = "1m" | "1h" | "1d" | ”1M“,
    symbol = "a" | "a|b" // 可以同时查询多个symbol的数据
}

response:
{
    error: null,
    result: [
        {
            symbol: "a”，
            data: [
                [date, open, close, high, low, volume]
            ]
        },
        {
            symbol: "b”，
            data: [
                [date, open, close, high, low, volume]
            ]
        }
    ]
}


* portfolio interface
** get user portfolio

```json
[
    {
        "portfolioId":1,
        "createDate":"2016.08.12 14:22:33",
        "portfolioName":"Test",
        "symbols":[
            {
                "symbolid":1,
                "symbol":"aa",
                "companyname":"Alcoa Corp"
            }
        ]
    }
]
```