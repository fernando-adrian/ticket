
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
    "09515",
    "05864",
    "55065",
];
const estaciones = [
    "EST 3719 - CORPORATIVO ENERVISION SAPI DE CV",
    "EST 9515 - CORPORATIVO ENERVISION SAPI DE CV",
    "EST 5864 - CORPORATIVO ENERVISION S A P I DE CV",
    "EST 55065 - GRUPO CASTILLO FELIX, S.A. DE C.V.",
];
const rfc = [
    "CEN171221EE0",
    "CEN171221EE0",
    "",
    ""
];
const direccion_1 = [
    "CARR.A LA COLORADA KM. 3.5 ESQ. PLANETARIO",
    "PASEO RIO SONORA SUR 458",
    "BLVD. PASEO LAS PALMAS 1",
    "CARR. PEÑASCO-SONOYTA Y CALLE LISBOA 450",
]
const direccion_2 = [
    "S/N, HERMOSILLO, SONORA",
    "MONTE CARLO, HERMOSILLO, SON. CP 83288",
    "LAS LOMAS, HERMOSILLO, SON CP 83296",
    "BRISAS DEL GOLFO, PUERTO PEÑASCO, SON.  CP",
];
const fecha_original = [
    //mm/dd/yy
    "07/18/21",
    "08/13/21",
    "10/03/21",
    "10/17/21",
];
const num_original_ventas = [
    861464,
    588970,
    1507637,
    337360,
];
const mensaje = [
    `Estimado Cliente: Le recordamos
    que podrá emitir el CFDI durante
    los 7 días siguientes al que se
    haya realizado la compra. De
    acuerdo con las disposiciones
    fiscales vigentes. Si el CFDI se
    solicita en un periodo distinto
    éste no podra ser emitido. Para
    mayor información puede
    comunicarse al 6624333543 o al
    <span class="justify-left-inblock">correo electrónico:</span>
    arcopindustrial@enervision.com.mx.<br><br>
    Quejas y sugerencias:<br>
    atencionaclientes@profuels.mx`,

    `Estimado Cliente: Le recordamos
    que podrá emitir el CFDI durante
    los 7 días siguientes al que se
    haya realizado la compra. De
    acuerdo con las disposiciones
    fiscales vigentes. Si el CFDI se
    solicita en un periodo distinto
    éste no podra ser emitido. Para
    mayor información puede
    comunicarse al 6621278763 o al
    <span class="justify-left-inblock">correo electrónico:</span>
    arcodelrio@enervision.com.mx.
    <span>Puede emitir su factura en
    www.buzonfacturas.com con el
    ticket de venta</span><br><br>
    Quejas y sugerencias:<br>
    atencionaclientes@profuels.mx<br>
    <pre class="lucida-console justify letter-spacing">GRACIAS   POR  ACUMULAR  ARCOINS.</pre>`,
    
    `Estimado Cliente: Le recordamos
    que podrá emitir el CFDI durante
    los 7 días siguientes al que se
    haya realizado la compra. De
    acuerdo con las disposiciones
    fiscales vigentes. Si el CFDI se
    solicita en un periodo distinto
    éste no podrá ser emitido. Para
    mayor información puede
    comunicarse al 6624333510 o al
    <span class="justify-left-inblock">correo electrónico:</span>
    arcolomas@enervision.com.mx<br><br>
    Quejas y sugerencias:<br>
    atencionaclientes@profuels.mx`,

    `Para mayor información puede
    comunicarse al [6383832399] o
    <span class="justify-left-inblock">al correo electrónico:</span>
    [serviciosonora@hotmail.com]
    facturacion<br>
    www.buzonfacturas.com<br>
    Quejas y sugerencias:<br>
    atencionaclientes@profuels.mx`
];


function init() {
    
    init_select_estaciones();
    put_rfc();

}

function init_select_estaciones(){

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

    if (rfc[select_estaciones.value] != "")
        document.getElementById('rfc').value = rfc[select_estaciones.value];
    else
        document.getElementById('rfc').value = "SIN RFC EN EL TICKET";
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

    var estacion_seleccionada = document.getElementById('estaciones').value;
    var fecha = new Date(document.getElementById('fecha').value);
    var fecha_offset = fecha.getTimezoneOffset() * 60000;
    var fecha_correcta = new Date(fecha.getTime() + fecha_offset);
    const og_num_venta = num_original_ventas[estacion_seleccionada];
    var diferencia_dias = (new Date(fecha_correcta) - new Date(fecha_original[estacion_seleccionada])) / (1000 * 3600 * 24);
    var atendidos_hipoteticos = (diferencia_dias * 1000);
    var factor_aleatorio = (Math.random() * 100);
    var ventas_calculadas = og_num_venta + atendidos_hipoteticos + factor_aleatorio;
    var ventas_calculadas_int = parseInt(ventas_calculadas);

    var num_estacion_con_0 = num_estacion[estacion_seleccionada];
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
    document.getElementById('ticket_estacion').innerHTML = estaciones[estacion_seleccionada];
    if (rfc[estacion_seleccionada] != "")
        document.getElementById('ticket_rfc').innerHTML = "RFC " + rfc[estacion_seleccionada];
    else
        document.getElementById('ticket_rfc').innerHTML = "";
    document.getElementById('ticket_direccion_1').innerHTML = direccion_1[estacion_seleccionada];
    document.getElementById('ticket_direccion_2').innerHTML = direccion_2[estacion_seleccionada];
    document.getElementById('ticket_num_venta').innerHTML = "NUM VENTA: " + ventas_calculadas_int;

    document.getElementById('ticket_mensaje').innerHTML = mensaje[estacion_seleccionada];

    // Qrious
    var qrious_code = new QRious();
    qrious_code = new QRious({
        element: document.getElementById('qrcode'),
        size: 80,
        padding: 2,
        value: "T|"+num_estacion_con_0+"|"+ventas_calculadas_int+"|3|"+cantidad_fixed3+"|"+total_fixed2+"|0",
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