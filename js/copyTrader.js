window.addEventListener("load", appendData);
var host = process.env.HOST;
var port = process.env.PORT;

function getToken() {
  return localStorage.getItem("user");
}

function addEvents(obj, evtName, func) {
  if (obj.addEventListener !== undefined && obj.addEventListener !== null) {
    obj.addEventListener(evtName, func, false);
  } else if (obj.attachEvent !== undefined && obj.attachEvent !== null) {
    obj.attachEvent(evtName, func);
  } else {
    if (this.getAttribute("on" + evtName) !== undefined) {
      obj["on" + evtName] = func;
    } else {
      obj[evtName] = func;
    }
  }
}

function removeEvents(obj, evtName, func) {
  if (
    obj.removeEventListener !== undefined &&
    obj.removeEventListener !== null
  ) {
    obj.removeEventListener(evtName, func, false);
  } else if (obj.detachEvent !== undefined && obj.detachEvent !== null) {
    obj.detachEvent(evtName, func);
  } else {
    if (this.getAttribute("on" + evtName) !== undefined) {
      obj["on" + evtName] = null;
    } else {
      obj[evtName] = null;
    }
  }
}

function copyTraderClk(ev) {
  ev.preventDefault();

  // let formData = new FormData();
  // alert(photo);

  // console.log(photo);

  // formData.append("photo", photo);
  // console.log(formData);

  // alert(JSON.stringify('FORM DATE'+formData));
  // fetch('/upload/image', {method: "POST", body: formData});
  const firstname = ev.target.elements.firstname.value;

  // alert(JSON.stringify(ev.target.elements));
  const profilepicture = document.getElementById("file-selector").files[0];
  const middlename = ev.target.elements.middlename.value;
  const lastname = ev.target.elements.lastname.value;
  const gender = ev.target.elements.gender.value;
  const dob = ev.target.elements.dob.value;
  const countryofresidence = ev.target.elements.countryofresidence.value;
  const state = ev.target.elements.state.value;
  const city = ev.target.elements.city.value;
  const zipcode = ev.target.elements.zipcode.value;
  const address = ev.target.elements.address.value;
  const subscriptionprice = ev.target.elements.subscriptionprice.value;
  const details = ev.target.elements.details.value;
  const strategy = ev.target.elements.strategy.value;
  const email = ev.target.elements.email.value;
  const username = ev.target.elements.username.value;
  // const profilepicture =  ev.target.elements.profilepicture.value;

  console.log(profilepicture);

  console.log(username);
  if (username == "" || username == null) {
    alert("Username is required field.");
    return;
  }
  if (email == "" || email == null) {
    alert("Email is required field.");
    return;
  }
  if (firstname == "" || firstname == null) {
    alert("First Name is required field.");
    return;
  }
  if (lastname == "" || lastname == null) {
    alert("Last Name is required field.");
    return;
  }
  if (gender == "" || gender == null) {
    alert("Gender is required field.");
    return;
  }
  if (dob == "" || dob == null) {
    alert("Date of Birth is required field.");
    return;
  }
  if (
    countryofresidence == "" ||
    countryofresidence == null ||
    countryofresidence == "Select Country"
  ) {
    alert("Country of residence is required field.");
    return;
  }
  if (state == "" || state == null) {
    alert("State is required field.");
    return;
  }
  if (city == "" || city == null) {
    alert("City is required field.");
    return;
  }
  if (zipcode == "" || zipcode == null) {
    alert("Zipcode is required field.");
    return;
  }
  if (address == "" || address == null) {
    alert("Address is required field.");
    return;
  }

  const dataSend = {
    username: username,
    profileImage: profilepicture,
    email: email,
    firstname: firstname,
    middlename: middlename,
    lastname: lastname,
    gender: gender,
    dob: dob,
    country: countryofresidence,
    state: state,
    city: city,
    zipcode: zipcode,
    address: address,
    subscription: subscriptionprice,
    details: details,
    strategy: strategy,
  };

  fetch("http://" + host + ":" + port + "/copyTrader/addCopyTrader", {
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
        alert("Joined as Copy Trader");
        appendData();
      } else {
        alert(data.message);
      }
    });
}

function appendData() {
  fetch("http://" + host + ":" + port + "/copyTrader/getUserCopyTrader?", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success == true) {
        if (data.isCopyTrader) {
          document.getElementById("dataPresent").innerHTML =
            "<span class='text-success'>Submitted</span>";
        } else {
          document.getElementById("dataPresent").innerHTML =
            "<span class='text-danger'>Not Submitted</span>";
        }

        //
      } else {
        alert(data.msg);
      }
    });
}
