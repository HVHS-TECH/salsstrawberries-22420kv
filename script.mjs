const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
            'color: blue; background-color: white;');

import { initializeApp }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { getAuth, GoogleAuthProvider, signInWithPopup }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { ref, set }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { get}
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

export { fb_authenticate, fb_write, fb_readRecord };

const FB_GAMECONFIG = {
        apiKey: "AIzaSyCn36qBrPRutqLXCYIyzkyjMQRiYyhRC2Q",
        authDomain: "comp-2025-kyla-van-weele.firebaseapp.com",
        databaseURL: "https://comp-2025-kyla-van-weele-default-rtdb.firebaseio.com",
        projectId: "comp-2025-kyla-van-weele",
        storageBucket: "comp-2025-kyla-van-weele.firebasestorage.app",
        messagingSenderId: "726085363137",
        appId: "1:726085363137:web:32da18f88b84bf19fffb40",
        measurementId: "G-RXDD9GFN2H"
      };

var FB_GAMEAPP = initializeApp(FB_GAMECONFIG);
var FB_GAMEDB  = getDatabase(FB_GAMEAPP);
console.log(FB_GAMEDB);

var currentUser = null;
var userId = null;
var templateEmail = "";

/***********************************/
// fb_authenticate()
// Called by authenticate Button
// To firebase - cia signInwIthPopup
// Input: n/a
// Return: n/a
/***********************************/
function fb_authenticate() {
    console.log('%c fb_authenticate(): ', 
        'color: ' + COL_C + '; background-color: deepPink'
    );

    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();
    // The following makes Google ask the user to select the account
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });

    signInWithPopup(AUTH, PROVIDER).then((result) => {
        currentUser = result.user;
        userId = currentUser.uid;
        console.log('successful login');
        //✅ Code for a successful authentication goes here
    })

    .catch((error) => {
        console.log('failed login');
        //❌ Code for an authentication error goes here
    });
}


/***********************************/
// fb_writeRecord()
// Called by write record Button
// A record to firebase - via set
// Input: n/a
// Return: n/a
/***********************************/
function fb_write() {
    console.log('%c fb_write(): ',
        'color: ' + COL_C + '; background-color: hotPink'
    );

    var name = document.getElementById("name").value;
    var fruit = document.getElementById("favoriteFruit").value;
    var quantity = document.getElementById("fruitQuantity").value;

    const dbReference = ref(FB_GAMEDB, 'users/' + userId);
    set(dbReference, {
        Name: name,
        FavoriteFruit: fruit,
        FruitQuantity: quantity
    }).then(() => {  
        console.log('successfull write');
        //✅ Code for a successful write goes here
    }).catch((error) => {
        console.log(error);
        //❌ Code for a write error goes here
    });

}


function fb_readRecord() {
    console.log('%c fb_readRecord(): ',
        'color: ' + COL_C + '; background-color: lightPink'
    );

    const dbReference= ref(FB_GAMEDB, 'users/' + userId);
    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log(fb_data);
            return(fb_data);
            //✅ Code for a successful read goes here
        } else {
            console.log('No record found');
            //✅ Code for no record found goes here
        }
    }).catch((error) => {
        console.log('failed read');
        //❌ Code for a read error goes here
    });
}


function email() {
    fb_readRecord.then((fb_data) => {
        templateEmail = `
        <div style="background: #fff0f5; border: 1px solid #ccc; padding: 1rem; border-radius: 8px;"></div>`
    })
}