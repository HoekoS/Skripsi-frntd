const url_schedule = 'http://adm.cafesako.store/api/schedule';
var output = "";

getApiCtg()

async function getApiCtg(){

  const responseSche = await fetch(url_schedule+"/view");
  var dataSche = await responseSche.json();

  const response = await fetch(url_schedule);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data)
  jmlh_data=data.data.length
  var i=0;
  for (let j= 0; j < jmlh_data ; j++) {
    var date = data.data[j]['start_at']
    let formatDate = date.split('T');
    let formatDate2 = formatDate[1].split('Z');
    let formatDate3 = formatDate2[0]

    var date = data.data[j]['end_at']
    let endAt = date.split('T');
    let endAt2 = endAt[1].split('Z');
    let endAt3 = endAt2[0]
    // console.log(endAt3)

    if(data.data[j]['id']%2==1){
      // console.log("ganjil")
      showGanjil(data.data[j]['day'],formatDate3,endAt3,data.data[j]['description']);
      dataSche.data.filter(item=>item.day==data.data[j]['day']).filter(item=>item.description==data.data[j]['description']).forEach((itemData) => {
        i+=1
        console.log(i,itemData.full_name)
        showEmpGanjil(i,itemData.full_name)
        // showDtl(i,itemData.nama_pelanggan,itemData.quantity,itemData.catatan)
      });
      i=0
    }else{
      // console.log("genap")
      showGenap(data.data[j]['day'],formatDate3,endAt3,data.data[j]['description']);
      dataSche.data.filter(item=>item.day==data.data[j]['day']).filter(item=>item.description==data.data[j]['description']).forEach((itemData) => {
        i+=1
        console.log(i,itemData.full_name)
        showEmpGenap(i,itemData.full_name)
        // showDtl(i,itemData.nama_pelanggan,itemData.quantity,itemData.catatan)
      });
      i=0
      output+=`</div></div></div>`

    }
  }
  console.log(output)
  document.getElementById('row-schedule').innerHTML=output;
}

function showGanjil(day,start,end,desc){
  output +=
        `<div class="col-3">
          <div class="card card-block">
            <div class="row ml-3 mt-3">
              <div class="col-md-auto nm-hari">
                `+day+`
              </div>
            </div>
            <hr>
            <div class="nmPl">
              <div class="row ml-3 clrRow">
                <div class="col-md-auto">
                  `+desc+`
                </div>
                <div class="col-md-auto ml-auto mr-3">
                  `+start+` - `+end+`
                </div>
              </div>`;
return output
}

function showEmpGanjil(id,nama){
  output+=`
              <div id="row-jadwal" class="row ml-3">
                <div class="col-md-auto mt-4">
                  `+id+`.
                </div>
                <div class="col-md-auto mt-4">
                  `+nama+`
                </div>
              </div>`
}

function showGenap(day,start,end,desc){
  output +=
            `
            </div>
            <hr>
            <div class="nmPl">
                <div class="row ml-3 clrRow">
                  <div class="col-md-auto mt-1">
                    `+desc+`
                  </div>
                  <div class="col-md-auto ml-auto mt-1 mr-3">
                    `+start+` - `+end+`
                  </div>
                </div>`
}


function showEmpGenap(id,nama){
  output+=`
              <div id="row-jadwal-2" class="row ml-3">
                <div class="col-md-auto mt-4">
                  `+id+`.
                </div>
                <div class="col-md-auto mt-4">
                  `+nama+`
                </div>
              </div>`
}
