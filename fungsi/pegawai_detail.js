const url_employee = 'http://adm.cafesako.store/api/employee';
const url_shcedule = 'http://adm.cafesako.store/api/schedule';
const url_empSche = 'http://adm.cafesako.store/api/employee/schedule';

var x = new URLSearchParams(window.location.search);
var id=x.get('key');
console.log(id);
var output = "";
var output2 = "";
var output4 = "";
var date1="";
var date2="";

getapi(url_employee);

async function getapi(urls) {
  // Storing response
  output='';
  const response = await fetch(urls+"?key="+id);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  jmlh_data=data.data.length
  document.getElementById('nama').innerHTML=data.data[0].full_name;
  if(data.data[0].gender=="male"){
    document.getElementById('gender').innerHTML="Laki - laki";
  }else{
    document.getElementById('gender').innerHTML="Perempuan";
  }
  document.getElementById('tmpt').innerHTML=data.data[0].birth_place;
  document.getElementById('tgl').innerHTML=data.data[0].birth_date;
  document.getElementById('alamat').innerHTML=data.data[0].address;
  document.getElementById('email').innerHTML=data.data[0].email;
  document.getElementById('noTlp').innerHTML=data.data[0].phone_number;
  document.getElementById('status').innerHTML=data.data[0].staff_status;
  document.getElementById('posisi').innerHTML=data.data[0].staff_position;
  document.getElementById('tgl-brgbng').innerHTML=data.data[0].staff_date_join;
  document.getElementById('aktif').innerHTML=data.data[0].staff_active;
  // console.log(data.data[0].staff_date_join)

  document.getElementById('name-edit').value=data.data[0].full_name;
  document.getElementById('gender-edit').value=data.data[0].gender;
  document.getElementById('tempat-lahir-edit').value=data.data[0].birth_place;
  document.getElementById('alamat-edit').value=data.data[0].address;
  document.getElementById('email-edit').value=data.data[0].email;
  document.getElementById('nomor-telepon-edit').value=data.data[0].phone_number;
  document.getElementById('staff-status-edit').value=data.data[0].staff_status;
  document.getElementById('posisi-staff-edit').value=data.data[0].staff_position;
  document.getElementById('staff-aktif-edit').value=data.data[0].staff_active;
  getSchedulEmp(url_empSche);
}

function pindahTanggal(date) {
  console.log("masuk JS "+date);
  date1=date
}
function pindahValue2(date) {
  console.log("masuk JS "+date);
  date2=date
}

