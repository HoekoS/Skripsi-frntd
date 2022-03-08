var x = new URLSearchParams(window.location.search);
var id=x.get('key');
var url='http://34.101.186.227:3737/api/signin'
var role

function postLogin() {
  var emailPgw = document.getElementById("email").value;
  var passwPgw = document.getElementById("pass").value;
  valid=validatePost({email: emailPgw, password: passwPgw})

  // console.log(test)
  if(valid==true){
    postData({
      email: emailPgw,
      password: passwPgw,
    })
    .then(response =>response.json())
    .then(data => {
      console.log(data)
      console.log(data.status)
      // alert(data)
      if(data.status=="True"){
        localStorage.setItem("role", data.data[0]['role_code']);
        role = localStorage.getItem("role");
        // console.log("ini role ",role, "test")
        window.location.replace("http://34.101.186.227:3737/index.html");
        // location.reload();
      }else{
        alert("Login Gagal");
      }
    })
    .catch(error => {
      console.log('error', error)
      alert("Login Gagal");
    });
    // console.log(price)
  }
}

function postData(data = {}) {
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
  if(item.length!=0){
    text=item.toString()
    item=[]
    alert("Silahkan isi kolom "+text);
    return false
  }else{
    return true
  }
}
