var baseUrl =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
var proxyUrl = "https://secret-ravine-68136.herokuapp.com/";
var api_key = "cd26bd7e-865f-469c-9643-167610b90c2a";
var coins;
var id;
let ping;

var host = process.env.HOST;
var port = process.env.PORT;

var currentPath = window.location.pathname;
var filename = currentPath.substring(currentPath.lastIndexOf("/") + 1);

var wsUri_bitmex = "wss://www.bitmex.com/realtime?subscribe=instrument";
bitmexWebSocket();

var wsUri_kraken = "wss://ws.kraken.com";
krakenWebSocket();

var wsUri_coinbase = "wss://ws-feed.pro.coinbase.com";
coinbaseWebSocket();

var wsUri_ftx = "wss://ftx.com/ws/";
FtxWebSocket();

var wsUri_huobi = "wss://api.huobi.pro/feed";
huobiWebSocket();

function huobiWebSocket() {
  huobiwebsocket = new WebSocket(wsUri_huobi);
  huobiwebsocket.onopen = function (evt) {
    onOpenhuobi(evt);
  };
  huobiwebsocket.onmessage = function (evt) {
    onMessagehuobi(evt);
  };
  huobiwebsocket.onerror = function (evt) {
    huobiWebSocket();
  };
}
function FtxWebSocket() {
  Ftxwebsocket = new WebSocket(wsUri_ftx);
  Ftxwebsocket.onopen = function (evt) {
    onOpenFTX(evt);
  };
  Ftxwebsocket.onmessage = function (evt) {
    onMessageFTX(evt);
  };

  Ftxwebsocket.onerror = function (evt) {
    onError(evt);
  };
}
function bitmexWebSocket() {
  bitmexwebsocket = new WebSocket(wsUri_bitmex);
  bitmexwebsocket.onopen = function (evt) {
    onOpenbitmex(evt);
  };
  bitmexwebsocket.onmessage = function (evt) {
    onMessagebitmex(evt);
  };
  bitmexwebsocket.onerror = function (evt) {
    onError(evt);
  };
}
function krakenWebSocket() {
  krakenwebsocket = new WebSocket(wsUri_kraken);
  krakenwebsocket.onopen = function (evt) {
    onOpenkraken(evt);
  };
  krakenwebsocket.onmessage = function (evt) {
    onMessagekraken(evt);
  };
  krakenwebsocket.onerror = function (evt) {
    onError(evt);
  };
}
function coinbaseWebSocket() {
  coinbasewebsocket = new WebSocket(wsUri_coinbase);
  coinbasewebsocket.onopen = function (evt) {
    onOpencoinbase(evt);
  };
  coinbasewebsocket.onmessage = function (evt) {
    onMessagecoinbase(evt);
  };
  coinbasewebsocket.onerror = function (evt) {
    onError(evt);
  };
}

var tab = [];
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
// loading that only display for 1 sec, not really a condition.
setInterval(function () {
  document.getElementById("loader").style.display = "none";
}, 1000);
// pagination