function putEmployee(){
  var nama = document.getElementById('name-edit').value
  var gender = document.getElementById('gender-edit').value
  var tmptLahir = document.getElementById('tempat-lahir-edit').value
  var tnglLahir = String(date1)
  var alamat = document.getElementById('alamat-edit').value
  var email = document.getElementById('email-edit').value
  var noTlpn = document.getElementById('nomor-telepon-edit').value
  var staffStts = document.getElementById('staff-status-edit').value
  var posisi = document.getElementById('posisi-staff-edit').value
  var tnglBergabung = String(date2)
  var staffAktif = document.getElementById('staff-aktif-edit').value

  valid=validatePut({
    nama:nama,
    gender:gender,
    tmptLahir:tmptLahir,
    tnglLahir:tnglLahir,
    alamat:alamat,
    email:email,
    noTlpn:noTlpn,
    staffStts:staffStts,
    posisi:posisi,
    tnglBergabung:tnglBergabung,
    staffAktif:staffAktif
  })
  console.log("sini "+tnglLahir+" dan "+tnglBergabung)
  if (valid==true)
  {
    PutData({
      full_name:nama,
      gender:gender,
      birth_date:tnglLahir,
      birth_place:tmptLahir,
      address:alamat,
      email:email,
      phone_number:noTlpn,
      staff_status:staffStts,
      staff_position:posisi,
      staff_active:staffAktif,
      staff_date_join:tnglBergabung
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

async function PutData(data={}){
  // console.log(data['birth_date']+"ini date join:"+data['staff_date_join'])
  const response = await fetch(url_employee+"/update?key="+id,{
    method:'Put',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  });
  return response.json();
}

function validatePut(data = {}) {
  // alert("er")
  var item=[];
  if(data['nama']==""){
    item.push("Nama");
  }if(data['gender']==""){
    item.push("Jenis Kelamin");
  }if(data['tmptLahir']==""){
    item.push("Tempat Lahir");
  }if(data['tnglLahir']==""){
    item.push("Tanggal Lahir");
  }if(data['alamat']==""){
    item.push("Alamat");
  }if(data['email']==""){
    item.push("Email");
  }if(data['noTlpn']==""){
    item.push("Nomor Telepon");
  }if(data['staffStts']==""){
    item.push("Staff Status");
  }if(data['posisi']==""){
    item.push("Posisi Status");
  }if(data['tnglBergabung']==""){
    item.push("Tanggal Bergabung");
  }if(data['staffAktif']==""){
    item.push("Staff Status Aktif");
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

async function deletePegawai(){
  const response4 = await fetch(url_employee+"/delete?key="+id,{
    method:'DELETE',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    }
  }).then(res => res.json());
  window.location.replace("http://adm.cafesako.store/pegawai/pegawai.html");
}

function addSchedule(){
  var id_sche = document.getElementById('schedule-edit').value
  // console.log(nama)

  valid=validatePost({
    id_sche:id_sche
  })
  if (valid==true)
  {
    postData({
      employee_id:id,
      schedule_id:parseInt(id_sche),
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

function validatePost(data = {}) {
  // alert("er")
  var item=[];
  if(data['id_sche']==""){
    item.push("Masukan Jadwal Kerja");
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

async function postData(data={}){
  // console.log(data['birth_date']+"ini date join:"+data['staff_date_join'])
  const response = await fetch(url_empSche+"/input",{
    method:'POST',
    withCredentials: true,
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  });
  return response.json();
}

getSchedule(url_shcedule);

async function getSchedule(urls) {
  // Storing response
  output2='';
  const response2 = await fetch(urls);

  // Storing data in form of JSON
  var data2 = await response2.json();
  console.log(data2.data)
  jmlh_data2=data2.data.length
  for (let i= 0; i < jmlh_data2 ; i++) {
    showPsn(data2.data[i]['id'],data2.data[i]['day'],data2.data[i]['description'])
  }
  document.getElementById('schedule-edit').innerHTML=output2;

}

function showPsn(id,day,dscr){
  var output3 = day + " " + dscr
  output2 +=
          `<option value=`+id+`>`+output3+`</option>`;
  return output2
}


async function getSchedulEmp(urls) {
  // Storing response
  output4='';
  const response3 = await fetch(urls+"/get?key="+id);

  // Storing data in form of JSON
  var data3 = await response3.json();

  jmlh_data3=data3.data.length
  console.log(data3.data)
  for (let i= 0; i < jmlh_data3 ; i++) {
    var date = data3.data[i]['start_at']
    let formatDate = date.split('T');
    let formatDate2 = formatDate[1].split('Z');
    let formatDate3 = formatDate2[0]

    var date = data3.data[i]['end_at']
    let endAt = date.split('T');
    let endAt2 = endAt[1].split('Z');
    let endAt3 = endAt2[0]

    showSch(i+1,data3.data[i]['id'],data3.data[i]['day'],formatDate3,endAt3,data3.data[i]['description'])

  }
  document.getElementById('jadwal-row').innerHTML=output4;

}

function showSch(id,id_sch,day,start,end,dscr){
  output4 +=
        `<tr>
          <td>
            <button onclick="deleteSch(`+id_sch+`)" class="btn">
              <i class="fas fa-trash-alt fa-xs" ></i>
            </button>
          </td>
          <td>`+id+`</td>
          <td>`+day+`</td>
          <td>`+dscr+`</td>
          <td>`+ start +` - `+end+`</td>
        </tr>`;
  return output4
}

function deleteSch(ids){
  fetch(url_empSche+'/delete?key='+ids, {
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
