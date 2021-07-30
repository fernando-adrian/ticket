
var input_cantidad = document.getElementById('cantidad');
var input_precio = document.getElementById('precio');
var input_total = document.getElementById("total");

input_cantidad.addEventListener('input', fn_total);
input_precio.addEventListener('input', fn_total);


function fn_total(){
    
    // document.getElementById('cantidad').value = +document.getElementById('cantidad').value;
    // document.getElementById('precio').value = +document.getElementById('precio').value;

    // document.getElementById('cantidad').value = parseFloat(document.getElementById('cantidad').value).toFixed(3);
    var cantidad = document.getElementById('cantidad').value;
    var precio = document.getElementById('precio').value;
    
    console.log(precio);
    console.log('cantidad: ' + cantidad);
    console.log(cantidad * precio);
    document.getElementById('total').value = parseFloat(cantidad) * parseFloat(precio);
    

    console.log('total: ' + document.getElementById('total').value);

}