fetch("http://" + host + ":" + port + "/coins/" + filename)
  .then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        coins = data.coins;

        for (let i = 0; i < coins.length; i++) {
          j = parseInt(i) + 1;
          var mcap =
            parseFloat(data.coins[i].quote.USD.market_cap) / 1000000000;
          document.getElementById("coinList").innerHTML +=
            '<li><div class="d-flex"><div class="my-auto"><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/' +
            data.coins[i].id +
            '.png" alt=""class="img-fluid circle-icon-1" /></div><div><div class="flex-column"><span class="font-14 font-bold">' +
            data.coins[i].name +
            "</span>" +
            '<div class="divider"></div>' +
            '<span class="font-12 d-block">' +
            '<span class="badge bg-info me-1">' +
            data.coins[i].cmc_rank +
            "</span>" +
            '<span class="symbols">' +
            data.coins[i].symbol +
            "</span>" +
            '<span class="font-10 ms-1"> ' +
            "Mcap " +
            mcap.toFixed(2) +
            "B" +
            "</span>" +
            "</span>" +
            "</div>" +
            "</div>" +
            " </div>" +
            "</li>";
          var els = document.getElementsByClassName("itemss");

          els[0].innerHTML +=
            '<li><span style="display: none" id="o' +
            data.coins[i].symbol +
            'USDT"></span><span style="color: black; " id="' +
            data.coins[i].symbol +
            'USDT">' +
            parseFloat(data.coins[i].quote.USD.price).toFixed(3) +
            ' </span><span style="display: none" id="o' +
            data.coins[i].symbol +
            'USDTb"></span><span style="color: black; " id="' +
            data.coins[i].symbol +
            'USDTb">' +
            parseFloat(data.coins[i].quote.USD.price).toFixed(3) +
            " </span></li>";
          els[1].innerHTML +=
            '<li class="hidden" ><span style="display: none" id="o' +
            data.coins[i].symbol +
            '-PERP"></span><span id="' +
            data.coins[i].symbol +
            '-PERP">' +
            parseFloat(data.coins[i].quote.USD.price).toFixed(3) +
            '</span><span style="display: none" id="o' +
            data.coins[i].symbol +
            '-PERPb"></span><span style=""  id="' +
            data.coins[i].symbol +
            '-PERPb">' +
            parseFloat(data.coins[i].quote.USD.price).toFixed(3) +
            "</span></li>";

          els[4].innerHTML +=
            '<li class="hidden" ><span style="display: none" id="o' +
            "XBT" +
            'USD"></span><span    id="' +
            "XBT" +
            'USD">' +
            parseFloat(data.coins[i].quote.USD.price).toFixed(5) +
            '</span><span style="display: none" id="o' +
            "XBT" +
            'USDb"></span><span    id="' +
            "XBT" +
            'USDb">' +
            parseFloat(data.coins[i].quote.USD.price).toFixed(5) +
            "</span></li>";

          if (data.coins[i].symbol === "BTC") {
            els[3].innerHTML +=
              '<li class="hidden" ><span style="display: none" id="o' +
              "XBT" +
              '/USD"></span><span    id="' +
              "XBT" +
              '/USD">' +
              "--" +
              '</span><span style="display: none" id="o' +
              "XBT" +
              '/USDb"></span><span    id="' +
              "XBT" +
              '/USDb">' +
              "--" +
              "</span></li>";
            els[2].innerHTML +=
              '<li class="hidden" ><span style="display: none" id="o' +
              "XBT" +
              'USD"></span><span    id="' +
              "XBT" +
              'USD">' +
              "--" +
              '</span><span style="display: none" id="o' +
              "XBT" +
              'USDb"></span><span    id="' +
              "XBT" +
              'USDb">' +
              "--" +
              "</span></li>";
          } else {
            els[3].innerHTML +=
              '<li class="hidden" ><span style="display: none" id="o' +
              data.coins[i].symbol +
              '/USD"></span><span    id="' +
              data.coins[i].symbol +
              '/USD">' +
              "--" +
              '</span><span style="display: none" id="o' +
              data.coins[i].symbol +
              '/USDb"></span><span    id="' +
              data.coins[i].symbol +
              '/USDb">' +
              "--" +
              "</span></li>";
            els[2].innerHTML +=
              '<li class="hidden" ><span style="display: none" id="o' +
              data.coins[i].symbol +
              'USD"></span><span    id="' +
              data.coins[i].symbol +
              'USD">' +
              "--" +
              '</span><span style="display: none" id="o' +
              data.coins[i].symbol +
              'USDb"></span><span    id="' +
              data.coins[i].symbol +
              'USDb">' +
              "--" +
              "</span></li>";
          }
          els[5].innerHTML +=
            '<li><span style="display: none" id="o' +
            data.coins[i].symbol +
            'USDTh"></span><span style="color: gray;" id="' +
            data.coins[i].symbol +
            'USDTh">' +
            parseFloat(data.coins[i].quote.USD.price).toFixed(3) +
            ' </span><span style="display: none" id="o' +
            data.coins[i].symbol +
            'USDThb"></span><span style="color: gray;" id="' +
            data.coins[i].symbol +
            'USDThb">' +
            parseFloat(data.coins[i].quote.USD.price).toFixed(3) +
            " </span></li>";

          marketBinance = data.coins[i].symbol.toLowerCase() + "usdt";

          if (i / 10 === 1) {
            sleep(2000);
          }
          const wsbn = new WebSocket(
            "wss://stream.binance.com:9443/ws/" + marketBinance + "@ticker"
          );

          wsbn.onmessage = (event) => {
            let object = JSON.parse(event.data);

            let priceB = parseFloat(object.a);
            let priceBb = parseFloat(object.b);

            idB = object.s;

            if (priceB != null) {
              document.getElementById(idB).innerText = priceB;

              document.getElementById(idB).style.color =
                parseFloat(document.getElementById("o" + idB).innerText) ==
                priceB
                  ? "black"
                  : priceB >
                    parseFloat(document.getElementById("o" + idB).innerText)
                  ? "green"
                  : "red";
              setInterval(function () {
                document.getElementById(idB).style.color = "black";
              }, 5000);

              document.getElementById("o" + idB).innerText = priceB;
            }
            if (priceBb != null) {
              document.getElementById(idB + "b").innerText = priceBb;

              document.getElementById(idB + "b").style.color =
                parseFloat(
                  document.getElementById("o" + idB + "b").innerText
                ) == priceBb
                  ? "black"
                  : priceBb >
                    parseFloat(
                      document.getElementById("o" + idB + "b").innerText
                    )
                  ? "green"
                  : "red";
              setInterval(function () {
                document.getElementById(idB + "b").style.color = "black";
              }, 5000);
              document.getElementById("o" + idB + "b").innerText = priceBb;
            }
          };
          wsbn.onerror = (err) => {
            console.log(err);
          };
        }
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });

