var config_dev = {
    api_url: 'http://localhost:4000/',
    symbol_api: 'symbol',
    price_api: 'price',
}
var config = {
    // api_url: 'http://172.20.10.14:8080/',
    // api_url: 'http://172.20.10.3:8080/',
    api_url: 'http://localhost:8080/',
    symbol_api: 'symbols/allSymbols',
    price_api: 'api/price',
    all_portfolio: 'portfolio/getAll',
    add_symbol_to_portfolio: 'portfolioSymbols/addPortfolioSymbols' ,
    delete_symbol_from_portfolio: 'portfolioSymbols/delPortfolioSymbols',
    delete_portfolio: 'portfolio/deletePortfolio',
    create_portfolio: 'portfolio/addPortfolio',
    login_url: 'user/login'

}
var config = config;
export {
    config
}