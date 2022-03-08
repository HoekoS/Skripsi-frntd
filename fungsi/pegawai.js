const url_employee = 'http://localhost:3737/api/employee';
var output = "";
var date1="";
var date2="";

getapi(url_employee);

async function getapi(urls) {
  // Storing response
  output='';
  const response2 = await fetch(urls);

  // Storing data in form of JSON
  var data2 = await response2.json();
  console.log(data2.data)
  jmlh_data2=data2.data.length
  for (let i= 0; i < jmlh_data2 ; i++) {
    showPsn(i+1,data2.data[i]['full_name'],data2.data[i]['staff_status'],data2.data[i]['staff_position'],data2.data[i]['id'])
  }
  document.getElementById('data-table').innerHTML=output;

}

function showPsn(id,nama,stts,posisi,id_pgwai){
  output +=
          `<tr>
            <td>
              <a href="pegawai_detail.html?key=`+id_pgwai+`">
                <i class="fas fa-eye"></i>
              </a>
            </td>
            <td>`+id+`</td>
            <td>`+nama+`</td>
            <td>`+stts+`</td>
            <td>`+posisi+`</td>
          </tr>`;
return output
}
function pindahTanggal(date) {
  console.log("masuk JS "+date);
  date1=date
}
function pindahValue2(date) {
  console.log("masuk JS "+date);
  date2=date
}

function postEmployee(){
  var nama = document.getElementById('name').value
  var gender = document.getElementById('gender').value
  var tmptLahir = document.getElementById('tempat-lahir').value
  var tnglLahir = String(date1)
  var alamat = document.getElementById('alamat').value
  var email = document.getElementById('email').value
  var noTlpn = document.getElementById('nomor-telepon').value
  var staffStts = document.getElementById('staff-status').value
  var posisi = document.getElementById('posisi-staff').value
  var tnglBergabung = String(date2)
  var staffAktif = document.getElementById('staff-aktif').value

  valid=validatePost({
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
    postData({
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

async function postData(data={}){
  // console.log(data['birth_date']+"ini date join:"+data['staff_date_join'])
  const response = await fetch(url_employee+"/input",{
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
