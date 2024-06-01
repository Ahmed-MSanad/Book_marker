// btns
var submitBtn = document.getElementById('BookMarkerBtn');
var validateMessageBtn = document.getElementById('validateMessageBtn');
// input fields
var siteNameInput = document.getElementById('siteName');
var siteURLInput = document.getElementById('siteURL');
// placeHere new bookmarkers
var placeHere = document.getElementById('placeHere');
var popupValidateMessage = document.getElementById('popupValidateMessage');
// array of bookmarkers
var bookmarkerList;

if(localStorage.getItem('bookmarkerList')){
    bookmarkerList = JSON.parse(localStorage.getItem('bookmarkerList'));
    displayBookMarkers(bookmarkerList);
}
else{
    bookmarkerList = [];
}


function addBookMarker(){
    if(checkSiteName() && checkSiteURL()){
        var newBookMarker = {
            WebsiteName : siteNameInput.value,
            WebsiteURL : siteURLInput.value
        };
    
        bookmarkerList.push(newBookMarker);
        localStorage.setItem('bookmarkerList',JSON.stringify(bookmarkerList));
        clearInputs();
        placeHere.innerHTML = '';
        displayBookMarkers(bookmarkerList);
    }
    else{
        popupValidateMessage.classList.remove('d-none');
    }
}

function clearInputs(){
    siteNameInput.value = '';
    siteURLInput.value = '';
}

function displayBookMarkers(bookList){
    var container = '';
    for(var i = 0 ; i < bookList.length ; i++){
        container += `
            <div class="row w-100 text-center bg-white border-bottom ms-0">
                <div class="col-2 py-2 d-flex justify-content-center align-items-center"><p class="mb-0">${i+1}</p></div>
                <div class="col-4 py-2 d-flex justify-content-center align-items-center"><p class="mb-0">${bookList[i].WebsiteName}</p></div>
                <div class="col-3 py-2"><a href="${bookList[i].WebsiteURL}" target="_blank" class="text-white btn btn-lemon"><i class="fa-solid fa-eye fa-fw"></i> Visit</a></div>
                <div class="col-3 py-2"><button type="submit" onclick="deleteBookMarker(${i});" class="text-white btn btn-danger"><i class="fa-solid fa-trash-can fa-fw"></i> Delete</button></div>
            </div>
        `
    }
    placeHere.innerHTML += container;
}

function deleteBookMarker(deletedIndex){
    bookmarkerList.splice(deletedIndex,1);
    localStorage.setItem('bookmarkerList',JSON.stringify(bookmarkerList));
    placeHere.innerHTML = '';
    displayBookMarkers(bookmarkerList);
}

function checkSiteName(){
    var isMatch = siteNameInput.value.match(/^[a-zA-Z0-9]{3,}$/);
    if(isMatch){
        siteNameInput.classList.add('is-valid');
        siteNameInput.classList.remove('is-invalid');
        return true;
    }
    else{
        siteNameInput.classList.add('is-invalid');
        siteNameInput.classList.remove('is-valid');
        return false;
    }
}

function checkSiteURL(){
    var isMatch = siteURLInput.value.match(/^(https:\/\/www\.|http:\/\/www\.|www\.)[a-zA-Z0-9\-_$]+\.[a-zA-Z]{2,5}$/);
    if(isMatch){
        siteURLInput.classList.add('is-valid');
        siteURLInput.classList.remove('is-invalid');
        return true;
    }
    else{
        siteURLInput.classList.add('is-invalid');
        siteURLInput.classList.remove('is-valid');
        return false
    }
}

function closePopupMessage(){
    popupValidateMessage.classList.add('d-none');
}
