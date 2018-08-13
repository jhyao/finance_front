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
            open: [],
            close: [].
            high: [],
            low: [],
            volume: [],
            time: ["01/01/2016", "01/02/2016", ...] //interval为一天时，可以显示在时间横轴的时间
        },
        {
            symbol: "b”，
            open: [],
            close: [].
            high: [],
            low: [],
            volume: [],
            time: [] // 多个symbol时，time要完全相同，遵照第一个的时间轴，补全空缺的数据
        }
    ]
}

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