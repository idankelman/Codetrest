

//======================================================================
//              this is the functions of the program  : 
//======================================================================





//======================================================================
//                      Create functions :  
//======================================================================



function CreateHomePage() {
    Button_in = document.getElementById("Btn_in");
    Button_delete = document.getElementById("Btn_delete");
    Button_Sub = document.getElementById("Button_Login");
    Button_Logout = document.getElementById("Button_Logout");

    Text_in = document.getElementById("Txt_in");
    Text_delete = document.getElementById("Txt_delete");
    Par = document.getElementById("Text");
    Button_upload = document.getElementById("Btn_up");
    PinGrid_Main = document.getElementById("PinGrid1");
    Loader_Anim = document.getElementById("loading_Anim");


    // Button_in.addEventListener("click", foo);
    //Button_upload.addEventListener("click",uploadPhoto);
    //Button_delete.addEventListener("click",deletePin);
    Button_Sub.addEventListener("click", updatePage);
    //Button_Logout.addEventListener("click", userLogout);


    Pin_Root = firebase.database().ref('pins/');
    User_Root = firebase.database().ref('users/');


    Image_Root = firebase.storage().ref('Images/');

    updatePage();

}



function createUserPage() {
    let userInfo = document.getElementById("user info");
    Button_Sub = document.getElementById("Button_Login");


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user.displayName);
            let name = user.displayName;
            UserName = name;
            UserEmail = user.email;
            UserComma = UserEmail.replace(".", ",");
            if (name === undefined || name === null)
                name = user.email.substring(0, user.email.indexOf('@'));
            console.log(name);
            userInfo.innerHTML = `hello my name is ${name} `
        } else {
            alert('Error: no user is logged in');
        }
    });
    Button_add_pin = document.getElementById("add_pin");
    Button_add_pin.addEventListener("click", goToAddPin);
    Button_Sub.addEventListener("click", updatePage);

    CollectionGrid = document.getElementById("CollectionGrid");
    addCollection();
    updatePage();
}





function CreateLoginPage() {
    Email_txt = document.getElementById("inputEmail");
    Password_txt = document.getElementById("inputPassword");
    Button_sign_up = document.getElementById("Btn_sign_up");
    Button_sign_in = document.getElementById("Btn_sign_in");
    Button_Sign_in_Google = document.getElementById("Sign_in_Google");

    Button_sign_up.addEventListener("click", goToSignUp);
    Button_Sign_in_Google.addEventListener("click", signInUserWithGoogle);
}



function CreateSignUpPage() {
    User_sign_up_name = document.getElementById("user-name");
    User_sign_up_email = document.getElementById("user-email");
    User_sign_up_pass = document.getElementById("user-pass");
    User_sign_up_repeat = document.getElementById("user-repeatpass");

    Button_signUp = document.getElementById("Sign Up");
    Button_signUp.addEventListener("click", signUpUser);

    $('#user-pass, #user-repeatpass').on('keyup', function () {
        if ($('#user-pass').val() == $('#user-repeatpass').val()) {
            $('#message').html('Matching').css('color', 'green');
        } else
            $('#message').html('Not Matching').css('color', 'red');
    });
}



