

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
        PinGrid_Main.innerHTML += `<figure id= "${Pin_id}">
        <img src="${url}" alt="A windmill" />
        <figcaption><a href="#">${i}</a></figcaption>
        </figure>`
    }

}


//======================================================================
//                      Show Functions :   
//======================================================================





//======================================================================
//                      Check Functions :  
//======================================================================




//======================================================================
//                      Update Functions  :  
//======================================================================




//======================================================================
//                      Load Functions :  
//======================================================================


function getData(Id) {

}



//======================================================================
//                      Save functions   :  
//======================================================================

function uploadPhoto() {


    console.log("uploadPhoto");
    let temp = document.createElement('input');
    temp.type = 'file';
    let change = true;
    temp.onchange = e => {
        if (change) {
            Files = e.target.files;
            let metadata = { contentType: Files[0].type }
            let uploadTask = Image_Root.child('Pin_' + ID).put(Files[0], metadata);
            let ImageUrl;
            uploadTask.on('state_changed', function (snapshot) {
                uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                    ImageUrl = url;
                    SavePin(ImageUrl);
                });

            });
            change = false;
        }

    }
    temp.click();

}



function SavePin(ImageUrl) {
    let txt = Text_in.value;
    //console.log(txt);
    Pin_Root.child('Pin_' + ID).set({
        Description: txt,
        Id: ID,
        URL: ImageUrl
    });
    ID++;

}

