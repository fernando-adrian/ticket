
// initFirebase();

var login_button = document.getElementById('login');
login_button.addEventListener('click', crearUsuario);

function crearUsuario(){
    initFirebase();
    // e.preventDefault();
    // console.log('crear usuario');
    // var email = 'advancexz@gmail.com';
    // var password = 'contra123';

    // var usuario = firebase.auth().currentUser;
    // console.log("usuario" + usuario);
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    // .then((userCredential) => {
    //     // Signed in
    //     var user = userCredential.user;
    //     console.log('SIGN IN: ' + user);
    //     // ...
    // })
    // .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log('ERROR: ' + errorCode + " " + errorMessage);
    //     // ..
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
