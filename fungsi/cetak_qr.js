const url_pesanan = 'http://adm.cafesako.store/api/order';
var x = new URLSearchParams(window.location.search);
var id=x.get('key');
console.log(id);
var output = "";

getapi(url_pesanan);

async function getapi(urls) {
  // Storing response
  output='';
  const response = await fetch(urls+"?key="+id);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  todayRpl=moment(today).format('DD MMMM YYYY, HH:MM:SS');

  const flag=data.data[0].flag_ta;
  var stts=""
  if(flag==1){
    stts="Takeaway"
  }else{
    stts="Dine In"
  }
  document.getElementById('tanggal-now').innerHTML=todayRpl;
  document.getElementById('no-nota').innerHTML=data.data[0].no_nota;
  document.getElementById('no-meja').innerHTML=data.data[0].no_meja;
  document.getElementById('nama-plgn').innerHTML=data.data[0].nama_pelanggan;
  document.getElementById('status-psn').innerHTML=stts;
  document.getElementById('img-scan').src="http://file.cafesako.store/"+data.data[0].Url;
}
