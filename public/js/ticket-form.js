
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


var input_cantidad = document.getElementById('cantidad');
var input_precio = document.getElementById('precio');
var input_total = document.getElementById('total');
var select_estaciones = document.getElementById('estaciones');

input_cantidad.addEventListener('input', put_total);
input_precio.addEventListener('input', put_total);
select_estaciones.addEventListener('input', put_rfc);

const num_estacion = [
    "03719",
    "00000"
];
const estaciones = [
    "EST 3719 - CORPORATIVO ENERVISION SAPI DE CV",
    "EST 0000 - "
];
const rfc = [
    "CEN171221EE0",
    "RFC"
];
const direccion_1 = [
    "CARR.A LA COLORADA KM. 3.5 ESQ. PLANETARIO",
    "BLVD. PASEO DE LAS PALMAS 1, LAS LOMAS"
]
const direccion_2 = [
    "S/N",
    "S/N"
];


function init() {
    
    init_select();
    put_rfc();

}

function init_select(){

    var estaciones_select = document.getElementById('estaciones');
    estaciones.forEach((element, i) => {
        var option = document.createElement('option');
        option.setAttribute('value',i.toString());
        option.innerHTML = element;
        estaciones_select.append(option);
    });      
}

function put_total(){
    
    if (document.getElementById('cantidad').value == '' || document.getElementById('precio').value == '')
        return;
    
    var cantidad = document.getElementById('cantidad').value;
    var precio = document.getElementById('precio').value;
    document.getElementById('total').value = 
        ( parseFloat(cantidad) * parseFloat(precio) ).toFixed(2);

}

function put_rfc(){

    document.getElementById('rfc').value = rfc[select_estaciones.value];
}

function validaciones(){

    var message_alert = '';
    if (document.getElementById('fecha').value == "")
        message_alert = 'Por favor selecciona una fecha';
    else if (document.getElementById('hora').value == "")
        message_alert = 'Por favor selecciona una hora';
    else if (document.getElementById('cantidad').value == "")
        message_alert = 'Por favor selecciona una cantidad';
    else if (document.getElementById('precio').value == "")
        message_alert = 'Por favor selecciona un precio x litro';

    if (message_alert == '')
        return true;

    alert(message_alert);
    return false;
}

function imprimir(e){

    e.preventDefault();

    if (!validaciones())
        return;

    var fecha = new Date(document.getElementById('fecha').value);
    var fecha_offset = fecha.getTimezoneOffset() * 60000;
    var fecha_correcta = new Date(fecha.getTime() + fecha_offset);
    const og_num_venta = 861464;//tomada del primer ticket muestra
    var diferencia_dias = (new Date(fecha_correcta) - new Date("07/18/21")) / (1000 * 3600 * 24);
    var atendidos_hipoteticos = (diferencia_dias * 1000);
    var factor_aleatorio = (Math.random() * 100);
    var ventas_calculadas = og_num_venta + atendidos_hipoteticos + factor_aleatorio;
    var ventas_calculadas_int = parseInt(ventas_calculadas);

    var num_estacion_com_0 = num_estacion[document.getElementById('estaciones').value];
    var cantidad_fixed3 = parseFloat(document.getElementById('cantidad').value).toFixed(3);
    var total_fixed2 = parseFloat(document.getElementById('total').value).toFixed(2);
    var precio_fixed_f2 = parseFloat(document.getElementById('precio').value).toFixed(2);
    var date_fixed_2 = fecha_correcta.getDate().toString().padStart(2,'0');
    var month_fixed_2 = (parseInt(fecha_correcta.getMonth()) +1).toString().padStart(2,'0');
    var year_fixed_2 = fecha_correcta.getFullYear().toString().substr(-2);
    var hora_fixed_2_2 = document.getElementById('hora').value;

    document.getElementById('ticket_fecha_hora').innerHTML = "FECHA: " + date_fixed_2 + "/" + month_fixed_2 + "/" + year_fixed_2 + " " + hora_fixed_2_2;
    document.getElementById('ticket_cantidad').innerHTML = cantidad_fixed3;
    document.getElementById('ticket_precio').innerHTML = precio_fixed_f2
    document.getElementById('ticket_importe').innerHTML = total_fixed2;
    document.getElementById('ticket_total').innerHTML = parseFloat( document.getElementById('total').value).toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2}) + ' MXN';
    document.getElementById('ticket_precio_con_letra').innerHTML = "SON: "+ NumeroALetras(document.getElementById('total').value) + " M.N.";
    document.getElementById('ticket_estacion').innerHTML = estaciones[document.getElementById('estaciones').value];
    document.getElementById('ticket_rfc').innerHTML = "RFC " + rfc[document.getElementById('estaciones').value];
    document.getElementById('ticket_direccion_1').innerHTML = direccion_1[document.getElementById('estaciones').value];
    document.getElementById('ticket_direccion_2').innerHTML = direccion_2[document.getElementById('estaciones').value];
    document.getElementById('ticket_num_venta').innerHTML = "NUM VENTA: " + ventas_calculadas_int;

    // Qrious
    var qrious_code = new QRious();
    qrious_code = new QRious({
        element: document.getElementById('qrcode'),
        size: 80,
        padding: 2,
        value: "T|"+num_estacion_com_0+"|"+ventas_calculadas_int+"|3|"+cantidad_fixed3+"|"+total_fixed2+"|0",
        background: '#ffffff',
        foreground: '#000000',
        level: 'M'
      });
    
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