function CreateAddPinPage() {

    /*
    Pin_title=document.getElementById("Pin_title");
    Pin_Desc = document.getElementById("Pin_Desc");
    
    Button_Upload_photo=document.getElementById("Btn_upload");
    Button_submit_pin = document.getElementById("submit_pin");

    Button_Upload_photo.addEventListener("click", selectTheImage);
    Button_submit_pin.addEventListener("click", submitPin);

    */
    PinGrid_Main = document.getElementById("PinGrid1");
    add_pin_modal = document.querySelector('.add_pin_modal');


    
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user.displayName);
            let name = user.displayName;
            UserName = name;
            UserEmail = user.email;
            UserComma = UserEmail.replace(".", ",");
            if (name === undefined || name === null)
                name = user.email.substring(0, user.email.indexOf('@'));
            console.log(name);
        } else {
            alert('Error: no user is logged in');
        }
    });



    document.querySelector('.add_pin').addEventListener('click', () => {
        add_pin_modal.style.opacity = 1;
        add_pin_modal.style.pointerEvents = 'all';
    });


    document.querySelector('.add_pin_modal').addEventListener('click', event => {
        if (event.target === add_pin_modal) {
            reset_modal();
        }
    });


    

    document.querySelector('#upload_img').addEventListener('change', event => {
        if (event.target.files && event.target.files[0]) {
            if (/image\/*/.test(event.target.files[0].type)) {
                const reader = new FileReader();

                reader.onload = function () {
                    const new_image = new Image();

                    new_image.src = reader.result;
                    pin_image_blob = reader.result;
                   
                    //console.log(Images.length);

                    new_image.onload = function () {

                        Images = event.target.files;

                        const modals_pin = document.querySelector('.add_pin_modal .modals_pin');

                        new_image.classList.add('pin_max_width');

                        document.querySelector('.add_pin_modal .pin_image').appendChild(new_image);
                        document.querySelector('#upload_img_label').style.display = 'none';

                        modals_pin.style.display = 'block';

                        if (
                            new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
                            new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
                        ) {
                            new_image.classList.remove('pin_max_width');
                            new_image.classList.add('pin_max_height');
                        }

                        modals_pin.style.opacity = 1;
                    }
                }

                reader.readAsDataURL(event.target.files[0]);
                //reader.readAsDataURL(pin_image_blob);
                reader.readAsDataURL(Images[0]);
            }
        }

        document.querySelector('#upload_img').value = '';
    });

    document.querySelector('.save_pin').addEventListener('click', () => {
        const users_data = {
            author: 'Jack',
            board: 'default',
            title: document.querySelector('#pin_title').value,
            description: document.querySelector('#pin_description').value,
            destination: document.querySelector('#pin_destination').value,
            img_blob: pin_image_blob,
            pin_size: document.querySelector('#pin_size').value
        }

        console.log(users_data);

        //create_pin(users_data);
        //addPin2();
        uploadPhoto2(users_data);
        reset_modal();
    });

}


//old add pin function
/*
function create_pin(pin_details) {
            const new_pin = document.createElement('DIV');
            const new_image = new Image();

            new_image.src = pin_details.img_blob;
            new_pin.style.opacity = 0;

            new_image.onload = function () {
                new_pin.classList.add('card');
                new_pin.classList.add(`card_${pin_details.pin_size}`);
                new_image.classList.add('pin_max_width');

                new_pin.innerHTML = `<div class="pin_title">${pin_details.title}</div>
        <div class="pin_modal">
            <div class="modal_head">
                <div class="save_card">Save</div>
            </div>

            <div class="modal_foot">
                <div class="destination">
                    <div class="pint_mock_icon_container">
                        <img src="./images/upper-right-arrow.png" alt="destination" class="pint_mock_icon">
                    </div>
                    <span>${pin_details.destination}</span>
                </div>

                <div class="pint_mock_icon_container">
                    <img src="./images/send.png" alt="send" class="pint_mock_icon">
                </div>

                <div class="pint_mock_icon_container">
                    <img src="./images/ellipse.png" alt="edit" class="pint_mock_icon">
                </div>
            </div>
        </div>

        <div class="pin_image">
        </div>`;

                document.getElementById("PinGrid1").appendChild(new_pin);
                new_pin.children[2].appendChild(new_image);

                if (
                    new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
                    new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
                ) {
                    new_image.classList.remove('pin_max_width');
                    new_image.classList.add('pin_max_height');
                }

                new_pin.style.opacity = 1;
            }
     }

*/

function addPin() {

    //PinGrid_Main.innerHTML = '';
    for (let i = 0; i < Pins.length; i++) {

        let Pin_id = Pins[i].Id;
        let url = Pins[i].URL;
        let title = Pins[i].Title;
        let desp = Pins[i].Description;


        const new_pin = document.createElement('DIV');
        const new_image = new Image();

        new_image.src = url;
        new_pin.style.opacity = 0;

        new_image.onload = function () {


            let iHeight = new_image.height;
            let iWidth = new_image.width;
            let ratio = iHeight / iWidth;

            let imageSize = "large";


            if (ratio < 1.3)
                imageSize = "medium";

            if (ratio < 1.15)
                imageSize = "small";

            new_pin.classList.add('card');
            //new_pin.classList.add(`card_${pin_details.pin_size}`);
            new_pin.classList.add(`card_${imageSize}`);
            new_image.classList.add('pin_max_width');





            new_pin.innerHTML = `
            <div class="pin_title">${title}</div>

            <div class="pin_modal">
                <div class="modal_head">
                    <div class="save_card">Save</div>
                </div>

                <div class="modal_foot">
                    <div class="destination">
                        <div class="pint_mock_icon_container">
                            <img src="./images/upper-right-arrow.png" alt="destination" class="pint_mock_icon">
                        </div>
                        <span>${desp}</span>
                    </div>

                    <div class="pint_mock_icon_container">
                        <img src="./images/send.png" alt="send" class="pint_mock_icon">
                    </div>

                    <div class="pint_mock_icon_container">
                        <img src="./images/ellipse.png" alt="edit" class="pint_mock_icon">
                    </div>
                </div>
            </div>

            <div class="pin_image">
            </div>`;

            PinGrid_Main.appendChild(new_pin);
            new_pin.children[2].appendChild(new_image);

            if (
                new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
                new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
            ) {
                new_image.classList.remove('pin_max_width');
                new_image.classList.add('pin_max_height');
            }

            new_pin.style.opacity = 1;

        }
    }

    StopLoading();
}



function addCollection() {

    let Pin_id = 'Pins[i].Id'
    let url = 'Pins[i].URL;'
    let title = 'Pins[i].Title;'
    let desp = 'Pins[i].Description;'


    const new_Collection = document.createElement('DIV');
    const new_image = new Image();

    new_image.src = './images/up-arrow.png';
    new_Collection.style.opacity = 0;

    new_image.onload = function () {


        let iHeight = new_image.height;
        let iWidth = new_image.width;
        let ratio = iHeight / iWidth;

        let imageSize = "large";


        if (ratio < 1.3)
            imageSize = "medium";

        if (ratio < 1.15)
            imageSize = "small";

        new_Collection.classList.add('Collection');
        //new_pin.classList.add(`card_${pin_details.pin_size}`);
        new_Collection.classList.add(`Collection_${imageSize}`);
        new_image.classList.add('Collection_max_width');





        new_Collection.innerHTML = `
        <div class="Cel_title">${title}</div>

        <div class="Cel_modal">
            <div class="modal_head">
                <div class="save_Collection">Save</div>
            </div>

            <div class="modal_foot">
                <div class="destination">
                    <div class="pint_mock_icon_container">
                        <img src="./images/upper-right-arrow.png" alt="destination" class="pint_mock_icon">
                    </div>
                    <span>${desp}</span>
                </div>

                <div class="pint_mock_icon_container">
                    <img src="./images/send.png" alt="send" class="pint_mock_icon">
                </div>

                <div class="pint_mock_icon_container">
                    <img src="./images/ellipse.png" alt="edit" class="pint_mock_icon">
                </div>
            </div>
        </div>

        <div class="Cel_image">
        </div>`;

        CollectionGrid.appendChild(new_Collection);
        new_Collection.children[2].appendChild(new_image);

        if (
            new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
            new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
        ) {
            new_image.classList.remove('Cel_max_width');
            new_image.classList.add('Cel_max_height');
        }

        new_Collection.style.opacity = 1;

    }

}


//======================================================================
//                      Show Functions :   
//======================================================================

function goToSignUp() {
    window.location = "SignUp.html";
}


function goToAddPin() {
    window.location = "AddUserPin.html";
}






//======================================================================
//                      Check Functions :  
//======================================================================





function userLogout() {

    firebase.auth().signOut().then(() => {

        window.location = "Sub.html";
        // Sign-out successful.
    }).catch((error) => {
        alert('Error on logging out');
    });

}



function signInUser() {
    //var email = "test@example.com";
    //var password = "hunter2";
    var email = Email_txt.value;
    var password = Password_txt.value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in
            let done = 0;
            User_Root.on('value', function (snap) {
                snap.forEach(function (item) {
                    if (item.val().email == result.user.email) // email already exists, go to user screen
                    {
                        done = 1;
                        window.location = "UserScreen.html";
                        return;
                    }
                });
                // if we reached here then the user doesnt exists
                console.log(result.user.displayName);
                if (done == 0) {
                    emailForChild = result.user.email.replace(".", ",");
                    User_Root.child(emailForChild).set({
                        email: result.user.email
                    })
                    window.location = "UserScreen.html";
                }
            });

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}



function signInUserWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    let dont = 0;
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // Success.
            emailForChild = result.user.email.replace(".", ",");
            User_Root.on('value', function (snap) {
                snap.forEach(function (item) {
                    if (item.val().email == result.user.email) // email already exists, go to user screen
                    {
                        dont = 1;
                        window.location = "UserScreen.html";
                        return;
                    }
                });
                // if we reached here then the user doesnt exists
                console.log(result.user.displayName);

                if (dont == 0) {
                    User_Root.child(emailForChild).set({
                        email: result.user.email
                    })
                    window.location = "UserScreen.html";
                }
            });


        }, (error) => {
            alert(error);
            // Error.
        });

}







//======================================================================
//                      Update Functions  :  
//======================================================================




function reset_modal() {

    const modals_pin = document.querySelector('.add_pin_modal .modals_pin');

    add_pin_modal.style.opacity = 0;
    add_pin_modal.style.pointerEvents = 'none';
    document.querySelector('#upload_img_label').style.display = 'block';
    modals_pin.style.display = 'none';
    modals_pin.style.opacity = 0;

    if (modals_pin.children[0].children[0]) modals_pin.children[0].removeChild(modals_pin.children[0].children[0]);
    document.querySelector('#pin_title').value = '';
    document.querySelector('#pin_description').value = '';
    document.querySelector('#pin_destination').value = '';
    document.querySelector('#pin_size').value = '';
    pin_image_blob = null;
}




function getUserEmail() {

}



function submitPin() {


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //console.log(user.displayName);
            //console.log(user.email);
            ID = parseInt(Math.random() * Math.pow(10, digits));
            UserComma = user.email.replace(".", ",");
            let metadata = { contentType: Images[0].type }
            let uploadTask = Image_Root.child('Pin_' + ID).put(Images[0], metadata);
            let ImageUrl;



            uploadTask.on('state_changed',

                function progress(snapshot) {
                    let precentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(precentage);
                },
                function error(err) {
                    console.log("error accured");
                },

                function complete() {

                    uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                        ImageUrl = url;

                        SavePin(ImageUrl, UserComma);

                    });

                });

        } else {
            alert('Error: no user is logged in');
        }
    });


}

