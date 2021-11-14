

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

    searchBarInit();
    // Button_in.addEventListener("click", foo);
    //Button_upload.addEventListener("click",uploadPhoto);
    //Button_delete.addEventListener("click",deletePin);
    Button_Sub.addEventListener("click", updatePage);
    //Button_Logout.addEventListener("click", userLogout);
    user_button = document.getElementById("user_button");
    user_button.addEventListener("click", checkIfLogged);

    Pin_Root = firebase.database().ref('pins/');
    User_Root = firebase.database().ref('users/');


    Image_Root = firebase.storage().ref('Images/');
    
    updatePage();

}
function checkIfLogged(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) { // user is signed in
            //window.location="UserScreen.html";
            window.location="UserScreen.html";

        }
        else // user isn't signed in, launch login page
        {
            window.location="Sub.html";
        }
    });


}

function searchBarInit()
{
    
    tagContainer = document.querySelector('#search-box');
    searchInput = document.querySelector('#search');
    searchTags=[];
    curAvailTags=tags;
    list = document.getElementById('list2');
    
    clearList();
    document.querySelector('#search-btn').addEventListener('click', function(event){
        addPinsByTag();
        
    });
    searchInput.addEventListener('keyup', (e) => {
         /*
        if (e.key === 'Enter') {
           
          if(e.target.value!=''){
            let array = e.target.value.split(',');
            array = array.map(function (el) {
                return el.trim();
              });
           
            array.forEach(tag => {
                if(tag!=null && tag !='')
                    searchTags.push(tag);  
            });
            console.log(searchTags);
            addTags();
            
         
         }
         
         
         searchInput.value = '';
        }
        */
        list.style.visibility="hidden";
        let value = e.target.value;
        console.log(value);
        if(value && value.trim().length >0){
            value = value.trim().toLowerCase();
            setList2(curAvailTags.filter(val =>{
                return val.tag.includes(value);
            }).sort((tagA, tagB)=> {
                return getRelevancy(tagB.tag, value) - getRelevancy(tagA.tag, value);
            }));
        }
        else
        {
            list.style.visibility="hidden";
            clearList();
        }
        if(list.firstChild)
            list.style.visibility="visible";

    });
    document.addEventListener('click', (e) => {
        console.log(e.target.tagName);
        if (e.target.tagName === 'I') {
          const tagLabel = e.target.getAttribute('data-item');
          curAvailTags.push({tag: tagLabel});
          const index = searchTags.indexOf(tagLabel);
          searchTags = [...searchTags.slice(0, index), ...searchTags.slice(index+1)];
          addTags();
          if(searchTags.length!=0)
            addPinsByTag();
          else
            addPin(); 
          searchInput.value='';   
        }
      })
}
function addPinsByTag()
{
    if(searchTags.length!=0){
        console.log(searchTags);
        searchedPins=[];
        for(let i=0; i<Pins.length; i++)
        {
            curTags = Pins[i].Tags;
            curJsonTags =[];
            
            let dontInsert = 0;
            console.log(curTags);
            for(let j=0; j<searchTags.length; j++)
            {
                if(curTags.includes(searchTags[j])==false)                     
                    dontInsert = 1;
            }
           
            if(dontInsert==0)
            {
                searchedPins.push(Pins[i]);
            }
            
        }
        searchInput.value = '';
        clearList();
        addPin(searchedPins);
    }
}
function setList2(group){
    clearList();
    for(const tag of group){
        const item = document.createElement('li');
       
        const item2 = document.createElement('a');
        item2.innerHTML=tag.tag;
        item2.addEventListener("click", function(){
            searchTags.push(this.textContent);
            curAvailTags = curAvailTags.filter((el) => {
                return el.tag !== this.textContent;
            }); 
            group = group.filter((el) => {
                return el.tag !== this.textContent;
            });
            if(group.length==0) 
                searchInput.value = '';
            this.parentElement.removeChild(this);
            addTags();
        });
        item.appendChild(item2); 
        
        
        list.appendChild(item);
    }
        
}

