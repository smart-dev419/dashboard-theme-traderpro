
var host = process.env.HOST ;
var port = process.env.PORT ;
   
function getToken(){
    return localStorage.getItem('user');
}

function login(){


    const email = document.getElementById('email').value;
    const password= document.getElementById('password').value;
    const d = { email:email, password:password };
    fetch('http://'+host+":"+port+"/Login", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(d),
}).then((response) => response.json())


//Then with the data from the response in JSON...
.then((data) => {
  console.log('Success:', data);
  if(data.success==true){
    localStorage.setItem('user', data.token);
    const jwtData = this.getToken().split('.')[1] ;
    const decodedJwtJsonData = window.atob(jwtData) ;
    const decodedJwtData = JSON.parse(decodedJwtJsonData) ;
    console.log (decodedJwtData.user_id);
    window.location.href="index.html"
  }
  else{
      alert(data.msg)
  }
})

}



