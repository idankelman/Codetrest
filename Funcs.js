

//======================================================================
//              this is the functions of the program  : 
//======================================================================





//======================================================================
//                      Create functions :  
//======================================================================


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
                <div class="image__title">${desp}</div>
                <p class = "image_description">Pin_${Pin_id}</p>
            </div>
        </div>
        </figure>`
    }


   
}


//======================================================================
//                      Show Functions :   
//======================================================================





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

