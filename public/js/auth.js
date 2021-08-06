initFirebase();
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser)
        console.log(firebaseUser);
    else
        console.log("not logged");
});

document.getElementById('error').style.visibility = 'hidden';

var login_button = document.getElementById('login');
login_button.addEventListener('click', iniciar_sesion);

var crear_usuario_button = document.getElementById('crear-usuario');
crear_usuario_button.addEventListener('click', crearUsuario);

var verificar_sesion_button = document.getElementById('verificar-sesion');
verificar_sesion_button.addEventListener('click', verificarSesion);

var logout_button = document.getElementById('logout');
logout_button.addEventListener('click', cerrar_sesion);

function cerrar_sesion(){
    firebase.auth().signOut();
}

function verificarSesion(){
    if (firebase.auth().currentUser == null)
        console.log("no hay sesion activa");
    else
        console.log("SESION ACTIVA");
}


function crearUsuario(){
    
    // e.preventDefault();
    console.log('crear usuario');
    var email = '';
    var password = '';

    var usuario = firebase.auth().currentUser;
    console.log("usuario" + usuario);
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log('Usuario creado: ' + user);
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('ERROR: ' + errorCode + " " + errorMessage);
        // ..
    });

}

function iniciar_sesion(){
    
    var email = document.getElementById('email').value || "";
    var password = document.getElementById('password').value || "";
    console.log('email' + email);
    console.log('password' + password);

    
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
        var user = userCredential;
        if (firebase.auth().currentUser != null)
            console.log("SESION ACTIVA");
        
        window.location.href = 'ticket-gallery.html';
        console.log("redireccion a ticket gallery");
    })
    .catch((error) => {
        //error al autenticar
        console.log('ERROR AL AUTENTICAR');
        document.getElementById('error').style.visibility = 'visible';

    });
    
    // firebase.auth().signOut().then( (user) =>{
    //     console.log('sign out');
    // })
    // .catch( (error)=>{
    //     console.log('error en Sign out');
    // });
    
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
