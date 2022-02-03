var host = process.env.HOST;
var port = process.env.PORT;
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const username = document.getElementById("username").value;
  const cpassword = document.getElementById("cpassword").value;

  const d = {
    name: name,
    lastname: lastname,
    email: email,
    password: password,
    username: username,
  };

  if (document.getElementById("check").checked) {
    if (password != cpassword) {
      alert("please verifie your password");
    } else {
      fetch("http://" + host + ":" + port + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d),
      })
        .then((response) => response.json())

        //Then with the data from the response in JSON...
        .then((data) => {
          if (data.success == true) {
            window.location.href = "emailVerif.html";
          } else {
            alert(data.msg);
          }
        });
    }
  } else {
    document.getElementById("labelCheck").style.color = "red";
  }
}
