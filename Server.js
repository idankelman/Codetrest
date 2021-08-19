
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
            console.log(Page);
            console.log('home page');
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

    }
    else if(identifier.innerHTML=="Sign Up Page")
    {
        User_sign_up_name =document.getElementById("user-name");
        User_sign_up_email =document.getElementById("user-email");
        User_sign_up_pass =document.getElementById("user-pass");
        User_sign_up_repeat =document.getElementById("user-repeatpass");

        Button_signUp=document.getElementById("Sign Up");
        Button_signUp.addEventListener("click", signUpUser);

        $('#user-pass, #user-repeatpass').on('keyup', function () {
            if ($('#user-pass').val() == $('#user-repeatpass').val()) {
              $('#message').html('Matching').css('color', 'green');
            } else 
              $('#message').html('Not Matching').css('color', 'red');
          });
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
function goToSignUp()
{
    window.location="SignUp.html";
}
function CreateHomePage()
{
    Button_in = document.getElementById("Btn_in");
    Button_delete = document.getElementById("Btn_delete");
    Button_Sub = document.getElementById("Button_Login");
    Button_Logout=document.getElementById("Button_Logout");

    Text_in = document.getElementById("Txt_in");
    Text_delete = document.getElementById("Txt_delete");
    Par = document.getElementById("Text");
    Button_upload =document.getElementById("Btn_up");
    PinGrid_Main = document.getElementById("PinGrid1");
  
  
   // Button_in.addEventListener("click", foo);
    Button_upload.addEventListener("click",uploadPhoto);
    Button_delete.addEventListener("click",deletePin);
    Button_Sub.addEventListener("click",updatePage);
    Button_Logout.addEventListener("click", userLogout);


    Pin_Root = firebase.database().ref('pins/');
    User_Root = firebase.database().ref('users/');


    Image_Root = firebase.storage().ref('Images/');
    
}

function updatePage()
{
    Page = "SubPage";
    firebase.auth().onAuthStateChanged(function(user){
        if(user){ // user is signed in
            window.location="index.html";
        }
        else // user isn't signed in, launch login page
        {
            window.location='Sub.html';
        }
    });
}
