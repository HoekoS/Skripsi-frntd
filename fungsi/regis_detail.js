var x = new URLSearchParams(window.location.search);
var id=x.get('key');
const url_user = 'http://localhost:3737/api/user';
const url_employee = 'http://localhost:3737/api/employee';
var output2

getapi(url_user);
getEmp()


async function getapi(urls) {
  // Storing response
  output='';
  const response = await fetch(urls+"?key="+id);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  document.getElementById('email-pgw-edit').value=data.data[0].email;
  // document.getElementById('passw-pgw-edit').value=data.data[0].password;
  document.getElementById('role-pgw-edit').value=data.data[0].role_code;
  document.getElementById('nama-pgw-edit').value=data.data[0].username;
}


async function getEmp(){

  const response = await fetch(url_employee);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  jmlh_data=data.data.length
  var i=0;
  for (let j= 0; j < jmlh_data ; j++) {
    output2+=`<option value="`+data.data[j]['email']+`">`+data.data[j]['full_name']+` - `+data.data[j]['email']+`</option>`;
  }
  document.getElementById('email-pgw-edit').innerHTML=output2
}
