const productMap = new Map();

productMap.set("NULL","VACIO");
productMap.set("COCA","COCA-COLA 600ML");
productMap.set("MARUCHAN","MARUCHAN 64G CAMARON");
productMap.set("DORITOS","DORITOS NACHOS 245G");
productMap.set("SNICKERS","SNICKERS 52.7GRS");


init();

function init(){
    var select_product = document.getElementsByName("select_product");
    console.log(select_product.length);
    
    select_product.forEach((select) => {
        select.innerHTML = "";
        productMap.forEach((value, key) => {
            var option = document.createElement("option");
            option.value = key;
            option.text = value;
            select.append(option);
        });

    });
}



function validaciones(){
    
    var message_alert = '';
    if (document.getElementById('fecha').value == "")
        message_alert = 'Por favor selecciona una fecha';
    else if (document.getElementById('hora').value == "")
        message_alert = 'Por favor selecciona una hora';
    else if (document.getElementById('product1').value == "NULL")
        message_alert = 'Por favor indica al menos un producto';
    else if (document.getElementById('precio1').value == "")
        message_alert = 'Por favor indica el precio del primer producto';
    else if (   document.getElementById('product2').value != "NULL" &&
                document.getElementById('precio2').value == "")
        message_alert = 'Por favor indica el precio del segundo producto';
    else if (   document.getElementById('product3').value != "NULL" &&
                document.getElementById('precio3').value == "")
        message_alert = 'Por favor indica el precio del tercer producto';
    else if (document.getElementById('efectivo').value == "0")
        message_alert = 'Por favor indica el efectivo';

    if (message_alert == '')
        return true;

    alert(message_alert);
    return false;
}

function imprimir(e){

    e.preventDefault();

    setProducts();
    // if (!validaciones())
    //     return;

    var fecha = new Date(document.getElementById('fecha').value);
    var fecha_offset = fecha.getTimezoneOffset() * 60000;
    var fecha_correcta = new Date(fecha.getTime() + fecha_offset);

    var date_fixed_2 = fecha_correcta.getDate().toString().padStart(2,'0');
    var month_fixed_2 = (parseInt(fecha_correcta.getMonth()) +1).toString().padStart(2,'0');
    var year_fixed_4 = fecha_correcta.getFullYear().toString().substr(-4);
    var hora_fixed_2_2 = document.getElementById('hora').value;

    document.getElementById('oxxo-fecha').innerHTML = date_fixed_2 + "/" + month_fixed_2 + "/" + year_fixed_4;
    document.getElementById('oxxo-hora').innerHTML = hora_fixed_2_2;
    

    setTimeout(() => {
        window.print();  
    }, 100);

}

function setProducts(){

    removeUnsetProducts();
    var total = 0;

    if(document.getElementById('product1').value != "NULL"){
        document.getElementById('listProductName1')
            .innerHTML = productMap.get( document.getElementById('product1').value);
        document.getElementById('listProductPrice1')
            .innerHTML =
                parseFloat(document.getElementById('price1').value)
                    .toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2});
        total += parseFloat(document.getElementById('price1').value);
    }
    if(document.getElementById('product2').value != "NULL"){
        document.getElementById('listProductName2')
            .innerHTML = productMap.get( document.getElementById('product2').value);
        document.getElementById('listProductPrice2')
            .innerHTML =
                parseFloat(document.getElementById('price2').value)
                    .toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2});
        total += parseFloat(document.getElementById('price2').value);
    }
    if(document.getElementById('product3').value != "NULL"){
        document.getElementById('listProductName3')
            .innerHTML = productMap.get( document.getElementById('product3').value);
        document.getElementById('listProductPrice3')
            .innerHTML =
                parseFloat(document.getElementById('price3').value)
                    .toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2});
        total += parseFloat(document.getElementById('price3').value);
    }

    document.getElementById('listProductTotal').innerHTML =
        total.toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2});
    
}

function removeUnsetProducts(){

    if(document.getElementById('product2').value == "NULL"){
        var p2 = document.getElementById("listProduct2");
        if(p2 != null) p2.remove();
        var p3 = document.getElementById('listProduct3');
        if(p3 != null) p3.remove();
    } else if(document.getElementById('product3').value == "NULL"){
        var p3 = document.getElementById('listProduct3');
        if(p3 != null) p3.remove();
    }
}