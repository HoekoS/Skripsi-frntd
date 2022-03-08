// var x = new URLSearchParams(window.location.search);
// var id=x.get('key');
// var no_nota;
// console.log(id);
const url_pesanan = 'http://localhost:3737/api/order';
var output = '';

getapi(url_pesanan);

async function getapi(urls) {
  // Storing response detail psnn
  var i=0;
  const response2 = await fetch(url_pesanan+'/detail/all');
  var data2 = await response2.json();

  console.log(data2.data)

  // Storing response
  const response = await fetch(urls+'/get/dapur');
  var data = await response.json();
  console.log(data.data)
  jmlh_data=data.data.length
  for (let j= 0; j < jmlh_data ; j++) {
    i=0
    show(data.data[j]['nama_pelanggan'],data.data[j]['no_nota'],data.data[j]['no_meja'],data.data[j]['flag_ta'],data.data[j]['State'])
    data2.data.filter(item=>item.no_nota==data.data[j]['no_nota']).forEach((itemData) => {
      i+=1
      // console.log(i,itemData.id,itemData.quantity,itemData.catatan)
      showDtl(i,itemData.nama_pelanggan,itemData.quantity,itemData.catatan)
    });
    getFooter(data.data[j]['id'])
    console.log(data.data[j]['id'])
  }
  document.getElementById('row-dapur').innerHTML=output;
}

function show(nama,no_nota,no_meja,flag_ta,state){
  var status=''
  if(flag_ta==1){
    status='Dine In'
  }else{
    status='Take Away'
  }
  output +=
          `<div class="col-4">
            <div class="card card-block">
              <div class="row ml-3 mt-3">
                <div class="col-md-auto nota">
                  Nomer<br>Meja
                </div>
                <div id="no-meja" class="col-md-auto mt-2 ml-auto dtlMenu">`+no_meja+`</div>
                <div class="col-2"></div>
                <div class="col-md-auto nota">
                  Nomer<br>Nota
                </div>
                <div id="no-nota" class="col-md-auto mt-2 mr-4 ml-auto dtlMenu">`+no_nota+`</div>
              </div>
              <hr>
              <div class="row ml-3 nmPl">
                <div class="col-md-auto">
                  Nama Pelanggan :
                </div>
                <div id="nm-Pelanggan" class="col">`+nama+`</div>
                <div id="status" class="col-md-auto mr-4">`+status+`</div>
              </div>
              <div class="row ml-3 mt-3 nmPl">
                <div class="col-md-auto">
                  State :
                </div>
                <div id="stt-now" class="col-md-auto">`+state+`</div>
              </div>
            </div>
            <div id="row-bod" class="card card-bod">`;
return output
}

function showDtl(id,nama,qtty,catatan){
  output +=
          `<div class="row mt-4 ml-4 mr-4">
            <div class="col-1 nmPsn mt-1">`+id+`</div>
            <div class="col-md-auto mr-auto mt-1 namaPsn">`+nama+`</div>
            <div class="col-md-auto ml-auto mr-auto mt-1 nmPsn">Jumlah:</div>
            <div class="col-md-auto ml-auto mr-auto jmlh">`+qtty+`</div>
          </div>
          <div class="row mr-2 mt-1 dtl-menu">
            <div class="col-md-auto ml-auto mr-auto">Catatan : </div>
            <div class="col-md-auto ml-auto mr-auto">`+catatan+`</div>
          </div>`;
return output
}


function getFooter(id){
  output +=
          `</div>
          <div class="card card-foot">
            <div class="row mr-4 ml-4 mt-3">
              <div class="col-md-auto">
                <button  onClick="masakState('`+id+`')" class="btn btn-primary" data-toggle="modal" data-target="#editState">Sedang Dimasak</button>
              </div>
              <div class="col-md-auto ml-auto">
                <button onClick="selesaiMasakState('`+id+`')" class="btn btn-primary btn-bayar" data-toggle="modal" data-target="#confirm-delete">Selesai Dimasak</button>
              </div>
            </div>
          </div>
        </div>`;
return output
}


function masakState(id){
  updateBayar({
    state:"SEDANG DIMASAK",
  },id)
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

function selesaiMasakState(id){
  updateBayar({
    state:"SELESAI DIMASAK",
  },id)
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

async function updateBayar(data={},id){
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

