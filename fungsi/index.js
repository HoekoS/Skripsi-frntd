const url_dash = 'http://adm.cafesako.store/api/dashboard';
var output = "";
var output2 = "";
var output3 = "";

getApiCtg(url_dash+"/bahan")
getApiShift(url_dash+"/shift")
getMenuApi(url_dash+"/menu")
getKosongApi(url_dash+"/kosong")

async function getApiCtg(urls){

  const response = await fetch(urls);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  jmlh_data=data.data.length
  var i=0;
  for (let j= 0; j < jmlh_data ; j++) {
    var date = data.data[j]['create_at']
    let formatDate = date.split('T');
    let formatDate2 = formatDate[0].split('-');
    let formatDate3 = formatDate2[2]+"-"+formatDate2[1]+"-"+formatDate2[0]

    show(data.data[j]['id'],data.data[j]['description'],formatDate3);
  }
  document.getElementById('row-habis').innerHTML=output;
}

function show(id,name,date){
  // console.log(id_usr)
  output +=
        `<li class="item">
        <a href="http://adm.cafesako.store/bahan/bahan_detail.html?key=`+id+`" class="product-title">`+name+`
        <span class="badge badge-danger float-right">Habis</span></a>
      <span class="product-description">
        Tanggal Pembelian Terahkir :`+date+`
      </span>

      </li>`;
  return output
}

async function getApiShift(urls){
  var span =""
  const response = await fetch(urls);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  jmlh_data=data.data.length
  var i=0;
  for (let j= 0; j < jmlh_data ; j++) {
    if(data.data[j]['staff_status']=="Part Time"){
      span="success"
    }else{
      span="warning"
    }
    showShift(
      data.data[j]['nama'],
      data.data[j]['staff_status'],
      data.data[j]['staff_position'],
      data.data[j]['start_at'],
      data.data[j]['end_at'],
      data.data[j]['description'],
      span
    );
  }
  document.getElementById('body-shift').innerHTML=output2;
}

function showShift(nama,stts,pstn,str,end,dsc,span){
  console.log(span)
  output2 +=
        `<tr>
        <td>`+nama+`</td>
        <td><span class="badge badge-`+span+`">`+stts+`</span></td>
        <td>`+pstn+`</td>
        <td>
          <div class="sparkbar" data-color="#00a65a" data-height="20">`+str+` - `+end+` : `+dsc+`</div>
        </td>
      </tr>`;
  return output2
}

async function getMenuApi(urls){
  const response = await fetch(urls);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  jmlh_data=data.data.length
  var i=0;
  for (let j= 0; j < jmlh_data ; j++) {
    showMenu(
      data.data[j]['name'],
      data.data[j]['description'],
      data.data[j]['price'],
      data.data[j]['pic']
    );
  }
  document.getElementById('menu-row').innerHTML=output3;
}

function showMenu(nama,dsc,prc,pic){
  // console.log(id_usr)
  output3 +=
        `<li>
        <img src="http://file.cafesako.store/`+pic+`" alt="User Image" style="height:100px">
        <a class="users-list-name" style="font-weight:bold">`+nama+`</a>
        <span class="users-list-date">`+dsc+` - Rp. `+prc+`</span>
      </li>`;
  return output3
}

async function getKosongApi(urls){
  const response = await fetch(urls);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  document.getElementById('mj-ksng').innerHTML=data.data[0]["jumlah"];

  getSelesaiApi(url_dash+"/selesai")
}
async function getSelesaiApi(urls){
  const response = await fetch(urls);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  document.getElementById('psn-sls').innerHTML=data.data[0]["jumlah"];
  getBatalApi(url_dash+"/batal")
}
async function getBatalApi(urls){
  const response = await fetch(urls);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  document.getElementById('psn-btl').innerHTML=data.data[0]["jumlah"];
  getHabisApi(url_dash+"/habis")
}
async function getHabisApi(urls){
  const response = await fetch(urls);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  document.getElementById('mkn-hbs').innerHTML=data.data[0]["jumlah"];
}
