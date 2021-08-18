

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

