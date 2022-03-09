const url = 'http://34.101.186.227:3737/api/order';
let output=''
var jmlh_meja = 30;
var meja=0;
var i=0;

async function getapi(urls) {
  // Storing response
  const response = await fetch(urls);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  // namaPlngn=data.data[1]['nama_pelanggan']
  if (data.data != null){
    jmlh_meja_kosong = jmlh_meja - data.data.length
  }else{
    jmlh_meja_kosong = jmlh_meja - 0
  }
  console.log(jmlh_meja_kosong)
  document.getElementById('jml_pelanggan').innerHTML='<label  style="margin-right: 50px;">Jumlah Pelanggan Saat Ini : '+data.data.length+'</label>'
  for (let j= 0; j < jmlh_meja; j++) {
    let x= j+1
    if(x<=data.data.length){
      var id = String(data.data[j]['id'])
      var output2 = ``
      if(data.data[j]['State']=="PESANAN DISUBMIT"){
        output2 = `style="background-color: pink;"`
      }

      output = showCetak(id,data.data[j]['no_nota'],data.data[j]['nama_pelanggan'],x,output2)
    }
    else{
      var output2 = ``
      output = show('','','',x,output2)
    }
    meja=x;
    document.getElementById('denah-row').innerHTML=output;
  }
  // if(jmlh_meja_kosong==30){
  //   for(let i=0;i<jmlh_meja_kosong;i++){
  //     var output2 = ``
  //     output = show('','','',x,output2)
  //   }
  // }
  // console.log(output)
}
getapi(url);


function showCetak(id,data1,data2,x,output2){
  // console.log(output2)
    output +=
            `<div class="col-2 col_mr">
              <div class="card cardDenah" `+output2+`>
                <div class="card-header">
                  <h3 class="card-title">
                    Meja `+ x +`
                  </h3>
                </div>
                <div class="card-body">
                  <div class="col">
                    <p>Nomer Nota :`+ data1+` </p>
                  </div>
                  <div class="col">
                    <p>Pelanggan :`+data2+` </p>
                  </div>
                  <div class="col">
                    <button onclick=pass2('`+id+`') id="btn-psn" class="btn btn-secondary">
                      Cetak QR
                    </button>
                  </div>
                  <div class="col">
                    <a href="pesanan2.html?key=`+id+`" id="btn-psn" class="btn btn-secondary">Pesanan</a>
                  </div>
                </div>
              </div>
            </div>`;
  return output
}

function show(id,data1,data2,x,output2){
  // console.log(output2)
    output +=
            `<div class="col-2 col_mr">
              <div class="card cardDenah">
                <div class="card-header">
                  <h3 class="card-title">
                    Meja `+ x +`
                  </h3>
                </div>
                <div class="card-body">
                  <div class="col">
                    <p>Nomer Nota :`+ data1+` </p>
                  </div>
                  <div class="col">
                    <p>Pelanggan :`+data2+` </p>
                  </div>
                  <div class="col">
                    <button onclick=pass(`+x+`) id="btn-psn" class="btn btn-secondary" data-toggle="modal" data-target=".bd-example-modal-lg">
                      Cetak QR
                    </button>
                  </div>
                  <div class="col">
                    <a id="btn-psn" class="btn btn-secondary">Pesanan</a>
                  </div>
                </div>
              </div>
            </div>`;
  return output
}

function pass(id){
  no_meja=id
  console.log(id)
}

function post(){
  const name = document.getElementById("name").value;
  var cek_ta = 0
  if(document.getElementById("cekBox").checked == true){
    cek_ta=1
  }else{
    cek_ta=0
  }
  console.log(name,cek_ta)
  // return
  valid=validatePost({nama_pelanggan: name})
  if (valid==true)
  {
    postData({
      nama_pelanggan:name,
      no_meja:no_meja,
      flag_ta:cek_ta,
      State:"Cetak QR"
    })
    .then(data=>{
      if(data.status=="True"){
        console.log("data sukses");
        location.reload();
      }else{
        console.log("data error "+data.status);
        alert("Data Error");
      }
    });
  }
}

async function postData(data={}){
  const response = await fetch(url+"/post",{
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
  if(data['nama_pelanggan']==""){
    item.push("name");
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

function pass2(ids){
  // ids=id
  window.open("http://34.101.186.227:3737/api/order/qr/cetak?key="+ids,"_blank")
  // console.log(ids)
}
