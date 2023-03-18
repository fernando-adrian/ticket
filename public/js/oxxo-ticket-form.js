const productMap = new Map();

productMap.set("NULL",{ name: "VACIO", price: 0});
productMap.set("COCA",{ name: "COCA-COLA 600ML", price: 18.00});
productMap.set("MARUCHAN",{ name: "MARUCHAN 64G CAMARON", price: 19.00});
productMap.set("DORITOS",{ name: "DORITOS NACHOS 245G", price: 45.00});
productMap.set("SNICKERS",{ name: "SNICKERS 52.7GRS", price: 24.00});


init();

function init(){
    var select_product = document.getElementsByName("select_product");
    console.log(select_product.length);
    
    select_product.forEach((select) => {
        select.innerHTML = "";
        productMap.forEach((productValue, key) => {
            var option = document.createElement("option");
            option.value = key;
            option.text = productValue.name;
            select.append(option);
        });

    });

    addProductListeners();
}



function validaciones(){
    
    var message_alert = '';
    if (document.getElementById('fecha').value == "")
        message_alert = 'Por favor selecciona una fecha';
    else if (document.getElementById('hora').value == "")
        message_alert = 'Por favor selecciona una hora';
    else if (document.getElementById('product1').value == "NULL")
        message_alert = 'Por favor indica al menos un producto';
    else if (document.getElementById('price1').value == "")
        message_alert = 'Por favor indica el precio del primer producto';
    else if (   document.getElementById('product2').value != "NULL" &&
                document.getElementById('price2').value == "")
        message_alert = 'Por favor indica el precio del segundo producto';
    else if (   document.getElementById('product3').value != "NULL" &&
                document.getElementById('price3').value == "")
        message_alert = 'Por favor indica el precio del tercer producto';
    else if (document.getElementById('efectivo').value == "0")
        message_alert = 'Por favor indica el efectivo';
    if(!isEnoughCash())
        message_alert = 'El efectivo no es suficiente para realizar la compra';
    
    if (message_alert == '')
        return true;

    alert(message_alert);
    return false;
}

function imprimir(e){

    e.preventDefault();

    if (!validaciones())
        return;
        
    setProducts();

    var fecha = new Date(document.getElementById('fecha').value);
    var fecha_offset = fecha.getTimezoneOffset() * 60000;
    var fecha_correcta = new Date(fecha.getTime() + fecha_offset);

    var date_fixed_2 = fecha_correcta.getDate().toString().padStart(2,'0');
    var month_fixed_2 = (parseInt(fecha_correcta.getMonth()) +1).toString().padStart(2,'0');
    var year_fixed_4 = fecha_correcta.getFullYear().toString().substr(-4);
    var hora_fixed_2_2 = document.getElementById('hora').value;

    document.getElementById('oxxo-fecha').innerHTML = date_fixed_2 + "/" + month_fixed_2 + "/" + year_fixed_4;
    document.getElementById('oxxo-hora').innerHTML = hora_fixed_2_2;

    //calcular el folio de venta con ventas estimadas
    document.getElementById('folioVta').innerHTML = "Fol_Vta:" + calculateFolio();
    

    setTimeout(() => {
        window.print();  
    }, 150);

}

function setProducts(){

    removeUnsetProducts();
    var total = 0;

    if(document.getElementById('product1').value != "NULL"){
        document.getElementById('listProductName1')
            .innerHTML = productMap.get( document.getElementById('product1').value).name;
        document.getElementById('listProductPrice1')
            .innerHTML =
                parseFloat(document.getElementById('price1').value)
                    .toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2});
        total += parseFloat(document.getElementById('price1').value);
    }
    if(document.getElementById('product2').value != "NULL"){
        document.getElementById('listProductName2')
            .innerHTML = productMap.get( document.getElementById('product2').value).name;
        document.getElementById('listProductPrice2')
            .innerHTML =
                parseFloat(document.getElementById('price2').value)
                    .toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2});
        total += parseFloat(document.getElementById('price2').value);
    }
    if(document.getElementById('product3').value != "NULL"){
        document.getElementById('listProductName3')
            .innerHTML = productMap.get( document.getElementById('product3').value).name;
        document.getElementById('listProductPrice3')
            .innerHTML =
                parseFloat(document.getElementById('price3').value)
                    .toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2});
        total += parseFloat(document.getElementById('price3').value);
    }

    document.getElementById('listProductTotal').innerHTML =
        total.toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2});
    

    var efectivo00 = parseFloat(document.getElementById('efectivo').value)
        .toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2});
    //efectivo
    document.getElementById('totalConLetra').innerHTML = NumeroALetras(total) + " M.N.";
    document.getElementById('efectivoMN').innerHTML =
        "Efectivo M.N.: " + efectivo00;
    
    document.getElementById('pagoCambio').innerHTML =
        "Pago: $ " + efectivo00 + "&nbsp;&nbsp;" +
        "Cambio: $ " + (efectivo00 - total)
            .toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2});
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

function addProductListeners(){

    var p1 = document.getElementById('product1');
    p1.addEventListener("change", (event) => {
        document.getElementById('price1').value = 
        productMap.get(event.srcElement.value).price;
    });
    var p2 = document.getElementById('product2');
    p2.addEventListener("change", (event) => {
        document.getElementById('price2').value = 
        productMap.get(event.srcElement.value).price;
    });
    var p3 = document.getElementById('product3');
    p3.addEventListener("change", (event) => {
        document.getElementById('price3').value = 
        productMap.get(event.srcElement.value).price;
    });
}

function isEnoughCash(){
    var total = 0;
    if(document.getElementById('product1').value != "NULL"){
        total += parseFloat(document.getElementById('price1').value);
    }
    if(document.getElementById('product2').value != "NULL"){
        total += parseFloat(document.getElementById('price2').value);
    }
    if(document.getElementById('product3').value != "NULL"){
        total += parseFloat(document.getElementById('price3').value);
    }
    var efectivo = parseFloat(document.getElementById('efectivo').value);
    return efectivo >= total;
}

function calculateFolio(){
    const folio_original = 70014;
    const fecha_original = "03/14/23";
    const atentidos_por_dia = 1000;
    const factor = 100;
    
    var fecha = new Date(document.getElementById('fecha').value);
    var fecha_offset = fecha.getTimezoneOffset() * 60000;
    var fecha_correcta = new Date(fecha.getTime() + fecha_offset);
    var diferencia_dias = (new Date(fecha_correcta) - new Date(fecha_original)) / (1000 * 3600 * 24);
    console.log(diferencia_dias);
    var atendidos_hipoteticos = (diferencia_dias * atentidos_por_dia);
    var factor_aleatorio = (Math.random() * factor);
    var ventas_calculadas = folio_original + atendidos_hipoteticos + factor_aleatorio;
    return parseInt(ventas_calculadas);
}