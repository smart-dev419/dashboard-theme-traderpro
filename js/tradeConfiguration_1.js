window.addEventListener("load", appendData);
var host = process.env.HOST;
var port = process.env.PORT;

function getToken() {
  return localStorage.getItem("user");
}

function appendData() {
  const av = JSON.parse(localStorage.getItem("tradeconfiguration"));
  console.log(av);

  const subscriptiondate = av.myConfiguration.subscriptiondate;
  const expirationdate = av.myConfiguration.expirationdate;
  const tradername = av.myConfiguration.tradername;
  const subscriptiondate2 = subscriptiondate.slice(0, 10);
  const expirationdate2 = expirationdate.slice(0, 10);
  document.getElementById("tradername").innerHTML = tradername;
  document.querySelector('*[name="tradername"]').value = tradername;
  document.querySelector('*[name="subscriptionDate"]').value =
    subscriptiondate2;
  document.querySelector('*[name="subscriptionExpiryDate"]').value =
    expirationdate2;
}

function updateConf() {
  const av = JSON.parse(localStorage.getItem("tradeconfiguration"));

  const subscriptiondate = av.myConfiguration.subscriptiondate;
  const expirationdate = av.myConfiguration.expirationdate;
  const tradername = av.myConfiguration.tradername;

  // let copyTraderName = document.getElementsByClassName("tradername").value;
  // let subscriptionDate = document.getElementById("subscriptionDate").value;
  // let subscriptionExpiryDate = document.getElementById(
  //   "subscriptionExpiryDate"
  // ).value;
  let subscriptionExchange = document.getElementById(
    "subscriptionExchange"
  ).value;
  let tradeSize = document.getElementById("tradeSize").value;
  let setTradingAutomation = document.getElementById(
    "setTradingAutomation"
  ).value;

  const dataSend = {
    copyTraderId: av.id,
    tradername: tradername,
    subscriptiondate: subscriptiondate,
    expirationdate: expirationdate,
    exchange: subscriptionExchange,
    tradesize: tradeSize,
    isautotrading: setTradingAutomation,
  };

  console.log(dataSend);

  if (tradeSize <= 34) {
    alert("Minimum trade size should be $35");
    return false;
  }

  fetch("http://" + host + ":" + port + "/copyTrader/addConfiguration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(dataSend),
  })
    .then((response) => response.json())
    .then((data) => {
      appendData();
      console.log("Success:", data);
      if (data.success == true) {
        alert("Configuration Updated.");
      } else {
        alert(data.message);
      }
    });
}