function selectTheImage() {

    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = function (e) {
        Images = e.target.files;
        reader = new FileReader();
        reader.onload = function () {
            document.getElementById("my_img").src = reader.result;
        }
        reader.readAsDataURL(Images[0]);
    }
    input.click();

}


function updatePins() {


    User_Root.on("value", (snapshot) => { // all users
        Pins = [];
        snapshot.forEach((childSnapshot) => { // one user
            childSnapshot.forEach((childrenSnapshot) => { // one pin
                if (typeof childrenSnapshot.val() === 'string' || childrenSnapshot.val() instanceof String) {
                    console.log(childrenSnapshot.val());

                }
                else {
                    var pinVal = childrenSnapshot.val();
                    Pins.push(pinVal);
                }
            });
        })
        addPin();
    });
    //StopLoading();

}


function StopLoading() {
    Loader_Anim.style.display = "none";
}


function updatePage() {
    Page = "SubPage";
    Button_Sub.style.opacity = 0;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) { // user is signed in
            //window.location="UserScreen.html";
            Button_Sub.addEventListener('click', userLogout);
            Button_Sub.innerHTML = 'logout';
            Button_Sub.style.opacity = 1;

        }
        else // user isn't signed in, launch login page
        {
            Button_Sub.href = "Sub.html";
            Button_Sub.innerHTML = 'log in';
            Button_Sub.style.opacity = 1;
        }
    });

}


