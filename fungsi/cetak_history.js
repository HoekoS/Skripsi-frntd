const url_pesanan = 'http://adm.cafesako.store/api/order';
var x = new URLSearchParams(window.location.search);
var id=x.get('key');
console.log(id);
var output = "";
var output2 = "";
var date1='23-01-2022'
var date2='21-02-2022'
const url_history = 'http://adm.cafesako.store/api/history?date1='+date1+"&date2="+date2;
const url_detail = 'http://adm.cafesako.store/api/history/detail';

getapi(url_pesanan);

document.getElementById('jarak').innerHTML=date1+" sampai "+date2;
async function getapi(urls) {
  // Storing response
  output='';
  const response2 = await fetch(url_detail);
  var data2 = await response2.json();
  console.log(data2.data)

  const response = await fetch(url_history);
  var data = await response.json();
  console.log(data.data)
  jmlh_data=data.data.length
  for (let j= 0; j < jmlh_data ; j++) {
    var date = data.data[j]['date']
    let formatDate = date.split('T');
    let formatDate2 = formatDate[0].split('-');
    let formatDate3 = formatDate2[2]+"-"+formatDate2[1]+"-"+formatDate2[0]
    i=0
    show(j+1,data.data[j]['nama_pelanggan'],data.data[j]['no_nota'],data.data[j]['status_ta'],data.data[j]['total_price'],formatDate3)
    show2()
    data2.data.filter(item=>item.no_nota==data.data[j]['no_nota']).forEach((itemData) => {
      i+=1
      // console.log(i,itemData.id,itemData.quantity,itemData.catatan)
      show3(i,itemData.name,itemData.quantity,itemData.price,itemData.total_price)
    });
  }
  document.getElementById('data-psn').innerHTML=output;
}

function show(id,nama,no_nota,status,price,date){
  output +=
          `<tr>
          <td>`+id+`</td>
          <td>`+no_nota+`</td>
          <td colspan="2">`+nama+`</td>
          <td colspan="3">`+status+`</td>
          <td>`+price+`</td>
          <td>`+date+`</td>
        </tr>`;
return output
}

function show2(){
  output +=`
    <tr style=" background-color: antiquewhite;">
      <th></th>
      <th></th>
      <th colspan="2">Detail Pesanan</th>
      <th>Qty</th>
      <th></th>
      <th>Harga Satuan</th>
      <th></th>
      <th></th>
    </tr>`
  return output
}


function show3(id,name,quantity,price,total_price){
  output +=`
  <tr>
    <td></td>
    <td></td>
    <td>`+id+`</td>
    <td>`+name+`</td>
    <td>`+quantity+`</td>
    <td>x</td>
    <td>`+price+`</td>
    <td>`+total_price+`</td>
    <td></td>
  </tr>`
  return output
}