function onOpenFTX(evt) {
  fetch("http://" + host + ":" + port + "/coins/" + filename)
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          coins = data.coins;
          for (let ftx in coins) {
            marketFtx = coins[ftx].symbol + "-PERP";
            var obj = { op: "subscribe", channel: "ticker", market: marketFtx };
            var myJSON = JSON.stringify(obj);

            Ftxwebsocket.send(myJSON);
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function onMessageFTX(event) {
  let payload;

  try {
    payload = JSON.parse(event.data);
  } catch (e) {}

  if (payload) {
    if (payload.channel === "ticker" && payload.type === "update") {
      price = parseFloat(payload.data.ask);
      priceb = parseFloat(payload.data.bid);
      id = payload.market;

      document.getElementById(id).innerText = price;
      document.getElementById(id).style.color =
        parseFloat(document.getElementById("o" + id).innerText) > price
          ? "BLblackACK"
          : price > parseFloat(document.getElementById("o" + id).innerText)
          ? "green"
          : "red";
      setInterval(function () {
        document.getElementById(id).style.color = "black";
      }, 5000);
      document.getElementById("o" + id).innerText = price;

      document.getElementById(id + "b").innerText = priceb;
      document.getElementById(id + "b").style.color =
        parseFloat(document.getElementById("o" + id + "b").innerText) > priceb
          ? "black"
          : priceb >
            parseFloat(document.getElementById("o" + id + "b").innerText)
          ? "green"
          : "red";
      setInterval(function () {
        document.getElementById(id + "b").style.color = "black";
      }, 5000);
      document.getElementById("o" + id + "b").innerText = priceb;
    } else if (payload.type === "pong") ping = "done";
  }
}
function onOpencoinbase(evt) {
  marketsCb = [
    "ETH-USD",
    "BTC-USD",
    "BNB-USD",
    "USDT-USD",
    "SOL-USD",
    "XRP-USD",
    "ADA-USD",
    "USDC-USD",
    "LUNA-USD",
    "AVAX-USD",
    "DOGE-USD",
    "SHIB-USD",
    "MATIC-USD",
    "CRO-USD",
    "WBTC",
    "LTC-USD",
    "UNI-USD",
    "LINK-USD",
    "UST-USD",
    "DAI-USD",
    "ALGO",
    "BCH-USD",
    "TRX-USD",
    "NEAR-USD",
    "XLM-USD",
    "AXS-USD",
    "ATOM-USD",
    "MANA-USD",
    "FIL-USD",
    "ETC-USD",
    "ICP-USD",
    "XTZ-USD",
    "GRT-USD",
    "EOS-USD",
    "GALA-USD",
    "LRC-USD",
    "AAVE-USD",
    "MKR-USD",
    "CRV-USD",
    "ENJ-USD",
    "QNT-USD",
    "AMP-USD",
    "BAT-USD",
    "CGLC-USD",
    "DASH-USD",
    "COMP-USD",
    "IOTX-USD",
    "YFI-USD",
    "1INCH-USD",
  ];

  var obj = {
    type: "subscribe",
    channels: [{ name: "ticker", product_ids: marketsCb }],
  };
  var myJSON = JSON.stringify(obj);

  coinbasewebsocket.send(myJSON);
}
function onMessagecoinbase(event) {
  try {
    payload = JSON.parse(event.data);
    if (payload.best_ask) {
      idcb = payload.product_id;
      pricecb = parseFloat(payload.best_ask);
      pricecbb = parseFloat(payload.best_bid);
      document.getElementById(idcb).innerText = pricecb;
      document.getElementById(idcb).style.color =
        parseFloat(document.getElementById("o" + idcb).innerText) > pricecb
          ? "black"
          : pricecb > parseFloat(document.getElementById("o" + idcb).innerText)
          ? "green"
          : "red";
      setInterval(function () {
        document.getElementById(idcb).style.color = "black";
      }, 5000);
      document.getElementById("o" + idcb).innerText = pricecb;

      document.getElementById(idcb + "b").innerText = pricecbb;
      document.getElementById(idcb + "b").style.color =
        parseFloat(document.getElementById("o" + idcb + "b").innerText) >
        pricecbb
          ? "black"
          : pricecbb >
            parseFloat(document.getElementById("o" + idcb + "b").innerText)
          ? "green"
          : "red";
      setInterval(function () {
        document.getElementById(idcb + "b").style.color = "black";
      }, 5000);
      document.getElementById("o" + idcb + "b").innerText = pricecbb;
    }
  } catch (e) {
    console.log(e);
  }
}
function onOpenkraken(evt) {
  var marketskr = [
    "XBT/USD",
    "ETH/USD",
    "USDT/USD",
    "XRP/USD",
    "ADA/USD",
    "USD/USD",
    "DOT/USD",
    "LTC/USD",
    "DAI/USD",
    "LINK/USD",
    "BCH/USD",
    "EOS/USD",
  ];
  var obj = {
    event: "subscribe",
    pair: marketskr,
    subscription: { name: "ticker" },
  };
  var myJSON = JSON.stringify(obj);

  krakenwebsocket.send(myJSON);
}
function onMessagekraken(event) {
  try {
    payload = JSON.parse(event.data);

    if (payload[1].a[0]) {
      idK = payload[3];
      priceK = parseFloat(payload[1].a[0]);
      priceKb = parseFloat(payload[1].b[0]);

      document.getElementById(idK).innerText = priceK;
      document.getElementById(idK).style.color =
        parseFloat(document.getElementById("o" + idK).innerText) > priceK
          ? "black"
          : priceK > parseFloat(document.getElementById("o" + idK).innerText)
          ? "green"
          : "red";
      setInterval(function () {
        document.getElementById(idK).style.color = "black";
      }, 5000);
      document.getElementById("o" + idK).innerText = priceK;

      document.getElementById(idK + "b").innerText = priceKb;
      document.getElementById(idK + "b").style.color =
        parseFloat(document.getElementById("o" + idK + "b").innerText) > priceKb
          ? "black"
          : priceKb >
            parseFloat(document.getElementById("o" + idK + "b").innerText)
          ? "green"
          : "red";
      setInterval(function () {
        document.getElementById(idK + "b").style.color = "black";
      }, 5000);
      document.getElementById("o" + idK + "b").innerText = priceKb;
    }
  } catch (e) {
    console.log(e);
  }
}
function onOpenbitmex(evt) {
  fetch("http://" + host + ":" + port + "/coins/" + filename)
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          coins = data.coins;

          for (btx in coins) {
            market = coins[btx].symbol + "-USDT";

            var obj = { op: "subscribe", channel: "ticker", market: market };
            var myJSON = JSON.stringify(obj);
            bitmexwebsocket.send(myJSON);
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function onMessagebitmex(event) {
  try {
    payloadB = JSON.parse(event.data);

    if ((payloadB.action = "update" && payloadB.data[0].askPrice != null)) {
      priceBit = parseFloat(payloadB.data[0].askPrice);
      priceBitb = parseFloat(payloadB.data[0].bidPrice);
      id = payloadB.data[0].symbol;

      document.getElementById(id).innerText = priceBit;
      document.getElementById(id).style.color =
        parseFloat(document.getElementById("o" + id).innerText) > priceBit
          ? "black"
          : priceBit > parseFloat(document.getElementById("o" + id).innerText)
          ? "green"
          : "red";
      setInterval(function () {
        document.getElementById(id).style.color = "black";
      }, 5000);
      document.getElementById("o" + id).innerText = priceBit;

      document.getElementById(id + "b").innerText = priceBitb;
      document.getElementById(id + "b").style.color =
        parseFloat(document.getElementById("o" + id + "b").innerText) >
        priceBitb
          ? "black"
          : priceBitb >
            parseFloat(document.getElementById("o" + id + "b").innerText)
          ? "green"
          : "red";
      setInterval(function () {
        document.getElementById(id + "b").style.color = "black";
      }, 5000);
      document.getElementById("o" + id + "b").innerText = priceBitb;
    }
  } catch (e) {}
}
function onOpenhuobi(evt) {
  marketss = [
    "btcusdt",
    "ethusdt",
    "bnbusdt",
    "usdtusdt",
    "solusdt",
    "adausdt",
    "xrpusdt",
    "usdcusdt",
    "lunausdt",
    "avaxusdt",
    "dotusdt",
    "dogeusdt",
    "shibusdt",
    "maticusdt",
    "crousdt",
    "wbtcusdt",
    "uniusdt",
    "ltcusdt",
    "linkusdt",
    "ustusdt",
    "daiusdt",
    "algousdt",
    "nearusdt",
    "bchusdt",
    "trxusdt",
    "xlmusdt",
    "fttusdt",
    "vetusdt",
    "hbarusdt",
    "sandusdt",
    "filusdt",
    "icpusdt",
    "etcusdt",
    "thetausdt",
    "ftmusdt",
    "xtzusdt",
    "xmrusdt",
    "miotausdt",
    "galausdt",
    "leousdt",
    "aaveusdt",
    "grtusdt",
    "eosusdt",
    "lrcusdt",
    "oneusdt",
    "flowusdt",
    "bttusdt",
    "mkrusdt",
    "enjusdt",
    "bsvusdt",
    "ksmusdt",
    "crvusdt",
    "zecusdt",
    "xecusdt",
    "batusdt",
    "arusdt",
    "chzusdt",
    "wavesusdt",
    "htusdt",
    "dashusdt",
    "hotusdt",
    "compusdt",
    "nexousdt",
    "xemusdt",
    "tusdusdt",
    "iotxusdt",
    "1inchusdt",
    "yfiusdt",
    "dcrusdt",
    "icxusdt",
    "qtumusdt",
    "rvnusdt",
    "lptusdt",
    "omgusdt",
  ];
  for (i in marketss) {
    var objh = {
      sub: "market." + marketss[i] + ".mbp.150",
      id: marketss[i],
    };
    var myJSONh = JSON.stringify(objh);

    huobiwebsocket.send(myJSONh);
  }
}
function onMessagehuobi(evt) {
  var blob = evt.data;
  var reader = new FileReader();
  reader.onload = function (e) {
    var ploydata = new Uint8Array(e.target.result);
    var msg = pako.inflate(ploydata, { to: "string" });
    var datah = JSON.parse(msg);

    if (msg.search("ping") > 0) {
      huobiwebsocket.send(JSON.stringify({ pong: datah.ping }));
      return;
    } else if (typeof datah.tick != "undefined") {
      market = datah.ch.split(".")[1].toUpperCase();

      idBh = datah.ch.split(".")[1].toUpperCase() + "h";

      idBhb = datah.ch.split(".")[1].toUpperCase() + "hb";
      priceBh = parseFloat(datah.tick.asks[0]);

      priceBhb = parseFloat(datah.tick.bids[0]);

      if (
        priceBh != null &&
        isNaN(priceBh) == false &&
        document.getElementById(idBh) != null
      ) {
        document.getElementById(idBh).innerText = priceBh;

        document.getElementById(idBh).style.color =
          parseFloat(document.getElementById("o" + idBh).innerText) == priceBh
            ? "black"
            : priceBh >
              parseFloat(document.getElementById("o" + idBh).innerText)
            ? "green"
            : "red";
        setInterval(function () {
          document.getElementById(idBh).style.color = "black";
        }, 5000);

        document.getElementById("o" + idBh).innerText = priceBh;
      }
      if (
        priceBhb != null &&
        isNaN(priceBhb) == false &&
        document.getElementById(idBhb) != null
      ) {
        document.getElementById(idBhb).innerText = priceBhb;

        document.getElementById(idBhb).style.color =
          parseFloat(document.getElementById("o" + idBhb).innerText) == priceBhb
            ? "black"
            : priceBhb >
              parseFloat(document.getElementById("o" + idBhb).innerText)
            ? "green"
            : "red";
        setInterval(function () {
          document.getElementById(idBhb).style.color = "black";
        }, 5000);
        document.getElementById("o" + idBhb).innerText = priceBhb;
      }
    }
  };
  reader.readAsArrayBuffer(blob, "utf-8");
}
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