function updateLikes(ID) {
    for (let i = 0; i < Pins.length; i++)
        if (Pins[i].Id == ID) {
            console.log("updating pin:" + ID);
            //TODO : need to update also in the firebase. 
        }

}



//======================================================================
//                      Delete Functions  :  
//======================================================================



function deletePin() {
    let id_Delete = Text_delete.value;
    Pin_Root.child('Pin_' + id_Delete).remove();
    Image_Root.child('Pin_' + id_Delete).delete();
}




//======================================================================
//                      Load Functions :  
//======================================================================


function getData(Id) {

}



//======================================================================
//                      Save functions   :  
//======================================================================





function signUpUser() {
    //=========================TODO===========================
    //Add validation to textboxes
    //var email = "test13@example.com";
    //var password = "jsdoij2ofFSdf!";
    var nickName = User_sign_up_name.value;
    var email = User_sign_up_email.value;
    var password = User_sign_up_pass.value;
    var repeat = User_sign_up_repeat.value;
    // [START auth_signup_password]
    if (password == repeat) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
            console.log('everything went fine');
            console.log('user object:' + user);
            emailForChild = email.replace(".", ",");

            //you can save the user data here.

            // if we reached here then the user doesnt exists


            User_Root.child(emailForChild).set({
                email: email
            })
            window.location = "UserScreen.html";
        })

            .catch(function (error) {
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
        ID = parseInt(Math.random() * Math.pow(10, digits));
        let metadata = { contentType: Files[0].type }
        let uploadTask = Image_Root.child('Pin_' + ID).put(Files[0], metadata);
        let ImageUrl;



        uploadTask.on('state_changed',

            function progress(snapshot) {
                let precentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(precentage);
            },
            function error(err) {
                console.log("error accured");
            },

            function complete() {
                uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                    ImageUrl = url;
                    SavePin(ImageUrl);
                });
            }
        );

    }

    temp.click();

}


