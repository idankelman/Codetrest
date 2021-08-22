
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
let Button_add_pin;
let Button_Upload_photo;
let Button_submit_pin;

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
let Pin_title;
let Pin_Desc;
let identifier;

let digits = 10; // the number of digits for the ID generator
let ID=0;
let counter=0;
let AmountofImages;
let UserEmail;
let UserComma;
let UserName;


let Pin_Root;

let Image_Root; 
let User_Root;


let reader;
let key;

let Par;
let CurrPhoto;

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
        let userInfo = document.getElementById("user info");
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(user.displayName);
                let name = user.displayName;
                UserName=name;
                UserEmail = user.email;
                UserComma=UserEmail.replace(".", ",");
                if(name===undefined || name === null)
                    name = user.email.substring(0, user.email.indexOf('@'));
                console.log(name);
                userInfo.innerHTML=`hello my name is ${name} `
            } else {
                alert('Error: no user is logged in');
            }
          });
        Button_add_pin=document.getElementById("add_pin");
    

        Button_add_pin.addEventListener("click", goToAddPin);
    }
    else if(identifier.innerHTML=="Add Pin Page")
    {
       Pin_title=document.getElementById("Pin_title");
       Pin_Desc = document.getElementById("Pin_Desc");
       
       Button_Upload_photo=document.getElementById("Btn_upload");
       Button_submit_pin = document.getElementById("submit_pin");

       Button_Upload_photo.addEventListener("click", selectTheImage);
       Button_submit_pin.addEventListener("click", submitPin);
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

function goToAddPin()
{
    window.location="AddUserPin.html";
}  




function updatePins()
{
  
    User_Root.once('value',function(users) { // all users
        Pins = [];
        
        users.forEach(function(user) { // for each user
            user.once('value', function(pin){
                
                var pinVal = pin.val();
                Pins.push(pinVal);
            })
            
        });
        
        //addPin();
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

    
    
    
}

function updatePage()
{
    Page = "SubPage";
    firebase.auth().onAuthStateChanged(function(user){
        if(user){ // user is signed in
            window.location="UserScreen.html";
        }
        else // user isn't signed in, launch login page
        {
            window.location='Sub.html';
        }
    });
}
