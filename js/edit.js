import { getFormById, initializeState, getFormResponses } from "./store.js"

async function main() {
    await initializeState()
    const id = getParameterByName('id')
    const form = getFormById(id);
    const titleInput = document.getElementById("title")
    titleInput.value = form.title;
    const hrefInput = document.getElementById("href");
    hrefInput.value = form.href;
    const tSubmit = document.getElementById("submit");
    tSubmit.addEventListener("click", validate);

    

}


main();

function getParameterByName(name) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
   return urlParams.get(name)
}

function validate() {
    const titleInput = document.getElementById("title");
    const hrefInput = document.getElementById("href");
    
    if(titleInput.value == null || titleInput.value == ""){
        alert("Title can not be empty");
        return 
    }

    if(hrefInput.value == null || hrefInput.value == ""){
        alert("Href can not be empty");
        return
    }

    if(hrefInput.value.includes(" ")) {
        alert("Can not have empty spaces");
        return
    }

    window.location.href = "/index.html";
}
