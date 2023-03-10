
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
      window.location.href = '/public/index.html';
    }
  });
  
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

function cerrar_sesion(){
    console.log('logout gallery');
    firebase.auth().signOut();
}