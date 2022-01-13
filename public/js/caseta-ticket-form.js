
initFirebase();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('logged in');
      document.getElementById('form-box').style.visibility = 'visible';
    } else {
      // No user is signed in.
      console.log('not logged in');
      document.getElementById('form-box').style.visibility = 'hidden';
      window.location.href = 'index.html';
    }
  });

  document.getElementById('logout').addEventListener('click',cerrar_sesion);
  document.getElementById('back').addEventListener('click',back);

function cerrar_sesion(){
    console.log('logout gallery');
    firebase.auth().signOut();
}

function back(){
    console.log('atras');
    window.location.href = 'ticket-gallery.html';
}

function initFirebase(){
    //import firebase from "firebase/app"
    var firebaseConfig = {
        apiKey: "AIzaSyBA_ebBq9qUw8XBBZ5eNh83vRjhhI8HMdw",
        authDomain: "ticket-go.firebaseapp.com",
        projectId: "ticket-go",
        storageBucket: "ticket-go.appspot.com",
        messagingSenderId: "611776354257",
        appId: "1:611776354257:web:60ba0681cacbf30cc3f2f0",
        measurementId: "G-SLCZW5RCN6"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase inicializado');
}

var input_total = document.getElementById('total');
var select_casetas = document.getElementById('casetas');

input_total.addEventListener('input', put_total);

const fuentes = [
    "courier-new",
    "courier-new-small",
];
const row_heights = [
    "row-height-12",
    "row-height-10",
];
const padding_left = [
    "18px",
    "5px",
];
const casetas = [
    "LIBRAMIENTO DE CIUDAD OBREGON",
    "CONCESIONARIA AUTOPISTA LIBRAMIENTO <br>HERMOSILLO",    
];
const telefonos = [
    "TEL: 800-822-0822 / www.lico.mx",
    "TEL: 800-822-0822"
]
const plazas = [
    "HORNOS-A",
    "Sahuaripa-B",    
];
const carriles = [
    "LICO-LF03",
    "CALH-LB02",
]
const cajeros = [
    "3192",
    "222",
];
const fechas_originales = [
    //mm/dd/yy
    "11/29/21",
    "12/10/21",
];
const transito = [
    749900,
    416664,
];

function init() {
    
    init_select_casetas();

}

function init_select_casetas(){

    var casetas_select = document.getElementById('casetas');
    casetas.forEach((element, i) => {
        var option = document.createElement('option');
        option.setAttribute('value',i.toString());
        option.innerHTML = element;
        casetas_select.append(option);
    });      
}

function put_total(){
    
    if (document.getElementById('total').value == '')
        return;
    
    var total = document.getElementById('total').value;
    var importe  = ((total / 1.16).toFixed(1) * 1).toFixed(2);
    var iva = (total - importe).toFixed(2);
    document.getElementById('importe').value = importe;
    document.getElementById('iva').value = iva;

}

function validaciones(){

    var message_alert = '';
    if (document.getElementById('fecha').value == "")
        message_alert = 'Por favor selecciona una fecha';
    else if (document.getElementById('hora').value == "")
        message_alert = 'Por favor selecciona una hora';
    else if (document.getElementById('total').value == "0")
        message_alert = 'Por favor indica un total';

    if (message_alert == '')
        return true;

    alert(message_alert);
    return false;
}

function imprimir(e){

    e.preventDefault();

    if (!validaciones())
        return;

    var caseta_seleccionada = document.getElementById('casetas').value;
    var fecha = new Date(document.getElementById('fecha').value);
    var fecha_offset = fecha.getTimezoneOffset() * 60000;
    var fecha_correcta = new Date(fecha.getTime() + fecha_offset);
    
    var diferencia_dias = (new Date(fecha_correcta) - new Date(fechas_originales[caseta_seleccionada])) / (1000 * 3600 * 24);
    var transito_hipotetico = (diferencia_dias * 1000);
    var factor_aleatorio = (Math.random() * 100);
    var transito_calculado = transito[caseta_seleccionada] + transito_hipotetico + factor_aleatorio;

    var date_fixed_2 = fecha_correcta.getDate().toString().padStart(2,'0');
    var month_fixed_2 = (parseInt(fecha_correcta.getMonth()) +1).toString().padStart(2,'0');
    var year_fixed_4 = fecha_correcta.getFullYear().toString().substr(-4);
    var hora_fixed_2_2 = document.getElementById('hora').value;

    document.getElementById('ticket_caseta').innerHTML = casetas[caseta_seleccionada];

    document.getElementById('ticket-plaza').innerHTML = ": " + plazas[caseta_seleccionada];
    document.getElementById('ticket-carril').innerHTML = ": " + carriles[caseta_seleccionada];
    document.getElementById('ticket-cajero').innerHTML = ": " + cajeros[caseta_seleccionada];
    document.getElementById('ticket-transito').innerHTML = ": " + parseInt(transito_calculado);
    document.getElementById('ticket-fecha-hora').innerHTML = ": " + date_fixed_2 + "/" + month_fixed_2 + "/" + year_fixed_4 + " " + hora_fixed_2_2;
    document.getElementById('ticket-importe').innerHTML = ": $" + document.getElementById('importe').value.replace(/\./g, ',');
    document.getElementById('ticket-iva').innerHTML = ": $" + document.getElementById('iva').value.replace(/\./g, ',');
    document.getElementById('ticket-total').innerHTML = ": $" + parseFloat(document.getElementById('total').value).toFixed(2).replace(/\./g, ','); 
    
    if (caseta_seleccionada == 0){
        document.getElementById('buen-viaje').classList.remove('not-display');
        document.getElementById('spacer').style.height = '10px';
    } else if (caseta_seleccionada == 1){//hermosillo no lleva buen viaje
        document.getElementById('buen-viaje').classList.add('not-display');
        document.getElementById('spacer').style.height = '17px';
    }

    document.getElementById("table_titulo").classList = "";
    document.getElementById("table_titulo").classList.add('borderless');
    document.getElementById("table_titulo").classList.add(fuentes[caseta_seleccionada]);
    document.getElementById("table_titulo").classList.add(row_heights[caseta_seleccionada]);
    document.getElementById("table_titulo").style.paddingLeft = padding_left[caseta_seleccionada];
    
    setTimeout(() => {
        window.print();  
    }, 1);
  }
  /*
  formato del QR

  T|03719|861464|3|73.374|1686.13|0

  T = ?
  03719 = 0 + numero de estacion
  861464 = numero de venta
  3 = DIESEL
  73.374 = CANT LITROS
  1686.13 = IMPORTE
  0 = ?

  T|01790|3799314|1|2.360|50.00|0
  fin
  */