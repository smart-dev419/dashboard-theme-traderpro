window.addEventListener("load", appendData);
var host = process.env.HOST;
var port = process.env.PORT;

function getToken() {
  return localStorage.getItem("user");
}

function appendData() {
  fetch("http://" + host + ":" + port + "/copyTrader/getAllCopyTrader", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (data.success == true) {
        console.log(data);
        document.getElementById("dataCount").innerHTML = data.data.length;
        console.log(data.data.length);
        var temp = "";
        data.data.forEach((itemData) => {
          temp += "<tr>";
          temp +=
            "<td class='firsttd'>	<div class='usernamecus'>" +
            itemData.username +
            "<div/><p class='tb-fullname'>" +
            itemData.firstname +
            " " +
            itemData.lastname +
            "</p></td>";
          temp += "<td>" + itemData.subscriberCount + "</td>";
          temp += "<td>" + "Free" + "</td>";
          temp += "<td>" + "0" + "</td>";
          temp +=
            "<td> <img src='img/uploads/profit-up.svg' class='img-fluid'> <span class='text-green'>59.28% </span> </td>";
          if (itemData.isAlreadySubscribe == false) {
            temp +=
              "<td> 	<button class='btn btn-primary' onclick='goSubscribe(" +
              itemData.id +
              ")'>Subscribe</button> </td>";
          }
          if (itemData.isAlreadySubscribe == true) {
            temp +=
              "<td> 	<button class='btn btn-success' onclick='goSubscribe(" +
              itemData.id +
              ")'>Subscribed</button> </td>";
          }
          temp +=
            "<td><button class='btn btn-success' onclick='goConfigure(" +
            JSON.stringify(itemData) +
            ")'>Configure</button></td></tr>";
        });
        // href='../trade-configuration.html'
        document.getElementById("myTabledata").innerHTML = temp;
      } else {
        alert(data.msg);
      }
    });
}

function goSubscribe(copyTraderId) {
  const dataSend = {
    copyTraderId: copyTraderId,
  };

  fetch("http://" + host + ":" + port + "/copyTrader/addSubscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(dataSend),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (data.success == true) {
        appendData();
        alert("Subscribed");
      } else {
        alert(data.message);
      }
    });
}

function goConfigure(data) {
  console.log(data);

  // const dataSend = {
  //   copyTraderId:"1",
  //   tradername:"tradername",
  //   subscriptiondate:"2022-2-2",
  //   expirationdate:"2022-2-5",
  //   exchange:"dsd",
  //   tradesize:"35",
  //   isautotrading:true
  // };

  // console.log(dataSend);
  localStorage.removeItem("tradeconfiguration");
  localStorage.setItem("tradeconfiguration", JSON.stringify(data));

  window.location.href = "trade-configuration.html";
}
