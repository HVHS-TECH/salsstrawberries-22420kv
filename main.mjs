import { fb_initialise, fb_authenticate, fb_write }
    from './script.mjs';
    window.fb_initialise = fb_initialise;
    window.fb_authenticate  = fb_authenticate;
    window.fb_write = fb_write;

var name = document.getElementById("name").value;
var favoriteFruit = document.getElementById("favoriteFruit").value;
var fruitQuantity = document.getElementById("fruitQuantity").value;

