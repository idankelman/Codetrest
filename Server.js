
//======================================================================
//                  CodeTrest : the main loop : 
//======================================================================



//const fs = require("fs");

//======================================================================
//                  Variable Declerations : 
//======================================================================

let Button_in;  
let Button_upload;
let Text_in;
let PinGrid_Main;


let ID=0;


let Pin_Root;
let User_Root;
let Image_Root; 



let reader;
let key;

let Par;
let CurrPhoto;

let Files = [];
let Pins = [];



//======================================================================
//                  preload+setup Declerations : 
//======================================================================

document.addEventListener("DOMContentLoaded", function () {

    Button_in = document.getElementById("Btn_in");
    Text_in = document.getElementById("Txt_in");
    Par = document.getElementById("Text");
    Button_upload =document.getElementById("Btn_up");
    PinGrid_Main = document.getElementById("PinGrid1");
  
  
   // Button_in.addEventListener("click", foo);
    Button_upload.addEventListener("click",uploadPhoto);



    Pin_Root = firebase.database().ref('pins/');
    User_Root = firebase.database().ref('users/');
    

    Image_Root = firebase.storage().ref('Images/');
    


    //let temp = Pin_Root.child('Pin_'+ID);
    //temp.on('value',snap=>  Par.innerHTML = snap.val().Description);

    updatePins();
    
    

    //Create Base Main Website
    //$("header").hide();
    //$("header").fadeIn(700);
    //Fadein();
    //MakeGetCall();
  
  
  
  
    //MakeGetCall();
    //MakeGetCall("Default2");
  
    // saving all of the document elements
    /*
    grid = document.querySelector(".grid");
    Calc = document.getElementById("cmdHome");
    Changer = document.getElementById("Changer");
    LetterGrid = document.querySelector(".grid2");
    InfoGrid = document.querySelector(".grid3");
  
  
  
    //setting onClickListeners
    Calc.addEventListener("click", Show);
    btn.addEventListener("click", showCountries);
    */

  });
  



  
//======================================================================
//                  input Declerations : 
//======================================================================



function updatePins()
{
    
    Pin_Root.on('value',function(snap) {
        Pins = [];
        snap.forEach(function(item) {
            var itemVal = item.val();
            Pins.push(itemVal);
        });
        ID = Pins.length;
        addPin();
    });

}