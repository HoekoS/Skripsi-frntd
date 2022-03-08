var x = new URLSearchParams(window.location.search);
var id=x.get('key');
console.log(id);
const url = 'http://34.101.186.227:3737/api/menu';
var text="";

fetch(url+'?key='+id)
  .then(
    res => {
      res.json().then(
        data => {
          console.log(data.data);
          // console.log(data.data[0].name);
          document.getElementById('editName').value=data.data[0].name;
          document.getElementById('editDescription').value=data.data[0].description;
          document.getElementById('editPrice').value=data.data[0].price;
          document.getElementById('editKategori').value=data.data[0].kategori;
          document.getElementById('editSubkategori').value=data.data[0].sub_kategori;
          document.getElementById('editImage').src='http://34.101.186.227:3838/'+data.data[0].pic;
        }
      )
    }
  )

function deleteMenu(){
  console.log('masuk sini')
  // alert("error")
  fetch(url+'/delete?key='+id, {
    method: 'DELETE',
    headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
    }
  }).then(res => res.json());
  // alert("error")
  window.location.replace("http://34.101.186.227:3737/menu/menu.html");
}

document.getElementById("editMenu").addEventListener(
  "submit",
  function (event)
  {
    event.preventDefault();
    putform()
  },
  false
);
function putform() {
  var urlFile=""
  var produkName = document.getElementById("editName").value;
  var description = document.getElementById("editDescription").value;
  var price = document.getElementById("editPrice").value;
  var kategori = document.getElementById("editKategori").value;
  var subkategori = document.getElementById("editSubkategori").value;
  var file = document.getElementById('editFile').files[0];
  // alert(file)
  if(file!=undefined){
    urlFile = document.getElementById('editFile').files[0].name;
    console.log(urlFile)
    // alert("error2")
  }
  valid=validate({name: produkName, description: description, price: price, kategori: kategori, file: urlFile,kategori: kategori,subkategori:subkategori})

  if(valid==true){
      putData({
        name: produkName,
        description: description,
        price: price,
        file: file,
        urlFile:urlFile ,
        kategori:kategori,
        subkategori:subkategori,
      })
      .then(response => response.json())
      .then(data => {
        if(data.status=="True"){
          alert("SUKSES");
          window.location.replace("http://34.101.186.227:3737/menu/menu.html");
        }else{
          console.log(data.data)
          alert("Data Error");
        }
      });
      // alert(data)
    }else{
      alert("Silahkan isi kolom "+text);
    }
}
function putData(data = {}) {
  var dataAppnd = new FormData();
  dataAppnd.append('name',data['name']);
  dataAppnd.append('description',data['description']);
  dataAppnd.append('price',data['price']);
  dataAppnd.append('kategori',data['kategori']);
  dataAppnd.append('subkategori',data['subkategori']);
  // alert(data['file'])
  if(data['file']==undefined){
    // alert("test")
    dataAppnd.append('file',data['urlFile']);
  }else{
    dataAppnd.append('file',data['file'],data['urlFile']);
  }

  // console.log(Object.fromEntries(dataAppnd))
  // alert("error put")
  const response = fetch(url+'/update?key='+id, {
      method: 'PUT',
      withCredentials: true,
      headers: {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
      },
      body: dataAppnd
  });
  // console.log(Object.fromEntries(dataAppnd))
  // alert("error put2")
  return response;
}
function validate(data = {}) {
  // alert("er")
  var item=[];
  if(data['name']==""){
    item.push("name");
    // console.log(item)
    // alert("error")
  }
  if(data['description']==""){
    item.push("description")
    // console.log(item)
    // alert("error")
  }
  if(data['price']==""){
    item.push("price")
    // console.log(item)
    // alert("error")
  }
  if(data['kategori']==""){
    item.push("kategori")
    // console.log(item)
    // alert("error")
  }
  if(data['subkategori']==""){
    item.push("subkategori")
    // console.log(item)
    // alert("error")
  }
  if(item.length!=0){
    text=item.toString()
    item=[]
    return false
  }else{
    return true
  }
}
