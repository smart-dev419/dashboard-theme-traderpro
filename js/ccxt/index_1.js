document.addEventListener("DOMContentLoaded", function () {
  const proxy = "https://secret-ravine-68136.herokuapp.com/";
  const exchangeId = "ftx",
    exchangeClass = ccxt[exchangeId],
    exchange = new exchangeClass({
      apiKey: "aQLKmlsLVij7Z0IjWoY1WphBOzz1o1ls-NG4Dj5p",
      secret: "e4bwnlx0JugHdL2S3qRT00Hn39OaL9EBedFwSp5I",
      enableRateLimit: true,
      proxy: proxy,
    });
  (async () => {
    // Get balance of account, by example
    // total: {
    //     USDT: 53.21905023,
    //     BTC: 0.00029988,
    //     USD: -0.02726664,
    //     LTC: 0,
    //     TRX: 0,
    //     XRP: 84.75
    // }
    //console.log(await exchange.fetchBalance());

    // Get history of all orders done
    //console.log (await exchange.fetchOrders ())

    // Get open orders (orders still no close or executed)
    //console.log(await exchange.fetchOpenOrders());
    let showOpenOrders = await exchange.fetchOpenOrders();

    // Make a sell order at Market Price (accept market price in the moment of place order)
    // Get balance and you can see how much BTC or USDT do you  have in your account
    // Here are market prices https://ftx.com/markets by example BTC/USDT = 46.069
    // Only try BTC/USDT pair (Bitcoin/Tether) for testing purpuses
    //console.log (await exchange.createMarketSellOrder ('BTC/USDT', 0.0002))

    // Make a buy order at Market Price (accept market price in the moment of place order)
    //console.log (await exchange.createMarketBuyOrder ('BTC/USDT', 0.0002))

    // Make a buy  order a limit price, you want to sell BTC (0.0002) at USDT 40000.00
    // only  if someone acceot this price the order is executed, otherwise still open
    // Check in fetchOpenOrders if the order is awaiting
    //console.log (await exchange.createLimitBuyOrder ('BTC/USDT', 0.0002, 40000.00))
  })();
});
