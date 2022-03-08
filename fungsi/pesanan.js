var x = new URLSearchParams(window.location.search);
var id=x.get('key');
var no_nota;
console.log(id);
const url_pesanan = 'http://localhost:3737/api/order';
const url_kategori = 'http://localhost:3737/api/menu/kategori';
const url_pilih = ''
// let output2='';
var stateValue;
var idPesanan;

getapi(url_pesanan);

async function getapi(urls) {
  // Storing response
  const response = await fetch(urls+'?key='+id);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  document.getElementById('no-nota').innerHTML=data.data[0]['no_nota']
  no_nota=data.data[0]['no_nota']
  document.getElementById('no-meja').innerHTML=data.data[0]['no_meja']
  document.getElementById('nm-Pelanggan').innerHTML=data.data[0]['nama_pelanggan']
  document.getElementById('stt-now').innerHTML=data.data[0]['State']
  // data.data[0]['State']
  // console.log(data.data[0]['State'])
  var test = data.data[0]['flag_ta']
  if(test==0){
    document.getElementById('status').innerHTML='Dine In'
  }
  else{
    document.getElementById('status').innerHTML='Take Away'
  }
  getapipilih(url_pesanan+'/pilih',no_nota);
  getTotal(url_pesanan,no_nota);
}

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
  getApiCtg(cityName)
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

async function getApiCtg(category){
  const response = await fetch(url_kategori+'?ctg='+category);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  jmlh_data=data.data.length
  for (let j= 0; j < jmlh_data ; j++) {
    show(data.data[j]['name'],data.data[j]['pic'],data.data[j]['id'])
  }
  document.getElementById(category+'Row').innerHTML=output;
}

function modalShow(id){
  idPesanan = id
  console.log(id)
}

function show(nama,pic,idMn){
  output +=
          `<div class="col-4">
          <div class="card imgMenu">
            <div class="card-body">
              <a href="#modalAdd" data-toggle="modal" data-target=".bd-example-modal-lg" onclick="modalShow('`+idMn+`')">
                <img id="imgs" src=http://localhost:3838/`+pic+`>
              </a>
              <div class="row mt-2">
                <div class="col-md-auto ml-auto mr-auto">
                  <p id="nama-menu" class="infoMenu namaMenu">`+nama+`</p>
                </div>
              </div>
            </div>
          </div>
        </div>`;
return output
}

