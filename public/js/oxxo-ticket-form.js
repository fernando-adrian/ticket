
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

function cerrar_sesion(){
    console.log('logout gallery');
    firebase.auth().signOut();
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

function validaciones(){

    var message_alert = '';
    if (document.getElementById('fecha').value == "")
        message_alert = 'Por favor selecciona una fecha';
    else if (document.getElementById('hora').value == "")
        message_alert = 'Por favor selecciona una hora';
    else if (document.getElementById('importe').value == "0")
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

    var fecha = new Date(document.getElementById('fecha').value);
    var fecha_offset = fecha.getTimezoneOffset() * 60000;
    var fecha_correcta = new Date(fecha.getTime() + fecha_offset);

    var date_fixed_2 = fecha_correcta.getDate().toString().padStart(2,'0');
    var month_fixed_2 = (parseInt(fecha_correcta.getMonth()) +1).toString().padStart(2,'0');
    var year_fixed_4 = fecha_correcta.getFullYear().toString().substr(-4);
    var hora_fixed_2_2 = document.getElementById('hora').value;

    document.getElementById('ticket-fecha-hora').innerHTML = date_fixed_2 + "/" + month_fixed_2 + "/" + year_fixed_4 + "&nbsp;&nbsp;&nbsp;" + hora_fixed_2_2;
    document.getElementById('ticket-importe').innerHTML = "$ " + document.getElementById('importe').value + ".00";
    
    // Qrious
    var qrious_code = new QRious();
    qrious_code = new QRious({
        element: document.getElementById('qrcode'),
        size: 40,
        padding: 2,
        value: "plaza-de-corbo-150",
        background: '#ffffff',
        foreground: '#000000',
        level: 'M'
    });

    setTimeout(() => {
        window.print();  
    }, 1);
  }