const url = 'http://adm.cafesako.store/api/menu';
let output = '';
var text="";

fetch(url)
  .then(
    res => {
      res.json().then(
        data => {
          console.log(data.data);
          if (data.data.length > 0) {

            var temp = "";
            data.data.forEach((itemData) => {
              temp += "<tr>";
              temp += "<td>" + itemData.name + "</td>";
              temp += "<td>" + itemData.description + "</td>";
              temp += "<td>" + itemData.kategori + "</td>";
              temp += "<td>" + itemData.sub_kategori + "</td>";
              temp += "<td>" + itemData.price + "</td>";
              temp += "<td>" + itemData.pic + "</td>";
              temp += '<td><a href="../menu/detaiil_menu.html?key='+itemData.id+'" class="fas fa-edit" ></a></td></tr>';
            });
            document.getElementById('data-table').innerHTML = temp;
          }
        }
      )
    }
  )

document.getElementById("formMenu").addEventListener(
  "submit",
  function (event)
  {
    event.preventDefault();
    postform()
  },
  false
);

function postform() {
  var urlFile=""
  var produkName = document.getElementById("name").value;
  var description = document.getElementById("description").value;
  var price = document.getElementById("price").value;
  var kategori = document.getElementById("kategori").value;
  var file = document.getElementById('file').files[0];
  var subkategori = document.getElementById('subkategori').value;
  // alert(subkategori)
  if(file!=undefined){
    urlFile = document.getElementById('file').files[0].name;
    // console.log(urlFile)
    // alert("error")
  }
  // console.log(urlFile)
  // alert("error")
  // return false
  valid=validatePost({name: produkName, description: description, price: price, kategori: kategori, file: urlFile,kategori: kategori,subkategori:subkategori})

  // console.log(test)
  if(valid==true){
    postData({
      name: produkName,
      description: description,
      price: price,
      file: file,
      urlFile:urlFile,
      kategori: kategori,
      subkategori:subkategori,
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
  var dataAppnd = new FormData();
  dataAppnd.append('kategori',data['kategori']);
  dataAppnd.append('subkategori',data['subkategori']);
  // alert(data['subkategori'])
  dataAppnd.append('name',data['name']);
  // alert(data['name'])
  dataAppnd.append('description',data['description']);
  // alert(data['description'])
  dataAppnd.append('price',data['price']);
  // alert(data['price'])
  dataAppnd.append('file',data['file'],data['urlFile']);
  // alert(data['file'])
  // alert(data['urlFile'])
  // console.log(Object.fromEntries(dataAppnd))
  // alert(data['kategori'])
  var response = fetch(url+'/post', {
      method: 'POST',
      withCredentials: true,
      headers: {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
      },
      body: dataAppnd
  })
  // alert("error");
  // console.log(Object.fromEntries(dataAppnd))
  // alert(response)
  return response;
}
function validatePost(data = {}) {
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
  if(data['file']==""){
    item.push("file")
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
