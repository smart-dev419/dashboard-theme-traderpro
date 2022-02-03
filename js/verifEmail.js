var host = process.env.HOST ;
var port = process.env.PORT ;

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('code');

fetch('http://'+host+':'+port+'/verification/'+myParam, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
  .then((data) => {})