

//======================================================================
//              this is the functions of the program  : 
//======================================================================





//======================================================================
//                      Create functions :  
//======================================================================



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
    Loader_Anim = document.getElementById("loading_Anim");
  
  
   // Button_in.addEventListener("click", foo);
    Button_upload.addEventListener("click",uploadPhoto);
    Button_delete.addEventListener("click",deletePin);
    Button_Sub.addEventListener("click",updatePage);
    Button_Logout.addEventListener("click", userLogout);


    Pin_Root = firebase.database().ref('pins/');
    User_Root = firebase.database().ref('users/');


    Image_Root = firebase.storage().ref('Images/');
    
}


function CreateLoginPage()
{
    Email_txt=document.getElementById("inputEmail");
    Password_txt=document.getElementById("inputPassword");
    Button_sign_up=document.getElementById("Btn_sign_up");
    Button_sign_in = document.getElementById("Btn_sign_in");
    Button_Sign_in_Google=document.getElementById("Sign_in_Google");

    Button_sign_up.addEventListener("click", goToSignUp);
    Button_Sign_in_Google.addEventListener("click", signInUserWithGoogle);
}



function CreateSignUpPage()
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



function addPin() {

    PinGrid_Main.innerHTML = '';
    for (let i = 0; i < Pins.length; i++) {

        let Pin_id = Pins[i].Id;
        let url = Pins[i].URL;
        let desp = Pins[i].Description;
        PinGrid_Main.innerHTML += 
        `<figure id= "${Pin_id}">
            <div class = "image">
            <img class ="image__img" src="${url}" alt="A windmill" />
                <div class = "image__overlay">
                <p class = "image_description">Pin_${Pin_id}</p>
                    
                
                <h1>hello</h1>
                 </div>
            
          
            </div>
            
            <div class="image__title">${desp}</div>
        </figure>`
    }




   
}


//======================================================================
//                      Show Functions :   
//======================================================================

function goToSignUp()
{
    window.location="SignUp.html";
}




//======================================================================
//                      Check Functions :  
//======================================================================





function userLogout(){
    
    firebase.auth().signOut().then(() => {
       
        // Sign-out successful.
      }).catch((error) => {
        alert('Error on logging out');
      });
      
}
function signInUser()
{
    //var email = "test@example.com";
    //var password = "hunter2";
    var email = Email_txt.value;
    var password = Password_txt.value;
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location="UserScreen.html";
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
}
function signInUserWithGoogle()
{
    var provider = new firebase.auth.GoogleAuthProvider();
    
  firebase.auth().signInWithPopup(provider)
        .then((result) => {
    // Success.
             
            User_Root.on('value',function(snap) {
                snap.forEach(function(item) {
                    if(item.val().email==result.user.email) // email already exists, go to user screen
                    {
                        window.location="UserScreen.html";
                        return;
                    }
                });
                // if we reached here then the user doesnt exists
                console.log(result.user.displayName);
                userName = result.user.displayName;
                
                User_Root.child(userName).set({
                    email: result.user.email
                })
                window.location="UserScreen.html";
            });
            
            
        }, (error) => {
            alert(error);
    // Error.
  });

}







//======================================================================
//                      Update Functions  :  
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
    //StopLoading();

}


function StopLoading()
{
    Loader_Anim.style.display= "none";
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



//======================================================================
//                      Delete Functions  :  
//======================================================================



function deletePin()
{
    let id_Delete = Text_delete.value;
    Pin_Root.child('Pin_'+id_Delete).remove();
    Image_Root.child('Pin_'+id_Delete).delete();
}




//======================================================================
//                      Load Functions :  
//======================================================================


function getData(Id) {

}



//======================================================================
//                      Save functions   :  
//======================================================================





function signUpUser(){
    //=========================TODO===========================
    //Add validation to textboxes
    //var email = "test13@example.com";
    //var password = "jsdoij2ofFSdf!";
  var nickName = User_sign_up_name.value;
  var email = User_sign_up_email.value;
  var password = User_sign_up_pass.value;
  var repeat = User_sign_up_repeat.value;
  // [START auth_signup_password]
  if(password == repeat)
  {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
        console.log('everything went fine');
        console.log('user object:' + user);

        
        //you can save the user data here.
        
            // if we reached here then the user doesnt exists
            
            
            User_Root.child(nickName).set({
                email: email
            })
            window.location="UserScreen.html";
        })

        .catch(function(error) {
        console.log('there was an error');
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ' - ' + errorMessage);
        });
    }
    else
        alert('please match the passwords');
}




function uploadPhoto() {


    console.log("uploadPhoto");
    let temp = document.createElement('input');
    temp.type = 'file';
    let change = true;
    temp.onchange = e => {
            Files = e.target.files;
            ID = parseInt(Math.random()*Math.pow(10,digits));
            let metadata = { contentType: Files[0].type }
            let uploadTask = Image_Root.child('Pin_' + ID).put(Files[0], metadata);
            let ImageUrl;
            
            

            uploadTask.on('state_changed',
             
            function progress (snapshot) {
               let precentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
               console.log(precentage);
            },
            function error (err){
                console.log("error accured");
            },

            function complete()
            {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                    ImageUrl = url;
                    SavePin(ImageUrl);
                });
            }
            );

        }
       
    temp.click();

}



function SavePin(ImageUrl) {
    let txt = Text_in.value;
    Pin_Root.child('Pin_' + ID).set({
        Description: txt,
        Id: ID,
        URL: ImageUrl
    });


}
