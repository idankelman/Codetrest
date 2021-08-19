
//======================================================================
//                  CodeTrest : the main loop : 
//======================================================================



//const fs = require("fs");

//======================================================================
//                  Variable Declerations : 
//======================================================================

let Button_in;  
let Button_upload;
let Button_delete;
let Button_Sub;


let Text_in;
let Text_delete;
let Email_txt;
let Password_txt;
let PinGrid_Main;

let identifier;

let digits = 10; // the number of digits for the ID generator
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

let Page="Home"



//======================================================================
//                  preload+setup Declerations : 
//======================================================================

document.addEventListener("DOMContentLoaded", function () {
    
    identifier = document.getElementById("identify");
    if(identifier.innerHTML=="Home")
        {
            console.log(Page);
            console.log('home page');
            CreateHomePage();
            updatePins();
        }
    else if(identifier.innerHTML=="Login Page")
    {
        Email_txt=document.getElementById("inputEmail");
        Password_txt=document.getElementById("inputPassword");

    }
   


    //let temp = Pin_Root.child('Pin_'+ID);
    //temp.on('value',snap=>  Par.innerHTML = snap.val().Description);


    
    

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

function CreateHomePage()
{
    Button_in = document.getElementById("Btn_in");
    Button_delete = document.getElementById("Btn_delete");
    Button_Sub = document.getElementById("Button_Login");

    Text_in = document.getElementById("Txt_in");
    Text_delete = document.getElementById("Txt_delete");
    Par = document.getElementById("Text");
    Button_upload =document.getElementById("Btn_up");
    PinGrid_Main = document.getElementById("PinGrid1");
  
  
   // Button_in.addEventListener("click", foo);
    Button_upload.addEventListener("click",uploadPhoto);
    Button_delete.addEventListener("click",deletePin);
    Button_Sub.addEventListener("click",updatePage);



    Pin_Root = firebase.database().ref('pins/');
    User_Root = firebase.database().ref('users/');


    Image_Root = firebase.storage().ref('Images/');
    
}

function updatePage()
{
    Page = "SubPage";
    firebase.auth().onAuthStateChanged(function(user){
        if(user){ // user is signed in

        }
        else // user isn't signed in, launch login page
        {
            window.location='Sub.html';
        }
    });
}