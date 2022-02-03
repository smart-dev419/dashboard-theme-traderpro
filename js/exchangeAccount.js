window.addEventListener("load", appendData);
var host = process.env.HOST;
var port = process.env.PORT;

function getToken() {
  return localStorage.getItem("user");
}

function appendData() {
  fetch("http://" + host + ":" + port + "/copyTrader/getFTXDetail?", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success == true) {
        console.log(data);
        if (data.data) {
          document.querySelector('*[name="apikey"]').value = data.data.apikey;
        }
        if (data.data) {
          document.querySelector('*[name="secretkey"]').value =
            data.data.secretkey;
        }
      } else {
        alert(data.msg);
      }
    });
}

function updateSettings() {
  const apikey = document.getElementById("apikey").value;

  const secretkey = document.getElementById("secretkey").value;

  const dataSend = {
    apikey: apikey,
    secretkey: secretkey,
  };

  fetch("http://" + host + ":" + port + "/copyTrader/addFTXDetail", {
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
      if (data.success == true) {
        alert("Settings Updated.");
      } else {
        alert(data.message);
      }
    });
}