function clearTags() {
    document.querySelectorAll('.tag').forEach(tag => {
      tag.parentElement.removeChild(tag);
    });
    
}
function addTags() {
    clearTags();
    searchTags.slice().reverse().forEach(tag => {
      tagContainer.prepend(createTag(tag));
    });
    
}
function createTag(label) {
    const div = document.createElement('div');
    div.classList.add('tag');
    const span = document.createElement('span');
    span.innerHTML = label;
    const closeIcon = document.createElement('i');
    
    closeIcon.classList.add('close');
    closeIcon.setAttribute('data-item', label);
    div.appendChild(span);
    div.appendChild(closeIcon);
    
    return div;
    
  }

function insertCollection()
{
    let txt = NewCollectionName.value;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) { 
            isExist=0;
            
            UserComma = user.email.replace(".", ",");
            let user_ro = firebase.database().ref('users/' + UserComma);
            user_ro.once("value", (snapshot) => { // all collections
                snapshot.forEach((collection) => { // one user
                    if(collection.key == txt)
                        isExist=1;
                    });
                
               if(isExist==0)
               {
                
                    user_ro.child(`/${txt}/`).set({
                    amount: 0
                    })
               }  
                
                
            });

           
        } else {
            alert('Error: no user is logged in');
        }
    });
}
function stopLoader3()
{
    loader3.style.visibility="hidden";
}
function createUserPage() {
    user_button = document.getElementById("user_button");
    user_button.addEventListener("click", checkIfLogged);
    loader3 = document.getElementById("loader3");
    loader3.style.visibility="hidden";
    Loader_Anim = document.getElementById("loading_Anim");
    NewCollectionName=document.getElementById("CollectionToAdd");
    btnAddCollection=document.getElementById("addCollection");
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
            userInfo.innerHTML = `${name}`
            btnAddCollection.addEventListener("click", insertCollection);
        } else {
            alert('Error: no user is logged in');
        }
    });


    CreateAddPinPage();

    //Button_add_pin = document.getElementById("add_pin");
    //Button_add_pin.addEventListener("click", goToAddPin);
    Button_Sub.addEventListener("click", updatePage);

    CollectionGrid = document.getElementById("CollectionGrid");
    addCollection();
    updatePage();
}
function CreateDisplayItemPage(){
    user_button = document.getElementById("user_button");
    user_button.addEventListener("click", checkIfLogged);
    const new_image = new Image();
    new_image.src = window.localStorage.getItem("ImgSrc");
   
    
    new_image.onload = function(){
        
        new_image.style.overflow = "auto";
        
      

        
       
        document.querySelector('.pin_img').appendChild(new_image);
        //document.querySelector('#upload_img_label').style.display = 'none';
        let title = window.localStorage.getItem("Title");
        let desc = window.localStorage.getItem("Description");
        let urls = window.localStorage.getItem("GitHub");
        let tagsss =  window.localStorage.getItem("PinTags")
        document.querySelector('.pin_explanation').innerHTML+=
        `<h1>${title}</h1>
        <h3>${desc}</h3>`
        console.log(urls);
        console.log(urls==="undefined");
        if(urls!=="undefined")
            document.querySelector('.pin_explanation').innerHTML+=`<h3><a id="git" href="${urls}">Github Link</a></h3>`
        //new_image.height = new_image.naturalHeight;
        //new_image.width = new_image.naturalWidth;
        //document.querySelector('.section2').classList.add('card');
        //new_pin.classList.add(`card_${pin_details.pin_size}`);
        //new_image.classList.add(`card_${imageSize}`);
        //new_image.classList.add('pin_max_width');
        let iHeight = new_image.naturalHeight;
        let iWidth = new_image.naturalWidth;
        let ratio = iHeight / iWidth;
        new_image.style.borderRadius= "16px";        
        new_image.height=400;
                
                
        if (ratio < 1.3)
            new_image.height=300;
                
        if (ratio < 1.15)
            new_image.height=200;
        
       
    }
    searchBarInit();
    Button_Sub = document.getElementById("Button_Login");
    Button_Logout = document.getElementById("Button_Logout");
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

function setList(group){
    clearList();
    for(const tag of group){
        const item = document.createElement('li');
       
        const item2 = document.createElement('a');
        item2.innerHTML=tag.tag;
        item2.addEventListener("click", function(){
            chosenTags.push(this.textContent);
            curAvailTags = curAvailTags.filter((el) => {
                return el.tag !== this.textContent;
            });
            console.log(curAvailTags)
            this.parentElement.removeChild(this);
            console.log(chosenTags);
        });
        item.appendChild(item2); 
        
        
        list.appendChild(item);
    }
    if(group.length==0)
        setNoResult();
}
function clearList(){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}
function setNoResult(){
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    const text = document.createTextNode("No Result");
    item.appendChild(text); 
    list.appendChild(item);
}
function getRelevancy(value, searchTerm){
    if(value ===searchTerm)
        return 2;
    else if(value.startsWith(searchTerm))
        return 1;
    else
        return 0;
}
function CreateAddPinPage() {

    
    PinGrid_Main = document.getElementById("PinGrid1");
    add_pin_modal = document.querySelector('.add_pin_modal');

    list = document.getElementById('list');
    clearList();
    chosenTags=[];
    curAvailTags=tags;
    $("textarea").each(function () {
        this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
      }).on("input", function () {
        this.style.height = "auto";
        this.style.overflowY = "scroll";
        this.style.height = (this.scrollHeight) + "px";
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


    document.querySelector('#search').addEventListener('input', function(event){
        let value = event.target.value;
        console.log(value);
        if(value && value.trim().length >0){
            value = value.trim().toLowerCase();
            setList(curAvailTags.filter(val =>{
                return val.tag.includes(value);
            }).sort((tagA, tagB)=> {
                return getRelevancy(tagB.tag, value) - getRelevancy(tagA.tag, value);
            }));
        }
        else
        {
            
            clearList();
            
        }
    })

    document.querySelector('#upload_img').addEventListener('change', event => {
        if (event.target.files && event.target.files[0]) {
            if (/image\/*/.test(event.target.files[0].type)) {
                const reader = new FileReader();

                reader.onload = function () {
                    const new_image = new Image();

                    
                    let fileSize = dataURItoBlob(reader.result).size;
                    new_image.src = reader.result;
                    pin_image_blob = reader.result;
                    
                    //console.log(Images.length);

                    new_image.onload = function () {

                       
                        /*
                        var cvs = document.createElement('canvas');
                        cvs.width = this.width;
                        cvs.height = this.height;
                        var ctx = cvs.getContext("2d").drawImage(this, 0, 0);
                        var newImageData = cvs.toDataURL("image/jpeg", 2/100);
                        Images = dataURItoBlob(newImageData);
                        console.log(Images);
                        var result_image_obj = new Image();
                        result_image_obj.src = newImageData;
                        
                        pin_image_blob = result_image_obj.src;
                        this.src=result_image_obj.src;
                        */

                        const inputWidth = this.naturalWidth;
                        const inputHeight = this.naturalHeight;

                        
                        // the desired aspect ratio of our output image (width / height)
                        console.log("file size before compression: " + fileSize);
                        let outputResolutionMulti = 1; // times how much to decrease the resultion
                        let compression = 100; // precenteges of quality
                        if(fileSize>100000)
                        {
                            outputResolutionMulti = 0.8;
                            compression = 80;
                        }
                        if(fileSize>500000) 
                        {
                            outputResolutionMulti = 0.6;
                            compression = 70;
                        }
                        if(fileSize>1000000) 
                        {
                            outputResolutionMulti = 0.5;
                            compression = 60;
                        }
                        if(fileSize>2000000) 
                        {
                            outputResolutionMulti = 0.5;
                            compression = 60;
                        }
                        if(fileSize>4000000)
                        {
                            outputResolutionMulti = 0.3;
                            compression = 30;
                        }
                        if(fileSize>8000000)
                        {
                            outputResolutionMulti = 0.2;
                            compression = 15;
                        }

                        
                       
                        // calculate the position to draw the image at
                        
                      
                        // create a canvas that will present the output image
                        var cvs = document.createElement('canvas');
                        let outputWidth = Math.round(inputWidth * outputResolutionMulti);
                        let outputHeight = Math.round(inputHeight *outputResolutionMulti);
                        // set it to the same size as the image
                        cvs.width = outputWidth;
                        cvs.height = outputHeight;

                        // draw our image at position 0, 0 on the canvas
                        var ctx = cvs.getContext("2d").drawImage(this, 0,0, outputWidth  , outputHeight);
                        var newImageData = cvs.toDataURL("image/jpeg", compression/100);
                        
                                               
                        Images = dataURItoBlob(newImageData);
                        
                        console.log("file size after compression: " + Images.size);
                        console.log("ratio: " + fileSize/Images.size);
                        var result_image_obj = new Image();
                        result_image_obj.src = newImageData;
                        
                        pin_image_blob = result_image_obj.src;
                        this.src=result_image_obj.src;


                        new_image.onload = function(){
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
            pin_size: document.querySelector('#pin_size').value,
            tags: chosenTags
        }

        console.log(users_data);

        //create_pin(users_data);
        //addPin2();
        uploadPhoto2(users_data);
        reset_modal();
    });

}
function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
    }
function CreateCollectionPage(){
    Loader_Anim = document.getElementById("loading_Anim");
    PinGrid_Main = document.getElementById("PinGrid1");
    CollectionName = localStorage.getItem("CollectionName");
    Button_Sub = document.getElementById("Button_Login");
    updatePage();
    console.log(CollectionName);
    searchBarInit();
    showTheCollection();
    
}
function showTheCollection()
{
    CollectionName = localStorage.getItem("CollectionName");
    console.log(CollectionName);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {     
            UserComma = user.email.replace(".", ",");
            let user_ro = firebase.database().ref('users/' + UserComma+`/${CollectionName}/`);
            user_ro.on("value", (snapshot) => { // The collection
                Pins = [];               
                snapshot.forEach((childSnapshot) => { // one user
                        var pinVal = childSnapshot.val();
                        if(!Number.isInteger(pinVal))                            
                            Pins.push(pinVal);
                        });
                    showCollectionPins(UserComma);
                });
               
            
        } 
        else {
            
        }
    });

}
function showCollectionPins(email)
{
    console.log(Pins);
    CollectionName = localStorage.getItem("CollectionName");
    $("#PinGrid1").css('visibility', 'hidden');
    PinGrid_Main.innerHTML=``;
    counter=0;
    for (let i = 0; i < Pins.length; i++) {
                   
        let Pin_id = Pins[i].Id;
        let pin_tags = Pins[i].Tags;
        let url = Pins[i].URL;
        let title = Pins[i].Title;
        let desp = Pins[i].Description;
        let destination = Pins[i].Destination;
       

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


            new_pin.addEventListener("click", function(){
                window.localStorage.setItem("PinTags", pin_tags);
                window.localStorage.setItem("GitHub", destination);
                window.localStorage.setItem("Title", title);
                window.localStorage.setItem("Description", desp);
                window.localStorage.setItem("ImgSrc", new_image.src);
                console.log(new_image.src);
                window.location="DisplayItem.html";
            });
            
            
            new_pin.innerHTML = `
             
            <div class="pin_title">${title}</div>
                        
            <div class="pin_modal">
                    

                <div class="wrap">
                
                    <div class="pin_image" id = "${Pin_id}-image"></div>
                    <div class="text">${title}</div>
                    <div class="modal_head"  id=${Pin_id}_remove>
                            
                    
                       
                        
                    
                </div>    
                </div>
            </div> `;
                        
            $(`#${Pin_id}_remove`).ready(function(){
                let removeBtn = document.createElement("button");
               
                removeBtn.textContent="Remove";
                removeBtn.classList.add('save_card');
                removeBtn.addEventListener("click", function(event){
                    event.stopPropagation();
                    firebase.database().ref('users/'+email+'/'+CollectionName+'/Pin_'+Pin_id).remove();
                })
                
                $(`#${Pin_id}_remove`).append(removeBtn);
            })
            
               
                
            
            PinGrid_Main.appendChild(new_pin);
            $(`#${Pin_id}-image`).prepend(new_image)
            
            
            if (
                new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
                new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
            ) {
                new_image.classList.remove('pin_max_width');
                new_image.classList.add('pin_max_height');
            }

            new_pin.style.opacity = 1;
            counter++;
            checkIfRetriveDone(Pins);
            
        }
        
        
    }
    StopLoading();
}
    

function addPin(searched) {
    //first we need to get all of the collections
    
    
    firebase.auth().onAuthStateChanged(function (user) {
        islogged=0;
        if (user) { // user is signed in
            counter=0;
            islogged=1;
            UserComma = user.email.replace(".", ",")
            cur_user_root = firebase.database().ref('users/'+UserComma);
            cur_user_root.once("value", (snapshot) => { // all collections
                Collections = [];
                snapshot.forEach((childSnapshot) => { // a collection
                    if (typeof childSnapshot.val() === 'string' || childSnapshot.val() instanceof String) {
                                console.log(childSnapshot.val());

                    }
                    else {
                        var collectionVal = childSnapshot.key;
                        if(collectionVal != "PostedPins")
                            Collections.push(collectionVal);
                    }                
                });
            })
            }
            else{
                islogged=0;
            }
            
        
                
                
                
                CurPins = Pins;   
                if(searched!==undefined)
                    CurPins = searched;
                console.log("the pins are: ");
                console.log(CurPins);
                PinGrid_Main.innerHTML = ``;
                $("#PinGrid1").css('visibility', 'hidden');
                for (let i = 0; i < CurPins.length; i++) {
                   
                    let Pin_id = CurPins[i].Id;
                    let pin_tags = CurPins[i].Tags;
                    let url = CurPins[i].URL;
                    let title = CurPins[i].Title;
                    let desp = CurPins[i].Description;
                    let destination = CurPins[i].Destination;
                    if(islogged==1)
                    {
                    dropdownHTML=``;
                    for(let j=0; j<Collections.length; j++)
                    {
                        dropdownHTML+=`<button class = "save_card" id="${Collections[j]}_${Pin_id}">${Collections[j]}</button>`;
                        
                    }
                    }
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
            
                        new_pin.addEventListener("click", function(){
                            window.localStorage.setItem("PinTags", pin_tags);
                            window.localStorage.setItem("GitHub", destination);
                            window.localStorage.setItem("Title", title);
                            window.localStorage.setItem("Description", desp);
                            window.localStorage.setItem("ImgSrc", new_image.src);
                            console.log(new_image.src);
                            window.location="DisplayItem.html";
                        });
            
                        
                        
                        new_pin.innerHTML = `
                        
                        <div class="pin_title">${title}</div>
                        
                        <div class="pin_modal">
                                
            
                            <div class="wrap">
                            
                                <div class="pin_image" id = "${Pin_id}-image"></div>
                                <div class="text">${title}</div>
                                <div class="modal_head">
                                        
                                <div class = "dropdown">
                                    <div class="save_card"  id = ${Pin_id}_Load>
                                        
                                    </div>
                                    
                                </div>
                            </div>    
                            </div>
                        </div>
            
                        
                        `;
                        if(islogged==1){
                        $(`#${Pin_id}_Load`).ready(function(){
                            console.log(Collections);
                            const new_dropdown = document.createElement('DIV');
                            new_dropdown.classList = "dropdown";
                            const dropbtn = document.createElement('BUTTON');
                            dropbtn.classList = "dropbtn";
                            new_dropdown.style.paddingTop="0px";
                            dropbtn.textContent ="Save To";
                            new_dropdown.appendChild(dropbtn);
                            const dropContent = document.createElement('DIV');
                            dropContent.classList = "dropdown-content";
                            for(let j=0; j<Collections.length; j++)
                            {
                                const btnCollection = document.createElement('BUTTON');
                                btnCollection.classList = "save_card";
                                btnCollection.textContent = Collections[j];
                                btnCollection.id = `${Collections[j]}_${Pin_id}`;
                                btnCollection.collect = Collections[j];
                                btnCollection.pin = Pin_id;
                                btnCollection.description = desp;
                                btnCollection.title=title;
                                btnCollection.imgurl=url
                                btnCollection.Tags=pin_tags;
                                
                                btnCollection.addEventListener("click", function(event){
                                    event.stopPropagation();
                                    emailForChild = user.email.replace(".", ",")
                                    let user_ro = firebase.database().ref('users/' + emailForChild+`/${this.collect}/`);
                                    updated=1;
                                    
                                    user_ro.child('Pin_'+this.pin).set({
                                        Title: this.title,
                                        Description:this.description,
                                        Id: this.pin,
                                        URL: this.imgurl,
                                        Tags: this.Tags
                                    })
                                    console.log(this.collect);
                                    console.log(this.pin);
                                    //savePinToCollection();
                                });
                                   
                                dropContent.appendChild(btnCollection);
                            }
                            new_dropdown.appendChild(dropContent);
                            
                            $(`#${Pin_id}_Load`).append(new_dropdown);
                        });
                        } 
                        else
                        {
                            $(`.save_card`).css("display", "none");
                        }  
                            
                        
                        PinGrid_Main.appendChild(new_pin);
                        //$(`#${Pin_id}-image`).append(new_image)
                        
                        $(`#${Pin_id}-image`).prepend(new_image)
                        if (
                            new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
                            new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
                        ) {
                            new_image.classList.remove('pin_max_width');
                            new_image.classList.add('pin_max_height');
                        }
                        
                        new_pin.style.opacity = 1;
                        counter++;
                        checkIfRetriveDone(CurPins);
                    }
                    
                    
                }
                
                  
        });
}
        
       
    
