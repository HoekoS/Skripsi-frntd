var x = new URLSearchParams(window.location.search);
var id=x.get('key');
const url_bahan = 'http://adm.cafesako.store/api/bahan';
var satuan = "";

function openCity(evt, cityName) {
  output='';
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

getapi(url_bahan);
getapiDetail(url_bahan);

async function getapi(urls) {
  // Storing response
  output='';
  const response2 = await fetch(urls+"/tambah?key="+id);

  // Storing data in form of JSON
  var data2 = await response2.json();
  console.log(data2.data)
  jmlh_data2=data2.data.length
  for (let i= 0; i < jmlh_data2 ; i++) {
    var date = data2.data[i]['create_at']
    let formatDate = date.split('T');
    let formatDate2 = formatDate[0].split('-');
    let formatDate3 = formatDate2[2]+"-"+formatDate2[1]+"-"+formatDate2[0]
    showPsn(i+1,data2.data[i]['quantity'],formatDate3,data2.data[i]['id'])
  }
  document.getElementById('data-table-tambah').innerHTML=output;
}

function showPsn(id,quantity,date,id_dtl){
  output +=
          `<tr>
            <td><button onclick="deleteDetail(`+id_dtl+`)" class="btn"><i class="fas fa-trash-alt fa-xs" ></i></button></td>
            <td>`+id+`</td>
            <td>`+quantity+`</td>
            <td>`+date+`</td>
          </tr>`;
return output
}

getapikurang(url_bahan);

async function getapikurang(urls) {
  // Storing response
  output2='';
  const response2 = await fetch(urls+"/kurang?key="+id);

  // Storing data in form of JSON
  var data = await response2.json();
  console.log(data.data)
  jmlh_data=data.data.length
  for (let i= 0; i < jmlh_data ; i++) {
    var date = data.data[i]['create_at']
    let formatDate = date.split('T');
    let formatDate2 = formatDate[0].split('-');
    let formatDate3 = formatDate2[2]+"-"+formatDate2[1]+"-"+formatDate2[0]
    showPsnKurang(i+1,data.data[i]['quantity'],formatDate3,data.data[i]['id'])
  }
  document.getElementById('data-table-kurang').innerHTML=output2;
}

function showPsnKurang(id,quantity,date,id_dtl){
  output2 +=
          `<tr>
            <td><button onclick="deleteDetailKurang(`+id_dtl+`)" class="btn"><i class="fas fa-trash-alt fa-xs" ></i></button></td>
            <td>`+id+`</td>
            <td>`+quantity+`</td>
            <td>`+date+`</td>
          </tr>`;
return output2
}

async function getapiDetail(urls) {
  // Storing response
  output='';
  const response2 = await fetch(urls+"?key="+id);

  // Storing data in form of JSON
  var data2 = await response2.json();
  console.log(data2.data)
  var date = data2.data[0]['create_at']
  let formatDate = date.split('T');
  let formatDate2 = formatDate[0].split('-');
  let formatDate3 = formatDate2[2]+"-"+formatDate2[1]+"-"+formatDate2[0]
  document.getElementById('edit-name').value=data2.data[0].description;
  document.getElementById('edit-quantity').value=data2.data[0].quantity;
  document.getElementById('edit-satuan').value=data2.data[0].satuan;
  document.getElementById('edit-satuan2').value=data2.data[0].satuan;
  document.getElementById('edit-satuan3').value=data2.data[0].satuan;
  document.getElementById('edit-tanggal').value=formatDate3;
}

async function deleteBahan(){
  fetch(url_bahan+'/delete?key='+id, {
    method:'DELETE',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  .then(data=>{
    if(data.status=="True"){
      console.log("data sukses");
      // alert("sukses")
      window.location.replace("http://adm.cafesako.store/bahan/bahan_makanan.html");
    }else{
      console.log("data error "+data.status);
      alert("Data Error");
    }
  });
}

function editDetail(){
  var editName = document.getElementById('edit-name').value
  var editQuantity = parseInt(document.getElementById('edit-quantity').value)
  var editSatuan = document.getElementById('edit-satuan').value
  // alert(editState)
  valid=validateState({editName: editName,editQuantity:editQuantity,editSatuan:editSatuan})
  if (valid==true)
  {
    updatePut({
      description:editName,
      quantity:editQuantity,
      satuan:editSatuan,
    })
    .then(data=>{
      if(data.status=="True"){
        console.log("data sukses");
        // alert("sukses")
        location.reload();
      }else{
        console.log("data error "+data.status);
        alert("Data Error");
      }
    });
  }
}

function validateState(data = {}) {
  // alert("er")
  var item=[];
  if(data['editName']==""){
    item.push("Nama Bahan");
  }
  if(data['editQuantity']==""){
    item.push("Quantity");
  }
  if(data['editSatuan']==""){
    item.push("Satuan");
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

async function updatePut(data={}){
  console.log(data['catatan'])
  const response5 = await fetch(url_bahan+"/update?key="+id,{
    method:'PUT',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  });
  return response5.json();
}

function addTambahBahan(){
  var editQuantity = parseInt(document.getElementById('quantity-tambah').value)
  // alert(editState)
  valid=validateTambah({editQuantity:editQuantity})
  if (valid==true)
  {
    updateTambahBahan({
      quantity:editQuantity,
    })
    .then(data=>{
      if(data.status=="True"){
        console.log("data sukses");
        // alert("sukses")
        location.reload();
      }else{
        console.log("data error "+data.status);
        alert("Data Error");
      }
    });
  }
}

function validateTambah(data = {}) {
  // alert("er")
  var item=[];
  if(data['editQuantity']==""){
    item.push("Quantity");
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

async function updateTambahBahan(data={}){
  console.log(data['catatan'])
  const response5 = await fetch(url_bahan+"/tambah/input?key="+id,{
    method:'POST',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  });
  return response5.json();
}

async function deleteDetail(ids){
  fetch(url_bahan+'/tambah/delete?key='+ids, {
    method:'DELETE',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  .then(data=>{
    if(data.status=="True"){
      console.log("data sukses");
      // alert("sukses")
      location.reload();
    }else{
      console.log("data error "+data.status);
      alert("Data Error");
    }
  });
}


function addKurangBahan(){
  var editQuantity = parseInt(document.getElementById('quantity-kurang').value)
  // alert(editState)
  valid=validatekurang({editQuantity:editQuantity})
  if (valid==true)
  {
    updateKurangBahan({
      quantity:editQuantity,
    })
    .then(data=>{
      if(data.status=="True"){
        console.log("data sukses");
        // alert("sukses")
        location.reload();
      }else{
        console.log("data error "+data.status);
        alert("Data Error");
      }
    });
  }
}

function validatekurang(data= {}) {
  // alert("er")
  var item=[];
  if(data['editQuantity']==""){
    item.push("Quantity");
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

async function updateKurangBahan(data={}){
  console.log(data['catatan'])
  const response5 = await fetch(url_bahan+"/kurang/input?key="+id,{
    method:'POST',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  });
  return response5.json();
}

async function deleteDetailKurang(ids){
  fetch(url_bahan+'/kurang/delete?key='+ids, {
    method:'DELETE',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  .then(data=>{
    if(data.status=="True"){
      console.log("data sukses");
      // alert("sukses")
      location.reload();
    }else{
      console.log("data error "+data.status);
      alert("Data Error");
    }
  });
}
