


// Initialize Firebase
var config = {
  apiKey: "AIzaSyCGP6jSDucf4n-fffBZ22J49mn4OA5bcNc",
  authDomain: "philly-dex.firebaseapp.com",
  databaseURL: "https://philly-dex.firebaseio.com",
  projectId: "philly-dex",
  storageBucket: "philly-dex.appspot.com",
  messagingSenderId: "118073688"
};
firebase.initializeApp(config);


// FirebaseUI config.

        var uiConfig = {
            signInSuccessUrl: 'home.html',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
        };

         // Initialize the FirebaseUI Widget using Firebase. 
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
