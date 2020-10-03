fetch(`/invitation/load`,{
  method:'POST'
}).then(function(res){
  return res.text();
}).then(function(data){
  const parsedData = JSON.parse(data);
  console.log(parsedData);
});