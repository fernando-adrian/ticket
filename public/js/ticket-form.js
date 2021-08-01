
var input_cantidad = document.getElementById('cantidad');
var input_precio = document.getElementById('precio');
var input_total = document.getElementById('total');
var select_estaciones = document.getElementById('estaciones');

input_cantidad.addEventListener('input', fn_total);
input_precio.addEventListener('input', fn_total);
select_estaciones.addEventListener('input', put_rfc);

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
    "CARR. A LA COLORADA KM. 3.5 ESQ. PLANETARIO",
]
const direccion_2 = [
    "COL. ESPERANZA, MEXICALI, B.C. CP 21350",
    "S/N",
];

function init() {
    put_rfc();
    
    // var _fecha = new Date();
    // var _fecha_offset = _fecha.getTimezoneOffset() * 60000;
    // var _fecha_correcta = new Date(_fecha.getTime() + _fecha_offset);

    // document.getElementById('fecha').value =
    //         (_fecha_correcta.getUTCFullYear()).toString() + '-' +
    //         (_fecha_correcta.getUTCMonth()).toString() + '-' +
    //         (_fecha_correcta.getUTCDate()).toString() ;
            

}

function fn_total(){
    
    var cantidad = document.getElementById('cantidad').value;
    var precio = document.getElementById('precio').value;
    document.getElementById('total').value = 
        ( parseFloat(cantidad) * parseFloat(precio) ).toFixed(2);

}

function put_rfc(){

    document.getElementById('rfc').value = rfc[select_estaciones.value];
}

function imprimir(e){
    e.preventDefault();

    var fecha = new Date(document.getElementById('fecha').value);
    var fecha_offset = fecha.getTimezoneOffset() * 60000;
    var fecha_correcta = new Date(fecha.getTime() + fecha_offset);
    
    const og_num_venta = 861464;
    var diferencia_dias = (new Date(fecha_correcta) - new Date("07/18/21")) / (1000 * 3600 * 24);
    var atendidos_hipoteticos = (diferencia_dias * 1000);
    var factor_aleatorio = (Math.random() * 100);
    var ventas_calculadas = og_num_venta + atendidos_hipoteticos + factor_aleatorio;

    document.getElementById('ticket_fecha_hora').innerHTML = "FECHA: " + fecha_correcta.getDate() + "/" + (parseInt(fecha_correcta.getMonth()) +1) + "/" + fecha_correcta.getFullYear().toString().substring(-2) + " " + document.getElementById('hora').value;
    document.getElementById('ticket_cantidad').innerHTML = document.getElementById('cantidad').value;
    document.getElementById('ticket_precio').innerHTML = document.getElementById('precio').value;
    document.getElementById('ticket_importe').innerHTML = document.getElementById('total').value;
    document.getElementById('ticket_total').innerHTML = parseFloat( document.getElementById('total').value).toLocaleString('en-US') + " MXN";
    document.getElementById('ticket_precio_con_letra').innerHTML = "SON: "+ NumeroALetras(document.getElementById('total').value) + " M.N.";
    document.getElementById('ticket_estacion').innerHTML = estaciones[document.getElementById('estaciones').value];
    document.getElementById('ticket_rfc').innerHTML = "RFC " + rfc[document.getElementById('estaciones').value];
    document.getElementById('ticket_direccion_1').innerHTML = direccion_1[document.getElementById('estaciones').value];
    document.getElementById('ticket_direccion_2').innerHTML = direccion_2[document.getElementById('estaciones').value];
    document.getElementById('ticket_num_venta').innerHTML = "NUM VENTA: " + parseInt(ventas_calculadas);

    window.print();
  }