function uploadPhoto2(userInfo) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //console.log(user.displayName);
            //console.log(user.email);
            console.log("uploadPhoto");

            
            ID = parseInt(Math.random() * Math.pow(10, digits));
            let metadata = { contentType: Images[0].type }
            let uploadTask = Image_Root.child('Pin_' + ID).put(Images[0], metadata);
            let ImageUrl;



            uploadTask.on('state_changed',

                function progress(snapshot) {
                    let precentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(precentage);
                },
                function error(err) {
                    console.log("error accured");
                },

                function complete() {

                    uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                        ImageUrl = url;
                        //SavePin(ImageUrl, UserComma);
                        SavePin2(ImageUrl, userInfo,UserComma);

                    });

                });

        } else {
            alert('Error: no user is logged in');
        }
    });

}





function SavePin(ImageUrl, UserComma) {

    let Description = Pin_Desc.value;
    let Title = Pin_title.value;
    window.location = "UserScreen.html";

    let user = firebase.database().ref('users/' + UserComma + '/');
    user.child('Pin_' + ID).set({
        Title: Title,
        Description: Description,
        Id: ID,
        URL: ImageUrl
    });
}



function SavePin2(ImageUrl, userInfo, UserComma) {

    let Description = userInfo.description;
    let Title = userInfo.title;

    window.location = "UserScreen.html";

    let user = firebase.database().ref('users/' + UserComma + '/');
    user.child('Pin_' + ID).set({
        Title: Title,
        Description: Description,
        Id: ID,
        URL: ImageUrl
    });

}
