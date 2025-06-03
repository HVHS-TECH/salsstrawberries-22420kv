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

export { fb_authenticate, fb_write, fb_readRecord};

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
var emailTemplate = "";
var statusTemplate = "";


function status () {
    console.log('status working..');
}

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

    status();

    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();
    if (status, fb_authenticate) {
            console.log('user loggen in');
            statusTemplate = `
            <div> 
               <p> logging in...</p>
            </div>`
            document.getElementById("statusMessage").innerHTML = statusTemplate;
        } else {
            console.log('user not loggen in');
            return null;
        }
    console.log('logging in...');
    // The following makes Google ask the user to select the account
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });
    

    signInWithPopup(AUTH, PROVIDER).then((result) => {
        currentUser = result.user;
        userId = currentUser.uid;
        console.log('successful login');
        //✅ Code for a successful authentication goes here

        if (status, fb_authenticate) {
            console.log('user loggen in');
            statusTemplate = `
            <div> 
               <p> Thank you for loggin in! You may proceed.</p>
            </div>`
            document.getElementById("statusMessage").innerHTML = statusTemplate;
        } else {
            console.log('user not loggen in');
            return null;
        }
    
    })
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

    if (!currentUser) {
        alert("You must be logged in to proceed!");
        return;
    } else {
        statusTemplate = `
            <div> 
               <p> Submitted! </p>
            </div>`
            document.getElementById("statusMessage").innerHTML = statusTemplate;
    } 

    

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

    const dbReference = ref(FB_GAMEDB, 'users/' + userId);
    
    // Return the promise from `get()` so that it can be chained in `view_email()`
    return get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log(fb_data);
             emailTemplate = `
                <div style="background: #fff0f5; border: 1px solid #ccc; padding: 1rem; border-radius: 8px;">
                    <p>Kia ora ${fb_data.Name},</p>
                    <p>Thank you for joining us at Sal’s Strawberry Saloon (and other fruit products)! We're thrilled to have you as a customer!</p>
                    <p>Based on your preferences, we’ll be sending you personalized recommendations for tasty and healthy treats made with the freshest fruit — especially those ${fb_data.FavoriteFruit} we heard you love!</p>
                    <p>At the moment, we want to offer you a deal to get fresh ${fb_data.FavoriteFruit} ${fb_data.FruitQuantity}x a week!!</p>
                    <p>Ngā mihi nui,</p>
                    <p><em>The Sal’s Strawberry Saloon Team</em></p>
                </div>`
                document.getElementById("emailOutput").innerHTML = emailTemplate;
        } else {
            console.log('No record found');
            return null; // Return null if no data is found
        }
    }).catch((error) => {
        console.log('failed read');
        throw error; // Rethrow the error to propagate it
    });
}

//function status() {
//    if (status, fb_authenticate) {
//        console.log('worked');
//         statusTemplate = `
//         <div> 
//            <p> You have been loggen in</p>
//         </div>`
//         document.getElementById("statusMessage").innerHTML = statusTemplate;
//    } else {
//        console.log('user not loggen in');
//        return null;
//    }
//}