function postPesanan(){
  var catatan
  id = idPesanan
  var jmlhPesanan = document.getElementById('jmlh-pesn').value
  var jmlhPesananInt =parseInt(jmlhPesanan)
  catatan = document.getElementById('cttn-pesn').value
  if( catatan == ""){
    // console.log("sini")
    catatan = "Tidak Ada Catatan"
  }
  console.log(idPesanan,jmlhPesanan,catatan,no_nota)

  valid=validatePost({jmlhPesanan: jmlhPesanan})
  if (valid==true)
  {
    postData({
      quantity:jmlhPesananInt,
      catatan:catatan,
      id_menu:id,
      no_nota:no_nota
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

async function postData(data={}){
  console.log(data['catatan'])
  const response = await fetch(url_pesanan+"/pilih/post",{
    method:'POST',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  });
  return response.json();
}

function validatePost(data = {}) {
  // alert("er")
  var item=[];
  if(data['jmlhPesanan']==""){
    item.push("Jumlah");
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

async function getapipilih(urls,no_nota) {
  // Storing response
  output2='';
  const response2 = await fetch(urls+'?not='+no_nota);

  // Storing data in form of JSON
  var data2 = await response2.json();
  console.log(data2.data)
  jmlh_data2=data2.data.length
  for (let i= 0; i < jmlh_data2 ; i++) {
    showPsn(i+1,data2.data[i]['nama_pelanggan'],data2.data[i]['quantity'],data2.data[i]['price'],data2.data[i]['total_harga'],data2.data[i]['catatan'],data2.data[i]['id'])
  }
  document.getElementById('pilihMenu').innerHTML=output2;

}

function showPsn(id,nama,quantity,price,total,catatan,id_detail){
  output2 +=
          `<div class="row mt-1">
            <div class="col-1 mt-2">`+id+`</div>
              <div class="col-md-auto mt-2">`+nama+`</div>
              <div class="ml-auto""><button onclick="coba(`+id_detail+`)" class="btn" data-toggle="modal" data-target="#modalEdit"><i class="fas fa-edit fa-xs"></i></button></div>
              <div class="ml-2"><button onclick="deletePesanan(`+id_detail+`)" class="btn"><i class="fas fa-trash-alt fa-xs" ></i></button></div>
            </div>
            <div class="row">
              <div class="col-md-auto ml-auto">`+quantity+`</div>
              <div class="col-md-auto ml-auto">x</div>
              <div class="col-md-auto ml-auto">`+price+`</div>
              <div class="col-md-auto ml-auto">`+total+`</div>
            </div>
            <div class="row">
              <div class="col-md-auto ml-auto">Catatan : </div>
              <div class="col-md-auto ml-auto">`+catatan+`</div>
            </div>`;
return output2
}

async function getTotal(urls,no_nota) {
  const response3 = await fetch(urls+'/get/harga?not='+no_nota);

  // Storing data in form of JSON
  var data3 = await response3.json();
  console.log(data3.data)
  document.getElementById('ttl_hrga').innerHTML="Rp. "+data3.data[0]['total_harga']
}

async function coba(id){
  const response4 = await fetch(url_pesanan+'/get?id='+id);

  // Storing data in form of JSON
  var data4 = await response4.json();
  console.log(data4.data)
  document.getElementById('id-pesn').value=data4.data[0]['id']
  document.getElementById('edit-jmlh-pesn').value=data4.data[0]['quantity']
  document.getElementById('edit-cttn-pesn').value=data4.data[0]['catatan']
}

function editPesanan(){
  console.log("sini")
  var editCatatan
  id = idPesanan
  var id_psn = document.getElementById('id-pesn').value
  var editjmlhPesanan = document.getElementById('edit-jmlh-pesn').value
  var editjmlhPesananInt =parseInt(editjmlhPesanan)
  editCatatan = document.getElementById('edit-cttn-pesn').value
  if( editCatatan == ""){
    // console.log("sini")
    editCatatan = "Tidak Ada Catatan"
  }
  valid=validatePost({jmlhPesanan: editjmlhPesanan})
  if (valid==true)
  {
    updateData({
      quantity:editjmlhPesananInt,
      catatan:editCatatan,
    },id_psn)
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

async function updateData(data={},id){
  console.log(data['catatan'])
  const response4 = await fetch(url_pesanan+"/pilih/update?key="+id,{
    method:'PUT',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  });
  return response4.json();
}

async function deletePesanan(id){
  const response4 = await fetch(url_pesanan+"/pilih/delete?key="+id,{
    method:'DELETE',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    }
  }).then(res => res.json());
  location.reload();
}

function editState(){
  var editState = document.getElementById('edit-state').value
  console.log(editState)
  // alert(editState)
  valid=validateState({editState: editState})
  if (valid==true)
  {
    updatePut({
      state:editState,
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
  if(data['editState']==""){
    item.push("State");
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
  const response5 = await fetch(url_pesanan+"/pilih/state?key="+id,{
    method:'PUT',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  });
  return response5.json();
}

function bayarState(){
  updateBayar({
    state:"Done",
  })
  .then(data=>{
    if(data.status=="True"){
      console.log("data sukses");
      // alert("sukses")
      window.location.replace("http://localhost:3737/pesanan/denah.html");
    }else{
      console.log("data error "+data.status);
      alert("Data Error");
    }
  });
}

async function updateBayar(data={}){
  const response6 = await fetch(url_pesanan+"/pilih/state?key="+id,{
    method:'PUT',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  });
  return response6.json();
}
