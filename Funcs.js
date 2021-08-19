

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
        alert('Sucssesfly logged out');
        // Sign-out successful.
      }).catch((error) => {
        alert('Error on logging out');
      });
      
}
function signInUser()
{
    var email = "test@example.com";
    var password = "hunter2";
    //var email = Email_txt.value;
    //var password = Password_txt.value;
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location="index.html";
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}
function signInUserWithGoogle()
{
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        'userName': 'user@example.com'
      });
      auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function(error) {
        // An error happened.
        if (error.code === 'auth/account-exists-with-different-credential') {
          // Step 2.
          // User's email already exists.
          // The pending Google credential.
          var pendingCred = error.credential;
          // The provider account's email address.
          var email = error.email;
          // Get sign-in methods for this email.
          auth.fetchSignInMethodsForEmail(email).then(function(methods) {
            // Step 3.
            // If the user has several sign-in methods,
            // the first method in the list will be the "recommended" method to use.
            if (methods[0] === 'password') {
              // Asks the user their password.
              // In real scenario, you should handle this asynchronously.
              var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
              auth.signInWithEmailAndPassword(email, password).then(function(result) {
                // Step 4a.
                return result.user.linkWithCredential(pendingCred);
              }).then(function() {
                // Google account successfully linked to the existing Firebase user.
                goToApp();
              });
              return;
            }
            // All the other cases are external providers.
            // Construct provider object for that provider.
            // TODO: implement getProviderForProviderId.
            var provider = getProviderForProviderId(methods[0]);
            // At this point, you should let the user know that they already has an account
            // but with a different provider, and let them validate the fact they want to
            // sign in with this provider.
            // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
            // so in real scenario you should ask the user to click on a "continue" button
            // that will trigger the signInWithPopup.
            auth.signInWithPopup(provider).then(function(result) {
              // Remember that the user may have signed in with an account that has a different email
              // address than the first one. This can happen as Firebase doesn't control the provider's
              // sign in flow and the user is free to login using whichever account they own.
              // Step 4b.
              // Link to Google credential.
              // As we have access to the pending credential, we can directly call the link method.
              result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
                // Google account successfully linked to the existing Firebase user.
                goToApp();
              });
            });
          });
        }
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
  
  var email = User_sign_up_email.value;
  var password = User_sign_up_pass.value;
  
  // [START auth_signup_password]
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
    console.log('everything went fine');
    console.log('user object:' + user);
    //you can save the user data here.
    }).catch(function(error) {
    console.log('there was an error');
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + ' - ' + errorMessage);
    });
        //alert('please match the passwords');
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

