
var input_cantidad = document.getElementById('cantidad');
var input_precio = document.getElementById('precio');
var input_total = document.getElementById('total');
var select_estaciones = document.getElementById('estaciones');

input_cantidad.addEventListener('input', fn_total);
input_precio.addEventListener('input', fn_total);
select_estaciones.addEventListener('input', put_rfc);

// console.log('hola');
// var floating = 30;
// var float_fixed = floating.toFixed(2);
// console.log(float_fixed);

const num_estacion = [
    "01790",
    "03719"
];
const estaciones = [
    "EST 1790 - BELLAS ARTES GASOLINERA SA DE CV",
    "EST 3719 - CORPORATIVO ENERVISION SAPI DE CV",
];
const rfc = [
    "BAG040224015",
    "CEN171221EE0",
];
const direccion_1 = [
    "SONORA Y VILLAHERMOSA",
    "CARR.A LA COLORADA KM. 3.5 ESQ. PLANETARIO",
]
const direccion_2 = [
    "COL. ESPERANZA, MEXICALI, B.C. CP 21350",
    "S/N",
];


function init() {
    
    put_rfc();            

}

function fn_total(){
    
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

    alert(message_alert,'asdad');
    return false;
}

function imprimir(e){

    e.preventDefault();

    if (!validaciones())
        return;

    var fecha = new Date(document.getElementById('fecha').value);
    var fecha_offset = fecha.getTimezoneOffset() * 60000;
    var fecha_correcta = new Date(fecha.getTime() + fecha_offset);
    
    const og_num_venta = 861464;
    var diferencia_dias = (new Date(fecha_correcta) - new Date("07/18/21")) / (1000 * 3600 * 24);
    var atendidos_hipoteticos = (diferencia_dias * 1000);
    var factor_aleatorio = (Math.random() * 100);
    var ventas_calculadas = og_num_venta + atendidos_hipoteticos + factor_aleatorio;
    var ventas_calculadas_int = parseInt(ventas_calculadas);
    
    var num_estacion_com_0 = num_estacion[document.getElementById('estaciones').value];
    var cantidad_fixed3 = parseFloat(document.getElementById('cantidad').value).toFixed(3);
    var total_fixed2 = parseFloat(document.getElementById('total').value).toFixed(2);
    var precio_fixed_f2 = parseFloat(document.getElementById('precio').value).toFixed(2);

    document.getElementById('ticket_fecha_hora').innerHTML = "FECHA: " + fecha_correcta.getDate() + "/" + (parseInt(fecha_correcta.getMonth()) +1) + "/" + fecha_correcta.getFullYear().toString().substr(-2) + " " + document.getElementById('hora').value;
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
    console.log('timeout init');
    // window.print();
    setTimeout(() => {
    
        window.print();  
      console.log('timeout end');
    }, 1);
    
    //QRCODE
    // var qr = new QRCode(document.getElementById("qrcode"),  {
    //     // text: "T|03719|861464|3|73.374|1686.13|0",
    //     text: "T|"+num_estacion_com_0+"|"+ventas_calculadas_int+"|3|"+cantidad_fixed3+"|"+total_fixed2+"|0",
    //     width: 64,
    //     height: 64,
    //     colorDark : "#000000",
    //     colorLight : "#ffffff",
    //     correctLevel : QRCode.CorrectLevel.L
    // });
    // window.print();
    // document.getElementById("qrcode").innerHTML = "";
    // qr.clear();
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