const url_user = 'http://localhost:3737/api/user';
const url_employee = 'http://localhost:3737/api/employee';
var output = "";
var output2 = "";

getApiCtg()
getEmp()

async function getApiCtg(){

  const response = await fetch(url_user);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  jmlh_data=data.data.length
  var i=0;
  for (let j= 0; j < jmlh_data ; j++) {
      show(j+1,data.data[j]['username'],data.data[j]['email'],data.data[j]['role_code'],data.data[j]['id']);
    }
  document.getElementById('data-table').innerHTML=output;
}

function show(id,name,email,role,id_usr){
  console.log(id_usr)
  output +=
        `<tr>
        <td>`+id+`</td>
        <td>`+name+`</td>
        <td>`+email+`</td>
        <td>`+role+`</td>
        <td>
          <button onclick="deleteUsr(`+id_usr+`)">
          <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>`;

// <a href="regis_detail.html?key=`+id_usr+`" class="fas fa-edit" ></a>
return output
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
  document.getElementById('email-pgw').innerHTML=output2
}

function postRegis() {
  var urlFile=""
  var namaPgw = document.getElementById("nama-pgw").value;
  var emailPgw = document.getElementById("email-pgw").value;
  var passwPgw = document.getElementById("passw-pgw").value;
  var rolePgw = document.getElementById("role-pgw").value;
  valid=validatePost({username: namaPgw, email: emailPgw, password: passwPgw,role_code: rolePgw})

  // console.log(test)
  if(valid==true){
    postData({
      username: namaPgw,
      email: emailPgw,
      password: passwPgw,
      role_code: rolePgw,
    })
    .then(response =>response.json())
    .then(data => {
      console.log(data)
      console.log(data.status)
      // alert(data)
      if(data.status=="True"){
        alert("SUKSES");
        location.reload();
      }else{
        alert("Data Error");
      }
    })
    .catch(error => {
      console.log('error', error)
      alert("error")
    });
    // console.log(price)
  }
}
function postData(data = {}) {
  url='http://localhost:3737/api/signup'

  var response = fetch(url, {
    method:'POST',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  return response;
}
function validatePost(data = {}) {
  // alert("er")
  var item=[];
  if(data['username']==""){
    item.push("username");
    // console.log(item)
    // alert("error")
  }
  if(data['email']==""){
    item.push("email")
    // console.log(item)
    // alert("error")
  }
  if(data['password']==""){
    item.push("password")
    // console.log(item)
    // alert("error")
  }
  if(data['role_code']==""){
    item.push("role_code")
    // console.log(item)
    // alert("error")
  }
  if(item.length!=0){
    text=item.toString()
    item=[]
    alert("Silahkan isi kolom "+text);
    return false
  }else{
    return true
  }
}

async function deleteUsr(id){
  const response4 = await fetch(url_user+"/delete?key="+id,{
    method:'DELETE',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    }
  }).then(res => res.json());
  window.location.replace("http://localhost:3737/login/register.html");
}