function checkIfRetriveDone(newPins)
{

    console.log(counter);
    if(counter==PinsToWait || counter==newPins.length)
    {
        StopLoading();
        $("#PinGrid1").fadeIn(50);
        PinGrid_Main.classList="container";
        $("#PinGrid1").css('visibility', 'visible');
        
    }
}


function addCollection() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            UserComma = user.email.replace(".", ",")
            cur_user_root = firebase.database().ref('users/'+UserComma);
            cur_user_root.on("value", (snapshot) => { // all collections
                Collections = [];
                snapshot.forEach((childSnapshot) => { // a collection
                    if (typeof childSnapshot.val() === 'string' || childSnapshot.val() instanceof String) {
                                console.log(childSnapshot.val());

                    }
                    else {
                        var collectionVal = childSnapshot.key;
                        
                        if(collectionVal != "PostedPins")
                            Collections.push(collectionVal);
                        
                    }                
                });
                console.log(Collections);
                CollectionGrid.innerHTML = ``;
                for(let i=0; i<Collections.length; i++)
                {
                    
                    
                
                    const new_Collection = document.createElement('DIV');
                    const new_image = new Image();
                
                    new_image.src = './images/up-arrow.png';
                    new_Collection.style.opacity = 0;  
                    nameOfCurCollection = Collections[i];
                    
                    new_Collection.id = nameOfCurCollection;
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
                        
                
                        <div class="Cel_modal">
                            <div class = "image__overlay">
                                <div class="image__title">${new_Collection.id}</div>
                                
                            </div>
                        </div>
                
                            
                        </div>
                
                        <div class="Cel_image">
                        </div>`;
                        console.log(new_Collection);
                        new_Collection.addEventListener("click", function(){
                            localStorage.setItem("CollectionName",this.id);
                            
                            
                            window.location="ShowCollection.html";
                        });
                        new_Collection.appendChild(new_image);
                        CollectionGrid.appendChild(new_Collection);
                        
                
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
                StopLoading();
            });
           
            
        

        } else {
            
        }
    });
    
}


//======================================================================
//                      Show Functions :   
//======================================================================




function goToAddPin() {
    window.location = "AddUserPin.html";
}






//======================================================================
//                      Check Functions :  
//======================================================================

















//======================================================================
//                      Update Functions  :  
//======================================================================




function reset_modal() {

    const modals_pin = document.querySelector('.add_pin_modal .modals_pin');
    clearList();
    curAvailTags=tags;
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
    document.querySelector('#search').value = '';
    chosenTags=[];
    pin_image_blob = null;
}








function updatePins() {

    
    
    User_Root.once("value", (snapshot) => { // snapshot = all users
        
        Pins = [];
        snapshot.forEach((childSnapshot) => { // snapshot = one user
            childSnapshot.forEach((childrenSnapshot) => { // snapshot = one collection
                console.log(childrenSnapshot.key)
                if(childrenSnapshot.key == "PostedPins"){
                    console.log(childrenSnapshot.key)
                    childrenSnapshot.forEach((childrenenSnapshot)=>{
                    var pinVal = childrenenSnapshot.val();
                    if(!Number.isInteger(pinVal))
                    {
                    
                    Pins.push(pinVal);
                    }
                    }) 
                    
                }
            
            });
        })
        console.log(Pins);
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




//======================================================================
//                      Save functions   :  
//======================================================================

function uploadPhoto2(userInfo) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //console.log(user.displayName);
            //console.log(user.email);
            console.log("uploadPhoto");

            
            ID = parseInt(Math.random() * Math.pow(10, digits));
            let metadata = { contentType: Images.type }
            let uploadTask = Image_Root.child('Pin_' + ID).put(Images, metadata);
            let ImageUrl;



            uploadTask.on('state_changed',

                function progress(snapshot) {
                    document.getElementById("loader3").style.visibility="visible";
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
                        stopLoader3();
                    });

                });

        } else {
            alert('Error: no user is logged in');
        }
    });

}

function SavePin2(ImageUrl, userInfo, UserComma) {

    let Description = userInfo.description;
    let Title = userInfo.title;
    let Tags = userInfo.tags;
    //window.location = "UserScreen.html";
    console.log(Tags);
    let user = firebase.database().ref('users/' + UserComma + '/PostedPins/');
    user.child('Pin_' + ID).set({
        Title: Title,
        Description: Description,
        Destination: userInfo.destination,
        Id: ID,
        URL: ImageUrl,
        Tags: Tags
    });

}

//======================================================================
//                      Sign Out functions   :  
//======================================================================

function userLogout() {

    firebase.auth().signOut().then(() => {

        window.location = "index.html";
        // Sign-out successful.
    })

}

//======================================================================
//                      Sign Up functions   :  
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
            }).then()
            {
                let user = firebase.database().ref('users/' + emailForChild+'/');
                user.child('PostedPins/').set({
                    amount: 0
                })
                user.child('SavedPins').set({
                    amount: 0
                })
            }
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
function goToSignUp() {
    window.location = "SignUp.html";
}

//======================================================================
//                      Sign In functions   :  
//======================================================================

function signInUser() {
    //var email = "test@example.com";
    //var password = "hunter2";
    var email = Email_txt.value;
    var password = Password_txt.value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in
            let done = 0;
            User_Root.once('value', function (snap) {
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
                    .then()
                    {
                        let user = firebase.database().ref('users/' + emailForChild+'/');
                        user.child('PostedPins/').set({
                        amount: 0
                        })
                        user.child('SavedPins/').set({
                            amount: 0
                        })
                        window.location = "UserScreen.html";
                    }
                   
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
            User_Root.once('value', function (snap) {
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
                    }).then()
                    {
                        let user = firebase.database().ref('users/' + emailForChild+'/');
                        user.child('PostedPins/').set({
                        amount: 0
                        })
                        user.child('SavedPins/').set({
                            amount: 0
                        })
                        window.location = "UserScreen.html";
                    }
                    
                }
            });


        }, (error) => {
            alert(error);
            // Error.
        });

}