var host = process.env.HOST ;
var port = process.env.PORT ;

function resetPassword(){
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('code'); 
    
    const password= document.getElementById('password').value;
    const cpassword=document.getElementById('cpassword').value;
    const d = {password:password };
    
    if(password!=cpassword){
        alert("please verifie your password")
    }
    else{
        fetch('http://'+host+':'+port+'/resetPassword/'+myParam, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(d),
          }).then((response) => response.json())
          
          
          //Then with the data from the response in JSON...
          .then((data) => {
           
            if(data.success==true){

                alert('Succes');
                setTimeout(function(){ window.location.href="login.html"; }, 1000);
            }
            else{
                
                window.location.href="login.html"
            }
          })
    }


}


function forgotPassword(){
    
    const email=document.getElementById('email').value;
    const d = {email:email };
    console.log(d)
    
   
        fetch('http://'+host+':'+port+'/forgotPassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(d),
          }).then((response) => response.json())
          
          
          //Then with the data from the response in JSON...
          .then((data) => {
           
            if(data.success==true){
              window.location.href="emailVerif.html"
              
            }
            else{
                alert(data.msg)
            }
          })
    


}

