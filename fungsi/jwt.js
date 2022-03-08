// checkCookie()

// function getCookie(cname) {
//   let name = cname + "=";
//   let ca = document.cookie.split(';');
//   console.log(name,ca)
//   for(let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// function checkCookie() {
//   let user = getCookie("token");
//   console.log(user)
//   if (user != "") {
//     alert("Welcome again " + user);
//   } else {
//     alert("error")
//   }
// }

// let ca = document.cookie;
// alert(ca)
// console.log(ca)
const url_signout = 'http://localhost:3737/api/signout';
var path = window.location.pathname
console.log(path)
var role = localStorage.getItem("role");
var outputSidebar=""
console.log(role)
cekRole()

function cekPath(paths){
  if(paths=='/index.html'){
    document.getElementById('index-side').className = 'nav-link active';
  }
  if(paths=='/menu/menu.html'){
    document.getElementById('menu-side').className = 'nav-link active';
  }
  if(paths=='/pesanan/denah.html'){
    document.getElementById('denah-side').className = 'nav-link active';
  }
  if(paths=='/pesanan/history.html'){
    document.getElementById('history-side').className = 'nav-link active';
  }
  if(paths=='/dapur/dapur.html'){
    document.getElementById('dapur-side').className = 'nav-link active';
  }
  if(paths=='/pesanan/pesanan2.html'){
    document.getElementById('denah-side').className = 'nav-link active';
  }
  if(paths=='/bahan/bahan_makanan.html'){
    document.getElementById('bahan-side').className = 'nav-link active';
  }
  if(paths=='/bahan/bahan_detail.html'){
    document.getElementById('bahan-side').className = 'nav-link active';
  }
  if(paths=='/schedule/schedule.html'){
    document.getElementById('schedule-side').className = 'nav-link active';
  }
  if(paths=='/pegawai/pegawai.html'){
    document.getElementById('pegawai-side').className = 'nav-link active';
  }
  if(paths=='/pegawai/pegawai_detail.html'){
    document.getElementById('pegawai-side').className = 'nav-link active';
  }
  if(paths=='/login/register.html'){
    document.getElementById('regis-side').className = 'nav-link active';
  }
  if(paths=='/login/register.html'){
    document.getElementById('regis-side').className = 'nav-link active';
  }
}
function cekRole(){
  if(role=="role_admin"){
    outputSidebar += `<li class="nav-item">
              <a id="index-side" href="../../index.html" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a id="menu-side" href="../menu/menu.html" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>Menu</p>
              </a>
            </li>
            <li class="nav-item">
              <a id="denah-side" href="../pesanan/denah.html" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>Denah Restoran</p>
              </a>
            </li>

            <li class="nav-item">
              <a id="dapur-side" href="../dapur/dapur.html" class="nav-link">
                <i class="nav-icon fas fa-cocktail"></i>
                <p>Dapur</p>
              </a>
            </li>
            <li class="nav-item">
              <a id="history-side" href="../pesanan/history.html" class="nav-link">
                <i class="nav-icon fas fa-book"></i>
                <p>History Pesanan</p>
              </a>
            </li>

            <li class="nav-item">
              <a id="bahan-side" href="../bahan/bahan_makanan.html" class="nav-link">
                <i class="nav-icon fas fa-box-open"></i>
                <p>Bahan Makanan</p>
              </a>
            </li>

            <li class="nav-item">
              <a id="schedule-side" href="../schedule/schedule.html" class="nav-link">
                <i class="nav-icon far fa-calendar"></i>
                <p>Jadwal Kerja</p>
              </a>
            </li>
            <li class="nav-item">
              <a id="pegawai-side" href="../pegawai/pegawai.html" class="nav-link">
                <i class="nav-icon fas fa-user"></i>
                <p>Pegawai</p>
              </a>
            </li>
            <li class="nav-item">
              <a id="regis-side" href="../login/register.html" class="nav-link">
                <i class="nav-icon fas fa-user"></i>
                <p>Registrasi User</p>
              </a>
            </li>
    `
  }else if(role=="role_kasir"){
    outputSidebar += `<li class="nav-item">
              <a id="index-side" href="../../index.html" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a id="menu-side" href="../menu/menu.html" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>Menu</p>
              </a>
            </li>
            <li class="nav-item">
              <a id="denah-side" href="../pesanan/denah.html" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>Denah Restoran</p>
              </a>
            </li>
            <li class="nav-item">
              <a id="schedule-side" href="../schedule/schedule.html" class="nav-link">
                <i class="nav-icon far fa-calendar"></i>
                <p>Jadwal Kerja</p>
              </a>
            </li>
    `
  }else if(role=="role_dapur"){
    outputSidebar += `<li class="nav-item">
              <a id="index-side" href="../../index.html" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a id="menu-side" href="../menu/menu.html" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>Menu</p>
              </a>
            </li>
            <li class="nav-item">
              <a id="dapur-side" href="../dapur/dapur.html" class="nav-link">
                <i class="nav-icon fas fa-cocktail"></i>
                <p>Dapur</p>
              </a>
            </li>
            <li class="nav-item">
              <a id="bahan-side" href="../bahan/bahan_makanan.html" class="nav-link">
                <i class="nav-icon fas fa-box-open"></i>
                <p>Bahan Makanan</p>
              </a>
            </li>
            <li class="nav-item">
              <a id="schedule-side" href="../schedule/schedule.html" class="nav-link">
                <i class="nav-icon far fa-calendar"></i>
                <p>Jadwal Kerja</p>
              </a>
            </li>
    `
  }
  document.getElementById('sidebar-script').innerHTML = outputSidebar;
  cekPath(path)
}

async function logout(){
  localStorage.clear();
  const response = await fetch(url_signout);

  // Storing data in form of JSON
  var data = await response.json();
  window.location.replace("http://localhost:3737/login/login.html");
}
