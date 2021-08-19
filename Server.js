
//======================================================================
//                  CodeTrest : the main loop : 
//======================================================================



//const fs = require("fs");

//======================================================================
//                  Variable Declerations : 
//======================================================================

let Loader_Anim;


let Button_in;  
let Button_upload;
let Button_delete;
let Button_Sub;
let Button_Logout;
let Button_sign_up; // goes to the sign up page
let Button_signUp; // submits the form to firebase
let Button_sign_in; // logs user in
let Button_Sign_in_Google;

let Text_in;
let Text_delete;
let Email_txt;
let Password_txt;
let PinGrid_Main;
let User_sign_up_name;
let User_sign_up_email;
let User_sign_up_pass;
let User_sign_up_repeat;
let User_sign_in_email;
let User_sign_in_password;

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
            CreateHomePage();
            updatePins();
        }

    else if(identifier.innerHTML=="Login Page")
    {
            CreateLoginPage();

    }
    else if(identifier.innerHTML=="Sign Up Page")
    {
            CreateSignUpPage();
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
  




