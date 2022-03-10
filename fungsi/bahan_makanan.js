const url_bahan = 'http://adm.cafesako.store/api/bahan';

getapi(url_bahan);

async function getapi(urls) {
  // Storing response
  output='';
  const response2 = await fetch(urls);

  // Storing data in form of JSON
  var data2 = await response2.json();
  console.log(data2.data)
  jmlh_data2=data2.data.length
  for (let i= 0; i < jmlh_data2 ; i++) {
    var date = data2.data[i]['create_at']
    let formatDate = date.split('T');
    let formatDate2 = formatDate[0].split('-');
    let formatDate3 = formatDate2[2]+"-"+formatDate2[1]+"-"+formatDate2[0]
    console.log(formatDate,formatDate2,formatDate3)
    showPsn(i+1,data2.data[i]['description'],data2.data[i]['quantity'],data2.data[i]['satuan'],formatDate3,data2.data[i]['id'])
  }
  document.getElementById('data-table').innerHTML=output;

}

function showPsn(id,nama,quantity,satuan,tanggal,id_bhn){
  output +=
          `<tr>
            <td>
              <a href="bahan_detail.html?key=`+id_bhn+`">
                <i class="fas fa-eye"></i>
              </a>
            </td>
            <td>`+id+`</td>
            <td>`+nama+`</td>
            <td>`+quantity+`</td>
            <td>`+satuan+`</td>
            <td>`+tanggal+`</td>
          </tr>`;
return output
}


function postPesanan(){
  var quantity = document.getElementById('quantity').value
  var quantityInt =parseInt(quantity)
  var name = document.getElementById('name').value
  var satuan = document.getElementById('satuan').value

  console.log(quantityInt,name,satuan)

  valid=validatePost({quantity:quantityInt,name:name,satuan:satuan})
  if (valid==true)
  {
    postData({
      quantity:quantityInt,
      description:name,
      satuan:satuan
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
  const response = await fetch(url_bahan+"/input",{
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
  if(data['quantity']==""){
    item.push("quantity");
  }if(data['name']==""){
    item.push("nama bahan");
  }if(data['satuan']==""){
    item.push("satuan");
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
