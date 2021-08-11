initFirebase();

var usuario_input = document.getElementById('usuario');
var password_input = document.getElementById('password');
var login_button = document.getElementById('login');
var error_credentials = document.getElementById('error');
var error_mask = document.getElementById('error_mask');
var crear_usuario_button = document.getElementById('crear-usuario');

error_credentials.style.visibility = 'hidden';
error_mask.style.visibility = 'hidden';

crear_usuario_button.addEventListener('click', crearUsuario);
login_button.addEventListener('click', iniciar_sesion);

usuario_input.addEventListener('keyup', function(event){
    if(event.key === 'Enter')
    {
        console.log('ENTER');
        iniciar_sesion();
    }
});

password_input.addEventListener('keyup', function(event){
    if(event.key === 'Enter')
    {
        console.log('ENTER');
        iniciar_sesion();
    }
});

usuario_input.addEventListener('input', (event)=>{
    
    let reg_exp = new RegExp('[a-zA-Z0-9-_.]');
    if (!reg_exp.test(event.data))
    {
        var usuario_string = usuario_input.value.toString();
        usuario_input.value = usuario_string.substring(0 ,usuario_string.length - 1);
        error_mask.style.visibility = 'visible';
    }
    else
    {
        error_mask.style.visibility = 'hidden';
    }

    error_credentials.style.visibility = 'hidden';
});

password_input.addEventListener('input', ()=>{
    error_credentials.style.visibility = 'hidden';
});

function crearUsuario(){
    
    var email = '';
    var password = '';
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        console.log('Usuario creado: ' + user);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('ERROR: ' + errorCode + " " + errorMessage);
    });

}

function iniciar_sesion(){
    
    var usuario = document.getElementById('usuario').value || "";
    var password = document.getElementById('password').value || "";

    var email_full = usuario + "@gmail.com";
    console.log('email' + email_full);
    console.log('password' + password);
    
    firebase.auth().signInWithEmailAndPassword(email_full, password).then((userCredential) => {
        var user = userCredential;
        if (firebase.auth().currentUser != null)
            console.log("LOGIN EXITOSO");
    })
    .catch((error) => {
        console.log('ERROR AL AUTENTICAR');
        document.getElementById('error').style.visibility = 'visible';

    });
    
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
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser){
            window.location.href = 'ticket-gallery.html';
        }
        else
        {
            document.getElementById('body').style.visibility = 'visible';
        }
    });
}
