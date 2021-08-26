
//======================================================================
//                  CodeTrest : the main loop : 
//======================================================================



//const fs = require("fs");

//======================================================================
//                  Variable Declerations : 
//======================================================================


let add_pin_modal;
let pin_image_blob;


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
let Button_add_pin;
let Button_Upload_photo;
let Button_submit_pin;
let btnAddCollection;

let Text_in;
let Text_delete;
let Email_txt;
let Password_txt;
let PinGrid_Main;
let CollectionGrid;
let NewCollectionName;

let User_sign_up_name;
let User_sign_up_email;
let User_sign_up_pass;
let User_sign_up_repeat;
let User_sign_in_email;
let User_sign_in_password;
let Pin_title;
let Pin_Desc;
let identifier;

let digits = 10; // the number of digits for the ID generator
let ID=0;
let UserEmail;
let UserComma;
let UserName;
let CollectionName;
let updated=0;
let counter=0;
let ImagesToHide;

let Pin_Root;

let Image_Root; 
let User_Root;


let reader;
let key;

let Par;
let CurrPhoto;

let Collections=[];
let Files = [];
let Pins = [];
let Images=[];
let Page="Home"





//======================================================================
//                  preload+setup Declerations : 
//======================================================================






document.addEventListener("DOMContentLoaded", function () {
    Pin_Root = firebase.database().ref('users/pins');
    User_Root = firebase.database().ref('users/');
    

    Image_Root = firebase.storage().ref('Images/');
    identifier = document.getElementById("identify");

    if(identifier.innerHTML=="Home")
        {
            CreateHomePage();
            updatePins();
            
        }

    else if(identifier.innerHTML=="Login Page")
    {

        Email_txt=document.getElementById("inputEmail");
        Password_txt=document.getElementById("inputPassword");
        Button_sign_up=document.getElementById("Btn_sign_up");
        Button_sign_in = document.getElementById("Btn_sign_in");
        Button_Sign_in_Google=document.getElementById("Sign_in_Google");

        Button_sign_up.addEventListener("click", goToSignUp);
        Button_Sign_in_Google.addEventListener("click", signInUserWithGoogle);
        Button_sign_in.addEventListener("click", signInUser);


    }
    else if(identifier.innerHTML=="Sign Up Page")
    {
            CreateSignUpPage();
    }
    
    else if(identifier.innerHTML=="User Screen")
    {
       createUserPage();
    }
    else if(identifier.innerHTML=="Add Pin Page")
    {

        CreateAddPinPage();

    }
    else if(identifier.innerHTML=="Showing Collection")
    {
        CreateCollectionPage();
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
